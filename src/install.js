import inquirer from 'inquirer';
import { download, repoList, tagList } from './utils/git';
import { rc } from './utils/defs';
import loading from './utils/loading';

export default async function apply() {
  let loader,
    choices,
    answers,
    version;

  loader = loading('repo list fetching');
  const repos = await repoList();
  loader.succeed();

  if (repos.length === 0) {
    const registry = await rc('registry');
    throw new Error(`There is no any scaffolds in https://github.com/${registry}. Please create and try`);
  }

  choices = repos.map(({ name }) => name);
  answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'repo',
      message: 'which repo do you want to install?',
      choices
    }
  ]);

  const repo = answers.repo;

  loader = loading('tag list fetching', repo);
  const tags = await tagList(repo);
  loader.succeed();

  if (tags.length === 0) {
    version = '';
  } else {
    choices = tags.map(({ name }) => name);

    answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'version',
        message: 'which version do you want to install?',
        choices
      }
    ]);
    version = answers.version;
  }

  loader = loading('downloading', repo);
  await download([repo, version].join('@'));
  loader.succeed(`downloaded ${repo}`);
}
