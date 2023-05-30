import { CashAppClient } from "./cashapp";
import yargs from "yargs";
import { camelCase } from "change-case";
import fs from "fs-extra";
import util from "util";
import url from "url";
import "setimmediate";
import mkdirp from "mkdirp"
import path from "path";
import { packAPK } from "./pack";
import { getLogger } from "./logger";

const logger = getLogger();

export async function saveSession(cashapp, json = false, filename = 'session.json') {
  await mkdirp(path.join(process.env.HOME, '.cashapp'));

  await fs.writeFile(path.join(process.env.HOME, '.cashapp', filename), cashapp.toJSON());
  if (!json) logger.info('saved to ~/' + path.join('.cashapp', filename));
}
  

export async function initSession() {
  const proxyOptions = await loadProxy();
  const cashapp = await CashAppClient.initialize({ proxyOptions });
  logger.info('device details:');
  logger.info(cashapp.squareDeviceInfo);
  logger.info(cashapp.xDeviceId);
  logger.info('getting session');
  await cashapp.initiateSession();
  logger.info('got JWT!');

  logger.info(cashapp.authorization);
  await saveSession(cashapp);
}

export async function loadSession() {
  const proxyOptions = await loadProxy();
  const cashapp = CashAppClient.fromJSON(await fs.readFile(path.join(process.env.HOME, '.cashapp', 'session.json')));
  cashapp.proxyOptions = proxyOptions;
  return cashapp;
}

const proxyStringToObject = (proxyUri: string) => {
  const parsed = url.parse(proxyUri);
  const [ username, ...passwordParts ] = (parsed.auth || '').split(':')
  return {
    hostname: parsed.hostname,
    port: parsed.port,
    userId: username || null,
    password: passwordParts.join(':') || null
  };
};

const objectToProxyString = (o: any) => {
  return 'socks5://' + (o.userId ? o.userId + ':' + o.password + '@' : '') + o.hostname + (o.port ? ':' + o.port : '');
};


export async function setProxy(proxyUri: string) {
  await mkdirp(path.join(process.env.HOME, '.cashapp'));
  const proxyOptions = proxyStringToObject(proxyUri);
  const joined = objectToProxyString(proxyOptions);
  await fs.writeFile(path.join(process.env.HOME, '.cashapp', 'proxy'), joined);
  logger.info('set-proxy: ' + joined);
}

export async function unsetProxy() {
  await mkdirp(path.join(process.env.HOME, '.cashapp'));
  await fs.unlink(path.join(process.env.HOME, '.cashapp', 'proxy'));
  logger.info('unset-proxy');
}

export async function loadProxy() {
  await mkdirp(path.join(process.env.HOME, '.cashapp'));
  try {
    return proxyStringToObject(await fs.readFile(path.join(process.env.HOME, '.cashapp', 'proxy'), 'utf8'));
  } catch (e) {
    return null;
  }
}


export async function callAPI(command, data) {
  const cashapp = await loadSession();
  const camelCommand = camelCase(command);
  const json = data.j || data.json;
  const repl = data.repl;
  delete data.j
  delete data.json;
  delete data.repl;
  if (!cashapp[camelCommand]) throw Error('command not foud: ' + command);
  const result = await cashapp[camelCommand](data);
  if (repl) {
    const r = require('repl').start('> ');
    r.context.result = result;
    await new Promise(() => {});
    return result;
  } else if (json) console.log(JSON.stringify(result, null, 2));
  else logger.info(result);
  await saveSession(cashapp, json);
  return result;
}

export async function saveSessionAs(name) {
  const cashapp = await loadSession();
  await saveSession(cashapp, false, name + '.json');
}

export async function loadSessionFrom(name) {
  const cashapp = CashAppClient.fromObject(require(path.join(process.env.HOME, '.cashapp', name)));
  await saveSession(cashapp);
}
  

export async function repack(options) {
  const output = options.output || options.o;
  const input = options.input || options.i;
  const cashapp = await loadSession();
  logger.info('repacking apk');
  await packAPK(cashapp, input, output);
  logger.info('output saved to ' + output);
}


export async function callFlow() {
  const cashapp = await loadSession();
  cashapp.flowToken = CashAppClient.randomCashFlowToken();
  logger.info('flow token: ' + cashapp.flowToken);
  await saveSession(cashapp);
}

export async function loadFiles(data: any) {
  const fields = [];
  for (let [ k, v ] of Object.entries(data)) {
    const parts = /(^.*)FromFile$/.exec(k);
    if (parts) {
      const key = parts[1];
      fields.push([key, await fs.readFile(v)]);
    } else {
      fields.push([k, v]);
    }
  }
  return fields.reduce((r, [k, v]) => {
    r[k] = v;
    return r;
  }, {});
}
      

export async function runCLI() {
  const [ command ] = yargs.argv._;
  const options = Object.assign({}, yargs.argv);
  delete options._;
  const data = await loadFiles(Object.entries(options).reduce((r, [ k, v ]) => {
    r[camelCase(k)] = String(v);
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
      return await setProxy(yargs.argv._[1]);
      break;
    case 'unset-proxy':
      return await unsetProxy();
      break;
    case 'save':
      return await saveSessionAs(yargs.argv._[1]);
      break;
    case 'load':
      return await loadSessionFrom(yargs.argv._[1]);
      break;
    default: 
      return await callAPI(yargs.argv._[0], data);
      break;
  }
}
