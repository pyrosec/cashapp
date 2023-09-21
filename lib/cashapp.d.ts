/// <reference types="node" />
import { Buffer } from "buffer";
import { SocksProxyAgent } from "socks-proxy-agent";
export declare type AndroidDevice = {
    name: string;
    brand: string;
    device: string;
    fingerprints: string[];
};
export declare class CashAppClient {
    static BASE_URL: string;
    static PACKAGE_NAME: string;
    static LOCALE: string;
    static COMMIT_SHA: string;
    static CASHAPP_VERSION: string;
    static DEFAULT_ANDROID_VERSION: string;
    static SQUARE_DEVICE_INFO: any;
    static X_DEVICE_ID: any;
    static DEFAULT_TIMEZONE: string;
    static DEFAULT_DEVICE: any;
    device: {
        brand: string;
        name: string;
    };
    androidVersion: string;
    xDeviceId: string;
    squareDeviceInfo: string;
    timezone: string;
    drmId: string;
    deviceKey: any;
    authorization: string | null;
    backupTag: string | null;
    safetyNetNonce: string | null;
    flowToken: string | null;
    profileToken: string | null;
    proxyOptions: any;
    allKnownRanges: Buffer[];
    constructor(options?: any);
    toObject(): {
        device: {
            brand: string;
            name: string;
        };
        flowToken: string;
        squareDeviceInfo: string;
        androidVersion: string;
        xDeviceId: string;
        timezone: string;
        drmId: string;
        authorization: string;
        profileToken: string;
        backupTag: string;
        allKnownRanges: string[];
        deviceKey: string;
        safetyNetNonce: string;
    };
    toJSON(): string;
    static fromObject(data: any): CashAppClient;
    static fromJSON(s: any): CashAppClient;
    static initialize(options?: {}): Promise<CashAppClient>;
    _getUserAgent(): string;
    _getTimezone(): string;
    static getRandomDevice(): string;
    _getPublicKey(): any;
    static headersFromScenario(cashClientScenario: any, cashFlowToken: any, headers: any): any;
    _requestContextFromDescriptor(blockerDescriptorId: any, requestContext: any): any;
    getPaymentGetter({ cashtag }: {
        cashtag: any;
    }): Promise<{
        fullName: any;
        cashtag: any;
        region: any;
        id: any;
    }>;
    search({ searchText, externalId, shouldExcludeBlockedCustomers }: {
        searchText: any;
        externalId: any;
        shouldExcludeBlockedCustomers: any;
    }): Promise<any>;
    _call(path: any, data: any, headers?: {}): Promise<import("haxios").AxiosResponse<any, any, {
        headers: {
            "Square-Device-Info": string;
            "User-Agent": string;
            "Content-Encoding": string;
            "X-Device-ID": string;
            "X-Device-Name": string;
            "Time-Zone": string;
            "Accept-Language": string;
            "Installer-Package": string;
            "SIM-Info": string;
            Connectivity: string;
            "Drm-ID": string;
            "X-Request-UUID": any;
            "Content-Type": string;
            "Accept-Encoding": string;
            "X-Request-Signature": any;
        } & ({
            Authorization: string;
        } | {
            Authorization?: undefined;
        }) & ({
            "Content-Length": any;
        } | {
            "Content-Length"?: undefined;
        });
        agent: SocksProxyAgent;
        responseType: "arraybuffer";
    }>>;
    ipinfo(): Promise<any>;
    _getClientSecurityContext(): {
        clientPublicKey: Buffer;
    };
    setNotificationPreference({ appToken, sessionToken, notificationPreference, requestContext, blockerDescriptorId, }: {
        appToken: any;
        sessionToken: any;
        notificationPreference: any;
        requestContext: any;
        blockerDescriptorId: any;
    }): Promise<any>;
    activateDigitalWallet({ requestContext, issuedCardToken, panReferenceId, digitalWalletCards, blockerDescriptorId, }: {
        requestContext: any;
        issuedCardToken: any;
        panReferenceId: any;
        digitalWalletCards: any;
        blockerDescriptorId: any;
    }): Promise<any>;
    addOrUpdateReward({ selectedRewardToken, rewardToken, requestContext, blockerDescriptorId, }: {
        selectedRewardToken: any;
        rewardToken: any;
        requestContext: any;
        blockerDescriptorId: any;
    }): Promise<any>;
    addReaction({ requestContext, reaction, blockerDescriptorId }: {
        requestContext: any;
        reaction: any;
        blockerDescriptorId: any;
    }): Promise<any>;
    applyRewardCode({ code, requestContext, blockerDescriptorId }: {
        code: any;
        requestContext: any;
        blockerDescriptorId: any;
    }): Promise<any>;
    approveCashAppPay({ requestContext, requestAuthFlowTriggersMobileUrl, cashClientScenario, cashFlowToken, }: {
        requestContext: any;
        requestAuthFlowTriggersMobileUrl: any;
        cashClientScenario: any;
        cashFlowToken: any;
    }): Promise<any>;
    cancelPayment({ requestContext, paymentToken }: {
        requestContext: any;
        paymentToken: any;
    }): Promise<any>;
    checkRewardCode({ code }: {
        code: any;
    }): Promise<any>;
    checkVersion(): Promise<any>;
    claimPayment({ requestContext, paymentToken, instrumentSelection }: {
        requestContext: any;
        paymentToken: any;
        instrumentSelection: any;
    }): Promise<any>;
    clearProfilePhoto(): Promise<any>;
    completeScenario({ paymentTokens, transferToken, profileToken, requestContext, cashFlowToken, cashClientScenario, }: {
        paymentTokens: any;
        transferToken: any;
        profileToken: any;
        requestContext: any;
        cashFlowToken: any;
        cashClientScenario: any;
    }): Promise<any>;
    pay({ cashtag, instrumentToken, passcode, note, amount }: {
        cashtag: any;
        instrumentToken: any;
        passcode: any;
        note: any;
        amount: any;
    }): Promise<{}>;
    confirmPasscode({ passcode, paymentTokens, passcodeToken, instrumentSelection, instrumentToken, paymentToken, transferToken, requestContext, profileToken, blockerDescriptorId, cashFlowToken, cashClientScenario, }: {
        passcode: any;
        paymentTokens: any;
        passcodeToken: any;
        instrumentSelection: any;
        instrumentToken: any;
        paymentToken: any;
        transferToken: any;
        requestContext: any;
        profileToken: any;
        blockerDescriptorId: any;
        cashFlowToken: any;
        cashClientScenario: any;
    }): Promise<import("haxios").AxiosResponse<any, any, {
        headers: {
            "Square-Device-Info": string;
            "User-Agent": string;
            "Content-Encoding": string;
            "X-Device-ID": string;
            "X-Device-Name": string;
            "Time-Zone": string;
            "Accept-Language": string;
            "Installer-Package": string;
            "SIM-Info": string;
            Connectivity: string;
            "Drm-ID": string;
            "X-Request-UUID": any;
            "Content-Type": string;
            "Accept-Encoding": string;
            "X-Request-Signature": any;
        } & ({
            Authorization: string;
        } | {
            Authorization?: undefined;
        }) & ({
            "Content-Length": any;
        } | {
            "Content-Length"?: undefined;
        });
        agent: SocksProxyAgent;
        responseType: "arraybuffer";
    }>>;
    endFlow({ requestContext, actionId }: {
        requestContext: any;
        actionId: any;
    }): Promise<any>;
    exchangeCurrency({ sourceToken, targetToken, contractToken, sourceAmount, targetAmount, profileToken, cashFlowToken, requestContext, }: {
        sourceToken: any;
        targetToken: any;
        contractToken: any;
        sourceAmount: any;
        targetAmount: any;
        profileToken: any;
        cashFlowToken: any;
        requestContext: any;
    }): Promise<any>;
    buyBitcoin({ sourceAmount, targetAmount, cashFlowToken }: {
        sourceAmount: any;
        targetAmount: any;
        cashFlowToken: any;
    }): Promise<any>;
    sellBitcoin({ sourceAmount, targetAmount, cashFlowToken }: {
        sourceAmount: any;
        targetAmount: any;
        cashFlowToken: any;
    }): Promise<any>;
    executeContract({ contractToken, sourceToken, targetToken, requestContext, passcodeToken, sourceAmount, targetAmount, customerPreferredDisplayCurrency, recurringSchedule, customOrder, cashFlowToken, cashClientScenario, }: {
        contractToken: any;
        sourceToken: any;
        targetToken: any;
        requestContext: any;
        passcodeToken: any;
        sourceAmount: any;
        targetAmount: any;
        customerPreferredDisplayCurrency: any;
        recurringSchedule: any;
        customOrder: any;
        cashFlowToken: any;
        cashClientScenario: any;
    }): Promise<any>;
    findCustomers({ searchText }: {
        searchText: any;
    }): Promise<any>;
    findInstantPayAutoAdvance({ requestedToBeNotified, requestContext }: {
        requestedToBeNotified: any;
        requestContext: any;
    }): Promise<any>;
    finishInstantPaycheckDirectDepositSwitch({ requestContext }: {
        requestContext: any;
    }): Promise<any>;
    finishPinwheelLink({ requestContext, linkToken, onLoginResponse, onExitResponse, onSuccessResponse, }: {
        requestContext: any;
        linkToken: any;
        onLoginResponse: any;
        onExitResponse: any;
        onSuccessResponse: any;
    }): Promise<any>;
    finishTutorial({ requestContext }: {
        requestContext: any;
    }): Promise<any>;
    getExchangeContract({ sourceCurrencyCode, targetCurrencyCode, sourceCents, targetCents, customOrder, }: {
        sourceCurrencyCode: any;
        targetCurrencyCode: any;
        sourceCents: any;
        targetCents: any;
        customOrder: any;
    }): Promise<any>;
    getFlow({ requestContext, initiationData, flowType }: {
        requestContext: any;
        initiationData: any;
        flowType: any;
    }): Promise<any>;
    getHistoricalExchangeData({ historicalRange, baseCurrencyCode, quoteCurrencyCode, }: {
        historicalRange: any;
        baseCurrencyCode: any;
        quoteCurrencyCode: any;
    }): Promise<any>;
    getIssuedCard({ versionToken }: {
        versionToken: any;
    }): Promise<any>;
    getLocationConfig(): Promise<any>;
    getPayment({ paymentToken, requestContext }: {
        paymentToken: any;
        requestContext: any;
    }): Promise<any>;
    getPaymentRewardStatus({ paymentTokens }: {
        paymentTokens: any;
    }): Promise<any>;
    getScenarioPlan({ requestContext }: {
        requestContext: any;
    }): Promise<any>;
    getWebLoginConfig(): Promise<any>;
    initiatePayment({ externalId, paymentGetters, id, fullName, cashtag, region, orientation, profileToken, amount, currencyCode, note, passcodeToken, instrumentSelection, instrumentToken, requestContext, cancelPaymentsData, cashClientScenario, cashFlowToken, schedule, referrer, launchUrl, appCreationActivity, investPaymentData, suggestionId, exchangeRatesToken, giftCardPaymentData, }: {
        externalId: any;
        paymentGetters: any;
        id: any;
        fullName: any;
        cashtag: any;
        region: any;
        orientation: any;
        profileToken: any;
        amount: any;
        currencyCode: any;
        note: any;
        passcodeToken: any;
        instrumentSelection: any;
        instrumentToken: any;
        requestContext: any;
        cancelPaymentsData: any;
        cashClientScenario: any;
        cashFlowToken: any;
        schedule: any;
        referrer: any;
        launchUrl: any;
        appCreationActivity: any;
        investPaymentData: any;
        suggestionId: any;
        exchangeRatesToken: any;
        giftCardPaymentData: any;
    }): Promise<any>;
    inviteContacts({ emailAddresses, requestContext }: {
        emailAddresses: any;
        requestContext: any;
    }): Promise<any>;
    linkBankAccount({ routingNumber, accountNumber, paymentTokens, transferToken, requestContext, }: {
        routingNumber: any;
        accountNumber: any;
        paymentTokens: any;
        transferToken: any;
        requestContext: any;
    }): Promise<any>;
    linkCard({ card: { unencryptedPan, expiration, securityCode, postalCode, lastFour, instrumentType: instrumentTypeCard, }, paymentTokens, ocrContext, instrumentType, transferToken, requestContext, linkedViaNfc, treatment, cashFlowToken, blockerDescriptorId, cashClientScenario, }: {
        card: {
            unencryptedPan: any;
            expiration: any;
            securityCode: any;
            postalCode: any;
            lastFour: any;
            instrumentType: any;
        };
        paymentTokens: any;
        ocrContext: any;
        instrumentType: any;
        transferToken: any;
        requestContext: any;
        linkedViaNfc: any;
        treatment: any;
        cashFlowToken: any;
        blockerDescriptorId: any;
        cashClientScenario: any;
    }): Promise<any>;
    oauthResolveFlow({ requestContext, flowType, urlContents }: {
        requestContext: any;
        flowType: any;
        urlContents: any;
    }): Promise<any>;
    createPlaidLinkToken({ manualAchEnabled, clientScenario, plaidLinkingConfig, }: {
        manualAchEnabled: any;
        clientScenario: any;
        plaidLinkingConfig: any;
    }): Promise<any>;
    refreshSession({ backupTag }: {
        backupTag: any;
    }): Promise<any>;
    refundPayment({ paymentToken, requestContext }: {
        paymentToken: any;
        requestContext: any;
    }): Promise<any>;
    registerAppMessageAction({ messageToken, actionIdentifier }: {
        messageToken: any;
        actionIdentifier: any;
    }): Promise<any>;
    registerDevice({ deviceToken, buildType, canReceiveUserVisibleNotifications, }: {
        deviceToken: any;
        buildType: any;
        canReceiveUserVisibleNotifications: any;
    }): Promise<any>;
    registerInvitations({ hashedSmsNumbers, invitationTreatment, hashedEmailAddresses, invitationMessageModified, enhancedAliases, }: {
        hashedSmsNumbers: any;
        invitationTreatment: any;
        hashedEmailAddresses: any;
        invitationMessageModified: any;
        enhancedAliases: any;
    }): Promise<any>;
    registerSms({ smsNumber, verificationMechanism, scenario, preFilledFromPhone, paymentTokens, existingCustomerOnly, requestContext, profileToken, deviceLocationHeuristics, appCallbackToken, accountId, cashClientScenario, cashFlowToken, blockerDescriptorId, }: {
        smsNumber: any;
        verificationMechanism: any;
        scenario: any;
        preFilledFromPhone: any;
        paymentTokens: any;
        existingCustomerOnly: any;
        requestContext: any;
        profileToken: any;
        deviceLocationHeuristics: any;
        appCallbackToken: any;
        accountId: any;
        cashClientScenario: any;
        cashFlowToken: any;
        blockerDescriptorId: any;
    }): Promise<any>;
    reportAbuse({ block, customerId, paymentToken, requestContext }: {
        block: any;
        customerId: any;
        paymentToken: any;
        requestContext: any;
    }): Promise<any>;
    reportDeeplink({ rawUrl, referrer }: {
        rawUrl: any;
        referrer: any;
    }): Promise<any>;
    resetBadge({ conversationToken, paymentTokens, entityIds }: {
        conversationToken: any;
        paymentTokens: any;
        entityIds: any;
    }): Promise<any>;
    resolveMerge({ confirmMerge, requestContext }: {
        confirmMerge: any;
        requestContext: any;
    }): Promise<any>;
    selectActivity({ requestContext, entityId }: {
        requestContext: any;
        entityId: any;
    }): Promise<any>;
    cryptoTransferBeginOnboarding({ profileToken, cashFlowToken }: {
        profileToken: any;
        cashFlowToken: any;
    }): Promise<any>;
    selectOption({ action, paymentTokens, transferToken, requestContext, profileToken, blockerDescriptorId, cashClientScenario, cashFlowToken, }: {
        action: any;
        paymentTokens: any;
        transferToken: any;
        requestContext: any;
        profileToken: any;
        blockerDescriptorId: any;
        cashClientScenario: any;
        cashFlowToken: any;
    }): Promise<any>;
    selectSponsors({ requestContext, sponsors }: {
        requestContext: any;
        sponsors: any;
    }): Promise<any>;
    setAmount({ requestContext, amountResult, percentageResult }: {
        requestContext: any;
        amountResult: any;
        percentageResult: any;
    }): Promise<any>;
    setAppMessagePreference({ requestContext, notificationsEnabled }: {
        requestContext: any;
        notificationsEnabled: any;
    }): Promise<any>;
    getInstruments(): Promise<any>;
    defaultInstrumentToken(): Promise<any>;
    setCardCustomization({ imageBytes, mimeType, touchData, requestContext, cardThemeToken, profileToken, includeCashtag, customizationArea, cashFlowToken, cashClientScenario, }: {
        imageBytes: any;
        mimeType: any;
        touchData: any;
        requestContext: any;
        cardThemeToken: any;
        profileToken: any;
        includeCashtag: any;
        customizationArea: any;
        cashFlowToken: any;
        cashClientScenario: any;
    }): Promise<any>;
    setCashtagUrlEnabled({ requestContext, enabled }: {
        requestContext: any;
        enabled: any;
    }): Promise<any>;
    setCountry({ requestContext, countryCode }: {
        requestContext: any;
        countryCode: any;
    }): Promise<any>;
    setIncomingRequestPolicy({ requestContext, incomingRequestPolicy }: {
        requestContext: any;
        incomingRequestPolicy: any;
    }): Promise<any>;
    setOnboardingContext({ onboardingPayload }: {
        onboardingPayload: any;
    }): Promise<any>;
    setProfilePhoto({ imageBytes, mimeType, imageData }: {
        imageBytes: any;
        mimeType: any;
        imageData: any;
    }): Promise<any>;
    setRatePlan({ ratePlan, commit, paymentTokens, intendedUsage, requestContext, }: {
        ratePlan: any;
        commit: any;
        paymentTokens: any;
        intendedUsage: any;
        requestContext: any;
    }): Promise<any>;
    setRequirePasscodeConfirmation({ requirePasscodeConfirmation, passcode, passcodeToken, requestContext, }: {
        requirePasscodeConfirmation: any;
        passcode: any;
        passcodeToken: any;
        requestContext: any;
    }): Promise<any>;
    setScheduledTransactionPreference({ amount, enabled, recurringSchedule, type, nextReloadAt, investmentEntityToken, }: {
        amount: any;
        enabled: any;
        recurringSchedule: any;
        type: any;
        nextReloadAt: any;
        investmentEntityToken: any;
    }): Promise<any>;
    setSignature({ requestContext, imageBytes, mimeType }: {
        requestContext: any;
        imageBytes: any;
        mimeType: any;
    }): Promise<any>;
    submitFileset({ requestContext, actionId, fileTokens }: {
        requestContext: any;
        actionId: any;
        fileTokens: any;
    }): Promise<any>;
    submitPayrollProviderSelection({ requestContext, query, selectedPayrollProvider, selectedFallbackResult, }: {
        requestContext: any;
        query: any;
        selectedPayrollProvider: any;
        selectedFallbackResult: any;
    }): Promise<any>;
    syncContacts({ syncToken, addHashedAliases, removeHashedAliases }: {
        syncToken: any;
        addHashedAliases: any;
        removeHashedAliases: any;
    }): Promise<any>;
    unlinkBusiness({ requestContext, grantId }: {
        requestContext: any;
        grantId: any;
    }): Promise<any>;
    unlockReward({ rewardToken, requestContext }: {
        rewardToken: any;
        requestContext: any;
    }): Promise<any>;
    unregisterAlias({ profileToken, cashClientScenario, cashFlowToken, canonicalText, type, alias, requestContext, }: {
        profileToken: any;
        cashClientScenario: any;
        cashFlowToken: any;
        canonicalText: any;
        type: any;
        alias: any;
        requestContext: any;
    }): Promise<any>;
    setIncomeSource({ profileToken, cashFlowToken, optionId, cashClientScenario, }: {
        profileToken: any;
        cashFlowToken: any;
        optionId: any;
        cashClientScenario: any;
    }): Promise<any>;
    setCryptoUseReason({ profileToken, cashFlowToken, optionId, cashClientScenario, }: {
        profileToken: any;
        cashFlowToken: any;
        optionId: any;
        cashClientScenario: any;
    }): Promise<any>;
    setEmploymentStatus({ profileToken, cashFlowToken, optionId, cashClientScenario, }: {
        profileToken: any;
        cashFlowToken: any;
        optionId: any;
        cashClientScenario: any;
    }): Promise<any>;
    setJobTitle({ profileToken, cashFlowToken, title, cashClientScenario, }: {
        profileToken: any;
        cashFlowToken: any;
        title: any;
        cashClientScenario: any;
    }): Promise<any>;
    setEmployer({ profileToken, cashFlowToken, employer, cashClientScenario, }: {
        profileToken: any;
        cashFlowToken: any;
        employer: any;
        cashClientScenario: any;
    }): Promise<any>;
    uploadFile({ fileData, fileBytes, mimeType, category, paymentTokens, transferToken, blockerDescriptorId, requestContext, profileToken, cashFlowToken, cashClientScenario, }: {
        fileData: any;
        fileBytes: any;
        mimeType: any;
        category: any;
        paymentTokens: any;
        transferToken: any;
        blockerDescriptorId: any;
        requestContext: any;
        profileToken: any;
        cashFlowToken: any;
        cashClientScenario: any;
    }): Promise<any>;
    verifyContacts({ requestContext, hashedAliases }: {
        requestContext: any;
        hashedAliases: any;
    }): Promise<any>;
    orderCard({ addressLine1, addressLine2, locality, administrativeDistrictLevel1, postalCode, passcode, firstName, lastName, month, day, year, birthdate, ssnLastFour, }: {
        addressLine1: any;
        addressLine2: any;
        locality: any;
        administrativeDistrictLevel1: any;
        postalCode: any;
        passcode: any;
        firstName: any;
        lastName: any;
        month: any;
        day: any;
        year: any;
        birthdate: any;
        ssnLastFour: any;
    }): Promise<void>;
    verifyDevice({ challengeToken, playServicesStatusCode, safetyNetAttestation, appAttestation, cashFlowToken, cashClientScenario, }: {
        challengeToken: any;
        playServicesStatusCode: any;
        safetyNetAttestation: any;
        appAttestation: any;
        cashFlowToken: any;
        cashClientScenario: any;
    }): Promise<any>;
    verifyGovernmentId({ paymentTokens, transferTokens, frontImageBytes, backImageBytes, mimeType, pdf417Text, requestContext, frontManuallyCaptured, backManuallyCaptured, treatment, profileToken, blockerDescriptorId, cashClientScenario, cashFlowToken, }: {
        paymentTokens: any;
        transferTokens: any;
        frontImageBytes: any;
        backImageBytes: any;
        mimeType: any;
        pdf417Text: any;
        requestContext: any;
        frontManuallyCaptured: any;
        backManuallyCaptured: any;
        treatment: any;
        profileToken: any;
        blockerDescriptorId: any;
        cashClientScenario: any;
        cashFlowToken: any;
    }): Promise<any>;
    verifyIdentity({ name, birthDate, ssnLastFour, paymentTokens, transferToken, ssn, requestContext, address, profileToken, blockerDescriptorId, cashFlowToken, cashClientScenario, }: {
        name: any;
        birthDate: any;
        ssnLastFour: any;
        paymentTokens: any;
        transferToken: any;
        ssn: any;
        requestContext: any;
        address: any;
        profileToken: any;
        blockerDescriptorId: any;
        cashFlowToken: any;
        cashClientScenario: any;
    }): Promise<any>;
    verifyInstrument({ unencryptedPan, routingNumber, accountNumber, requestContext, }: {
        unencryptedPan: any;
        routingNumber: any;
        accountNumber: any;
        requestContext: any;
    }): Promise<any>;
    verifyMagicLink({ requestContext, verificationToken, customerRequestedDenyAttempt, cashFlowToken, cashClientScenario, }: {
        requestContext: any;
        verificationToken: any;
        customerRequestedDenyAttempt: any;
        cashFlowToken: any;
        cashClientScenario: any;
    }): Promise<any>;
    verifyPasscodeAndExpiration({ requestContext, passcode, blockerDescriptorId, expirationDate, profileToken, cashClientScenario, cashFlowToken, }: {
        requestContext: any;
        passcode: any;
        blockerDescriptorId: any;
        expirationDate: any;
        profileToken: any;
        cashClientScenario: any;
        cashFlowToken: any;
    }): Promise<any>;
    verifyPasscode({ requestContext, passcode, passcodeToken, cashFlowToken, blockerDescriptorId, cashClientScenario, }: {
        requestContext: any;
        passcode: any;
        passcodeToken: any;
        cashFlowToken: any;
        blockerDescriptorId: any;
        cashClientScenario: any;
    }): Promise<any>;
    verifyQrCode({ cashFlowToken, cashClientScenario, qrCodeData, profileToken, requestContext, missingQrCodeToLocateCvv, }: {
        cashFlowToken: any;
        cashClientScenario: any;
        qrCodeData: any;
        profileToken: any;
        requestContext: any;
        missingQrCodeToLocateCvv: any;
    }): Promise<any>;
    verifySms({ smsNumber, smsVerificationCode, paymentTokens, requestContext, accountId, profileToken, blockerDescriptorId, cashClientScenario, cashFlowToken, clientSecurityContext, }: {
        smsNumber: any;
        smsVerificationCode: any;
        paymentTokens: any;
        requestContext: any;
        accountId: any;
        profileToken: any;
        blockerDescriptorId: any;
        cashClientScenario: any;
        cashFlowToken: any;
        clientSecurityContext: any;
    }): Promise<any>;
    initiatePasscodeReset({ requestContext }: {
        requestContext: any;
    }): Promise<any>;
    setPasscode({ newPasscode, oldPasscode, oldPasscodeToken, oldInstrumentToken, paymentTokens, transferToken, requestContext, }: {
        newPasscode: any;
        oldPasscode: any;
        oldPasscodeToken: any;
        oldInstrumentToken: any;
        paymentTokens: any;
        transferToken: any;
        requestContext: any;
    }): Promise<any>;
    transferFunds({ externalId, source, target, amount, passcode, passcodeToken, depositPreference, acceptedFeeAmount, requestContext, pullCurrency, pushCurrency, contractToken, }: {
        externalId: any;
        source: any;
        target: any;
        amount: any;
        passcode: any;
        passcodeToken: any;
        depositPreference: any;
        acceptedFeeAmount: any;
        requestContext: any;
        pullCurrency: any;
        pushCurrency: any;
        contractToken: any;
    }): Promise<any>;
    unlinkInstrument({ instrumentToken, requestContext }: {
        instrumentToken: any;
        requestContext: any;
    }): Promise<any>;
    getInvestmentStatements({ type, before }: {
        type: any;
        before: any;
    }): Promise<any>;
    initiateInvestmentOrder({ requestContext, investmentEntityToken, instrumentToken, idempotenceToken, units, amount, orderType, side, recurringSchedule, customOrder, investmentIncentiveToken, }: {
        requestContext: any;
        investmentEntityToken: any;
        instrumentToken: any;
        idempotenceToken: any;
        units: any;
        amount: any;
        orderType: any;
        side: any;
        recurringSchedule: any;
        customOrder: any;
        investmentIncentiveToken: any;
    }): Promise<any>;
    updateInvestmentHolding({ requestContext, investmentEntityToken, action, }: {
        requestContext: any;
        investmentEntityToken: any;
        action: any;
    }): Promise<any>;
    checkCreditLimit({ requestContext }: {
        requestContext: any;
    }): Promise<any>;
    clearCreditLineAlert({ requestContext }: {
        requestContext: any;
    }): Promise<any>;
    clearCreditLineBadge({ requestContext }: {
        requestContext: any;
    }): Promise<any>;
    clearInstrumentBadge({ requestContext }: {
        requestContext: any;
    }): Promise<any>;
    getLendingConfig(): Promise<any>;
    initiateLoanPayment({ requestContext, loanToken, idempotenceToken, paymentAmount, lastKnownBalance, loanTransactionToken, opaqueData, }: {
        requestContext: any;
        loanToken: any;
        idempotenceToken: any;
        paymentAmount: any;
        lastKnownBalance: any;
        loanTransactionToken: any;
        opaqueData: any;
    }): Promise<any>;
    initiateLoan({ requestContext, creditLineToken, idempotenceToken, amount, }: {
        requestContext: any;
        creditLineToken: any;
        idempotenceToken: any;
        amount: any;
    }): Promise<any>;
    lendingConfigRoutingResolved({ requestContext }: {
        requestContext: any;
    }): Promise<any>;
    skipLoanPayment({ requestContext, loanTransactionToken }: {
        requestContext: any;
        loanTransactionToken: any;
    }): Promise<any>;
    resolvePersonaDidvBlocker({ requestContext, inquiryResponse, inquiryId, status, sessionToken, debugMessage, }: {
        requestContext: any;
        inquiryResponse: any;
        inquiryId: any;
        status: any;
        sessionToken: any;
        debugMessage: any;
    }): Promise<any>;
    handleThreeDomainSecureRedirect({ requestContext, redirectUrl, transactionType, transactionId, securityCode, }: {
        requestContext: any;
        redirectUrl: any;
        transactionType: any;
        transactionId: any;
        securityCode: any;
    }): Promise<any>;
    handleThreeDomainSecureV2Action({ requestContext, actionDetails, transactionType, transactionId, success, error, }: {
        requestContext: any;
        actionDetails: any;
        transactionType: any;
        transactionId: any;
        success: any;
        error: any;
    }): Promise<any>;
    advanceSupportFlow({ currentNodeToken, selectedNodeToken }: {
        currentNodeToken: any;
        selectedNodeToken: any;
    }): Promise<any>;
    createSupportCase({ currentNodeToken, entityId, contactType, emailAddress, phoneNumber, message, termsAccepted, }: {
        currentNodeToken: any;
        entityId: any;
        contactType: any;
        emailAddress: any;
        phoneNumber: any;
        message: any;
        termsAccepted: any;
    }): Promise<any>;
    getSupportContactStatus({ currentNodeToken }: {
        currentNodeToken: any;
    }): Promise<any>;
    startSupportFlow({ nodeToken, entityId }: {
        nodeToken: any;
        entityId: any;
    }): Promise<any>;
    initiateSession(): Promise<any>;
    _getLocale(): {
        country: any;
        language: any;
    };
    _getDeviceLocationHeuristics(): {
        installedKeyboards: any[];
        language: any;
        countryCode: any;
        carrierCountryCode: any;
        carrierName: string;
        timeZone: string;
    };
    registerEmail({ emailAddress, paymentTokens, deviceLocationHeuristics, requestContext, cashClientScenario, cashFlowToken, }: {
        emailAddress: any;
        paymentTokens: any;
        deviceLocationHeuristics: any;
        requestContext: any;
        cashClientScenario: any;
        cashFlowToken: any;
    }): Promise<any>;
    static randomCashFlowToken(): any;
    verifyEmail({ requestContext, emailAddress, verificationCode, cashClientScenario, cashFlowToken, blockerDescriptorId, }: {
        requestContext: any;
        emailAddress: any;
        verificationCode: any;
        cashClientScenario: any;
        cashFlowToken: any;
        blockerDescriptorId: any;
    }): Promise<any>;
    getAppConfig(): Promise<any>;
    getFeatureFlags(): Promise<any>;
    getAppMessages(): Promise<any>;
    getConfiguration(): Promise<any>;
    getProfile(): Promise<any>;
    getRewardStatus(): Promise<any>;
    getRewards(): Promise<any>;
    getDiscovery(): Promise<any>;
    getBoostConfig(): Promise<any>;
    syncEntities({ newestToken, oldestToken, allKnownRanges, isProtocolChangeSafe, trigger, }: {
        newestToken: any;
        oldestToken: any;
        allKnownRanges: any;
        isProtocolChangeSafe: any;
        trigger: any;
    }): Promise<any>;
    getCustomerInvestingSettings({ requestContext }: {
        requestContext: any;
    }): Promise<any>;
    getExchangeData({ symbols, quoteCurrencyCode }: {
        symbols: any;
        quoteCurrencyCode: any;
    }): Promise<any>;
    skipBlocker({ requestContext, blockerDescriptorId, blockers, cashFlowToken, cashClientScenario, }: {
        requestContext: any;
        blockerDescriptorId: any;
        blockers: any;
        cashFlowToken: any;
        cashClientScenario: any;
    }): Promise<any>;
    submitMailingAddressWithCardCustomization({ profileToken, cashClientScenario, cashFlowToken, requestContext, addressLine1, addressLine2, locality, administrativeDistrictLevel1, postalCode, addressCoordinates, }: {
        profileToken: any;
        cashClientScenario: any;
        cashFlowToken: any;
        requestContext: any;
        addressLine1: any;
        addressLine2: any;
        locality: any;
        administrativeDistrictLevel1: any;
        postalCode: any;
        addressCoordinates: any;
    }): Promise<any>;
    useUnverified({ profileToken, requestContext, cashFlowToken, cashClientScenario, }: {
        profileToken: any;
        requestContext: any;
        cashFlowToken: any;
        cashClientScenario: any;
    }): Promise<any>;
    setFullName({ profileToken, requestContext, cashFlowToken, cashClientScenario, fullName, }: {
        profileToken: any;
        requestContext: any;
        cashFlowToken: any;
        cashClientScenario: any;
        fullName: any;
    }): Promise<any>;
    confirmDisclosure({ profileToken, requestContext, cashFlowToken, cashClientScenario, }: {
        profileToken: any;
        requestContext: any;
        cashFlowToken: any;
        cashClientScenario: any;
    }): Promise<any>;
    setName({ firstName, lastName, requestContext, cashClientScenario, cashFlowToken, }: {
        firstName: any;
        lastName: any;
        requestContext: any;
        cashClientScenario: any;
        cashFlowToken: any;
    }): Promise<any>;
    provideLegalName({ firstName, lastName, requestContext, cashClientScenario, cashFlowToken, }: {
        firstName: any;
        lastName: any;
        requestContext: any;
        cashClientScenario: any;
        cashFlowToken: any;
    }): Promise<any>;
    provideSsn({ ssnLastFour, requestContext, cashClientScenario, cashFlowToken, }: {
        ssnLastFour: any;
        requestContext: any;
        cashClientScenario: any;
        cashFlowToken: any;
    }): Promise<any>;
    provideBirthdate({ day, month, year, requestContext, cashClientScenario, cashFlowToken, }: {
        day: any;
        month: any;
        year: any;
        requestContext: any;
        cashClientScenario: any;
        cashFlowToken: any;
    }): Promise<any>;
    confirmExchange({ requestContext, profileToken, cashFlowToken }: {
        requestContext: any;
        profileToken: any;
        cashFlowToken: any;
    }): Promise<any>;
    submitForm({ results, requestContext, actionId, blockerDescriptorId, profileToken, cashFlowToken, cashClientScenario, }: {
        results: any;
        requestContext: any;
        actionId: any;
        blockerDescriptorId: any;
        profileToken: any;
        cashFlowToken: any;
        cashClientScenario: any;
    }): Promise<any>;
    getEffectiveCustomerLimits({ limitedActions }: {
        limitedActions: any;
    }): Promise<any>;
    getCashTagStatus({ cashtagCandidate, cashFlowToken }: {
        cashtagCandidate: any;
        cashFlowToken: any;
    }): Promise<any>;
    setCashtag({ cashtag, requestContext, cashClientScenario, cashFlowToken, }: {
        cashtag: any;
        requestContext: any;
        cashClientScenario: any;
        cashFlowToken: any;
    }): Promise<any>;
    setAddress({ addressLine1, addressLine2, addressLine3, addressLine4, addressLine5, locality, sublocality, sublocality1, sublocality2, sublocality3, sublocality4, sublocality5, administrativeDIstrictLevel1, administrativeDistrictLevel2, administrativeDistrictLevel3, postalCode, countryCode, addressCoordinates, paymentTokens, transferToken, validated, requestContext, blockerDescriptorId, cashClientScenario, cashFlowToken, }: {
        addressLine1: any;
        addressLine2: any;
        addressLine3: any;
        addressLine4: any;
        addressLine5: any;
        locality: any;
        sublocality: any;
        sublocality1: any;
        sublocality2: any;
        sublocality3: any;
        sublocality4: any;
        sublocality5: any;
        administrativeDIstrictLevel1: any;
        administrativeDistrictLevel2: any;
        administrativeDistrictLevel3: any;
        postalCode: any;
        countryCode: any;
        addressCoordinates: any;
        paymentTokens: any;
        transferToken: any;
        validated: any;
        requestContext: any;
        blockerDescriptorId: any;
        cashClientScenario: any;
        cashFlowToken: any;
    }): Promise<any>;
    static _gzipBody(body: any): Promise<any>;
    static _signRequest(authorization: any, uuid: any, path: any, body: any): Promise<string>;
}
