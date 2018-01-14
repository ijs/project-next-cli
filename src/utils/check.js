import { engines } from '../../package.json'
import  { versions } from './defs'
import semver from 'semver'
export const checkDepVersion = (repo) => {
	return /^[a-z_]+\@[a-z\.0-9]*/.test(repo)
}

export const checkNodeVersion = () => {
	return semver.satisfies(versions.node, engines.node)
}