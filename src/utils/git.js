import downloadGit from 'download-git-repo';
import request from 'request';
import { basename } from 'path';

import rc from './rc';
import { dirs, ua } from './defs';

function fetch(api) {
  return new Promise((resolve, reject) => {
    request({
      url    : api,
      method : 'GET',
      headers: {
        'User-Agent': `${ua}`
      }
    }, (err, res, body) => {
      if (err) {
        reject(err);
        return;
      }

      const data = JSON.parse(body);
      if (data.message === 'Not Found') {
        reject(new Error(`${api} is not found`));
      } else {
        resolve(data);
      }
    });
  });
}

const getGitInfo = async (repo) => {
  let template = repo;
  let [scaffold] = template.split('@');

  scaffold = basename(scaffold);

  template = template.split('@').filter(Boolean).join('#');
  const registry = await rc('registry');
  const url = `${registry}/${template}`;
  return {
    url,
    scaffold
  };
};

export const searchList = async () => {
  const { type, registry } = await rc();
  let api;

  if (type === 'user') {
    api = `https://api.github.com/users/${registry}/repos?per_page=100&page=1`;
  } else if (type === 'org') {
    api = `https://api.github.com/orgs/${registry}/repos?per_page=100&page=1`;
  } else {
    throw new Error('Type muse be user or org');
  }

  return await fetch(api);
};

export const repoList = async () => {
  const { type, registry } = await rc();
  const api = `https://api.github.com/${type}s/${registry}/repos`;

  return await fetch(api);
};

export const tagList = async (repo) => {
  const { url, scaffold } = await getGitInfo(repo);
  const api = `https://api.github.com/repos/${url}/tags`;

  return fetch(api, scaffold, url);
};


export const download = async (repo) => {
  const { url, scaffold } = await getGitInfo(repo);

  return new Promise((resolve, reject) => {
    downloadGit(url, `${dirs.download}/${scaffold}`, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
};
