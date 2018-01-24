import Metalsmith from 'metalsmith';
import inquirer from 'inquirer';
import mkdirp from 'mkdirp';
import { exists } from 'mz/fs';
import { execSync } from 'child_process';
import { dirs } from '../utils/defs';
import ask from './metalAsk';
import render from './render';

export default async function apply(template) {
  const base = `${dirs.tmp}/${template}`;
  const metalsmith = Metalsmith(base);
  const tmpBuildDir = `${base}/${dirs.metalsmith}`;

  if (!(await exists(tmpBuildDir))) {
    mkdirp.sync(tmpBuildDir);
  }

  let user = execSync('git config --global user.name', { encoding: 'utf-8' });
  let email = execSync('git config --global user.email', { encoding: 'utf-8' });

  user = user.trim();
  email = email.trim();

  const answers = await inquirer.prompt(ask({ template, user, email }));

  return new Promise((resolve, reject) => {
    metalsmith
	  .metadata(answers)
      .source('./')
      .destination(tmpBuildDir)
      .clean(false)
      .use(render())
      .build((err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(true);
      });
  });
}

