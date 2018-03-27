import Metalsmith from 'metalsmith';
import render from './render';

export default async function apply(src, dest, answers) {
  const metalsmith = Metalsmith(src);

  return new Promise((resolve, reject) => {
    metalsmith
	  .metadata(answers)
      .source('./')
      .destination(dest)
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

