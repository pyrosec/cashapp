
import protobuf from 'protobufjs';
import safetynetProtocol = require('./safetynet.json');
import { Buffer } from "buffer";
import axios from 'axios';

const protocol = (protobuf.Root as any).fromJSON(safetynetProtocol).nested;

export { protocol }

export const TAG = "GmsSafetyNetAttest";

export type ISELinuxState = {
  enabled: boolean;
  supported: boolean;
}

export type IBuild = {
  device: string;
  id: string;
};

const fromBase64 = (data) => Buffer.isBuffer(data) ? data : Buffer.from(data, 'base64');
const toBase64 = (data) => Buffer.isBuffer(data) ? data.toString('base64') : data;

export const ATTESTATION_BASEURL = "https://www.googleapis.com/androidcheck/v1/attestations/attest?alt=PROTO&key=";
export const GMS_VERSION_CODE = "22.36.16";

const stripSymbols = (s) => s.replace(/\W/g, '');


const ln = (v) => {
  console.log(v);
  return v;
};
export class SafetyNetPayload {
  static ATTESTATION_BASEURL: string = ATTESTATION_BASEURL;
  static GMS_VERSION_CODE: string = GMS_VERSION_CODE;
  public build: IBuild;
  public nonce: string;
  public currentTimeMs: number;
  public packageName: string;
  public fileDigest: string;
  public signatureDigest: string;
  public gmsVersionCode: string;
  public seLinuxState: ISELinuxState;
  public suCandidates: Array<string>;
  constructor({
    build,
    nonce,
    currentTimeMs,
    packageName,
    fileDigest,
    signatureDigest,
    gmsVersionCode,
    seLinuxState,
    suCandidates
  }) {
    this.build = build;
    this.nonce = toBase64(nonce);
    this.currentTimeMs = currentTimeMs;
    this.packageName = packageName;
    this.fileDigest = toBase64(fileDigest);
    this.signatureDigest = toBase64(signatureDigest);
    this.gmsVersionCode = gmsVersionCode || (this.constructor as any).GMS_VERSION_CODE;
    this.seLinuxState = seLinuxState || {
      enabled: true,
      supported: true
    };
    this.suCandidates = suCandidates || [];
  }
  toObject() {
    return {
      nonce: fromBase64(this.nonce),
      currentTimeMs: this.currentTimeMs,
      packageName: this.packageName,
      fileDigest: fromBase64(this.fileDigest),
      signatureDigest: fromBase64(this.signatureDigest),
      gmsVersionCode: this.gmsVersionCode,
      seLinuxState: this.seLinuxState,
      suCandidates: this.suCandidates
    };
  }
  encode() {
    return protocol.SafetyNetData.encode(this.toObject()).finish()
  }
  async attest(apiKey: string) {
    const response = await axios.post((this.constructor as any).ATTESTATION_BASEURL + apiKey, this.encode(), {
      headers: {
        'content-type': 'application/x-protobuf',
        'Accept-Encoding': 'gzip',
        'X-Android-Package': this.packageName,
        'X-Android-Cert': this.signatureDigest,
        'User-Agent': 'SafetyNet/' + stripSymbols(this.gmsVersionCode) + " (" + this.build.device + " " + this.build.id + "); gzip"
      },
      responseType: 'arraybuffer'
    });
    console.log(response);
    const { data } = response;
    const result = protocol.AttestResponse.decode(Buffer.from(new Uint8Array(data)));
    return result;
  }
}

export const createSafetyNetPayload = ({
  build,
  nonce,
  currentTimeMs,
  packageName,
  fileDigest,
  signatureDigest,
  gmsVersionCode,
  seLinuxState,
  suCandidates
}: any) => new SafetyNetPayload({
  build,
  nonce,
  currentTimeMs,
  packageName,
  fileDigest,
  signatureDigest,
  gmsVersionCode,
  seLinuxState,
  suCandidates
});
