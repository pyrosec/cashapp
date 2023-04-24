#!/usr/bin/env node
'use strict';

const fs = require('fs');
const glob = require('glob');
const path = require('path');

const whitespaceCount = (s) => {
  let amount = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === ' ') amount++;
    else return amount;
  }
  return amount;
};

const chopUp = (text) => {
  return text.split('\n').filter((v) => !v.match(/^\s*#/)).filter(Boolean);
};

const indentNest = (lines) => {
  const result = [];
  let stack = [result];
  lines.forEach((() => {
    let indent = 0;
    return (v) => {
      const thisIndent = whitespaceCount(v);
      if (indent === thisIndent) stack[0].push(v.trim());
      else if (thisIndent > indent) {
        const newItem = [ v.trim() ];
        stack[0].push(newItem);
        stack.unshift(newItem);
        indent = thisIndent;
      } else {
        stack.shift();
        stack[0].push(v.trim());
        indent = thisIndent;
      }
    };
  })());
  return result;
};

const extractFields = (lines) => {
  const result = [];
  let ptr;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const match = typeof line === 'string' && line.match(/\.field public final (\S+):(\S+);$/) 
    if (match) {
      result.push((ptr = [ match[1], match[2] ]));
    } else if (Array.isArray(line) && ptr) {
      ptr.push(line[1]);
      ptr = null;
    }
  }
  return result;
};
        
const findName = (lines) => {
  const title = lines.find((v) => v.match(/^\s*\.class/));
  const parts = title.match(/([^/;]+)/g);
  return parts[parts.length - 1];
};

const isEnum = (lines) => {
  const title = lines.find((v) => v.match(/^\s*\.super/));
  if (!title) return false;
  const parts = title.match(/([^/;]+)/g);
  return parts[parts.length - 1] === 'Enum';
};

const extractNumber = (line) => {
  const match = line.match(/(0x[a-f0-9]+)/g);
  return Number(match[0]);
};

const findTag = (lines) => {
  return lines.find((v) => v.match('tag ='));
};

const findAdapter = (lines) => {
  return lines.find((v) => v.match('adapter ='));
};

const getAdapterClassName = (adapter) => {
  const parts = adapter.match(/[^"]+/g);
  const broken = parts[parts.length - 1].match(/[^\.#]+/g);
  const mainType = broken[broken.length - 1];
  switch (mainType) {
    case 'STRING':
      return 'string';
    case 'INT32':
      return 'int32';
    case 'BYTES':
      return 'bytes';
    case 'FLOAT':
      return 'float';
    case 'DOUBLE':
      return 'double';
  }
  return broken[broken.length - 2];
};

const fieldToObject = (field) => {
  let typeName = field[1];
  if (typeName === 'Ljava/util/List') {
    const adapter = findAdapter(field[2]);
    typeName = 'repeated ' + getAdapterClassName(adapter);
  }
  return {
    typeName,
    name: field[0],
    number: Array.isArray(field[2]) ? extractNumber(findTag(field[2])) : 1
  };
};

const javaNameMap = {
  'Ljava/lang/String': 'string',
  'Ljava/lang/Boolean': 'bool',
  'Ljava/lang/Integer': 'int32',
  'Ljava/lang/Long': 'int64',
  'Ljava/lang/Float': 'float',
  'Ljava/lang/Double': 'double',
  'Lokio/ByteString': 'bytes'
};

const getJVMName = (v) => {
  const parts = v.match(/[^/;]+/g);
  if (!parts) return null;
  return parts[parts.length - 1];
};

const getClassName = (v) => {
  return getJVMName(v).replace(/\$/g, '');
};

const getFilename = (v) => {
  return getJVMName(v) + '.smali';
};

const seen = {};

const back = (ary) => ary[ary.length - 1];

const javaNameToProtobufName = (name) => {
  if (javaNameMap[name]) return javaNameMap[name];
  const filename = getFilename(back(name.split(/\s/)));
  const hasVisited = seen[filename];
  seen[filename] = true;
  if (!hasVisited) try {
    outputSingleProtobufFromDirectory(directory, filename);
  } catch (e) {
    console.error(e);
  }
  return javaNameMap[name] || getClassName(name) || 'unknown';
};

const toProtobuf = (name, fieldObjects) => {
  const list = fieldObjects.slice().sort((a, b) => a.number - b.number);
  const definition = 'message ' + name + ' {\n' + list.map((v) => javaNameToProtobufName(v.typeName) + ' ' + v.name + ' = ' + v.number + ';').map((v) => '  ' + v).join('\n') + '\n}';
  const lines = definition.split('\n').map((v) => v.trim()).filter(Boolean);
  if (lines.length === 2) return lines.join('');
  return definition;
};

const extractEnum = (ctor) => {
  const result = [];
  for (let i = 0; i < ctor.length; i++) {
    const line = ctor[i];
    const split = line.split(' ');
    if (split[0] === 'const/4' && result.length) result[result.length - 1].value = Number(split[split.length - 1]);
    const match = ctor[i].match(/"([^"]+)"/);
    if (match) {
      result.push({ label: match[1] });
    }
  }
  if (!result.length) return [];
  let start = result[0].value;
  return result.map((v, i) => {
    return {
      label: v.label,
      value: start + i
    };
  });
};

const getProtobufEnum = (name, indented) => {
  const ctor = indented[indented.findIndex((v) => typeof v === 'string' && v.match('constructor')) + 1];
  const fields = extractEnum(ctor);
  if (!fields.length) {
    const label =  indented.find((v) => typeof v === 'string' && v.match('.field public static final enum'));
    if (label) {
      const words = label.split(':')[0].split(/\s/g);
      fields.push({
        label: words[words.length - 1],
        value: 0
      });
    }
  }
  return fieldsToEnum(name.replace(/\$/g, ''), fields);
};

const fieldsToEnum = (name, fields) => {
  return 'enum ' + name + ' {\n  option allow_alias = true;\n' + fields.map((v) => '  ' + v.label + ' = ' + v.value + ';').join('\n') + '\n}';
};

let directory = path.join(process.cwd());
const outputProtobufFromDirectory = (directory, filename) => {
  const globResult = glob.sync(path.join(directory, '**', filename));
  globResult.forEach((v) => {
    outputProtobuf(v);
  });
};
const outputSingleProtobufFromDirectory = (directory, filename) => {
  const globResult = glob.sync(path.join(directory, '**', filename))
  outputProtobuf(globResult.find((v) => v.match('smali_classes5')) || globResult[0]);
};

const outputProtobuf = (filename) => {
  const file = fs.readFileSync(filename, 'utf8');
  const lines = chopUp(file);
  const name = findName(lines);
  const indented = indentNest(lines);
  if (isEnum(lines)) {
    console.log(getProtobufEnum(name, indented));
  } else {
    const fields = extractFields(indented).map((v) => fieldToObject(v));
    console.log(toProtobuf(name.replace(/\$/g, ''), fields));
  }
};

(async () => {
  if (process.env.SINGLE) return outputProtobuf(process.argv[2]);
  outputProtobufFromDirectory(path.join(process.cwd(), process.argv[2]), '*Request.smali');
  outputProtobufFromDirectory(path.join(process.cwd(), process.argv[2]), '*Response.smali');
})().catch(console.error);
