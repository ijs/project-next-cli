import { exists, readdir } from 'mz/fs';
import rmfr from 'rmfr';
import inquirer from 'inquirer';
import loading from './utils/loading';
import { dirs } from './utils/defs';

export default async function apply() {
  if (!await exists(dirs.download)) {
    throw new Error(`There is no ${dirs.download}, Please install a template`);
  }

  const list = await readdir(dirs.download);

  if (list.length === 0) {
    throw new Error(`There is no any scaffolds in your local folder ${dirs.download}, install it`);
  }

  const answers = await inquirer.prompt([
    {
      type   : 'confirm',
      name   : 'confirm',
      message: 'Do you want to remove all installed scaffolds?',
      choices: list
    }
  ]);

  if (answers.confirm) {
    const l = loading('removing');

    list.forEach(async dir => await rmfr(`${dirs.download}/${dir}`));

    l.succeed('removed all');
  }
}
