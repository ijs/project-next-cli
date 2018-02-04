import Metalsmith from 'metalsmith';
import mkdirp from 'mkdirp';
import { exists } from 'mz/fs';
import { dirs } from '../utils/defs';
import render from './render';

export default async function apply(template, answers) {
  const base = `${dirs.tmp}/${template}`;
  const metalsmith = Metalsmith(base);
  const tmpBuildDir = `${base}/${dirs.metalsmith}`;

  if (!(await exists(tmpBuildDir))) {
    mkdirp.sync(tmpBuildDir);
  }

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

