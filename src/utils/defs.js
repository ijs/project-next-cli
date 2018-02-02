import os from 'os';
import { name, version, engines } from '../../package.json';

const home = process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];
export const defaults = {
  registry  : 'project-scaffold',
  type      : 'org', // ['org', 'user']
  metalsmith: true
};

export const ua = `${name}-${version}`;

export const dirs = {
  home,
  download  : `${home}/.project`,
  rc        : `${home}/.projectrc`,
  tmp       : os.tmpdir(),
  metalsmith: 'metalsmith',
  interface : 'interface'
};

export const versions = {
  node       : process.version.substr(1),
  nodeEngines: engines.node,
  [name]     : version
};

export const alias = {
  install  : 'i',
  uninstall: 'uni',
  update   : 'up',
  list     : 'ls',
  help     : 'h',
  init     : 'g',
  config   : 'c',
  search   : 's'
};
