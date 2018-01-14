import { download, repoList } from './utils/git'
import { checkVersion } from './utils/check'
import inquirer from 'inquirer'

export default async function apply(repo) {
	// select the template list
	if(!repo) {
		const data = await repoList()
		const choices = data.map(({name}) => name)
		const answers = await inquirer.prompt([
			{
				type: 'list',
				name: 'repo',
				message: 'which repo do you want to install?',
				choices
			}
		])
		
		repo = answers.repo
		
	}
	
	await download(repo)
}