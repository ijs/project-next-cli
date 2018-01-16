# project next cli

可能更通用的脚手架，基于 Github API v3 实现

## 下载

```bash
yarn globally add project-next-cli
npm i -g project-next-cli
```

## 支持

- 基于所有的github项目组
- 支持swig模板编译
- 提供脚手架管理： 下载，初始化，版本选择等功能

## How to use

```bash
project install
project init
project update
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