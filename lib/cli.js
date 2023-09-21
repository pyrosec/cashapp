"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runCLI = exports.loadFiles = exports.callFlow = exports.repack = exports.loadSessionFrom = exports.saveSessionAs = exports.callAPI = exports.loadProxy = exports.unsetProxy = exports.setProxy = exports.loadSession = exports.initSession = exports.saveSession = void 0;
const cashapp_1 = require("./cashapp");
const yargs_1 = __importDefault(require("yargs"));
const change_case_1 = require("change-case");
const fs_extra_1 = __importDefault(require("fs-extra"));
const url_1 = __importDefault(require("url"));
require("setimmediate");
const mkdirp_1 = __importDefault(require("mkdirp"));
const path_1 = __importDefault(require("path"));
const pack_1 = require("./pack");
const logger_1 = require("./logger");
const logger = (0, logger_1.getLogger)();
async function saveSession(cashapp, json = false, filename = 'session.json') {
    await (0, mkdirp_1.default)(path_1.default.join(process.env.HOME, '.cashapp'));
    await fs_extra_1.default.writeFile(path_1.default.join(process.env.HOME, '.cashapp', filename), cashapp.toJSON());
    if (!json)
        logger.info('saved to ~/' + path_1.default.join('.cashapp', filename));
}
exports.saveSession = saveSession;
async function initSession() {
    const proxyOptions = await loadProxy();
    const cashapp = await cashapp_1.CashAppClient.initialize({ proxyOptions });
    logger.info('device details:');
    logger.info(cashapp.squareDeviceInfo);
    logger.info(cashapp.xDeviceId);
    logger.info('getting session');
    await cashapp.initiateSession();
    logger.info('got JWT!');
    logger.info(cashapp.authorization);
    await saveSession(cashapp);
}
exports.initSession = initSession;
async function loadSession() {
    const proxyOptions = await loadProxy();
    const cashapp = cashapp_1.CashAppClient.fromJSON(await fs_extra_1.default.readFile(path_1.default.join(process.env.HOME, '.cashapp', 'session.json')));
    cashapp.proxyOptions = proxyOptions;
    return cashapp;
}
exports.loadSession = loadSession;
const proxyStringToObject = (proxyUri) => {
    const parsed = url_1.default.parse(proxyUri);
    const [username, ...passwordParts] = (parsed.auth || '').split(':');
    return {
        hostname: parsed.hostname,
        port: parsed.port,
        userId: username || null,
        password: passwordParts.join(':') || null
    };
};
const objectToProxyString = (o) => {
    return 'socks5://' + (o.userId ? o.userId + ':' + o.password + '@' : '') + o.hostname + (o.port ? ':' + o.port : '');
};
async function setProxy(proxyUri) {
    await (0, mkdirp_1.default)(path_1.default.join(process.env.HOME, '.cashapp'));
    const proxyOptions = proxyStringToObject(proxyUri);
    const joined = objectToProxyString(proxyOptions);
    await fs_extra_1.default.writeFile(path_1.default.join(process.env.HOME, '.cashapp', 'proxy'), joined);
    logger.info('set-proxy: ' + joined);
}
exports.setProxy = setProxy;
async function unsetProxy() {
    await (0, mkdirp_1.default)(path_1.default.join(process.env.HOME, '.cashapp'));
    await fs_extra_1.default.unlink(path_1.default.join(process.env.HOME, '.cashapp', 'proxy'));
    logger.info('unset-proxy');
}
exports.unsetProxy = unsetProxy;
async function loadProxy() {
    await (0, mkdirp_1.default)(path_1.default.join(process.env.HOME, '.cashapp'));
    try {
        return proxyStringToObject(await fs_extra_1.default.readFile(path_1.default.join(process.env.HOME, '.cashapp', 'proxy'), 'utf8'));
    }
    catch (e) {
        return null;
    }
}
exports.loadProxy = loadProxy;
async function callAPI(command, data) {
    const cashapp = await loadSession();
    const camelCommand = (0, change_case_1.camelCase)(command);
    const json = data.j || data.json;
    const repl = data.repl;
    delete data.j;
    delete data.json;
    delete data.repl;
    if (!cashapp[camelCommand])
        throw Error('command not foud: ' + command);
    const result = await cashapp[camelCommand](data);
    if (repl) {
        const r = require('repl').start('> ');
        r.context.result = result;
        await new Promise(() => { });
        return result;
    }
    else if (json)
        console.log(JSON.stringify(result, null, 2));
    else
        logger.info(result);
    await saveSession(cashapp, json);
    return result;
}
exports.callAPI = callAPI;
async function saveSessionAs(name) {
    const cashapp = await loadSession();
    await saveSession(cashapp, false, name + '.json');
}
exports.saveSessionAs = saveSessionAs;
async function loadSessionFrom(name) {
    const cashapp = cashapp_1.CashAppClient.fromObject(require(path_1.default.join(process.env.HOME, '.cashapp', name)));
    await saveSession(cashapp);
}
exports.loadSessionFrom = loadSessionFrom;
async function repack(options) {
    const output = options.output || options.o;
    const input = options.input || options.i;
    const cashapp = await loadSession();
    logger.info('repacking apk');
    await (0, pack_1.packAPK)(cashapp, input, output);
    logger.info('output saved to ' + output);
}
exports.repack = repack;
async function callFlow() {
    const cashapp = await loadSession();
    cashapp.flowToken = cashapp_1.CashAppClient.randomCashFlowToken();
    logger.info('flow token: ' + cashapp.flowToken);
    await saveSession(cashapp);
}
exports.callFlow = callFlow;
async function loadFiles(data) {
    const fields = [];
    for (let [k, v] of Object.entries(data)) {
        const parts = /(^.*)FromFile$/.exec(k);
        if (parts) {
            const key = parts[1];
            fields.push([key, await fs_extra_1.default.readFile(v)]);
        }
        else {
            fields.push([k, v]);
        }
    }
    return fields.reduce((r, [k, v]) => {
        r[k] = v;
        return r;
    }, {});
}
exports.loadFiles = loadFiles;
async function runCLI() {
    const [command] = yargs_1.default.argv._;
    const options = Object.assign({}, yargs_1.default.argv);
    delete options._;
    const data = await loadFiles(Object.entries(options).reduce((r, [k, v]) => {
        r[(0, change_case_1.camelCase)(k)] = String(v);
        return r;
    }, {}));
    switch (command) {
        case 'init':
            return await initSession();
            break;
        case 'flow':
            return await callFlow();
            break;
        case 'repack':
            return await repack(data);
            break;
        case 'set-proxy':
            return await setProxy(yargs_1.default.argv._[1]);
            break;
        case 'unset-proxy':
            return await unsetProxy();
            break;
        case 'save':
            return await saveSessionAs(yargs_1.default.argv._[1]);
            break;
        case 'load':
            return await loadSessionFrom(yargs_1.default.argv._[1]);
            break;
        default:
            return await callAPI(yargs_1.default.argv._[0], data);
            break;
    }
}
exports.runCLI = runCLI;
//# sourceMappingURL=cli.js.map