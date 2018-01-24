import ini from 'ini';
import { readFile, writeFile, exists } from 'mz/fs';
import { defaults, dirs } from './defs';

const emptyValues = {
  undefined: true,
  null     : true,
  0        : true
};

export default async function apply(k, v, remove) {
  let config,
    content,
    setting;
  const isExist = await exists(dirs.rc);

  if (!k || k.length === 0) {
    if (!isExist) {
      content = ini.stringify(defaults);
      await writeFile(dirs.rc, content);
      return content;
    }
    return await readFile(dirs.rc, 'utf-8');
  }

  if (remove) {
    config = ini.parse(await readFile(dirs.rc, 'utf-8'));
    if (config[k]) {
      delete config[k];
      setting = Object.assign({}, config, { [k]: v });
      await writeFile(dirs.rc, ini.stringify(setting));
    }
    return true;
  }


  if (!v || v.length === 0) {
    if (!isExist) return defaults[k];

    config = ini.parse(await readFile(dirs.rc, 'utf-8'));

    return emptyValues[config[k]] ? defaults[k] : config[k];
  } else if (k.length > 0 && v.length > 0) {
    let config;
    if (!isExist) {
      config = {};
    } else {
      config = ini.parse(await readFile(dirs.rc, 'utf-8'));
    }

    setting = Object.assign({}, config, { [k]: v });
    await writeFile(dirs.rc, ini.stringify(setting));
  }
}
