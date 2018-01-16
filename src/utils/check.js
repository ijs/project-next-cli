import semver from 'semver';
import { engines } from '../../package.json';
import { versions } from './defs';

export const checkRepoVersion = repo => /^[a-z_]+@[0-9]/.test(repo);

export const checkNodeVersion = () => semver.satisfies(versions.node, engines.node);
