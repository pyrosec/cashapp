import axios from "haxios";
import path from "path";
import randomBytes from "random-bytes";
import { URL } from "url";
import { protocol } from "./proto";
import { v1 } from "uuid";
import moment from "moment";
import { createHmac } from "crypto";
import { gzip } from "node-gzip";
import {
  binaryInsecure,
  getKeyManager,
  generateNewKeysetHandle,
  hybrid,
} from "./tink";
import { createSafetyNetPayload } from "./safetynet";
import { Buffer } from "buffer";
import DEVICE_LIST from "android-fingerprints";
import { getLogger } from "./logger";
import fs from "fs";
import { SocksProxyAgent } from "socks-proxy-agent";
import { ethers } from "ethers";
const logger = getLogger();
hybrid.register();

const defaultCardBytes = fs.readFileSync(
  path.join(__dirname, "..", "data", "default-card.png")
);

const fromPostalCode = (s) => {
  const match = s.match(/(\d+)/);
  if (match) return match[1];
  return null;
};

const toSquareDeviceInfo = (o, i = 0) => {
  const { brand, fingerprints, device } = o;
  const fingerprint = fingerprints[i];
  return [
    fingerprint,
    device,
    brand,
    "T-Mobile",
    Array(2)
      .fill("a".charCodeAt(0))
      .map((v) => String.fromCharCode(Math.floor(Math.random() * 25) + v))
      .join("") +
      Array(4)
        .fill("0".charCodeAt(0))
        .map((v) => String.fromCharCode(Math.floor(Math.random() * 9) + v))
        .join(""),
    Array(3)
      .fill("A".charCodeAt(0))
      .map((v) => String.fromCharCode(Math.floor(Math.random() * 25) + v))
      .join("") +
      Array(6)
        .fill("0".charCodeAt(0))
        .map((v) => String.fromCharCode(Math.floor(Math.random() * 9) + v))
        .join(""),
    "cibuild",
  ].join("::");
};

const randomFingerprintIndex = (device) => {
  const { fingerprints } = device;
  return Math.floor(Math.random() * fingerprints.length);
};

const randomDevice = () => {
  return DEVICE_LIST[Math.floor(Math.random() * DEVICE_LIST.length)];
};

const deviceToRandomSquareInfo = (device) => {
  const i = randomFingerprintIndex(device);
  return toSquareDeviceInfo(device, i);
};

const randomSquareDeviceInfo = () => {
  const device = randomDevice();
  return deviceToRandomSquareInfo(device);
};

const randomDeviceId = () => randomBytes.sync(8).toString("hex");

export type AndroidDevice = {
  name: string;
  brand: string;
  device: string;
  fingerprints: string[];
};

const responseToBuffer = (response) => Buffer.from(new Uint8Array(response));

