#!/usr/bin/env node
'use strict';

const fs = require('fs');

(async () => {
  const lines = fs.readFileSync(process.argv[2], 'utf8').split('\n');
  let length = lines.length;
  const seen = {};
  for (let i = 0; i < length; i++) {
    const line = lines[i];
    if (line.match(/message\s*\S+\s*{/) || line.match(/enum\s*\S+\s*{/)) {
      const hasSeen = seen[line];
      seen[line] = true;
      if (hasSeen) {
        while (true) {
          const [ value ] = lines.splice(i, 1);
          length--;
          if (value === '}') break;
	}
      }
    }
  }
  console.log(lines.join('\n'));
})().catch(console.error);
  
