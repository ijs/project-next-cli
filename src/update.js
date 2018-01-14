import { download, tagList } from './utils/git'
import { checkDepVersion } from './utils/check'
import { dirs } from './utils/defs'
import { exists } from 'mz/fs'
import list from './list'
import inquirer from 'inquirer'
import rmfr from 'rmfr'

export default async function apply(repo) {
	if(!repo) {
		throw new Error('repo is empty')
	}
	
	let scaffold, version
	
	if(checkDepVersion(repo)) {
		[scaffold, version] = repo.split('@')
		if(version == 'latest') {
			repo = scaffold
		} else {
			repo = `${scaffold}#v${version}`
		}
	} else {
		scaffold = repo
	}
	
	// TODO: use dropdown list to choice versions
	
	const dir = `${dirs.download}/${scaffold}`
	
	if(!await exists(dir)) {
		throw new Error(`${scaffold} is not installed, please install it`)
	}
	
	
	
	await download(repo)
	await list()
}