export class CashAppClient {
  static BASE_URL = "internal.cashappapi.com";
  static PACKAGE_NAME = "com.squareup.cash";
  static LOCALE = "en_US";
  static COMMIT_SHA = "7f13016d";
  static CASHAPP_VERSION = "3.90.1";
  static DEFAULT_ANDROID_VERSION = "Android 11";
  static SQUARE_DEVICE_INFO = null;
  static X_DEVICE_ID = null;
  static DEFAULT_TIMEZONE = "America/Chicago";
  static DEFAULT_DEVICE = null;
  public device: {
    brand: string;
    name: string;
  };
  public androidVersion: string;
  public xDeviceId: string;
  public squareDeviceInfo: string;
  public timezone: string;
  public drmId: string;
  public deviceKey: any;
  public authorization: string | null;
  public backupTag: string | null;
  public safetyNetNonce: string | null;
  public flowToken: string | null;
  public profileToken: string | null;
  public proxyOptions: any;
  public allKnownRanges: Buffer[];
  constructor(options: any = {}) {
    const random = randomDevice();
    this.device =
      options.device || {
        brand: "T-Mobile " + random.brand,
        name: random.device,
      } ||
      (this.constructor as any).DEFAULT_DEVICE;
    this.squareDeviceInfo =
      options.squareDeviceInfo ||
      deviceToRandomSquareInfo(random) ||
      (this.constructor as any).SQUARE_DEVICE_INFO;
    this.androidVersion =
      options.androidVersion ||
      (this.constructor as any).DEFAULT_ANDROID_VERSION;
    this.xDeviceId =
      options.xDeviceId ||
      randomDeviceId() ||
      (this.constructor as any).X_DEVICE_ID;
    this.timezone =
      options.timezone || (this.constructor as any).DEFAULT_TIMEZONE;
    this.drmId = options.drmId || randomBytes.sync(32).toString("base64");
    this.authorization = options.authorization || null;
    this.backupTag = options.backupTag || null;
    this.safetyNetNonce = options.safetyNetNonce || null;
    this.flowToken =
      options.flowToken || (this.constructor as any).randomCashFlowToken();
    this.profileToken = options.profileToken || null;
    this.proxyOptions = options.proxyOptions || null;
    this.allKnownRanges =
      (options.allKnownRanges &&
        options.allKnownRanges.map((v) => Buffer.from(ethers.toBeArray(v)))) ||
      [];
  }
  toObject() {
    return {
      device: this.device,
      flowToken: this.flowToken,
      squareDeviceInfo: this.squareDeviceInfo,
      androidVersion: this.androidVersion,
      xDeviceId: this.xDeviceId,
      timezone: this.timezone,
      drmId: this.drmId,
      authorization: this.authorization,
      profileToken: this.profileToken,
      backupTag: this.backupTag,
      allKnownRanges: this.allKnownRanges.map((v) => ethers.hexlify(v)),
      deviceKey: Buffer.from(
        this.deviceKey.getKeyset().serializeBinary()
      ).toString("base64"),
      safetyNetNonce: this.safetyNetNonce,
    };
  }
  toJSON() {
    return JSON.stringify(this.toObject(), null, 2);
  }
  static fromObject(data) {
    const deviceKey = binaryInsecure.deserializeKeyset(data.deviceKey);
    delete data.deviceKey;
    const result = new this(data);
    result.deviceKey = deviceKey;
    return result;
  }
  static fromJSON(s) {
    return this.fromObject(JSON.parse(s));
  }
  static async initialize(options = {}) {
    const result = new this(options);
    result.deviceKey = await generateNewKeysetHandle(
      hybrid.eciesP256HkdfHmacSha256Aes128GcmKeyTemplate()
    );
    return result;
  }
  _getUserAgent() {
    return (
      (this.constructor as any).PACKAGE_NAME +
      "/" +
      (this.constructor as any).COMMIT_SHA +
      " (" +
      this.androidVersion +
      "; " +
      this.device.brand +
      " " +
      this.device.name +
      "; " +
      (this.constructor as any).LOCALE +
      ") Version/" +
      (this.constructor as any).CASHAPP_VERSION
    );
  }
  _getTimezone() {
    return (
      moment(new Date()).utcOffset(this.timezone).format() +
      ";;" +
      this.timezone
    );
  }
  static getRandomDevice() {
    const device = DEVICE_LIST[Math.floor(Math.random() * DEVICE_LIST.length)];
    return device.brand + " " + device.name;
  }
  _getPublicKey() {
    const pubkey = getKeyManager(
      "type.googleapis.com/google.crypto.tink.EciesAeadHkdfPrivateKey"
    )
      .getKeyFactory()
      .getPublicKeyData(this.deviceKey.getKeyset().toArray()[1][0][0][1]);
    const result = this.deviceKey.getKeyset().clone();
    result.array[1][0][0] = pubkey.array.slice();
    return result;
  }
  static headersFromScenario(cashClientScenario, cashFlowToken, headers) {
    return Object.assign(
      {
        "Cash-Client-Scenario": cashClientScenario,
      },
      headers || {},
      {
        "Cash-Flow-Token": cashFlowToken || this.randomCashFlowToken(),
      }
    );
  }
  _requestContextFromDescriptor(blockerDescriptorId, requestContext) {
    return Object.assign(
      {
        skippedBlockers: [],
        allKnownRanges: this.allKnownRanges || [],
        paymentTokens: [],
      },
      {
        blockerDescriptorId,
      },
      requestContext || {}
    );
  }
  async getPaymentGetter({ cashtag }) {
    const searchResult = await this.search({
      searchText: cashtag,
    } as any);
    const customerData =
      searchResult.sections[0].results[3].serverResults.results[0];
    const {
      fullName,
      cashtag: { name },
      region,
      token: id,
    } = customerData;
    return {
      fullName,
      cashtag: name,
      region,
      id,
    };
  }
  async search({ searchText, externalId, shouldExcludeBlockedCustomers }) {
    const payload = protocol.RecipientSelectorSearchRequest.encode({
      searchText,
      externalId: externalId || v1(),
      shouldExcludeBlockedCustomers,
    }).finish();
    const response = await this._call(
      "/cash-app/recipient-selector/search",
      payload
    );
    return protocol.RecipientSelectorSearchResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async _call(path, data, headers = {}) {
    const requestUuid = v1();
    const requestSignature = await (this.constructor as any)._signRequest(
      this.authorization || "",
      requestUuid,
      path,
      data
    );
    const payload = await (this.constructor as any)._gzipBody(data);
    const agent = this.proxyOptions
      ? new SocksProxyAgent(this.proxyOptions)
      : null;
    const response = await axios.post(
      "https://" + (this.constructor as any).BASE_URL + path,
      payload,
      {
        headers: Object.assign(
          {
            "Square-Device-Info": this.squareDeviceInfo,
            "User-Agent": this._getUserAgent(),
            "Content-Encoding": "gzip",
            "X-Device-ID": this.xDeviceId,
            "X-Device-Name": this.device.name,
            "Time-Zone": this._getTimezone(),
            "Accept-Language": "en-US",
            "Installer-Package": "com.aurora.store",
            "SIM-Info": "; ; ; no_permission",
            Connectivity: "wifi",
            "Drm-ID": this.drmId,
            "X-Request-UUID": requestUuid,
            "Content-Type": "application/x-protobuf",
            "Accept-Encoding": "gzip",
            "X-Request-Signature": requestSignature,
          },
          this.authorization
            ? {
                Authorization: this.authorization,
              }
            : {},
          payload.length > 8192
            ? {
                "Content-Length": payload.length,
              }
            : {},
          headers || {}
        ),
        agent,
        responseType: "arraybuffer",
      }
    );
    return response;
  }
  async ipinfo() {
    const agent = this.proxyOptions
      ? new SocksProxyAgent(this.proxyOptions)
      : null;
    const response = await axios.get("https://ipinfo.io/json", {
      responseType: "json",
      agent,
    });
    if (response.status === 200) return response.data;
    else return response;
  }
  _getClientSecurityContext() {
    return {
      clientPublicKey: Buffer.from(this._getPublicKey().serializeBinary()),
    };
  }
  async setNotificationPreference({
    appToken,
    sessionToken,
    notificationPreference,
    requestContext,
    blockerDescriptorId,
  }) {
    const [appTokenFetched, ...sessionTokenSplit] = (
      this.authorization || "App abc-AB"
    ).split("-");
    const payload = protocol.SetNotificationPreferenceRequest.encode({
      appToken: appToken || appTokenFetched.split(" ")[1],
      sessionToken: sessionToken || sessionTokenSplit.join("-"),
      notificationPreference,
      requestContext: this._requestContextFromDescriptor(
        blockerDescriptorId,
        requestContext
      ),
    }).finish();
    const response = await this._call(
      "/2.0/cash/set-notification-preference",
      payload
    );
    return protocol.SetNotificationPreferenceResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async activateDigitalWallet({
    requestContext,
    issuedCardToken,
    panReferenceId,
    digitalWalletCards,
    blockerDescriptorId,
  }) {
    const payload = protocol.ActivateDigitalWalletRequest.encode({
      requestContext: this._requestContextFromDescriptor(
        blockerDescriptorId,
        requestContext
      ),
      issuedCardToken,
      panReferenceId,
      digitalWalletCards,
    }).finish();
    const response = await this._call(
      "/2.0/cash/activate-digital-wallet",
      payload
    );
    return protocol.ActivateDigitalWalletResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async addOrUpdateReward({
    selectedRewardToken,
    rewardToken,
    requestContext,
    blockerDescriptorId,
  }) {
    const payload = protocol.AddOrUpdateRewardRequest.encode({
      requestContext: this._requestContextFromDescriptor(
        blockerDescriptorId,
        requestContext
      ),
      selectedRewardToken,
      rewardToken,
    }).finish();
    const response = await this._call(
      "/2.0/cash/add-or-update-reward",
      payload
    );
    return protocol.AddOrUpdateRewardResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async addReaction({ requestContext, reaction, blockerDescriptorId }) {
    const payload = protocol.AddReactionRequest.encode({
      requestContext: this._requestContextFromDescriptor(
        blockerDescriptorId,
        requestContext
      ),
      reaction,
    }).finish();
    const response = await this._call("/2.0/cash/add-reaction", payload);
    return protocol.AddReactionResponse.decode(responseToBuffer(response.data));
  }
  async applyRewardCode({ code, requestContext, blockerDescriptorId }) {
    const payload = protocol.ApplyRewardCodeRequest.encode({
      code,
      requestContext: this._requestContextFromDescriptor(
        blockerDescriptorId,
        requestContext
      ),
    }).finish();
    const response = await this._call("/2.0/cash/apply-reward-code", payload);
    return protocol.ApplyRewardCodeResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async approveCashAppPay({
    requestContext,
    requestAuthFlowTriggersMobileUrl,
    cashClientScenario,
    cashFlowToken,
  }) {
    const payload = protocol.ApplyRewardCodeRequest.encode({
      requestContext: this._requestContextFromDescriptor(
        undefined,
        requestContext
      ),
      requestAuthFlowTriggersMobileUrl,
    }).finish();
    const response = await this._call(
      "/cash-app/business-grant/decide",
      payload,
      (this.constructor as any).headersFromScenario(
        cashClientScenario,
        cashFlowToken || this.flowToken
      )
    );
    return protocol.ApplyRewardCodeResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async cancelPayment({ requestContext, paymentToken }) {
    const payload = protocol.CancelPaymentRequest.encode({
      requestContext: this._requestContextFromDescriptor(
        undefined,
        requestContext
      ),
      paymentToken,
    }).finish();
    const response = await this._call("/2.0/cash/cancel-payment", payload);
    return protocol.CancelPaymentResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async checkRewardCode({ code }) {
    const payload = protocol.CheckRewardCodeRequest.encode({
      code,
    }).finish();
    const response = await this._call("/2.0/cash/check-reward-code", payload);
    return protocol.CheckRewardCodeResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async checkVersion() {
    const payload = Buffer.from([]);
    const response = await this._call("/2.0/cash/check-version", payload);
    return protocol.CheckVersionResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async claimPayment({ requestContext, paymentToken, instrumentSelection }) {
    const payload = protocol.ClaimByPaymentTokenRequest.encode({
      requestContext: this._requestContextFromDescriptor(
        undefined,
        requestContext
      ),
      paymentToken,
      instrumentSelection,
    }).finish();
    const response = await this._call(
      "/2.0/cash/claim-by-payment-token",
      payload
    );
    return protocol.ClaimByPaymentTokenResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async clearProfilePhoto() {
    const payload = Buffer.from([]);
    const response = await this._call("/2.0/cash/clear-profile-photo", payload);
    return protocol.ClearProfilePhotoResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async completeScenario({
    paymentTokens,
    transferToken,
    profileToken,
    requestContext,
    cashFlowToken,
    cashClientScenario,
  }) {
    const payload = protocol.CompleteScenarioRequest.encode({
      paymentTokens,
      transferToken,
      profileToken: profileToken || this.profileToken,
      requestContext: requestContext || {
        skippedBlockers: [],
        paymentTokens: [],
        profileToken: profileToken || this.profileToken,
        allKnownRanges: this.allKnownRanges || [],
      },
    }).finish();
    const response = await this._call(
      "/2.0/cash/complete-scenario",
      payload,
      (this.constructor as any).headersFromScenario(
        cashClientScenario || "REQUEST_PHYSICAL_CARD",
        cashFlowToken || this.flowToken
      )
    );
    return protocol.CompleteScenarioResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async pay({ cashtag, instrumentToken, passcode, note, amount }) {
    const flowToken = (this.constructor as any).randomCashFlowToken();
    const result = await this.initiatePayment({
      cashtag,
      instrumentToken,
      amount,
      note,
      cashFlowToken: flowToken,
      cashClientScenario: "PAYMENT_FLOW",
    } as any);
    const paymentToken = result.responseContext.payments[0].token;
    const blocker =
      ((result.responseContext &&
        result.responseContext.scenarioPlan &&
        result.responseContext.scenarioPlan.blockerDescriptors) ||
        [])[0] || {};
    if (blocker.id.match("confirm.requires_passcode")) {
      return await this.confirmPasscode({
        passcode,
        paymentToken,
        blockerDescriptorId: blocker.id || "confirm.requires_passcode",
        cashFlowToken: flowToken,
        cashClientScenario: "PAYMENT_FLOW",
      } as any);
    }
    return {};
  }

  async confirmPasscode({
    passcode,
    paymentTokens,
    passcodeToken,
    instrumentSelection,
    instrumentToken,
    paymentToken,
    transferToken,
    requestContext,
    profileToken,
    blockerDescriptorId,
    cashFlowToken,
    cashClientScenario,
  }) {
    const payload = protocol.ConfirmPasscodeRequest.encode({
      passcode,
      paymentTokens: paymentTokens || [paymentToken].filter(Boolean),
      passcodeToken,
      instrumentSelection:
        instrumentSelection ||
        (instrumentToken && {
          instrumentToken,
        }),
      transferToken,
      requestContext: requestContext || {
        skippedBlockers: [],
        paymentTokens: paymentTokens || [paymentToken].filter(Boolean),
        allKnownRanges: this.allKnownRanges || [],
        profileToken: profileToken || this.profileToken,
        blockerDescriptorId: blockerDescriptorId || "confirm.requires_passcode",
      },
    }).finish();
    const response = await this._call(
      "/2.0/cash/confirm-passcode",
      payload,
      (this.constructor as any).headersFromScenario(
        cashClientScenario || "EXCHANGE_CURRENCY",
        cashFlowToken || this.flowToken
      )
    );
    return response;
  }
  async endFlow({ requestContext, actionId }) {
    const payload = protocol.EndFlowRequest.encode({
      requestContext: this._requestContextFromDescriptor(
        undefined,
        requestContext
      ),
      actionId,
    }).finish();
    const response = await this._call("/2.0/cash/end-flow", payload);
    return protocol.EndFlowResponse.decode(responseToBuffer(response.data));
  }
  async exchangeCurrency({
    sourceToken,
    targetToken,
    contractToken,
    sourceAmount,
    targetAmount,
    profileToken,
    cashFlowToken,
    requestContext,
  }) {
    return await this.executeContract({
      sourceToken,
      targetToken,
      contractToken,
      sourceAmount,
      targetAmount,
      requestContext: requestContext || {
        paymentTokens: [],
        allKnownRanges: this.allKnownRanges || [],
        profileToken: profileToken || this.profileToken,
        skippedBlockers: [],
      },
      cashFlowToken,
      cashClientScenario: "EXCHANGE_CURRENCY",
    } as any);
  }
  async buyBitcoin({ sourceAmount, targetAmount, cashFlowToken }) {
    return await this.exchangeCurrency({
      targetToken: "B$_BTC_C_f02x10m1a",
      sourceToken: "B$_C_f02x10m1a",
      contractToken: "hh7azm3xdfgzhc9z3jqwp6w1y",
      targetAmount: {
        amount: {
          low: Number(targetAmount),
          high: Number(0),
          unsigned: false,
        },
        currencyCode: 1001,
      },
      sourceAmount: {
        amount: {
          low: Number(sourceAmount),
          high: Number(0),
          unsigned: false,
        },
        currencyCode: 840,
      },
      cashFlowToken,
    } as any);
  }
  async sellBitcoin({ sourceAmount, targetAmount, cashFlowToken }) {
    return await this.exchangeCurrency({
      sourceToken: "B$_BTC_C_f02x10m1a",
      targetToken: "B$_C_f02x10m1a",
      contractToken: "hh7azm3xdfgzhc9z3jqwp6w1y",
      targetAmount: {
        amount: {
          low: Number(targetAmount),
          high: Number(0),
          unsigned: false,
        },
        currencyCode: 840,
      },
      sourceAmount: {
        amount: {
          low: Number(sourceAmount),
          high: Number(0),
          unsigned: false,
        },
        currencyCode: 1001,
      },
      cashFlowToken,
    } as any);
  }
  async executeContract({
    contractToken,
    sourceToken,
    targetToken,
    requestContext,
    passcodeToken,
    sourceAmount,
    targetAmount,
    customerPreferredDisplayCurrency,
    recurringSchedule,
    customOrder,
    cashFlowToken,
    cashClientScenario,
  }) {
    const payload = protocol.ExecuteContractRequest.encode({
      contractToken,
      sourceToken,
      targetToken,
      requestContext,
      passcodeToken,
      sourceAmount,
      targetAmount,
      customerPreferredDisplayCurrency,
      recurringSchedule,
      customOrder,
    }).finish();
    const response = await this._call(
      "/2.0/cash/execute-contract",
      payload,
      (this.constructor as any).headersFromScenario(
        cashClientScenario || "EXCHANGE_CURRENCY",
        cashFlowToken || this.flowToken
      )
    );
    return protocol.ExecuteContractResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async findCustomers({ searchText }) {
    const payload = protocol.FindCustomersRequest.encode({
      searchText,
    }).finish();
    const response = await this._call("/2.0/cash/find-customers", payload);
    return protocol.FindCustomersResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async findInstantPayAutoAdvance({ requestedToBeNotified, requestContext }) {
    const payload = protocol.FindInstantPayAutoAdvanceRequest.encode({
      requestedToBeNotified,
      requestContext,
    }).finish();
    const response = await this._call(
      "/cash-app/instant-pay/finish-auto-advance",
      payload
    );
    return protocol.FindInstantPayAutoAdvanceResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async finishInstantPaycheckDirectDepositSwitch({ requestContext }) {
    const payload = protocol.FinishInstantPayDirectDepositSwitchRequest.encode({
      requestContext: this._requestContextFromDescriptor(
        undefined,
        requestContext
      ),
    }).finish();
    const response = await this._call(
      "/cash-app/instant-pay/finish-direct-deposit-switch",
      payload
    );
    return protocol.FinishInstantPayDirectDepositSwitchResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async finishPinwheelLink({
    requestContext,
    linkToken,
    onLoginResponse,
    onExitResponse,
    onSuccessResponse,
  }) {
    const payload = protocol.FinishPinwheelLinkRequest.encode({
      requestContext: this._requestContextFromDescriptor(
        undefined,
        requestContext
      ),
      linkToken,
      onLoginResponse,
      onExitResponse,
      onSuccessResponse,
    }).finish();
    const response = await this._call(
      "/cash-app/payroll/finish-pinwheel-link",
      payload
    );
    return protocol.FinishPinwheelLinkResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async finishTutorial({ requestContext }) {
    const payload = protocol.FinishTutorialRequest.encode({
      requestContext: this._requestContextFromDescriptor(
        undefined,
        requestContext
      ),
    }).finish();
    const response = await this._call("/cash-app/finish-tutorial", payload);
    return protocol.FinishTutorialResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async getExchangeContract({
    sourceCurrencyCode,
    targetCurrencyCode,
    sourceCents,
    targetCents,
    customOrder,
  }) {
    const payload = protocol.GetExchangeContractRequest.encode({
      sourceCurrencyCode,
      targetCurrencyCode,
      sourceCents,
      targetCents,
      customOrder,
    }).finish();
    const response = await this._call(
      "/2.0/cash/get-exchange-contract",
      payload
    );
    return protocol.GetExchangeContractResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async getFlow({ requestContext, initiationData, flowType }) {
    const payload = protocol.GetFlowRequest.encode({
      requestContext: this._requestContextFromDescriptor(
        undefined,
        requestContext
      ),
      initiationData,
      flowType,
    }).finish();
    const response = await this._call("/2.0/cash/get-flow", payload);
    return protocol.GetFlowResponse.decode(responseToBuffer(response.data));
  }
  async getHistoricalExchangeData({
    historicalRange,
    baseCurrencyCode,
    quoteCurrencyCode,
  }) {
    const payload = protocol.GetHistoricalExchangeDataRequest.encode({
      historicalRange,
      baseCurrencyCode,
      quoteCurrencyCode,
    }).finish();
    const response = await this._call(
      "/2.0/cash/get-historical-exchange-data",
      payload
    );
    return protocol.GetHistoricalExchangeDataResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async getIssuedCard({ versionToken }) {
    const payload = protocol.GetIssuedCardRequest.encode({
      versionToken,
    }).finish();
    const response = await this._call("/2.0/cash/get-issued-card", payload);
    return protocol.GetIssuedCardResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async getLocationConfig() {
    const payload = Buffer.from([]);
    const response = await this._call("/2.0/cash/get-location-config", payload);
    return protocol.GetLocationConfigResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async getPayment({ paymentToken, requestContext }) {
    const payload = protocol.GetPaymentRequest.encode({
      paymentToken,
      requestContext,
    }).finish();
    const response = await this._call("/2.0/cash/get-payment", payload);
    return protocol.GetPaymentResponse.decode(responseToBuffer(response.data));
  }
  async getPaymentRewardStatus({ paymentTokens }) {
    const payload = protocol.GetPaymentRewardStatusRequest.encode({
      paymentTokens,
    }).finish();
    const response = await this._call(
      "/2.0/cash/get-payment-reward-status",
      payload
    );
    return protocol.GetPaymentRewardStatusResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async getScenarioPlan({ requestContext }) {
    const payload = protocol.GetScenarioPlanRequest.encode({
      requestContext: this._requestContextFromDescriptor(
        undefined,
        requestContext
      ),
    }).finish();
    const response = await this._call("/2.0/cash/get-scenario-plan", payload);
    return protocol.GetScenarioPlanResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async getWebLoginConfig() {
    const payload = Buffer.from([]);
    const response = await this._call(
      "/2.0/cash/get-web-login-config",
      payload
    );
    return protocol.GetWebLoginConfigResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async initiatePayment({
    externalId,
    paymentGetters,
    id,
    fullName,
    cashtag,
    region,
    orientation,
    profileToken,
    amount,
    currencyCode,
    note,
    passcodeToken,
    instrumentSelection,
    instrumentToken,
    requestContext,
    cancelPaymentsData,
    cashClientScenario,
    cashFlowToken,
    schedule,
    referrer,
    launchUrl,
    appCreationActivity,
    investPaymentData,
    suggestionId,
    exchangeRatesToken,
    giftCardPaymentData,
  }) {
    const payload = protocol.InitiatePaymentRequest.encode({
      externalId: externalId || v1(),
      paymentGetters: paymentGetters || [
        (id &&
          fullName &&
          cashtag &&
          typeof region !== "undefined" && {
            id,
            fullName,
            cashtag,
            region,
          }) ||
          (await this.getPaymentGetter({ cashtag })),
      ],
      orientation: (orientation && Number(orientation)) || 1,
      amount:
        typeof amount === "object"
          ? amount
          : {
              amount: {
                low: Number(amount),
                high: 0,
                unsigned: false,
              },
              currencyCode: currencyCode || 840,
            },
      note: note || "",
      passcodeToken,
      instrumentSelection:
        (orientation != 2 &&
          (instrumentSelection || {
            instrumentToken:
              instrumentToken || (await this.defaultInstrumentToken()),
          })) ||
        undefined,
      requestContext: requestContext || {
        skippedBlockers: [],
        allKnownRanges: this.allKnownRanges || [],
        profileToken: profileToken || this.profileToken,
        paymentTokens: [],
        signalsContext: {
          touchEvents: [],
          phoneCallActive: false,
        },
      },
      cancelPaymentsData,
      schedule,
      referrer,
      launchUrl,
      appCreationActivity: appCreationActivity || 0,
      investPaymentData,
      suggestionId,
      exchangeRatesToken,
      giftCardPaymentData,
    }).finish();
    const response = await this._call(
      "/2.0/cash/initiate-payment",
      payload,
      (this.constructor as any).headersFromScenario(
        cashClientScenario || "PAYMENT_FLOW",
        cashFlowToken || this.flowToken
      )
    );
    return protocol.InitiatePaymentResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async inviteContacts({ emailAddresses, requestContext }) {
    const payload = protocol.InviteContactsRequest.encode({
      emailAddresses,
      requestContext,
    }).finish();
    const response = await this._call("/2.0/cash/invite-contacts", payload);
    return protocol.InviteContactsResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async linkBankAccount({
    routingNumber,
    accountNumber,
    paymentTokens,
    transferToken,
    requestContext,
  }) {
    const payload = protocol.LinkBankAccountRequest.encode({
      routingNumber,
      accountNumber,
      paymentTokens,
      transferToken,
      requestContext,
    }).finish();
    const response = await this._call("/2.0/cash/link-bank-account", payload);
    return protocol.LinkBankAccountResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async linkCard({
    card: {
      unencryptedPan,
      expiration,
      securityCode,
      postalCode,
      lastFour,
      instrumentType: instrumentTypeCard,
    },
    paymentTokens,
    ocrContext,
    instrumentType,
    transferToken,
    requestContext,
    linkedViaNfc,
    treatment,
    cashFlowToken,
    blockerDescriptorId,
    cashClientScenario,
  }) {
    const payload = protocol.LinkCardRequest.encode({
      card: {
        unencryptedPan,
        expiration,
        securityCode,
        postalCode,
        lastFour,
        instrumentType: instrumentTypeCard,
      },
      paymentTokens,
      ocrContext,
      instrumentType,
      transferToken,
      requestContext: this._requestContextFromDescriptor(
        blockerDescriptorId || "card_blocker",
        requestContext
      ),
      linkedViaNfc,
      treatment,
    }).finish();
    const response = await this._call(
      "/2.0/cash/link-card",
      payload,
      (this.constructor as any).headersFromScenario(
        cashClientScenario || "ONBOARDING",
        cashFlowToken || this.flowToken
      )
    );
    return protocol.LinkCardResponse.decode(responseToBuffer(response.data));
  }
  async oauthResolveFlow({ requestContext, flowType, urlContents }) {
    const payload = protocol.OauthResolveFlowRequest.encode({
      requestContext: this._requestContextFromDescriptor(
        undefined,
        requestContext
      ),
      flowType,
      urlContents,
    }).finish();
    const response = await this._call("/2.0/cash/oauth-resolve-flow", payload);
    return protocol.OauthResolveFlowResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async createPlaidLinkToken({
    manualAchEnabled,
    clientScenario,
    plaidLinkingConfig,
  }) {
    const payload = protocol.PlaidLinkTokenCreateRequest.encode({
      manualAchEnabled,
      clientScenario,
      plaidLinkingConfig,
    }).finish();
    const response = await this._call(
      "/2.0/cash/plaid-link-token-create",
      payload
    );
    return protocol.PlaidLinkTokenCreateResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async refreshSession({ backupTag }) {
    const payload = protocol.RefreshSessionRequest.encode({
      backupTag,
    }).finish();
    const response = await this._call("/2.0/cash/refresh-session", payload);
    return protocol.RefreshSessionResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async refundPayment({ paymentToken, requestContext }) {
    const payload = protocol.RefundPaymentRequest.encode({
      paymentToken,
      requestContext,
    }).finish();
    const response = await this._call("/2.0/cash/refund-payment", payload);
    return protocol.RefundPaymentResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async registerAppMessageAction({ messageToken, actionIdentifier }) {
    const payload = protocol.RegisterAppMessageRequest.encode({
      messageToken,
      actionIdentifier,
    }).finish();
    const response = await this._call(
      "/2.0/cash/register-app-message-action",
      payload
    );
    return protocol.RegisterAppMessageResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async registerDevice({
    deviceToken,
    buildType,
    canReceiveUserVisibleNotifications,
  }) {
    const payload = protocol.RegisterDeviceRequest.encode({
      deviceToken,
      buildType,
      canReceiveUserVisibleNotifications,
    }).finish();
    const response = await this._call("/2.0/cash/register-device", payload);
    return protocol.RegisterDeviceResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async registerInvitations({
    hashedSmsNumbers,
    invitationTreatment,
    hashedEmailAddresses,
    invitationMessageModified,
    enhancedAliases,
  }) {
    const payload = protocol.RegisterInvitationsRequest.encode({
      hashedSmsNumbers,
      invitationTreatment,
      hashedEmailAddresses,
      invitationMessageModified,
      enhancedAliases,
    }).finish();
    const response = await this._call(
      "/2.0/cash/register-invitations",
      payload
    );
    return protocol.RegisterInvitationsResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async registerSms({
    smsNumber,
    verificationMechanism,
    scenario,
    preFilledFromPhone,
    paymentTokens,
    existingCustomerOnly,
    requestContext,
    profileToken,
    deviceLocationHeuristics,
    appCallbackToken,
    accountId,
    cashClientScenario,
    cashFlowToken,
    blockerDescriptorId,
  }) {
    const payload = protocol.RegisterSmsRequest.encode({
      smsNumber,
      verificationMechanism: verificationMechanism || 1,
      scenario,
      preFilledFromPhone: preFilledFromPhone || false,
      paymentTokens: paymentTokens || [],
      existingCustomerOnly,
      requestContext: requestContext || {
        paymentTokens: [],
        skippedBlockers: [],
        allKnownRanges: this.allKnownRanges || [],
        profileToken: profileToken || this.profileToken,
        blockerDescriptorId,
      },
      deviceLocationHeuristics:
        deviceLocationHeuristics || this._getDeviceLocationHeuristics(),
      appCallbackToken,
      accountId,
    }).finish();
    const response = await this._call(
      "/2.0/cash/register-sms",
      payload,
      (this.constructor as any).headersFromScenario(
        cashClientScenario || "ONBOARDING",
        cashFlowToken || this.flowToken
      )
    );
    return protocol.RegisterSmsResponse.decode(responseToBuffer(response.data));
  }
  async reportAbuse({ block, customerId, paymentToken, requestContext }) {
    const payload = protocol.ReportAbuseRequest.encode({
      block,
      customerId,
      paymentToken,
      requestContext,
    }).finish();
    const response = await this._call("/2.0/cash/report-abuse", payload);
    return protocol.ReportAbuseResponse.decode(responseToBuffer(response.data));
  }
  async reportDeeplink({ rawUrl, referrer }) {
    const payload = protocol.ReportDeeplinkRequest.encode({
      rawUrl,
      referrer,
    }).finish();
    const response = await this._call("/2.0/cash/report-deeplink", payload);
    return protocol.ReportDeeplinkResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async resetBadge({ conversationToken, paymentTokens, entityIds }) {
    const payload = protocol.ResetBadgeRequest.encode({
      conversationToken,
      paymentTokens,
      entityIds,
    }).finish();
    const response = await this._call("/2.0/cash/reset-badge", payload);
    return protocol.ResetBadgeResponse.decode(responseToBuffer(response.data));
  }
  async resolveMerge({ confirmMerge, requestContext }) {
    const payload = protocol.ResolveMergeRequest.encode({
      confirmMerge,
      requestContext,
    }).finish();
    const response = await this._call("/2.0/cash/resolve-merge", payload);
    return protocol.ResolveMergeResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async selectActivity({ requestContext, entityId }) {
    const payload = protocol.SelectActivityRequest.encode({
      requestContext: this._requestContextFromDescriptor(
        undefined,
        requestContext
      ),
      entityId,
    }).finish();
    const response = await this._call("/cash-app/select-activity", payload);
    return protocol.SelectActivityResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async cryptoTransferBeginOnboarding({ profileToken, cashFlowToken }) {
    return await this.selectOption({
      action: "CRYPTO_TRANSFER_BEGIN_ONBOARDING",
      profileToken: profileToken || this.profileToken,
      cashFlowToken,
      cashClientScenario: "ENABLE_CRYPTOCURRENCY_TRANSFER_OUT",
      blockerDescriptorId: "selection",
    } as any);
  }
  async selectOption({
    action,
    paymentTokens,
    transferToken,
    requestContext,
    profileToken,
    blockerDescriptorId,
    cashClientScenario,
    cashFlowToken,
  }) {
    const payload = protocol.SelectOptionRequest.encode({
      action,
      paymentTokens: paymentTokens || [],
      transferToken,
      requestContext: requestContext || {
        allKnownRanges: this.allKnownRanges || [],
        paymentTokens: paymentTokens || [],
        skippedBlockers: [],
        profileToken: profileToken || this.profileToken,
        blockerDescriptorId,
      },
    }).finish();
    const response = await this._call(
      "/2.0/cash/select-option",
      payload,
      (this.constructor as any).headersFromScenario(
        cashClientScenario,
        cashFlowToken || this.flowToken
      )
    );
    return protocol.SelectOptionResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async selectSponsors({ requestContext, sponsors }) {
    const payload = protocol.SelectSponsorsRequest.encode({
      requestContext: this._requestContextFromDescriptor(
        undefined,
        requestContext
      ),
      sponsors,
    }).finish();
    const response = await this._call("/2.0/cash/select-sponsors", payload);
    return protocol.SelectSponsorsResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async setAmount({ requestContext, amountResult, percentageResult }) {
    const payload = protocol.SetAmountRequest.encode({
      requestContext: this._requestContextFromDescriptor(
        undefined,
        requestContext
      ),
      amountResult,
      percentageResult,
    }).finish();
    const response = await this._call("/2.0/cash/set-amount", payload);
    return protocol.SetAmountResponse.decode(responseToBuffer(response.data));
  }
  async setAppMessagePreference({ requestContext, notificationsEnabled }) {
    const payload = protocol.SetAppMessagePreferenceRequest.encode({
      requestContext: this._requestContextFromDescriptor(
        undefined,
        requestContext
      ),
      notificationsEnabled,
    }).finish();
    const response = await this._call(
      "/2.0/cash/set-app-message-preference",
      payload
    );
    return protocol.SetAppMessagePreferenceResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async getInstruments() {
    const { profile } = await this.getProfile();
    return profile.instruments;
  }
  async defaultInstrumentToken() {
    const instruments = await this.getInstruments();
    return instruments.find(
      ({ cashInstrumentType, availableBalance: { currencyCode } }) =>
        currencyCode === 840 && cashInstrumentType === 4
    ).token;
  }
  async setCardCustomization({
    imageBytes,
    mimeType,
    touchData,
    requestContext,
    cardThemeToken,
    profileToken,
    includeCashtag,
    customizationArea,
    cashFlowToken,
    cashClientScenario,
  }) {
    const payload = protocol.SetCardCustomizationRequest.encode({
      imageBytes:
        (imageBytes &&
          (Buffer.isBuffer(imageBytes)
            ? imageBytes
            : Buffer.from(imageBytes, "base64"))) ||
        defaultCardBytes,
      mimeType: mimeType || "image/png",
      touchData: touchData || {
        strokes: [],
        stamps: [],
        width: 0,
        height: 0,
      },
      requestContext: requestContext || {
        allKnownRanges: this.allKnownRanges || [],
        skippedBlockers: [],
        paymentTokens: [],
        profileToken: profileToken || this.profileToken,
        blockerDescriptorId: "card_customization",
      },
      cardThemeToken: cardThemeToken || "CT_8S9mol",
      includeCashtag: true,
      customizationArea: 1,
    }).finish();
    const response = await this._call(
      "/2.0/cash/set-card-customization",
      payload,
      (this.constructor as any).headersFromScenario(
        cashClientScenario || "REQUEST_PHYSICAL_CARD",
        cashFlowToken || this.flowToken
      )
    );
    return protocol.SetCardCustomizationResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async setCashtagUrlEnabled({ requestContext, enabled }) {
    const payload = protocol.SetCashtagUrlEnabledRequest.encode({
      requestContext: this._requestContextFromDescriptor(
        undefined,
        requestContext
      ),
      enabled,
    }).finish();
    const response = await this._call(
      "/2.0/cash/set-cashtag-url-enabled",
      payload
    );
    return protocol.SetCashtagUrlEnabledResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async setCountry({ requestContext, countryCode }) {
    const payload = protocol.SetCountryRequest.encode({
      requestContext: this._requestContextFromDescriptor(
        undefined,
        requestContext
      ),
      countryCode,
    }).finish();
    const response = await this._call("/2.0/cash/set-country", payload);
    return protocol.SetCountryResponse.decode(responseToBuffer(response.data));
  }
  async setIncomingRequestPolicy({ requestContext, incomingRequestPolicy }) {
    const payload = protocol.SetIncomingRequestPolicyRequest.encode({
      requestContext: this._requestContextFromDescriptor(
        undefined,
        requestContext
      ),
      incomingRequestPolicy,
    }).finish();
    const response = await this._call(
      "/2.0/cash/set-incoming-request-policy",
      payload
    );
    return protocol.SetIncomingRequestPolicyResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async setOnboardingContext({ onboardingPayload }) {
    const payload = protocol.SetOnboardingContextRequest.encode({
      onboardingPayload,
    }).finish();
    const response = await this._call(
      "/2.0/cash/set-onboarding-context",
      payload
    );
    return protocol.SetOnboardingContextResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async setProfilePhoto({ imageBytes, mimeType, imageData }) {
    const payload = protocol.SetProfilePhotoRequest.encode({
      imageBytes,
      mimeType,
      imageData,
    }).finish();
    const response = await this._call("/2.0/cash/set-profile-photo", payload);
    return protocol.SetProfilePhotoResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async setRatePlan({
    ratePlan,
    commit,
    paymentTokens,
    intendedUsage,
    requestContext,
  }) {
    const payload = protocol.SetRatePlanRequest.encode({
      ratePlan,
      commit,
      paymentTokens,
      intendedUsage,
      requestContext,
    }).finish();
    const response = await this._call("/2.0/cash/set-rate-plan", payload);
    return protocol.SetRatePlanResponse.decode(responseToBuffer(response.data));
  }
  async setRequirePasscodeConfirmation({
    requirePasscodeConfirmation,
    passcode,
    passcodeToken,
    requestContext,
  }) {
    const payload = protocol.SetRequirePasscodeConfirmationRequest.encode({
      requirePasscodeConfirmation,
      passcode,
      passcodeToken,
      requestContext,
    }).finish();
    const response = await this._call(
      "/2.0/cash/set-require-passcode-confirmation",
      payload
    );
    return protocol.SetRequirePasscodeConfirmationResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async setScheduledTransactionPreference({
    amount,
    enabled,
    recurringSchedule,
    type,
    nextReloadAt,
    investmentEntityToken,
  }) {
    const payload = protocol.SetScheduledTransactionPreferenceRequest.encode({
      amount,
      enabled,
      recurringSchedule,
      type,
      nextReloadAt,
      investmentEntityToken,
    }).finish();
    const response = await this._call(
      "/2.0/cash/set-scheduled-transaction-preference",
      payload
    );
    return protocol.SetScheduledTransactionPreferenceResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async setSignature({ requestContext, imageBytes, mimeType }) {
    const payload = protocol.SetSignatureRequest.encode({
      requestContext: this._requestContextFromDescriptor(
        undefined,
        requestContext
      ),
      imageBytes,
      mimeType,
    }).finish();
    const response = await this._call("/2.0/cash/set-signature", payload);
    return protocol.SetSignatureResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async submitFileset({ requestContext, actionId, fileTokens }) {
    const payload = protocol.SubmitFilesetRequest.encode({
      requestContext: this._requestContextFromDescriptor(
        undefined,
        requestContext
      ),
      actionId,
      fileTokens,
    }).finish();
    const response = await this._call("/2.0/cash/submit-fileset", payload);
    return protocol.SubmitFilesetResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async submitPayrollProviderSelection({
    requestContext,
    query,
    selectedPayrollProvider,
    selectedFallbackResult,
  }) {
    const payload = protocol.SubmitPayrollProviderSelectionRequest.encode({
      requestContext: this._requestContextFromDescriptor(
        undefined,
        requestContext
      ),
      query,
      selectedPayrollProvider,
      selectedFallbackResult,
    }).finish();
    const response = await this._call(
      "/cash-app/payroll/submit-payroll-provider-selection",
      payload
    );
    return protocol.SubmitPayrollProviderSelectionResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async syncContacts({ syncToken, addHashedAliases, removeHashedAliases }) {
    const payload = protocol.SyncContactsRequest.encode({
      syncToken,
      addHashedAliases,
      removeHashedAliases,
    }).finish();
    const response = await this._call(
      "/cash-app/contacts/sync-contacts",
      payload
    );
    return protocol.SyncContactsResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async unlinkBusiness({ requestContext, grantId }) {
    const payload = protocol.UnlinkBusinessRequest.encode({
      requestContext: this._requestContextFromDescriptor(
        undefined,
        requestContext
      ),
      grantId,
    }).finish();
    const response = await this._call(
      "/cash-app/business-grant/unlink",
      payload
    );
    return protocol.UnlinkBusinessResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async unlockReward({ rewardToken, requestContext }) {
    const payload = protocol.UnlockRewardRequest.encode({
      requestContext: this._requestContextFromDescriptor(
        undefined,
        requestContext
      ),
      rewardToken,
    }).finish();
    const response = await this._call("/2.0/cash/unlock-reward", payload);
    return protocol.UnlockRewardResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async unregisterAlias({
    profileToken,
    cashClientScenario,
    cashFlowToken,
    canonicalText,
    type,
    alias,
    requestContext,
  }) {
    const payload = protocol.UnregisterAliasRequest.encode({
      alias: alias || {
        canonicalText,
        type: type || 1,
      },
      requestContext: requestContext || {
        allKnownRanges: this.allKnownRanges || [],
        profileToken: profileToken || this.profileToken,
        skippedBlockers: [],
        paymentTokens: [],
      },
    }).finish();
    const response = await this._call(
      "/2.0/cash/unregister-alias",
      payload,
      (this.constructor as any).headersFromScenario(
        cashClientScenario || "PROFILE",
        cashFlowToken || this.flowToken
      )
    );
    return protocol.UnregisterAliasResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async setIncomeSource({
    profileToken,
    cashFlowToken,
    optionId,
    cashClientScenario,
  }) {
    return await this.submitForm({
      profileToken: profileToken || this.profileToken,
      cashFlowToken,
      actionId: "SET_INCOME_SOURCE",
      results: [
        {
          id: "INCOME_SOURCE_OPTION_PICKER_ID",
          optionPickerResult: {
            optionId: optionId || "OCCUPATION",
          },
        },
      ],
      blockerDescriptorId: "INCOME_SOURCE_BLOCKER_DESCRIPTOR_ID",
      cashClientScenario:
        cashClientScenario || "ENABLE_CRYPTOCURRENCY_TRANSFER_OUT",
    } as any);
  }
  async setCryptoUseReason({
    profileToken,
    cashFlowToken,
    optionId,
    cashClientScenario,
  }) {
    return await this.submitForm({
      profileToken: profileToken || this.profileToken,
      cashFlowToken,
      actionId: "SET_CRYPTO_USE_REASON",
      results: [
        {
          id: "CRYPTO_USE_REASON_OPTION_PICKER_ID",
          optionPickerResult: {
            optionId: optionId || "TRANSFERS",
          },
        },
      ],
      blockerDescriptorId: "CRYPTO_USE_BLOCKER_DESCRIPTOR_ID",
      cashClientScenario:
        cashClientScenario || "ENABLE_CRYPTOCURRENCY_TRANSFER_OUT",
    } as any);
  }
  async setEmploymentStatus({
    profileToken,
    cashFlowToken,
    optionId,
    cashClientScenario,
  }) {
    return await this.submitForm({
      profileToken: profileToken || this.profileToken,
      cashFlowToken,
      actionId: "SET_EMPLOYMENT_STATUS",
      results: [
        {
          id: "EMPLOYMENT_STATUS_OPTION_PICKER_ID",
          optionPickerResult: {
            optionId: optionId || "SELF_EMPLOYED",
          },
        },
      ],
      blockerDescriptorId: "EMPLOYMENT_STATUS_BLOCKER_DESCRIPTOR_ID",
      cashClientScenario:
        cashClientScenario || "ENABLE_CRYPTOCURRENCY_TRANSFER_OUT",
    } as any);
  }
  async setJobTitle({
    profileToken,
    cashFlowToken,
    title,
    cashClientScenario,
  }) {
    return await this.submitForm({
      profileToken: profileToken || this.profileToken,
      cashFlowToken,
      actionId: "SET_JOB_TITLE",
      results: [
        {
          id: "JOB_TITLE_ELEMENT",
          textInputResult: {
            inputFieldValues: [title],
          },
        },
      ],
      blockerDescriptorId: "JOB_TITLE_BLOCKER_DESCRIPTOR_ID",
      cashClientScenario:
        cashClientScenario || "ENABLE_CRYPTOCURRENCY_TRANSFER_OUT",
    } as any);
  }
  async setEmployer({
    profileToken,
    cashFlowToken,
    employer,
    cashClientScenario,
  }) {
    return await this.submitForm({
      profileToken: profileToken || this.profileToken,
      actionId: "SET_EMPLOYER",
      results: [
        {
          id: "EMPLOYER_ELEMENT",
          textInputResult: {
            inputFieldValues: [employer],
          },
        },
      ],
      blockerDescriptorId: "EMPLOYER_BLOCKER_DESCRIPTOR_ID",
      cashFlowToken,
      cashClientScenario:
        cashClientScenario || "ENABLE_CRYPTOCURRENCY_TRANSFER_OUT",
    } as any);
  }
  async uploadFile({
    fileData,
    fileBytes,
    mimeType,
    category,
    paymentTokens,
    transferToken,
    blockerDescriptorId,
    requestContext,
    profileToken,
    cashFlowToken,
    cashClientScenario,
  }) {
    const payload = protocol.UploadFileRequest.encode({
      fileData,
      fileBytes,
      mimeType: mimeType || "image/jpeg",
      category: category || 1,
      paymentTokens: paymentTokens || [],
      transferToken,
      requestContext: requestContext || {
        allKnownRanges: this.allKnownRanges || [],
        paymentTokens: [],
        profileToken: profileToken || this.profileToken,
        skippedBlockers: [],
        blockerDescriptorId: blockerDescriptorId || "file",
      },
    }).finish();
    const response = await this._call(
      "/2.0/cash/upload-file",
      payload,
      (this.constructor as any).headersFromScenario(
        cashClientScenario || "ENABLE_CRYPTOCURRENCY_TRANSFER_OUT",
        cashFlowToken || this.flowToken
      )
    );
    return protocol.UploadFileResponse.decode(responseToBuffer(response.data));
  }
  async verifyContacts({ requestContext, hashedAliases }) {
    const payload = protocol.VerifyContactsRequest.encode({
      requestContext: this._requestContextFromDescriptor(
        undefined,
        requestContext
      ),
      hashedAliases,
    }).finish();
    const response = await this._call("/2.0/cash/verify-contacts", payload);
    return protocol.VerifyContactsResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async orderCard({
    addressLine1,
    addressLine2,
    locality,
    administrativeDistrictLevel1,
    postalCode,
    passcode,
    firstName,
    lastName,
    month,
    day,
    year,
    birthdate,
    ssnLastFour,
  }) {
    if (birthdate) {
      [month, day, year] = birthdate.split("/");
    }
    logger.info("order-card");
    logger.info({
      addressLine1,
      addressLine2,
      locality,
      administrativeDistrictLevel1,
      postalCode,
      firstName,
      lastName,
      month,
      day,
      year,
      ssnLastFour,
    });
    await this.verifyDevice({} as any);
    logger.info("device verified");
    const cashFlowToken = (this.constructor as any).randomCashFlowToken();
    logger.info("Cash-Flow-Token: " + cashFlowToken);
    await this.setCardCustomization({
      cashFlowToken,
    } as any);
    logger.info("using default card theme");
    await this.submitMailingAddressWithCardCustomization({
      cashFlowToken,
      addressLine1,
      addressLine2,
      locality,
      administrativeDistrictLevel1,
      postalCode,
    } as any);
    logger.info("submitted mailing address");
    let response = await this.useUnverified({
      cashFlowToken,
    } as any);
    logger.info("using unverified USPS address");
    let blockerDescriptorId =
      response.responseContext.scenarioPlan.blockerDescriptors[0].id;
    if (blockerDescriptorId === "name")
      response = await this.setFullName({
        cashFlowToken,
        fullName: firstName + " " + lastName,
      } as any);
    else if (blockerDescriptorId === "provide_legal_name")
      response = await this.provideLegalName({
        cashFlowToken,
        firstName,
        lastName,
      } as any);
    logger.info("legal name " + firstName + " " + lastName + " provided");
    blockerDescriptorId =
      response.responseContext.scenarioPlan.blockerDescriptors[0].id;
    if (blockerDescriptorId === "provide_birthdate") {
      response = await this.provideBirthdate({
        cashFlowToken,
        day: typeof day === "string" ? fromPostalCode(day) : day,
        month: typeof month === "string" ? fromPostalCode(month) : month,
        year,
      } as any);
      logger.info("provided birthdate ", month + "/" + day + "/" + year);
      blockerDescriptorId =
        response.responseContext.scenarioPlan.blockerDescriptors[0].id;
    }
    if (blockerDescriptorId === "provide_ssn") {
      response = await this.provideSsn({
        ssnLastFour,
        cashFlowToken,
      } as any);
      logger.info("provided last 4 SSN");
    }
    response = await this.confirmDisclosure({
      cashFlowToken,
    } as any);
    logger.info("confirmed disclosure");
    blockerDescriptorId =
      response.responseContext.scenarioPlan.blockerDescriptors[0].id;
    if (blockerDescriptorId === "passcode_verification") {
      await this.verifyPasscode({
        cashFlowToken,
        cashClientScenario: "REQUEST_PHYSICAL_CARD",
        passcode,
      } as any);
    }
    response = await this.confirmDisclosure({
      cashFlowToken,
    } as any);
    logger.info(
      await this.completeScenario({
        cashFlowToken,
      } as any)
    );
    logger.info("done!");
  }
  async verifyDevice({
    challengeToken,
    playServicesStatusCode,
    safetyNetAttestation,
    appAttestation,
    cashFlowToken,
    cashClientScenario,
  }) {
    const payload = protocol.VerifyDeviceRequest.encode({
      challengeToken: challengeToken || this.safetyNetNonce,
      playServicesStatusCode,
      safetyNetAttestation: safetyNetAttestation || [
        {
          playServiceStatusCode: 0,
          status: 1,
        },
      ],
      appAttestation,
    }).finish();
    const response = await this._call(
      "/2.0/cash/verify-device",
      payload,
      (this.constructor as any).headersFromScenario(
        cashClientScenario || "CRYPTO_TRANSFER_BEGIN_ONBOARDING",
        cashFlowToken || this.flowToken
      )
    );
    return protocol.RegisterDeviceResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async verifyGovernmentId({
    paymentTokens,
    transferTokens,
    frontImageBytes,
    backImageBytes,
    mimeType,
    pdf417Text,
    requestContext,
    frontManuallyCaptured,
    backManuallyCaptured,
    treatment,
    profileToken,
    blockerDescriptorId,
    cashClientScenario,
    cashFlowToken,
  }) {
    const payload = protocol.VerifyGovernmentIdRequest.encode({
      paymentTokens: paymentTokens || [],
      transferTokens,
      frontImageBytes,
      backImageBytes,
      mimeType: mimeType || "image/jpeg",
      pdf_417Text: Buffer.isBuffer(pdf417Text)
        ? pdf417Text.toString("utf8")
        : pdf417Text,
      requestContext: requestContext || {
        skippedBlockers: [],
        paymentTokens: [],
        allKnownRanges: [Buffer.from("12080a06332e37342e30")],
        blockerDescriptorId: blockerDescriptorId || "government_id",
        profileToken: profileToken || this.profileToken,
      },
      frontManuallyCaptured: frontManuallyCaptured || false,
      backManuallyCaptured: backManuallyCaptured || false,
      treatment: treatment || "control",
    }).finish();
    const response = await this._call(
      "/2.0/cash/verify-government-id",
      payload,
      (this.constructor as any).headersFromScenario(
        cashClientScenario || "ENABLE_CRYPTOCURRENCY_TRANSFER_OUT",
        cashFlowToken || this.flowToken
      )
    );
    return protocol.VerifyGovernmentIdResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async verifyIdentity({
    name,
    birthDate,
    ssnLastFour,
    paymentTokens,
    transferToken,
    ssn,
    requestContext,
    address,
    profileToken,
    blockerDescriptorId,
    cashFlowToken,
    cashClientScenario,
  }) {
    const payload = protocol.VerifyIdentityRequest.encode({
      name,
      birthDate,
      ssnLastFour: ssnLastFour && fromPostalCode(ssnLastFour),
      paymentTokens: paymentTokens || [],
      transferToken,
      ssn: ssn && fromPostalCode(ssn),
      requestContext: requestContext || {
        skippedBlockers: [],
        paymentTokens: [],
        allKnownRanges: this.allKnownRanges || [],
        profileToken: profileToken || this.profileToken,
        blockerDescriptorId: blockerDescriptorId || "identity_verification",
      },
      address,
    }).finish();
    const response = await this._call(
      "/2.0/cash/verify-identity",
      payload,
      (this.constructor as any).headersFromScenario(
        cashClientScenario || "ENABLE_CRYPTOCURRENCY_TRANSFER_OUT",
        cashFlowToken || this.flowToken
      )
    );
    return protocol.VerifyIdentityResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async verifyInstrument({
    unencryptedPan,
    routingNumber,
    accountNumber,
    requestContext,
  }) {
    const payload = protocol.VerifyInstrumentRequest.encode({
      unencryptedPan,
      routingNumber,
      accountNumber,
      requestContext,
    }).finish();
    const response = await this._call("/2.0/cash/verify-instrument", payload);
    return protocol.VerifyInstrumentResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async verifyMagicLink({
    requestContext,
    verificationToken,
    customerRequestedDenyAttempt,
    cashFlowToken,
    cashClientScenario,
  }) {
    const payload = protocol.VerifyMagicLinkRequest.encode({
      requestContext: requestContext || {
        skippedBlockers: [],
        paymentTokens: [],
        allKnownRanges: this.allKnownRanges || [],
      },
      verificationToken,
      customerRequestedDenyAttempt,
    }).finish();
    const response = await this._call(
      "/2.0/cash/verify-magic-link",
      payload,
      (this.constructor as any).headersFromScenario(
        cashClientScenario || "ONBOARDING",
        cashFlowToken || this.flowToken
      )
    );
    return protocol.VerifyMagicLinkResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async verifyPasscodeAndExpiration({
    requestContext,
    passcode,
    blockerDescriptorId,
    expirationDate,
    profileToken,
    cashClientScenario,
    cashFlowToken,
  }) {
    const payload = protocol.VerifyPasscodeAndExpirationRequest.encode({
      requestContext: requestContext || {
        profileToken: profileToken || this.profileToken,
        allKnownRanges: this.allKnownRanges || [],
        paymentTokens: [],
        skippedBlockers: [],
        blockerDescriptorId:
          blockerDescriptorId || "card_passcode_and_expiration",
      },
      passcode,
      expirationDate,
    }).finish();
    const response = await this._call(
      "/2.0/cash/verify-passcode-and-expiration",
      payload,
      (this.constructor as any).headersFromScenario(
        cashClientScenario || "ACTIVATE_PHYSICAL_CARD",
        cashFlowToken || this.flowToken
      )
    );
    return protocol.VerifyPasscodeAndExpirationResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async verifyPasscode({
    requestContext,
    passcode,
    passcodeToken,
    cashFlowToken,
    blockerDescriptorId,
    cashClientScenario,
  }) {
    const payload = protocol.VerifyPasscodeRequest.encode({
      requestContext: requestContext || {
        paymentTokens: [],
        allKnownRanges: this.allKnownRanges || [],
        skippedBlockers: [],
        blockerDescriptorId: blockerDescriptorId || "passcode_verification",
      },
      passcode: fromPostalCode(String(passcode)),
      passcodeToken,
    }).finish();
    const response = await this._call(
      "/2.0/cash/verify-passcode",
      payload,
      (this.constructor as any).headersFromScenario(
        cashClientScenario || "ONBOARDING",
        cashFlowToken || this.flowToken
      )
    );
    return protocol.VerifyPasscodeResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async verifyQrCode({
    cashFlowToken,
    cashClientScenario,
    qrCodeData,
    profileToken,
    requestContext,
    missingQrCodeToLocateCvv,
  }) {
    const payload = protocol.VerifyQrCodeRequest.encode({
      qrCodeData,
      requestContext: requestContext || {
        profileToken: profileToken || this.profileToken,
        paymentTokens: [],
        allKnownRanges: this.allKnownRanges || [],
        skippedBlockers: [],
      },
      missingQrCodeToLocateCvv: missingQrCodeToLocateCvv || 0,
    }).finish();
    const response = await this._call(
      "/2.0/cash/verify-qr-code",
      payload,
      (this.constructor as any).headersFromScenario(
        cashClientScenario || "ACTIVATE_PHYSICAL_CARD",
        cashFlowToken || this.flowToken
      )
    );
    return protocol.VerifyQrCodeResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async verifySms({
    smsNumber,
    smsVerificationCode,
    paymentTokens,
    requestContext,
    accountId,
    profileToken,
    blockerDescriptorId,
    cashClientScenario,
    cashFlowToken,
    clientSecurityContext,
  }) {
    const payload = protocol.VerifySmsRequest.encode({
      smsNumber,
      smsVerificationCode,
      paymentTokens: paymentTokens || [],
      requestContext: requestContext || {
        skippedBlockers: [],
        paymentTokens: [],
        allKnownRanges: this.allKnownRanges || [],
        profileToken: profileToken || this.profileToken,
        blockerDescriptorId: blockerDescriptorId || "phone_verification",
      },
      accountId,
      clientSecurityContext,
    }).finish();
    const response = await this._call(
      "/2.0/cash/verify-sms",
      payload,
      (this.constructor as any).headersFromScenario(
        cashClientScenario || "ONBOARDING",
        cashFlowToken || this.flowToken
      )
    );
    return protocol.VerifySmsResponse.decode(responseToBuffer(response.data));
  }
  async initiatePasscodeReset({ requestContext }) {
    const payload = protocol.InitiatePasscodeResetRequest.encode({
      requestContext: this._requestContextFromDescriptor(
        undefined,
        requestContext
      ),
    }).finish();
    const response = await this._call(
      "/2.0/cash/initiate-passcode-reset",
      payload
    );
    return protocol.InitiatePasscodeResetResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async setPasscode({
    newPasscode,
    oldPasscode,
    oldPasscodeToken,
    oldInstrumentToken,
    paymentTokens,
    transferToken,
    requestContext,
  }) {
    const payload = protocol.SetPasscodeRequest.encode({
      newPasscode,
      oldPasscode,
      oldPasscodeToken,
      oldInstrumentToken,
      paymentTokens,
      transferToken,
      requestContext,
    }).finish();
    const response = await this._call("/2.0/cash/set-passcode", payload);
    return protocol.SetPasscodeResponse.decode(responseToBuffer(response.data));
  }
  async transferFunds({
    externalId,
    source,
    target,
    amount,
    passcode,
    passcodeToken,
    depositPreference,
    acceptedFeeAmount,
    requestContext,
    pullCurrency,
    pushCurrency,
    contractToken,
  }) {
    const payload = protocol.TransferFundsRequest.encode({
      externalId,
      source,
      target,
      amount,
      passcode,
      passcodeToken,
      depositPreference,
      acceptedFeeAmount,
      requestContext,
      pullCurrency,
      pushCurrency,
      contractToken,
    }).finish();
    const response = await this._call("/2.0/cash/transfer-funds", payload);
    return protocol.TransferFundsResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async unlinkInstrument({ instrumentToken, requestContext }) {
    const payload = protocol.UnlinkInstrumentRequest.encode({
      instrumentToken,
      requestContext,
    }).finish();
    const response = await this._call("/2.0/cash/unlink-instrument", payload);
    return protocol.UnlinkInstrumentResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async getInvestmentStatements({ type, before }) {
    const payload = protocol.GetInvestmentStatementsRequest.encode({
      type,
      before,
    }).finish();
    const response = await this._call(
      "/2.0/cash/investing/get-investment-statements",
      payload
    );
    return protocol.GetInvestmentStatementsResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async initiateInvestmentOrder({
    requestContext,
    investmentEntityToken,
    instrumentToken,
    idempotenceToken,
    units,
    amount,
    orderType,
    side,
    recurringSchedule,
    customOrder,
    investmentIncentiveToken,
  }) {
    const payload = protocol.InitiateInvestmentOrderRequest.encode({
      requestContext: this._requestContextFromDescriptor(
        undefined,
        requestContext
      ),
      investmentEntityToken,
      instrumentToken,
      idempotenceToken,
      units,
      amount,
      orderType,
      side,
      recurringSchedule,
      customOrder,
      investmentIncentiveToken,
    }).finish();
    const response = await this._call(
      "/2.0/cash/investing/initiate-investment-order",
      payload
    );
    return protocol.InitiateInvestmentOrderResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async updateInvestmentHolding({
    requestContext,
    investmentEntityToken,
    action,
  }) {
    const payload = protocol.UpdateInvestmentHoldingRequest.encode({
      requestContext: this._requestContextFromDescriptor(
        undefined,
        requestContext
      ),
      investmentEntityToken,
      action,
    }).finish();
    const response = await this._call(
      "/2.0/cash/investing/update-investment-holding",
      payload
    );
    return protocol.UpdateInvestmentHoldingResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async checkCreditLimit({ requestContext }) {
    const payload = protocol.CheckCreditLimitRequest.encode({
      requestContext: this._requestContextFromDescriptor(
        undefined,
        requestContext
      ),
    }).finish();
    const response = await this._call(
      "/cash-app/lending/check-credit-limit",
      payload
    );
    return protocol.CheckCreditLimitResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async clearCreditLineAlert({ requestContext }) {
    const payload = protocol.ClearCreditLineAlertRequest.encode({
      requestContext: this._requestContextFromDescriptor(
        undefined,
        requestContext
      ),
    }).finish();
    const response = await this._call(
      "/2.0/cash/lending/clear-credit-line-alert",
      payload
    );
    return protocol.ClearCreditLineAlertResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async clearCreditLineBadge({ requestContext }) {
    const payload = protocol.ClearCreditLineBadgeRequest.encode({
      requestContext: this._requestContextFromDescriptor(
        undefined,
        requestContext
      ),
    }).finish();
    const response = await this._call(
      "/2.0/cash/lending/clear-credit-line-badge",
      payload
    );
    return protocol.ClearCreditLineBadgeResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async clearInstrumentBadge({ requestContext }) {
    const payload = protocol.ClearInstrumentBadgeRequest.encode({
      requestContext: this._requestContextFromDescriptor(
        undefined,
        requestContext
      ),
    }).finish();
    const response = await this._call(
      "/cash-app/lending/clear-instrument-badge",
      payload
    );
    return protocol.ClearInstrumentBadgeResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async getLendingConfig() {
    const payload = Buffer.from([]);
    const response = await this._call(
      "/2.0/cash/lending/get-lending-config",
      payload
    );
    return protocol.GetLendingConfigResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async initiateLoanPayment({
    requestContext,
    loanToken,
    idempotenceToken,
    paymentAmount,
    lastKnownBalance,
    loanTransactionToken,
    opaqueData,
  }) {
    const payload = protocol.InitiateLoanPaymentRequest.encode({
      requestContext: this._requestContextFromDescriptor(
        undefined,
        requestContext
      ),
      loanToken,
      idempotenceToken,
      paymentAmount,
      lastKnownBalance,
      loanTransactionToken,
      opaqueData,
    }).finish();
    const response = await this._call(
      "/2.0/cash/lending/initiate-loan-payment",
      payload
    );
    return protocol.InitiateLoanPaymentResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async initiateLoan({
    requestContext,
    creditLineToken,
    idempotenceToken,
    amount,
  }) {
    const payload = protocol.InitiateLoanRequest.encode({
      requestContext: this._requestContextFromDescriptor(
        undefined,
        requestContext
      ),
      idempotenceToken,
      amount,
      creditLineToken,
    }).finish();
    const response = await this._call(
      "/2.0/cash/lending/initiate-loan",
      payload
    );
    return protocol.InitiateLoanResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async lendingConfigRoutingResolved({ requestContext }) {
    const payload = protocol.LendingConfigRoutingResolvedRequest.encode({
      requestContext: this._requestContextFromDescriptor(
        undefined,
        requestContext
      ),
    }).finish();
    const response = await this._call(
      "/cash-app/lending/lending-config-routing-resolved",
      payload
    );
    return protocol.LendingConfigRoutingResolvedResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async skipLoanPayment({ requestContext, loanTransactionToken }) {
    const payload = protocol.SkipLoanPaymentRequest.encode({
      requestContext: this._requestContextFromDescriptor(
        undefined,
        requestContext
      ),
      loanTransactionToken,
    }).finish();
    const response = await this._call(
      "/2.0/cash/lending/skip-loan-payment",
      payload
    );
    return protocol.SkipLoanPaymentResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async resolvePersonaDidvBlocker({
    requestContext,
    inquiryResponse,
    inquiryId,
    status,
    sessionToken,
    debugMessage,
  }) {
    const payload = protocol.ResolvePersonaDidvBlockerRequest.encode({
      requestContext: this._requestContextFromDescriptor(
        undefined,
        requestContext
      ),
      inquiryResponse,
      inquiryId,
      status,
      sessionToken,
      debugMessage,
    }).finish();
    const response = await this._call(
      "/2.0/cash/resolve-persona-didv-blocker",
      payload
    );
    return protocol.ResolvePersonaDidvBlockerResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async handleThreeDomainSecureRedirect({
    requestContext,
    redirectUrl,
    transactionType,
    transactionId,
    securityCode,
  }) {
    const payload = protocol.HandleThreeDomainSecureRedirectRequest.encode({
      requestContext: this._requestContextFromDescriptor(
        undefined,
        requestContext
      ),
      redirectUrl,
      transactionType,
      transactionId,
      securityCode,
    }).finish();
    const response = await this._call(
      "/2.0/cash/handle-three-domain-secure-redirect",
      payload
    );
    return protocol.HandleThreeDomainSecureRedirectResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async handleThreeDomainSecureV2Action({
    requestContext,
    actionDetails,
    transactionType,
    transactionId,
    success,
    error,
  }) {
    const payload = protocol.HandleThreeDomainSecureV2ActionRequest.encode({
      requestContext: this._requestContextFromDescriptor(
        undefined,
        requestContext
      ),
      actionDetails,
      transactionType,
      transactionId,
      success,
      error,
    }).finish();
    const response = await this._call(
      "/2.0/cash/handle-three-domain-secure-v2-action",
      payload
    );
    return protocol.HandleThreeDomainSecureV2ActionResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async advanceSupportFlow({ currentNodeToken, selectedNodeToken }) {
    const payload = protocol.AdvanceSupportFlowRequest.encode({
      currentNodeToken,
      selectedNodeToken,
    }).finish();
    const response = await this._call(
      "/2.0/cash/advance-support-flow",
      payload
    );
    return protocol.AdvanceSupportFlowResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async createSupportCase({
    currentNodeToken,
    entityId,
    contactType,
    emailAddress,
    phoneNumber,
    message,
    termsAccepted,
  }) {
    const payload = protocol.CreateSupportCaseRequest.encode({
      currentNodeToken,
      entityId,
      contactType,
      emailAddress,
      phoneNumber,
      message,
      termsAccepted,
    }).finish();
    const response = await this._call("/2.0/cash/create-support-case", payload);
    return protocol.CreateSupportCaseResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async getSupportContactStatus({ currentNodeToken }) {
    const payload = protocol.GetSupportContactStatusRequest.encode({
      currentNodeToken,
    }).finish();
    const response = await this._call(
      "/2.0/cash/get-support-contact-status",
      payload
    );
    return protocol.GetSupportContactStatusResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async startSupportFlow({ nodeToken, entityId }) {
    const payload = protocol.StartSupportFlowRequest.encode({
      nodeToken,
      entityId,
    }).finish();
    const response = await this._call("/2.0/cash/start-support-flow", payload);
    return protocol.StartSupportFlowResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async initiateSession() {
    const response = await this._call(
      "/2.0/cash/initiate-session",
      protocol.InitiateSessionRequest.encode({
        clientSecurityContext: this._getClientSecurityContext(),
      }).finish()
    );
    const result = protocol.InitiateSessionResponse.decode(
      responseToBuffer(response.data)
    );
    this.authorization = "App " + result.appToken + "-" + result.sessionToken;
    this.safetyNetNonce = result.safetyNetNonce;
    return result;
  }
  _getLocale() {
    const [language, country] = (this.constructor as any).LOCALE.split("_");
    return {
      country,
      language,
    };
  }
  _getDeviceLocationHeuristics() {
    const locale = this._getLocale();
    return {
      installedKeyboards: [],
      language: locale.language,
      countryCode: locale.country,
      carrierCountryCode: locale.country,
      carrierName: "",
      timeZone: this.timezone,
    };
  }
  async registerEmail({
    emailAddress,
    paymentTokens,
    deviceLocationHeuristics,
    requestContext,
    cashClientScenario,
    cashFlowToken,
  }) {
    const locale = this._getLocale();
    const payload = protocol.RegisterEmailRequest.encode({
      paymentTokens: paymentTokens || [],
      emailAddress,
      deviceLocationHeuristics:
        deviceLocationHeuristics || this._getDeviceLocationHeuristics(),
      requestContext: {
        skippedBlockers: [],
        paymentTokens: [],
        allKnownRanges: this.allKnownRanges || [],
      },
    }).finish();
    return protocol.RegisterEmailResponse.decode(
      responseToBuffer(
        (
          await this._call(
            "/2.0/cash/register-email",
            payload,
            (this.constructor as any).headersFromScenario(
              cashClientScenario || "ONBOARDING",
              cashFlowToken || this.flowToken
            )
          )
        ).data
      )
    );
  }
  static randomCashFlowToken() {
    return randomBytes.sync(18).toString("base64");
  }
  async verifyEmail({
    requestContext,
    emailAddress,
    verificationCode,
    cashClientScenario,
    cashFlowToken,
    blockerDescriptorId,
  }) {
    const payload = protocol.VerifyEmailRequest.encode({
      requestContext: this._requestContextFromDescriptor(
        blockerDescriptorId || "email_verification",
        requestContext
      ),
      emailAddress,
      verificationCode,
    }).finish();
    const response = await this._call(
      "/2.0/cash/verify-email",
      payload,
      (this.constructor as any).headersFromScenario(
        cashClientScenario || "ONBOARDING",
        cashFlowToken || this.flowToken
      )
    );
    return protocol.VerifyEmailResponse.decode(responseToBuffer(response.data));
  }
  async getAppConfig() {
    const payload = Buffer.from([]);
    const response = await this._call("/2.0/cash/get-app-config", payload);
    return protocol.GetAppConfigResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async getFeatureFlags() {
    const payload = Buffer.from([]);
    const response = await this._call("/2.0/cash/get-feature-flags", payload);
    return protocol.GetFeatureFlagsResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async getAppMessages() {
    const payload = Buffer.from([]);
    const response = await this._call(
      "/cash-app/app-messages/get-app-messages",
      payload
    );
    return protocol.GetAppMessagesResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async getConfiguration() {
    const payload = Buffer.from([]);
    const response = await this._call(
      "/cash-app/configuration/get-configuration",
      payload
    );
    return protocol.GetConfigurationResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async getProfile() {
    const payload = Buffer.from([]);
    const response = await this._call("/2.0/cash/get-profile", payload);
    const decoded = protocol.GetProfileResponse.decode(
      responseToBuffer(response.data)
    );
    this.profileToken = decoded.profileToken;
    return decoded;
  }
  async getRewardStatus() {
    const payload = Buffer.from([]);
    const response = await this._call("/2.0/cash/get-reward-status", payload);
    return protocol.GetRewardStatusResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async getRewards() {
    const payload = Buffer.from([]);
    const response = await this._call("/2.0/cash/get-rewards", payload);
    return protocol.GetRewardsResponse.decode(responseToBuffer(response.data));
  }
  async getDiscovery() {
    const payload = Buffer.from([]);
    const response = await this._call(
      "/2.0/cash/investing/get-discovery",
      payload
    );
    return protocol.GetDiscoveryResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async getBoostConfig() {
    const payload = Buffer.from([]);
    const response = await this._call("/2.0/cash/get-boost-config", payload);
    return protocol.GetBoostConfigResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async syncEntities({
    newestToken,
    oldestToken,
    allKnownRanges,
    isProtocolChangeSafe,
    trigger,
  }) {
    const payload = protocol.SyncEntitiesRequest.encode({
      newestToken,
      oldestToken,
      allKnownRanges: allKnownRanges || this.allKnownRanges || [],
      isProtocolChangeSafe,
      trigger,
    }).finish();
    const response = await this._call("/2.0/cash/sync-entities", payload);
    const decoded = protocol.SyncEntitiesResponse.decode(
      responseToBuffer(response.data)
    );
    this.allKnownRanges = decoded.allKnownRanges;
    return decoded;
  }
  async getCustomerInvestingSettings({ requestContext }) {
    const payload = protocol.GetCustomerInvestingSettingsRequest.encode({
      requestContext: this._requestContextFromDescriptor(
        undefined,
        requestContext
      ),
    }).finish();
    const response = await this._call(
      "/2.0/cash/investing/get-customer-settings",
      payload
    );
    return protocol.GetCustomerInvestingSettingsResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async getExchangeData({ symbols, quoteCurrencyCode }) {
    const payload = protocol.GetExchangeDataRequest.encode({
      symbols,
      quoteCurrencyCode,
    }).finish();
    const response = await this._call("/2.0/cash/get-exchange-data", payload);
    return protocol.GetExchangeDataResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async skipBlocker({
    requestContext,
    blockerDescriptorId,
    blockers,
    cashFlowToken,
    cashClientScenario,
  }) {
    const payload = protocol.SkipBlockerRequest.encode({
      requestContext: requestContext || {
        skippedBlockers: [],
        paymentTokens: [],
        allKnownRanges: this.allKnownRanges || [],
        blockerDescriptorId:
          blockerDescriptorId || requestContext.blockerDescriptorId || "",
      },
      blockers: blockers || {
        card: {
          supportedInstrumentTypes: [1],
          cardStatus: 2,
        },
      },
    }).finish();
    const response = await this._call(
      "/2.0/cash/skip-blocker",
      payload,
      (this.constructor as any).headersFromScenario(
        cashClientScenario || "ONBOARDING",
        cashFlowToken || this.flowToken
      )
    );
    return protocol.SkipBlockerResponse.decode(responseToBuffer(response.data));
  }
  async submitMailingAddressWithCardCustomization({
    profileToken,
    cashClientScenario,
    cashFlowToken,
    requestContext,
    addressLine1,
    addressLine2,
    locality,
    administrativeDistrictLevel1,
    postalCode,
    addressCoordinates,
  }) {
    return await this.submitForm({
      results: [
        {
          id: "ADDRESS_ELEMENT",
          addressResult: {
            address: {
              addressLine_1: addressLine1,
              addressLine_2: addressLine2,
              locality,
              administrativeDistrictLevel_1: administrativeDistrictLevel1,
              postalCode: postalCode && fromPostalCode(postalCode),
              addressCoordinates: addressCoordinates || {},
            },
          },
        },
      ],
      requestContext: requestContext || {
        allKnownRanges: this.allKnownRanges || [],
        profileToken: profileToken || this.profileToken,
        blockerDescriptorId: "SUBMIT_MAILING_ADDRESS_WITH_CARD_CUSTOMIZATION",
      },
      actionId: "SUBMIT_MAILING_ADDRESS_FORM",
      cashFlowToken,
      cashClientScenario: cashClientScenario || "REQUEST_PHYSICAL_CARD",
    } as any);
  }
  async useUnverified({
    profileToken,
    requestContext,
    cashFlowToken,
    cashClientScenario,
  }) {
    const payload = protocol.SelectOptionRequest.encode({
      requestContext: requestContext || {
        allKnownRanges: this.allKnownRanges || [],
        paymentTokens: [],
        profileToken: profileToken || this.profileToken,
        blockerDescriptorId: "SUBMIT_MAILING_ADDRESS_WITH_CARD_CUSTOMIZATION",
        skippedBlockers: [],
      },
      action: "USE_UNVERIFIED",
      paymentTokens: [],
    }).finish();
    const response = await this._call(
      "/2.0/cash/select-option",
      payload,
      (this.constructor as any).headersFromScenario(
        cashClientScenario || "REQUEST_PHYSICAL_CARD",
        cashFlowToken || this.flowToken
      )
    );
    return protocol.SelectOptionResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async setFullName({
    profileToken,
    requestContext,
    cashFlowToken,
    cashClientScenario,
    fullName,
  }) {
    const payload = protocol.SetFullNameRequest.encode({
      requestContext: requestContext || {
        allKnownRanges: this.allKnownRanges || [],
        paymentTokens: [],
        profileToken: profileToken || this.profileToken,
        blockerDescriptorId: "name",
        skippedBlockers: [],
      },
      fullName,
      paymentTokens: [],
    }).finish();
    const response = await this._call(
      "/2.0/cash/set-full-name",
      payload,
      (this.constructor as any).headersFromScenario(
        cashClientScenario || "REQUEST_PHYSICAL_CARD",
        cashFlowToken || this.flowToken
      )
    );
    return protocol.SetFullNameResponse.decode(responseToBuffer(response.data));
  }
  async confirmDisclosure({
    profileToken,
    requestContext,
    cashFlowToken,
    cashClientScenario,
  }) {
    const payload = protocol.ConfirmDisclosureRequest.encode({
      requestContext: requestContext || {
        allKnownRanges: this.allKnownRanges || [],
        paymentTokens: [],
        profileToken: profileToken || this.profileToken,
        blockerDescriptorId: "confirm_disclosure",
        skippedBlockers: [],
      },
    }).finish();
    const response = await this._call(
      "/2.0/cash/confirm-disclosure",
      payload,
      (this.constructor as any).headersFromScenario(
        cashClientScenario || "REQUEST_PHYSICAL_CARD",
        cashFlowToken || this.flowToken
      )
    );
    return protocol.ConfirmDisclosureResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async setName({
    firstName,
    lastName,
    requestContext,
    cashClientScenario,
    cashFlowToken,
  }) {
    return await this.submitForm({
      results: [
        {
          id: "NAME_INPUT_ELEMENT_ID",
          textInputResult: {
            inputFieldValues: [firstName, lastName],
          },
        },
      ],
      requestContext: requestContext,
      blockerDescriptorId: "set_name",
      actionId: "SET_NAME",
      cashFlowToken,
      cashClientScenario,
    } as any);
  }
  async provideLegalName({
    firstName,
    lastName,
    requestContext,
    cashClientScenario,
    cashFlowToken,
  }) {
    return await this.submitForm({
      blockerDescriptorId: "provide_legal_name",
      results: [
        {
          id: "PROVIDE_LEGAL_NAME_ELEMENT_ID",
          textInputResult: {
            inputFieldValues: [firstName, lastName],
          },
        },
      ],
      requestContext: requestContext,
      actionId: "CONFIRM_PROVIDE_LEGAL_NAME",
      cashFlowToken: cashFlowToken || this.flowToken,
      cashClientScenario: "REQUEST_PHYSICAL_CARD",
    } as any);
  }
  async provideSsn({
    ssnLastFour,
    requestContext,
    cashClientScenario,
    cashFlowToken,
  }) {
    return await this.submitForm({
      blockerDescriptorId: "provide_ssn",
      results: [
        {
          id: "PROVIDE_SSN_ELEMENT_ID",
          textInputResult: {
            inputFieldValues: [fromPostalCode(ssnLastFour)],
          },
        },
      ],
      requestContext: requestContext,
      actionId: "CONFIRM_PROVIDE_SSN",
      cashFlowToken: cashFlowToken || this.flowToken,
      cashClientScenario: "REQUEST_PHYSICAL_CARD",
    } as any);
  }
  async provideBirthdate({
    day,
    month,
    year,
    requestContext,
    cashClientScenario,
    cashFlowToken,
  }) {
    return await this.submitForm({
      blockerDescriptorId: "provide_birthdate",
      results: [
        {
          id: "PROVIDE_BIRTHDATE_ELEMENT_ID",
          dateInputResult: {
            day,
            month,
            year,
          },
        },
      ],
      requestContext: requestContext,
      actionId: "CONFIRM_PROVIDE_BIRTHDATE",
      cashFlowToken: cashFlowToken || this.flowToken,
      cashClientScenario: "REQUEST_PHYSICAL_CARD",
    } as any);
  }
  async confirmExchange({ requestContext, profileToken, cashFlowToken }) {
    return await this.submitForm({
      results: [],
      requestContext,
      profileToken: profileToken || this.profileToken,
      blockerDescriptorId: "CRYPTO_INVEST_EXCHANGE_CONFIRMATION",
      actionId: "EXCHANGE_CONFIRMATION_ID",
      cashFlowToken,
      cashClientScenario: "EXCHANGE_CURRENCY",
    } as any);
  }
  async submitForm({
    results,
    requestContext,
    actionId,
    blockerDescriptorId,
    profileToken,
    cashFlowToken,
    cashClientScenario,
  }) {
    const payload = protocol.SubmitFormRequest.encode({
      results,
      requestContext: requestContext || {
        skippedBlockers: [],
        paymentTokens: [],
        profileToken: profileToken || this.profileToken,
        allKnownRanges: this.allKnownRanges || [],
        blockerDescriptorId,
      },
      actionId,
    }).finish();
    const response = await this._call(
      "/2.0/cash/submit-form",
      payload,
      (this.constructor as any).headersFromScenario(
        cashClientScenario || "ONBOARDING",
        cashFlowToken || this.flowToken
      )
    );
    return protocol.SubmitFormResponse.decode(responseToBuffer(response.data));
  }
  async getEffectiveCustomerLimits({ limitedActions }) {
    const payload = protocol.GetEffectiveCustomerLimitsRequest.encode({
      limitedActions,
    }).finish();
    const response = await this._call(
      "/2.0/cash/get-effective-customer-limits",
      payload
    );
    return protocol.GetEffectiveCustomerLimitsResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async getCashTagStatus({ cashtagCandidate, cashFlowToken }) {
    const payload = protocol.GetCashtagStatusRequest.encode({
      cashtagCandidate,
    }).finish();
    const response = await this._call("/2.0/cash/get-cashtag-status", payload, {
      "Cash-Client-Scenario": "ONBOARDING",
      "Cash-Flow-Token":
        cashFlowToken || (this.constructor as any).randomCashFlowToken(),
    });
    return protocol.GetCashtagStatusResponse.decode(
      responseToBuffer(response.data)
    );
  }
  async setCashtag({
    cashtag,
    requestContext,
    cashClientScenario,
    cashFlowToken,
  }) {
    const payload = protocol.SetCashtagRequest.encode({
      cashtag,
      requestContext: requestContext || {
        skippedBlockers: [],
        paymentTokens: [],
        allKnownRanges: this.allKnownRanges || [],
        blockerDescriptorId: "set_cashtag",
      },
    }).finish();
    const response = await this._call(
      "/2.0/cash/set-cashtag",
      payload,
      (this.constructor as any).headersFromScenario(
        cashClientScenario || "ONBOARDING",
        cashFlowToken || this.flowToken
      )
    );
    return protocol.SetCashtagResponse.decode(responseToBuffer(response.data));
  }
  async setAddress({
    addressLine1,
    addressLine2,
    addressLine3,
    addressLine4,
    addressLine5,
    locality,
    sublocality,
    sublocality1,
    sublocality2,
    sublocality3,
    sublocality4,
    sublocality5,
    administrativeDIstrictLevel1,
    administrativeDistrictLevel2,
    administrativeDistrictLevel3,
    postalCode,
    countryCode,
    addressCoordinates,
    paymentTokens,
    transferToken,
    validated,
    requestContext,
    blockerDescriptorId,
    cashClientScenario,
    cashFlowToken,
  }) {
    const payload = protocol.SetAddressRequest.encode({
      postalAddress: {
        addressLine1,
        addressLine2,
        addressLine3,
        addressLine4,
        addressLine5,
        locality,
        sublocality,
        sublocality1,
        sublocality2,
        sublocality3,
        sublocality4,
        sublocality5,
        administrativeDIstrictLevel1,
        administrativeDistrictLevel2,
        administrativeDistrictLevel3,
        postalCode,
        countryCode,
        addressCoordinates,
      },
      requestContext: requestContext || {
        skippedBlockers: [],
        paymentTokens: [],
        allKnownRanges: this.allKnownRanges || [],
        blockerDescriptorId: blockerDescriptorId || "set_postal_code",
      },
      validated: 0,
      transferToken,
      paymentTokens,
    }).finish();
    const response = await this._call(
      "/2.0/cash/set-address",
      payload,
      (this.constructor as any).headersFromScenario(
        cashClientScenario || "ONBOARDING",
        cashFlowToken || this.flowToken
      )
    );
    return protocol.SetAddressResponse.decode(responseToBuffer(response.data));
  }
  static async _gzipBody(body) {
    if (body.length === 0)
      return Buffer.from("1f8b080000000000000003000000000000000000", "hex");
    const zipped = await gzip(body);
    zipped[9] = 0;
    return zipped;
  }
  static async _signRequest(authorization, uuid, path, body) {
    const zipped = await (this as any)._gzipBody(body);
    const buffer = Buffer.concat([
      Buffer.from("v0:", "utf8"),
      Buffer.from(authorization, "utf8"),
      Buffer.from(uuid, "utf8"),
      Buffer.from(path, "utf8"),
      zipped,
    ]);
    return (
      "v0=" +
      createHmac("SHA256", Buffer.from(uuid, "utf8"))
        .update(buffer)
        .digest("base64")
    );
  }
}
