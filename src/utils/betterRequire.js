export default function (absolutePath) {
  /* eslint-disable */
  const module = require(absolutePath);
  return exports.__esModule && module.default ? module.default : module;
}
