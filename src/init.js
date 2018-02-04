import inquirer from 'inquirer';
import rmfr from 'rmfr';
import { readdir, exists } from 'mz/fs';
import { resolve } from 'path';
import { dirs, interfaces } from './utils/defs';
import rc from './utils/rc';
import { runBash, wrapperAsync, betterRequire } from './utils/common';
import copy from './utils/copy';
import loading from './utils/loading';
import metal from './helper/metal';


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
      type   : 'list',
      name   : 'scaffold',
      message: 'which scaffold do you want to init?',
      choices: list
    }, {
      type   : 'input',
      name   : 'dir',
      message: 'project name',
      async validate(input) {
        const done = this.async();

        if (input.length === 0) {
          done('You must input project name');
          return;
        }

        const dir = resolve(process.cwd(), input);

        if (await exists(dir)) {
          done('The project name is already existed. Please change another name');
        }

        done(null, true);
      }
    }
  ]);

  let loader,
    ask,
    hook,
    reply;
  const metalsmith = await rc('metalsmith');
  if (metalsmith) {
    const tmp = `${dirs.tmp}/${answers.scaffold}`;
    // copy the scaffold to temp dir
    await copy(`${dirs.download}/${answers.scaffold}`, tmp);

    // if set the interface/ask.js from scaffold, use it
    // else use default ./helper/metalAsk.js
    try {
      ask = betterRequire(`${tmp}/${interfaces.ask}`);
    } catch (e) {
      ask = betterRequire(resolve(__dirname, './helper/ask.js'));
    }

    if (typeof ask === 'function') {
      ask = ask(answers.scaffold);
    }

    if (!Array.isArray(ask)) {
      throw new Error(`Please ensure your ${answers.scaffold} ${interfaces.ask} is exported with Array or function that was returned an array`);
    }

    reply = await inquirer.prompt(ask);
    await metal(answers.scaffold, reply);

    loader = loading('generating', answers.dir);

    await copy(`${tmp}/${dirs.metalsmith}`, answers.dir);
    await rmfr(tmp);
    await rmfr(`${answers.dir}/${interfaces.dir}`);
    loader.succeed(`generated ${answers.dir}`);

    // support hook function after for developer

    try {
      hook = betterRequire(`${dirs.download}/${answers.scaffold}/${interfaces.hook}`);
    } catch (e) {
      hook = { after() {} };
    }

    hook.after = wrapperAsync(hook.after);

    try {
      const meta = Object.assign({
        dir     : `${process.cwd()}/${answers.dir}`,
        scaffold: answers.scaffold
      }, reply);
      await hook.after(meta, { runBash, loader, inquirer });
    } catch (e) {
      throw e;
    }
  } else {
    loader = loading('generating', answers.dir);
    await copy(`${dirs.download}/${answers.scaffold}`, answers.dir);
    loader.succeed(`generated ${answers.dir}`);
  }
}

