import downloadGit from 'download-git-repo';
import request from 'request';
import { basename } from 'path';

import rc from './rc';
import { dirs, ua } from './defs';


const getGitInfo = async repo => {
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

export const repoList = async() => {
  const type = await rc('type');
  const registry = await rc('registry');
  const api = `https://api.github.com/${type}s/${registry}/repos`;

  return new Promise((resolve, reject) => {
    request({
      url: api,
      method: 'GET',
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
};

export const tagList = async repo => {
  const { url, scaffold } = await getGitInfo(repo);
  const api = `https://api.github.com/repos/${url}/tags`;

  return new Promise((resolve, reject) => {
    request({
      url: api,
      method: 'GET',
      headers: {
        'User-Agent': `${ua}-${scaffold}`
      }
    }, (err, res, body) => {
      if (err) {
        reject(err);
        return;
      }

      const data = JSON.parse(body);
      if (data.message === 'Not Found') {
        reject(new Error(`${url} is not found`));
      } else {
        resolve(data);
      }
    });
  });
};


export const download = async repo => {
  const { url, scaffold } = await getGitInfo(repo);

  return new Promise((resolve, reject) => {
    downloadGit(url, `${dirs.download}/${scaffold}`, err => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
};
