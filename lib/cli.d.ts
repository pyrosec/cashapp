import { CashAppClient } from "./cashapp";
import "setimmediate";
export declare function saveSession(cashapp: any, json?: boolean, filename?: string): Promise<void>;
export declare function initSession(): Promise<void>;
export declare function loadSession(): Promise<CashAppClient>;
export declare function setProxy(proxyUri: string): Promise<void>;
export declare function unsetProxy(): Promise<void>;
export declare function loadProxy(): Promise<{
    hostname: string;
    port: string;
    userId: string;
    password: string;
}>;
export declare function callAPI(command: any, data: any): Promise<any>;
export declare function saveSessionAs(name: any): Promise<void>;
export declare function loadSessionFrom(name: any): Promise<void>;
export declare function repack(options: any): Promise<void>;
export declare function callFlow(): Promise<void>;
export declare function loadFiles(data: any): Promise<any>;
export declare function runCLI(): Promise<any>;