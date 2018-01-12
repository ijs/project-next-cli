export default function(path) {
	const module = require(path)
	return exports.__esModule && module.default ? module.default : module
}