import { engines } from '../../package.json'
import  { versions } from './defs'
import semver from 'semver'
export const checkRepoVersion = (repo) => {
	return /^[a-z_]+\@[0-9]/.test(repo)
}

export const checkNodeVersion = () => {
	return semver.satisfies(versions.node, engines.node)
}