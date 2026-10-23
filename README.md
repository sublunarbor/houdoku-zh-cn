# Houdoku 简体中文汉化

为开源桌面漫画阅读器 [Houdoku](https://github.com/xgi/houdoku) 提供**非官方**简体中文本地化。

- 原始项目：<https://github.com/xgi/houdoku>（MIT 协议）
- 适配版本：**Houdoku 2.16.0（Windows x64）**
- 汉化语言：简体中文（zh-CN）
- 汉化方式：对官方安装包内的 `resources/app.asar` 注入运行时翻译层，不修改业务逻辑、不修改用户数据

> 本项目与 Houdoku 官方无关，为社区汉化补丁。软件著作权归原作者 xgi 所有。

---

## 为什么需要补丁

Houdoku 2.16.0 **没有任何界面语言设置**，也不包含 i18n 框架（无 i18next / react-intl / 语言包），界面文案全部硬编码在打包后的前端 bundle 中。因此无法通过设置切换语言，只能对安装包本体做本地化处理。

---

## 下载

在 [Releases](https://github.com/sublunarbor/houdoku-zh-cn/releases) 页面下载，二选一：

| 发布包 | 适用人群 | 说明 |
| --- | --- | --- |
| `Houdoku-2.16.0-zh-CN-patch.zip` | 已安装官方 Houdoku 2.16.0 | 仅包含汉化后的 `app.asar` 与安装/回滚脚本，体积小 |
| `Houdoku-2.16.0-zh-CN-portable.zip` | 未安装 / 想直接用 | 完整免安装目录，解压后运行 `Houdoku.exe` 即可 |

---

## 安装

### 方式一：补丁包（推荐，已有官方 2.16.0）

1. 完全退出 Houdoku（托盘图标也要退出）；
2. 解压 `Houdoku-2.16.0-zh-CN-patch.zip`；
3. 右键 `install.ps1` → **使用 PowerShell 运行**（或在 PowerShell 中执行）：

   ```powershell
   powershell -ExecutionPolicy Bypass -File .\install.ps1
   ```

4. 脚本会自动定位安装目录、备份原版 `app.asar` 为 `app.asar.bak`，然后写入汉化包；
5. 启动 Houdoku，界面即为中文。

自定义安装目录：

```powershell
powershell -ExecutionPolicy Bypass -File .\install.ps1 -AppDir "D:\Apps\Houdoku"
```

手动安装（等价操作）：

```text
把 app.asar 复制到  <安装目录>\resources\app.asar
（建议先备份原文件为 app.asar.bak）
```

### 方式二：免安装包

1. 解压 `Houdoku-2.16.0-zh-CN-portable.zip` 到任意目录；
2. 运行 `Houdoku.exe`。

---

## 回滚 / 卸载汉化

- 运行补丁包内的 `uninstall.ps1`；
- 或手动删除汉化后的 `resources\app.asar`，把 `resources\app.asar.bak` 重命名回 `app.asar`。

---

## 汉化范围

- 侧边栏与导航：书库、全部漫画、新建分类、添加漫画、插件、下载、设置
- 书库：筛选、排序、布局、多选、分类、右键菜单、空状态
- 添加漫画：目录选择、多系列模式说明
- 插件：插件列表、安装/卸载、检查更新、重新加载
- 下载：下载队列、我的下载、章节操作、空状态
- 设置：常规、书库、阅读器、快捷键、进度追踪、集成
- 阅读器：页面样式、阅读方向、图像尺寸、页码提示、章节切换提示
- 各类确认对话框、错误页、更新通知、系统文件选择框标题

**保持英文的内容**（有意为之）：

- 专有名词：`AniList`、`MyAnimeList`、`MangaUpdates`、`Discord`、`Houdoku`
- 插件数据名与内部枚举：如 `filesystem`
- 用户内容：漫画标题、章节名、作者、简介、标签等
- 快捷键按键盘位显示：`ctrl+left`、`escape` 等

---

## 已知限制

1. 仅适配 **2.16.0**。其他版本的文件结构可能不同，请勿混用。
2. Houdoku 升级会覆盖 `app.asar`，汉化随之失效，需要重新安装对应版本的补丁。
3. 部分插件通过 Tiyo 扩展导入的内容为外部数据，不属于界面文案，不会翻译。
4. 汉化依赖运行时文本匹配，极少数动态拼接文案可能仍显示英文。

---

## 原理文档

完整的实现原理、asar 结构与重打包细节见 [docs/汉化原理.md](docs/汉化原理.md)。

---

## 目录结构

```text
.
├─ README.md
├─ LICENSE                 # 上游 MIT 许可证
├─ docs/
│  └─ 汉化原理.md          # 汉化实现原理与复现步骤
├─ patch/                  # 可复现的构建脚本
│  ├─ zh-runtime.js        # 注入到渲染进程的翻译运行时
│  ├─ patch-bundle.js      # 向 bundle / 主进程注入与静态替换
│  ├─ repack.js            # 重新打包 app.asar
│  └─ verify.js            # 全量 SHA256 校验
└─ scripts/
   ├─ install.ps1          # 一键安装补丁
   └─ uninstall.ps1        # 一键回滚
```

---

## 免责声明

本项目仅用于界面文本本地化，不修改 Houdoku 的任何功能逻辑，不包含破解或绕过付费的内容。请支持原作者，从[官方渠道](https://github.com/xgi/houdoku/releases)获取软件。
