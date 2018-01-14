import inquirer from 'inquirer'
import { dirs } from './utils/defs'
import { readdir } from 'mz/fs'
import { resolve } from 'path'
import { exists } from 'mz/fs'
import { ncp } from 'ncp'

export default async function apply() {
	const list = await readdir(dirs.download)
	
	if(list.length === 0) {
		throw new Error(`There is no any scaffolds in your local folder ${dirs.download}, install it`)
	}
	
	const answers = await inquirer.prompt([
		{
			type: 'list',
			name: 'scaffold',
			message: 'which scaffold do you want to init?',
			choices: list
		}, {
			type: 'input',
			name: 'dir',
			message: 'project name',
			validate: async function(input) {
				const done = this.async()
				
				if(input.length == 0) {
					done('You must input project name')
					return
				}
				
				const dir = resolve(process.cwd(), input)
				
				if(await exists(dir)) {
					done('The project name is already existed. Please change another name')
				}
				
				done(null, true)
			}
		}
	])
	
	await copy(`${dirs.download}/${answers.scaffold}`, answers.dir)
	console.log('generate successfully')
}

function copy(src, dest) {
	return new Promise((resolve, reject) => {
		ncp(src, dest, function(err) {
			if(err) {
				reject(err)
				return
			}
			resolve()
		})
	})
}