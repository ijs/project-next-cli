import { download, tagList } from './utils/git'
import { checkRepoVersion } from './utils/check'
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
	
	// update the known version
	if(checkRepoVersion(repo)) {
		[scaffold, version] = repo.split('@')
		if(version == 'latest') {
			repo = scaffold
		} else {
			repo = [scaffold, version].join('#')
		}
	} else {
		scaffold = repo
	}
	
	const dir = `${dirs.download}/${scaffold}`
	
	if(!await exists(dir)) {
		throw new Error(`${scaffold} is not installed, please install it`)
	}
	
	await download(repo)
	await list()
}