import { readdir } from 'mz/fs';
import { dirs } from './utils/defs';

export default async function apply() {
  const list = await readdir(dirs.download);
  let version,
    info;
    /* eslint-disable */
  for (const dir of list) {
    try {
      info = require(`${dirs.download}/${dir}/package.json`);
      version = info.version;
    } catch (e) {
      version = '0.0.0';
    }
    console.log(`${dir}@${version}`);
  }
}
