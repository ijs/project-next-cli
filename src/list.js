import { readdir, exists } from 'mz/fs';
import betterRequire from './utils/betterRequire';
import { dirs } from './utils/defs';

export default async function apply() {
  if (!await exists(dirs.download)) {
    throw new Error(`There is no ${dirs.download}, Please install a template`);
  }

  const list = await readdir(dirs.download);

  let version,
    info;
  if (list.length === 0) {
    console.log('');
  }

  list.forEach((dir) => {
    try {
      info = betterRequire(`${dirs.download}/${dir}/package.json`);
      version = info.version;
    } catch (e) {
      version = '0.0.0';
    }

    console.log(`${dir}@${version}`);
  });
}
