import downloadGit from 'download-git-repo'
import ora from 'ora'
import rc from './rc'
import { dirs } from './defs'
import { basename } from 'path'

export const download = async(repo) => {
	let [scaffold] = repo.split('@')
	
	scaffold = basename(scaffold)
	
	repo = repo.split('@').join('#')
	const registry = await rc('registry')
	const url = `${registry}/${repo}`
	const spinner = ora(`download ${repo}`)
	
	spinner.start()
	
	return new Promise((resolve, reject) => {
		downloadGit(url, `${dirs.download}/${scaffold}`, err => {
			if(err) {
				reject(err)
				return
			}
			spinner.succeed()
			resolve()
		})
	})
}