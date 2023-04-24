import { CashAppClient } from "./cashapp";
import child_process from "child_process";
import path from "path";
import glob from "glob";
import mkdirp from "mkdirp";
import fs from "fs";
import rimraf from "rimraf";

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

export async function packAPK(cashapp: CashAppClient, filepath: string, output: string) {
  const cwd = process.cwd();
  mkdirp.sync(path.join(cwd, '.tmp'));
  process.chdir(path.join(cwd, '.tmp'));
  child_process.spawnSync('apktool', ['d', '-r', path.join(cwd, filepath)], { stdio: 'inherit', env: process.env })
  const directory = fs.readdirSync(process.cwd())[0];
  const interceptorFilepath = glob.sync(path.join(process.cwd(), '**', 'CashApiInterceptor.smali'))[0];
  const interceptor = fs.readFileSync(interceptorFilepath, 'utf8');

  let lines = interceptor.split('\n');
  lines = injectHeader(lines, "Authorization", cashapp.authorization);
  lines = injectHeader(lines, "X-Device-ID", cashapp.xDeviceId);
  lines = injectHeader(lines, "Square-Device-Info", cashapp.squareDeviceInfo);
  lines = injectHeader(lines, "X-Device-Name", cashapp.device.name);
  lines = injectHeader(lines, "Time-Zone", cashapp._getTimezone());
  lines = injectHeader(lines, "Accept-Language", "en-US");
  lines = injectHeader(lines, "DRM-ID", cashapp.drmId);
  fs.writeFileSync(interceptorFilepath, lines.join('\n'));
  const commonInterceptorFilepath = glob.sync(path.join(process.cwd(), '**', 'CommonInterceptor.smali'))[0];
  const commonInterceptor = fs.readFileSync(commonInterceptorFilepath, 'utf8');
  lines = commonInterceptor.split('\n');
  lines = injectHeader(lines, "User-Agent", cashapp._getUserAgent());
  fs.writeFileSync(commonInterceptorFilepath, lines.join('\n'));
  process.chdir(cwd);
  child_process.spawnSync('apktool', ['b', '--force-all', '-o', path.join(cwd, output), path.join(cwd, ".tmp", directory)], { stdio: 'inherit' });
  rimraf.sync(path.join(cwd, '.tmp'));
}
