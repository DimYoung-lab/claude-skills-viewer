# Claude Skills Viewer

一个现代化的桌面应用，用于查看和管理本地安装的 Claude Code Skills。

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Electron](https://img.shields.io/badge/Electron-31.x-blue)
![React](https://img.shields.io/badge/React-18.x-blue)
![Vite](https://img.shields.io/badge/Vite-5.x-purple)

## 功能特性

- 📋 查看本地所有已安装的 Claude Code Skills
- 📝 显示每个 Skill 的描述信息
- 🔢 记录并显示每个 Skill 的使用次数
- 🔄 刷新按钮即时更新技能列表
- 🌐 支持中英文语言切换
- 💻 现代化桌面应用界面

## 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite 5
- **桌面容器**: Electron 31
- **样式方案**: Tailwind CSS
- **打包工具**: electron-builder

## 项目结构

```
claude-skills-viewer/
├── electron/
│   ├── main.ts           # Electron 主进程
│   └── preload.ts        # 预加载脚本
├── src/
│   ├── components/       # React 组件
│   │   ├── Header.tsx
│   │   ├── SkillCard.tsx
│   │   └── SkillModal.tsx
│   ├── context/          # React Context
│   │   └── LanguageContext.tsx
│   ├── hooks/            # 自定义 Hooks
│   │   ├── useSkills.ts
│   │   └── useLocalStorage.ts
│   ├── i18n/             # 国际化文件
│   │   ├── zh.json
│   │   └── en.json
│   ├── types/            # TypeScript 类型
│   │   └── index.ts
│   ├── App.tsx
│   └── main.tsx
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## 开发

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### Electron 开发模式

```bash
npm run electron:dev
```

### 构建

```bash
# 构建前端
npm run build

# 构建 Electron 应用
npm run electron:build
```

## 使用

1. 克隆仓库并安装依赖
2. 运行 `npm run electron:dev` 启动开发版本
3. 或运行 `npm run electron:build` 构建生产版本
4. 应用会自动读取 `~/.claude/skills/` 目录下的 Skills

## 许可证

MIT License
