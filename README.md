# Claude Skills Viewer

一个现代化的桌面应用，用于查看和管理本地安装的 Claude Code Skills。

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Electron](https://img.shields.io/badge/Electron-25.x-blue)
![React](https://img.shields.io/badge/React-18.x-blue)
![Vite](https://img.shields.io/badge/Vite-5.x-purple)

## 功能特性

- 📋 查看本地所有已安装的 Claude Code Skills
- 📝 显示每个 Skill 的描述信息
- 🔢 记录并显示每个 Skill 的使用次数
- 🔄 刷新按钮即时更新技能列表
- 🌐 支持中英文语言切换
- 💻 现代化桌面应用界面
- 📁 智能识别技能文件夹（仅识别包含 SKILL.md 的子目录）
- 🎨 每个技能拥有独特的 Emoji 图标
- 🔍 支持中文名称搜索和筛选
- ✨ 优化的排序：文件夹 → 展开的子技能 → 常规技能
- 👁️ 视觉分隔线区分不同区域

## 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite 5
- **桌面容器**: Electron 25
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
│   ├── data/             # 技能数据
│   │   └── skillDescriptions.ts
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

## 更新日志

### v1.0.4 (2026-02-25)

- **新增技能支持**: 添加了 idea-debate 和 mcp-builder 技能的中英文支持和专属图标
- **优化了映射逻辑**: skill-creator 创建新 skill 时自动生成 skillDescriptions.ts 更新代码
- **技能图标完善**: 为新增技能添加了 emoji 图标映射（⚖️、🔧）

### v1.0.3 (2026-02-24)

- **英文模式优化**: 修复英文模式下显示中文的问题，所有界面文字现在都支持中英文切换
- **弹窗描述优化**: 技能弹窗中的描述更加简洁，避免冗长的 YAML 格式内容
- **中英文名称支持**: 技能卡片和弹窗现在显示正确的中英文名称
- **i18n 完善**: 添加了子技能数量等翻译key，支持动态替换

### v1.0.2 (2026-02-24)

- **颜色一致性优化**: 子技能卡片边框改为与文件夹一致的黄色
- **子技能弹窗样式优化**: 点击子技能打开的弹窗header色块与文件夹颜色保持一致（黄色渐变）

### v1.0.1 (2026-02-24)

- **技能文件夹检测优化**: 现在只识别包含 `SKILL.md` 文件的子目录，避免将 `assets`、`references`、`scripts` 等非技能目录误识别为子技能
- **Emoji 图标优化**: 每个技能都拥有独特的 Emoji 图标，不再统一显示文件夹图标
- **搜索功能修复**: 修复了搜索和筛选功能，现在支持中文名称搜索
- **中文名称显示**: 技能卡片上直接显示中文名称
- **排序逻辑优化**:
  - 文件夹（技能合集）排在最前面
  - 文件夹展开后的子技能紧跟文件夹后面
  - 常规技能排在最后
  - 所有技能按英文名称字母顺序排序
- **视觉分隔**: 添加了虚线分隔线，清晰区分展开的子技能区域和常规技能区域

## 许可证

MIT License
