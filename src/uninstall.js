import { exists, readdir } from 'mz/fs';
import rmfr from 'rmfr';
import inquirer from 'inquirer';
import { dirs } from './utils/defs';
import loading from './utils/loading';

export default async function apply(scaffold) {
  if (!await exists(dirs.download)) {
    throw new Error(`There is no ${dirs.download}, Please install a template`);
  }
	
  const list = await readdir(dirs.download);
	
  if (list.length === 0) {
    throw new Error(`There is no any scaffolds in your local folder ${dirs.download}, install it`);
  }
	
  const answers = await inquirer.prompt([
    {
      type   : 'list',
      name   : 'scaffold',
      message: 'which scaffold do you want to uninstall it ?',
      choices: list
    }
  ]);
	
  if (answers.scaffold) {
    const l = loading(`removing ${answers.scaffold}`);
    await rmfr(`${dirs.download}/${answers.scaffold}`);
    l.succeed(`removed ${answers.scaffold}`);
  }
}
