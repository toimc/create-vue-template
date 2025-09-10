# Create Admin Vue3

[慕课网《大前端2023》](https://class.imooc.com/sc/163/learn)实践项目，为基于element-plus开发的Admin模板项目，创建一个CLI工具。

一个用于快速创建 Vue 3 管理后台项目的 CLI 工具。

## 简介

`create-admin-vue3` 是一个命令行工具，帮助开发者快速搭建基于 Vue 3 + Vite + TypeScript + Element Plus 的管理后台项目。它提供了丰富的模板选择和自动化配置，让项目初始化变得简单高效。

通过集成前沿的技术栈和自动化配置，它让项目的启动和开发更加迅速和高效。

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

## 技术栈

### CLI 工具技术栈
- **语言**: TypeScript 5.3.3
- **构建工具**: unbuild 2.0.0
- **模板引擎**: EJS 3.1.9
- **文件操作**: fs-extra 11.2.0
- **用户交互**: prompts 2.4.2
- **命令行解析**: minimist 1.2.8
- **包管理**: pnpm 8.11.0

### 生成项目技术栈
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

## 环境要求

- Node.js >= 18.0.0
- pnpm >= 8.11.0

## 配置

### 目录结构

```
create-admin-vue3/
├── src/
│   └── index.ts              # 主入口文件
├── templates/                # 项目模板
│   └── base/                 # 基础模板
│       ├── src/              # 源码模板
│       ├── public/           # 公共资源模板
│       ├── package.json      # 包配置模板
│       ├── vite.config.ts    # Vite配置模板
│       ├── tsconfig.json     # TypeScript配置模板
│       └── ...               # 其他配置文件模板
├── build.config.ts           # 构建配置
├── package.json              # 项目配置
└── README.md                 # 项目文档
```

### 模板配置
- 支持多种项目类型选择
- 可选的集成功能配置
- 自动化的依赖安装
- 完整的项目结构生成

## 核心功能

### 1. 项目初始化
- 交互式项目配置
- 模板选择
- 依赖自动安装
- 项目结构生成

### 2. 模板系统
- 基于 EJS 的模板引擎
- 支持条件渲染
- 变量替换
- 文件复制和重命名

### 3. 配置选项
- **基础配置**: 项目名称、描述、作者
- **技术栈选择**: Vue 3、TypeScript、Element Plus
- **功能集成**: PWA、Electron、CDN、Mock
- **样式方案**: UnoCSS、Sass、CSS Modules
- **测试框架**: Vitest、Cypress

### 4. 自动化功能
- 依赖版本管理
- 配置文件生成
- 目录结构创建
- Git 仓库初始化

## 脚本说明

### 开发模式
```bash
# 启动开发服务器
pnpm start

# 监听模式开发
pnpm dev
```

### 构建发布
```bash
# 构建项目
pnpm build

# 开发模式构建
pnpm build:dev

# 发布到 npm
pnpm release
```

### 代码质量
```bash
# 代码检查
pnpm lint

# 代码格式化
pnpm format
```

## 使用方法

### 全局安装
```bash
# 安装 CLI 工具
npm install -g create-admin-vue3

# 创建新项目
create-admin-vue3 my-project
```

### 直接使用
```bash
# 使用 npx 直接运行
npx create-admin-vue3 my-project

# 指定模板
npx create-admin-vue3 my-project --template base
```

### 交互式配置
运行命令后，CLI 会引导你完成以下配置：

1. **项目信息**
   - 项目名称
   - 项目描述
   - 作者信息
   - 许可证类型

2. **技术栈选择**
   - Vue 3 版本
   - TypeScript 支持
   - UI 框架选择
   - 状态管理方案

3. **功能集成**
   - PWA 支持
   - Electron 桌面应用
   - CDN 加速
   - Mock 数据

4. **开发工具**
   - 代码检查工具
   - 测试框架
   - 构建工具配置

## 模板说明

### 基础模板 (base)
包含完整的 Vue 3 管理后台项目结构：

- 完整的目录结构
- 基础组件和页面
- 路由配置
- 状态管理
- 样式配置
- 构建配置

### 模板特性
- 响应式设计
- 暗色/亮色主题
- 国际化支持
- 组件库集成
- 开发工具配置

## Template项目结构

```
.
├── Dockerfile
├── Dockerfile-dev
├── Dockerfile-prod
├── Jenkinsfile
├── README.md
├── cypress
│   ├── e2e
│   ├── fixtures
│   └── support
├── cypress.config.ts
├── docker-compose.yml
├── env.d.ts
├── index.html
├── netlify.toml
├── nginx
│   ├── conf.d
│   └── nginx.conf
├── package.json
├── pnpm-lock.yaml
├── public
│   ├── favicon.ico
│   ├── font_1791095_hy6b9xbrdsk.css
│   └── locales
├── src
│   ├── App.vue
│   ├── assets
│   ├── layouts
│   ├── main.ts
│   ├── pages
│   ├── router
│   ├── shims.d.ts
│   ├── store
│   └── utils
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── tsconfig.vitest.json
├── uno.config.ts
├── vite.config.ts
└── vitest.config.ts
```

## 开发指南

### 添加新模板
1. 在 `templates/` 目录下创建新模板目录
2. 添加模板文件和配置
3. 在 `src/index.ts` 中注册新模板
4. 更新模板选择逻辑

### 自定义配置
1. 修改 `src/index.ts` 中的配置选项
2. 更新模板文件中的变量
3. 调整构建和发布流程

### 模板变量
模板支持以下变量：
- `projectName`: 项目名称
- `projectDescription`: 项目描述
- `author`: 作者信息
- `features`: 选中的功能列表
- `dependencies`: 依赖包列表

## 发布流程

### 版本管理
1. 更新 `package.json` 中的版本号
2. 更新 `CHANGELOG.md`
3. 提交代码并打标签

### 发布步骤
1. 构建项目：`pnpm build`
2. 发布到 npm：`pnpm release`
3. 验证发布结果


## 作者

toimc <brian@toimc.com>

## 仓库地址

https://github.com/toimc/create-vue-template