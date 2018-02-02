import program from 'commander';
import project from './index';
import { version } from '../package.json';
import { dirs, alias } from './utils/defs';
import rc from './utils/rc';

function help() {
  console.log('');
  console.log('  How to use:');
  console.log();
  console.log('    - project install');
  console.log('    - project init');
  console.log('    - project update');
  console.log('    - project search');
  console.log('    - project uninstall <installed template>');
  console.log('    - project config set <k> <v>');
  console.log('    - project config remove <k>');
  console.log('    - project config get <k>');
  console.log('    - project config help');
  console.log();
}

function registeredProgram(commander, type, typeInfo) {
  commander
    .command(type)
    .description(typeInfo[type])
    .alias(alias[type])
    .action(async () => {
      try {
        if (type === 'config') {
          await project('config', ...process.argv.slice(3));
        } else if (type === 'help') {
          help();
        } else {
          await project(type);
        }
      } catch (e) {
        console.log(e);
      }
    });

  return commander;
}

try {
  (async function run() {
    const registry = await rc('registry');
    const programTypes = {
      install  : `install remote templates from https://github.com/${registry}`,
      uninstall: `uninstall a installed template in ${dirs.download}`,
      init     : 'generate a new project from a template',
      clear    : 'clear all installed template',
      update   : `update the installed template in ${dirs.download}`,
      list     : 'list installed template',
      search   : 'search the templates from your github organization/user',
      help     : 'more help info:',
      config   : `${dirs.rc} config file set and get`,
      '*'      : 'The command is not found'
    };
    program.version(version)
      .usage('<command> [options]');

    Object.keys(programTypes)
      .reduce((pre, type) => registeredProgram(pre, type, programTypes), program);

    program.on('-h', help);
    program.on('--help', help);

    program.parse(process.argv);
  }());
} catch (e) {
  console.log(e);

  help();
}

