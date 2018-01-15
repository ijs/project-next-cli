import Metalsmith from  'metalsmith'
import consolidate from 'consolidate'

import {  dirs } from './defs'

export default async function apply(repo) {
	var metalsmith = Metalsmith(dirs.tmp)
	.use(ask)
	 .use(template)
	 .build(function(err){
		if (err) throw err;
	});
	
}