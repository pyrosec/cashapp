"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.packAPK = void 0;
const child_process_1 = __importDefault(require("child_process"));
const path_1 = __importDefault(require("path"));
const glob_1 = __importDefault(require("glob"));
const mkdirp_1 = __importDefault(require("mkdirp"));
const fs_1 = __importDefault(require("fs"));
const rimraf_1 = __importDefault(require("rimraf"));
const regexpFromHeader = (header) => RegExp("const-string\\s(v\\d+), \"" + header + "\"");
function injectHeader(lines, header, s) {
    const regexp = regexpFromHeader(header);
    const i = lines.findIndex((v) => v.match(regexp));
    const register = lines[i].match(regexp)[1];
    lines.slice(i + 1).findIndex((v, index, ary) => {
        const groups = v.match(/invoke-(?:virtual|static) {(.*?), (.*?), (.*?)}/);
        if (groups && groups[2] === register) {
            lines = lines.slice(0, i + 1 + index).concat('    const-string ' + groups[3] + ', "' + s + '"').concat(lines.slice(i + 1 + index));
            return true;
        }
    });
    return lines;
}
async function packAPK(cashapp, filepath, output) {
    const cwd = process.cwd();
    mkdirp_1.default.sync(path_1.default.join(cwd, '.tmp'));
    process.chdir(path_1.default.join(cwd, '.tmp'));
    child_process_1.default.spawnSync('apktool', ['d', '-r', path_1.default.join(cwd, filepath)], { stdio: 'inherit', env: process.env });
    const directory = fs_1.default.readdirSync(process.cwd())[0];
    const interceptorFilepath = glob_1.default.sync(path_1.default.join(process.cwd(), '**', 'CashApiInterceptor.smali'))[0];
    const interceptor = fs_1.default.readFileSync(interceptorFilepath, 'utf8');
    let lines = interceptor.split('\n');
    lines = injectHeader(lines, "Authorization", cashapp.authorization);
    lines = injectHeader(lines, "X-Device-ID", cashapp.xDeviceId);
    lines = injectHeader(lines, "Square-Device-Info", cashapp.squareDeviceInfo);
    lines = injectHeader(lines, "X-Device-Name", cashapp.device.name);
    lines = injectHeader(lines, "Time-Zone", cashapp._getTimezone());
    lines = injectHeader(lines, "Accept-Language", "en-US");
    lines = injectHeader(lines, "DRM-ID", cashapp.drmId);
    fs_1.default.writeFileSync(interceptorFilepath, lines.join('\n'));
    const commonInterceptorFilepath = glob_1.default.sync(path_1.default.join(process.cwd(), '**', 'CommonInterceptor.smali'))[0];
    const commonInterceptor = fs_1.default.readFileSync(commonInterceptorFilepath, 'utf8');
    lines = commonInterceptor.split('\n');
    lines = injectHeader(lines, "User-Agent", cashapp._getUserAgent());
    fs_1.default.writeFileSync(commonInterceptorFilepath, lines.join('\n'));
    process.chdir(cwd);
    child_process_1.default.spawnSync('apktool', ['b', '--force-all', '-o', path_1.default.join(cwd, output), path_1.default.join(cwd, ".tmp", directory)], { stdio: 'inherit' });
    rimraf_1.default.sync(path_1.default.join(cwd, '.tmp'));
}
exports.packAPK = packAPK;
//# sourceMappingURL=pack.js.map