import downloadGit from 'download-git-repo'

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
			const data = JSON.parse(body)
			if(data.message === 'Not Found') {
				reject(new Error(`${url} is not found`))
			} else {
				resolve(data)
			}
		})
	})
}

export const tagList = async repo => {
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
			
			const data = JSON.parse(body)
			if(data.message === 'Not Found') {
				reject(new Error(`${url} is not found`))
			} else {
				resolve(data)
			}
		})
	})
}

export const exist = async repo => {
	
}
export const download = async repo => {
	const {url, scaffold} = await getGitInfo(repo)
	
	return new Promise((resolve, reject) => {
		downloadGit(url, `${dirs.download}/${scaffold}`, err => {
			if(err) {
				reject(err)
				return
			}
			resolve()
		})
	})
}

const getGitInfo = async repo => {
	let [scaffold] = repo.split('@')
	
	scaffold = basename(scaffold)
	
	repo = repo.split('@').filter(Boolean).join('#')
	const registry = await rc('registry')
	const url = `${registry}/${repo}`
	return {
		url,
		scaffold
	}
}
