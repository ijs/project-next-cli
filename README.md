# project next cli

可能更通用的脚手架，基于 Github API v3 实现. 基于团队的 [chef-cli](https://github.com/2046/chef-cli) 增强。

## 下载

```bash
yarn globally add project-next-cli
npm i -g project-next-cli
```

## 支持

- 提供脚手架管理： 下载，初始化，版本选择等功能
- 基于所有的github项目组
- 增强：改变输入方式为选择，改进体验
- 增强：支持swig模板编译

## 文件说明

src目录下每个文件对应一个功能，project.js是入口文件，index.js是统一入口，其他*.js文件为对应的命令文件。
utils 为基础库目录， helper 为 模板引擎编译帮助文件目录

```bash
├── LICENSE
├── README.md
├── bin
│   └── project
├── package.json
├── project-next-cli.gif
├── src
│   ├── clear.js
│   ├── config.js
│   ├── helper
│   ├── index.js
│   ├── init.js
│   ├── install.js
│   ├── list.js
│   ├── project.js
│   ├── search.js
│   ├── uninstall.js
│   ├── update.js
│   └── utils
└── yarn.lock
```

## How to use

```bash
project install
project init
project update
project search
project uninstall <installed template>
project config set <k> <v>
project config remove <k>
project config get <k>
project config help
```

<img src="./project-next-cli.gif" />

## 依赖

依赖列表：

- download-git-repo
- minimist
- ora
- semver
- request
- rmfr
- metalsmith
- eslint

## TODO

- [x] 支持模板引擎
- [ ] 测试用例

## LICENSE

MIT