import { resolve } from 'path';
import { versions } from './utils/defs';
import { checkNodeVersion } from './utils/check';
import { betterRequire } from './utils/common';

if (!checkNodeVersion()) {
  throw new Error(`Node version is invalid. Please use Node ${versions.nodeEngines} `);
}

export default async function apply(command, ...args) {
  try {
    await betterRequire(resolve(__dirname, `./${command}`))(...args);
  } catch (e) {
    console.log(e);
  }
}
