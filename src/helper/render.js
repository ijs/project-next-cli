import consolidate from 'consolidate'

const renderContent = consolidate.swig.render

export default function render(list) {
	return function(files, metalsmith, next) {
		let meta = metalsmith.metadata()
		for(let k in files) {
			if(list.indexOf(k) !== -1) {
				run(k, next)
			}
		}
		
		function run(file, next) {
			const str = files[file].contents.toString()
			
			renderContent(str, meta, (err, res) => {
				if(err) {
					return next(err)
				}
				
				files[file].contents = new Buffer(res)
				next()
			})
		}
	}
	
}