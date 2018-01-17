import { readdir, exists } from 'mz/fs';
import { dirs } from './utils/defs';

export default async function apply() {
  if (!await exists(dirs.download)) {
    throw new Error(`There is no ${dirs.download}, Please install a template`);
  }
  
  const list = await readdir(dirs.download);
  let version,
    info;
    /* eslint-disable */
    
  if(list.length == 0) {
    console.log('')
  }
    
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
