export default function(absolutePath) {
	const module = require(absolutePath)
	return exports.__esModule && module.default ? module.default : module
}
