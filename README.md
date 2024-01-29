# create-vue-template

[慕课网《大前端2023》](https://class.imooc.com/sc/163/learn)实践项目，为基于element-plus开发的Admin模板项目，创建一个CLI工具。

`create-vue-template` 是一个为前端开发者设计的命令行界面（CLI）工具，它旨在简化 Vue.js 项目的初始化过程。通过集成前沿的技术栈和自动化配置，它让项目的启动和开发更加迅速和高效。

![image-20240129200112271](https://static.www.toimc.com/blog/picgo/2024/01/29/image-20240129200112271-a83282.webp)



## 快速开始

安装并创建一个新的 Vue 项目：

```bash
npm init vue-template@latest
```

或者使用以下命令快速初始化一个名为 `demo-vue` 的项目：

```bash
npm init vue-template@latest demo-vue -- -t
```



## 功能

`create-vue-template` 提供了以下功能来加速您的前端开发流程：

- **基础集成**：自动导入 Vue 组件，核心 API 的自动引入。
- **可选配置**：文件路由、自动布局、CSS 框架配置。
- **扩展集成**：Electron 集成、PWA 支持、CDN 加速。



## 特性

本项目利用最新的前端技术栈，包括但不限于：

- ⚡️ 使用 [Vue 3](https://github.com/vuejs/core), [Vite](https://github.com/vitejs/vite), [pnpm](https://pnpm.io/), [esbuild](https://github.com/evanw/esbuild) 优化性能；
- 🗂 基于文件的路由系统，集成 `unplugin-vue-router；
- 📦 自动导入组件功能，集成 `unplugin-vue-components；
- 🍍 通过 Pinia 进行状态管理，参考 [Pinia](https://pinia.vuejs.org/)；
- 📑 集成 `vite-plugin-vue-layouts` 实现布局系统；
- 📲 (可选)PWA 支持，使用 `vite-plugin-pwa`；
- 🎨 使用 [UnoCSS](https://github.com/antfu/unocss) —— 即时的原子 CSS 引擎；
- 😃 使用类名从任何图标集合中使用图标，参考 [unplugin-icons](https://github.com/antfu/unplugin-icons)；
- 🌍 国际化准备就绪，网络方式加载；
- 📥 自动导入 API，集成 `unplugin-auto-import` —— 自动加载 Composition API 和常用库；
- 🦔 集成 Jenkins、GitHub Actions 实现自动化部署；
- 🔤 容器化 Docker 集成；
- 🦾 全部使用 TypeScript 编写；
- ⚙️ 集成 [Vitest](https://github.com/vitest-dev/vitest) 进行单元测试，[Cyress](https://cypress.io/) 进行 E2E 测试；
- ☁️ 可直接部署至 Netlify，零配置；



## Template项目结构

```
.
├── Dockerfile
├── Dockerfile-dev
├── Dockerfile-prod
├── Jenkinsfile
├── README.md
├── cypress
│   ├── e2e
│   ├── fixtures
│   └── support
├── cypress.config.ts
├── docker-compose.yml
├── env.d.ts
├── index.html
├── netlify.toml
├── nginx
│   ├── conf.d
│   └── nginx.conf
├── package.json
├── pnpm-lock.yaml
├── public
│   ├── favicon.ico
│   ├── font_1791095_hy6b9xbrdsk.css
│   └── locales
├── src
│   ├── App.vue
│   ├── assets
│   ├── layouts
│   ├── main.ts
│   ├── pages
│   ├── router
│   ├── shims.d.ts
│   ├── store
│   └── utils
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── tsconfig.vitest.json
├── uno.config.ts
├── vite.config.ts
└── vitest.config.ts
```



