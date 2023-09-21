import protobuf from 'protobufjs';
import api = require('./api.json');

const protocol = (protobuf.Root as any).fromJSON(api).nested.cashapp;

export { protocol }
