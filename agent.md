# Agent 指南

本文件用于向 AI 代理（Agent）提供项目的关键信息，以便代理快速理解并参与项目开发。

## 项目简介

**Bearp Sniper**（选品采集器）是一个基于 [WXT](https://wxt.dev) 框架与 React 19 构建的浏览器扩展项目。项目使用 TypeScript 编写，采用 pnpm 作为包管理工具。

- **项目名称**: Bearp Sniper
- **描述**: 选品采集器
- **版本**: 0.0.1

## 技术栈

| 技术 | 版本 | 用途 |
| --- | --- | --- |
| WXT | ^0.20.27 | 浏览器扩展开发框架 |
| React | ^19.2.4 | UI 库 |
| React DOM | ^19.2.4 | React 渲染器 |
| TypeScript | ^5.9.3 | 类型系统 |
| pnpm | - | 包管理工具 |

## 目录结构

```
Bearp-Sniper/
├── assets/                 # 静态资源
│   └── react.svg
├── entrypoints/            # WXT 入口点（扩展各部分）
│   ├── popup/              # 弹出窗口（点击扩展图标时显示）
│   │   ├── App.css         # 弹出窗口主组件样式
│   │   ├── App.tsx         # 弹出窗口主组件
│   │   ├── index.html      # 弹出窗口 HTML
│   │   ├── main.tsx        # 弹出窗口入口
│   │   └── style.css       # 弹出窗口全局样式
│   ├── background.ts       # 后台 Service Worker
│   └── content.ts          # 内容脚本（注入到网页）
├── public/                 # 公共静态资源
│   └── icon/               # 扩展图标（16/32/48/96/128）
├── .gitignore
├── README.md
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
└── wxt.config.ts           # WXT 配置文件
```

## 常用命令

| 命令 | 说明 |
| --- | --- |
| `pnpm install` | 安装依赖 |
| `pnpm dev` | 启动开发模式（Chrome） |
| `pnpm dev:firefox` | 启动开发模式（Firefox） |
| `pnpm build` | 构建生产版本（Chrome） |
| `pnpm build:firefox` | 构建生产版本（Firefox） |
| `pnpm zip` | 打包扩展（Chrome） |
| `pnpm zip:firefox` | 打包扩展（Firefox） |
| `pnpm compile` | TypeScript 类型检查（不输出文件） |

## 开发约定

### 1. 入口点（Entrypoints）

WXT 通过 `entrypoints/` 目录识别扩展的各个部分：

- **`popup/`**: 弹出窗口，使用 React 编写。修改 UI 时主要在此目录操作。
- **`background.ts`**: 后台脚本，使用 `defineBackground` 定义，处理扩展生命周期事件、消息通信等。
- **`content.ts`**: 内容脚本，使用 `defineContentScript` 定义，注入到匹配的网页中执行。当前 `matches` 配置为 `*://*.google.com/*`，实际开发时需根据目标网站调整。

### 2. 路径别名

- `@/` 指向项目根目录（如 `@/assets/react.svg`）。
- `/` 指向 `public/` 目录（如 `/wxt.svg`）。

### 3. TypeScript

- 启用 `jsx: react-jsx`，无需手动引入 React。
- 启用 `allowImportingTsExtensions`，允许在导入路径中包含 `.ts`/`.tsx` 扩展名。
- 类型检查配置继承自 `.wxt/tsconfig.json`（由 WXT 自动生成）。

### 4. 代码风格

- 使用 TypeScript 进行开发，保持类型完整。
- React 组件使用函数式组件与 Hooks。
- 样式使用 CSS 文件按组件拆分（如 `App.css`）。
- 遵循 WXT 官方文档约定：https://wxt.dev

## 开发流程建议

1. **开发**: 执行 `pnpm dev` 启动开发服务器，WXT 会自动加载扩展到浏览器并支持热更新。
2. **类型检查**: 提交前执行 `pnpm compile` 确保无类型错误。
3. **构建**: 执行 `pnpm build` 生成生产版本，输出目录默认为 `.output/chrome-mv3`。
4. **打包**: 执行 `pnpm zip` 生成可发布的压缩包。

## 注意事项

- 修改 `content.ts` 的 `matches` 时，需同步更新 `manifest` 权限配置（如需）。
- 新增入口点时，参考 WXT 文档确保命名与目录结构符合约定。
- 扩展图标位于 `public/icon/`，提供 16/32/48/96/128 多种尺寸。
- `postinstall` 脚本会自动执行 `wxt prepare`，生成 `.wxt/` 类型声明文件，请勿手动修改该目录。
