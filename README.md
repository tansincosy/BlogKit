# BlogKit

基于 next.js tailwindcss material-you 颜色主题开发的博客静态模版

# 功能

- [x] 支持文章分类
- [x] 支持文章标签
- [x] 支持文章摘要
- [x] 支持文章搜索
- [x] 支持文章 markdown 格式
- [x] 支持文章评论

# 如何运行

- 安装

  ```bash

  yarn

  ```

- 开发模式

  ```bash

  yarn run dev

  ```

# 如何构建

- 构建

  ```bash

  yarn run build

  ```

  > 构建出 out 文件夹，包含所有静态文件，可以直接发布到自己网站上

# 配置说明

全局配置文件在 `.env 文件中` 和 `src/config.ts`

构建时，通过环境设置

```env

NEXT_PUBLIC_ALGOLIA_INDEX_NAME=
NEXT_PUBLIC_ALGOLIA_APP_ID=
NEXT_PUBLIC_ALGOLIA_ADMIN_KEY=
NEXT_PUBLIC_ALGOLIA_SEARCH_KEY=

```
