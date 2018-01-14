import downloadGit from 'download-git-repo'
import ora from 'ora'
import rc from './rc'
import { dirs, ua } from './defs'
import request from 'request'
import { basename } from 'path'

export const repoList = async() => {
	const type = await rc('type')
	const api = `https://api.github.com/${type}s/chef-template/repos`
	
	return new Promise((resolve, reject) => {
		request({
			url: api,
			method: 'GET',
			headers: {
				'User-Agent': `${ua}`
			}
		}, (err, res, body) => {
			if(err) {
				reject(err)
				return
			}
			resolve(JSON.parse(body))
		})
	})
}

export const tagList = async(repo) => {
	const {url, scaffold} = await getGitInfo(repo)
	const api = `https://api.github.com/repos/${url}/tags`
	
	return new Promise((resolve, reject) => {
		request({
			url: api,
			method: 'GET',
			headers: {
				'User-Agent': `${ua}-${scaffold}`
			}
		}, (err, res, body) => {
			if(err) {
				reject(err)
				return
			}
			console.log(body)
			resolve(body)
			
		})
	})
}

export const download = async(repo) => {
	const {url, scaffold} = await getGitInfo(repo)
	
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

const getGitInfo = async(repo) => {
	let [scaffold] = repo.split('@')
	
	scaffold = basename(scaffold)
	
	repo = repo.split('@').join('#')
	const registry = await rc('registry')
	const url = `${registry}/${repo}`
	return {
		url,
		scaffold
	}
}