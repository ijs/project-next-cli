import minimist from 'minimist'
import { alias, versions } from './utils/defs'
import { checkNodeVersion } from './utils/check'
import need from './utils/betterRequire'
import { resolve } from 'path'

if(!checkNodeVersion()) {
	throw new Error(`Node version is invalid. Please use Node ${versions.nodeEngines} `)
}

const argv = minimist(process.argv.slice(2))

;(async function() {
	try {
		let [command, ...args] = argv._
		if(alias[command]) {
			command = alias[command]
		}
		
		await need(resolve(__dirname, `./${command}`))(...args)
	} catch(e) {
		console.log(e)
	}
})()