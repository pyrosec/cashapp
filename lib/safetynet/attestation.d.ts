/// <reference types="node" />
import { Buffer } from "buffer";
declare const protocol: any;
export { protocol };
export declare const TAG = "GmsSafetyNetAttest";
export declare type ISELinuxState = {
    enabled: boolean;
    supported: boolean;
};
export declare type IBuild = {
    device: string;
    id: string;
};
export declare const ATTESTATION_BASEURL = "https://www.googleapis.com/androidcheck/v1/attestations/attest?alt=PROTO&key=";
export declare const GMS_VERSION_CODE = "22.36.16";
export declare class SafetyNetPayload {
    static ATTESTATION_BASEURL: string;
    static GMS_VERSION_CODE: string;
    build: IBuild;
    nonce: string;
    currentTimeMs: number;
    packageName: string;
    fileDigest: string;
    signatureDigest: string;
    gmsVersionCode: string;
    seLinuxState: ISELinuxState;
    suCandidates: Array<string>;
    constructor({ build, nonce, currentTimeMs, packageName, fileDigest, signatureDigest, gmsVersionCode, seLinuxState, suCandidates }: {
        build: any;
        nonce: any;
        currentTimeMs: any;
        packageName: any;
        fileDigest: any;
        signatureDigest: any;
        gmsVersionCode: any;
        seLinuxState: any;
        suCandidates: any;
    });
    toObject(): {
        nonce: Buffer;
        currentTimeMs: number;
        packageName: string;
        fileDigest: Buffer;
        signatureDigest: Buffer;
        gmsVersionCode: string;
        seLinuxState: ISELinuxState;
        suCandidates: string[];
    };
    encode(): any;
    attest(apiKey: string): Promise<any>;
}
export declare const createSafetyNetPayload: ({ build, nonce, currentTimeMs, packageName, fileDigest, signatureDigest, gmsVersionCode, seLinuxState, suCandidates }: any) => SafetyNetPayload;
