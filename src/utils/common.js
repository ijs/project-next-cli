
import { exec } from 'child_process';

export function wrapperAsync(fn) {
  if (fn.constructor.name === 'AsyncFunction') {
    return fn;
  }

  return function _promisify(...args) {
    return new Promise(((resolve) => {
      resolve(fn(...args));
    }));
  };
}


export function runBash(bash, options = {}) {
  return new Promise((resolve, reject) => {
    const p = exec(bash, options, (error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
    p.stderr.pipe(process.stderr);
    p.stdout.pipe(process.stdout);
  });
}

export function betterRequire(absolutePath) {
  /* eslint-disable */
  const module = require(absolutePath);
  return exports.__esModule && module.default ? module.default : module;
}
