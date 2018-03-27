module.exports = {
  extends    : ['@commitlint/config-conventional'],
  'type-enum': [
    'build',
    'chore',
    'ci',
    'docs',
    'feat',
    'fix',
    'perf',
    'refactor',
    'revert',
    'style',
    'test',
    'release'
  ]
};
