"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSafetyNetPayload = exports.SafetyNetPayload = exports.GMS_VERSION_CODE = exports.ATTESTATION_BASEURL = exports.TAG = exports.protocol = void 0;
const protobufjs_1 = __importDefault(require("protobufjs"));
const safetynetProtocol = require("./safetynet.json");
const buffer_1 = require("buffer");
const axios_1 = __importDefault(require("axios"));
const protocol = protobufjs_1.default.Root.fromJSON(safetynetProtocol).nested;
exports.protocol = protocol;
exports.TAG = "GmsSafetyNetAttest";
const fromBase64 = (data) => buffer_1.Buffer.isBuffer(data) ? data : buffer_1.Buffer.from(data, 'base64');
const toBase64 = (data) => buffer_1.Buffer.isBuffer(data) ? data.toString('base64') : data;
exports.ATTESTATION_BASEURL = "https://www.googleapis.com/androidcheck/v1/attestations/attest?alt=PROTO&key=";
exports.GMS_VERSION_CODE = "22.36.16";
const stripSymbols = (s) => s.replace(/\W/g, '');
const ln = (v) => {
    console.log(v);
    return v;
};
class SafetyNetPayload {
    constructor({ build, nonce, currentTimeMs, packageName, fileDigest, signatureDigest, gmsVersionCode, seLinuxState, suCandidates }) {
        this.build = build;
        this.nonce = toBase64(nonce);
        this.currentTimeMs = currentTimeMs;
        this.packageName = packageName;
        this.fileDigest = toBase64(fileDigest);
        this.signatureDigest = toBase64(signatureDigest);
        this.gmsVersionCode = gmsVersionCode || this.constructor.GMS_VERSION_CODE;
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
        return protocol.SafetyNetData.encode(this.toObject()).finish();
    }
    async attest(apiKey) {
        const response = await axios_1.default.post(this.constructor.ATTESTATION_BASEURL + apiKey, this.encode(), {
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
        const result = protocol.AttestResponse.decode(buffer_1.Buffer.from(new Uint8Array(data)));
        return result;
    }
}
exports.SafetyNetPayload = SafetyNetPayload;
SafetyNetPayload.ATTESTATION_BASEURL = exports.ATTESTATION_BASEURL;
SafetyNetPayload.GMS_VERSION_CODE = exports.GMS_VERSION_CODE;
const createSafetyNetPayload = ({ build, nonce, currentTimeMs, packageName, fileDigest, signatureDigest, gmsVersionCode, seLinuxState, suCandidates }) => new SafetyNetPayload({
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
exports.createSafetyNetPayload = createSafetyNetPayload;
//# sourceMappingURL=attestation.js.map