import os from 'os';
import { name, version, engines } from '../../package.json';

const home = process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];
export const defaults = {
  registry: 'project-scaffold',
  type: 'org', // ['org', 'user']
  metalsmith: true
};

export const ua = `${name}-${version}`;

export const dirs = {
  home,
  download: `${home}/.project`,
  rc: `${home}/.projectrc`,
  tmp: os.tmpdir(),
  metalsmith: 'metalsmith'
};

export const versions = {
  node: process.version.substr(1),
  nodeEngines: engines.node,
  [name]: version
};

export const alias = {
  i: 'install',
  uni: 'uninstall',
  up: 'update',
  ls: 'list',
  h: 'help'
};
