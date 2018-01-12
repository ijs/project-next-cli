import { download } from './utils/git'
import { checkVersion } from './utils/check'

export default async function apply(repo) {
	// select the template list
	if(!repo) {
		
	} else {
		await download(repo)
	}
}