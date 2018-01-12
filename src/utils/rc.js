import { defaults, dirs } from './defs'
import { readFile, writeFile, exists } from 'mz/fs'
import ini from 'ini'

export default async function apply(k, v) {
	if(k.length === 0) {
		throw new Error('rc k is empty')
	}
	
	const isExist = await exists(dirs.rc)
	
	if(v.length === 0) {
		if(!isExist) return
		
		const config = ini.parse(await readFile(dirs.rc))
		return config[k] || defaults[k]
		
	} else if(k.length > 0 && v.length > 0) {
		let config
		if(!isExist) {
			config = {}
			await writeFile(dirs.rc, ini.stringify({}))
		} else {
			config = ini.parse(await readFile(dirs.rc))
		}
		
		const setting = Object.assign({}, config, {[k]: v})
		await writeFile(dirs.rc, ini.stringify(setting))
		
	}
}

