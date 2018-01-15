import program  from 'commander'
import project from './index'
import { version } from '../package.json'
import { dirs } from './utils/defs'
import rc from './utils/rc'

try{
	;(async function() {
		const registry = await rc('registry')
		program.version(version)
		        .usage('<command> [options]')
		
		program.command('install')
		        .description(`install remote templates from https://github.com/${registry}`)
		        .alias('i')
		        .action(async function() {
			await project('install')
		})
		
		program.command('uninstall <repo>')
		        .description(`uninstall installed templates in ${dirs.download}`)
		        .alias('uni')
		        .action(async function(repo) {
			await project('uninstall', repo)
		})
		
		program.command('init')
		        .description('generate a new project from a template')
		        .action(async function() {
			await project('init')
		})
		
		program.command('update')
		        .description(`update the installed template in ${dirs.download}`)
						.alias('up')
		        .action(function() {
			project('update')
		})
		
		program.command('list')
		        .alias('ls')
		        .description('list installed template')
		        .action(function() {
			project('list')
		})
		
		
		program.command('config')
		        .description(`${dirs.rc} config file set and get`)
		        .action(async function(){
			const argv = process.argv.slice(3)
			await project('config', ...argv)
		})
		
		program.command('help')
		        .description(`more help info:`)
		        .action(help)
		
		
		program.on('-h', help)
		program.on('--help', help)
		
		program.command('*')
		        .description('The command is not found')
		        .action(help)
		
		program.parse(process.argv)
		
	})()
}catch(e) {
	console.log(e)
	
	help()
}

function help() {
	console.log('')
	console.log('  How to use:')
	console.log()
	console.log('    $ project install')
	console.log('    $ project init')
	console.log('    $ project update')
	console.log('    $ project uninstall <installed template>')
	console.log('    $ project config set <k> <v>')
	console.log('    $ project config remove <k>')
	console.log('    $ project config get <k>')
	console.log('    $ project config help')
	console.log()
}