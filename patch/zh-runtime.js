/* ===== Houdoku 简体中文语言补丁 (zh-CN) ===== */
(() => {
  const DICT = {
    // 导航 / 页面
    "Add Series": "添加漫画",
    "Add series": "添加漫画",
    "Library": "书库",
    "Plugins": "插件",
    "Plugin": "插件",
    "Downloads": "下载",
    "Download": "下载",
    "Settings": "设置",
    "About Houdoku": "关于 Houdoku",
    "General": "常规",
    "Reader": "阅读器",
    "Keybinds": "快捷键",
    "Trackers": "进度追踪",
    "Integrations": "集成",
    "Search options": "搜索选项",
    "Options": "选项",
    "Apply": "应用",
    "Preview": "预览",
    "View details": "查看详情",
    "View series": "查看漫画",
    "Read chapter": "阅读章节",
    "Continue": "继续",
    "Select previous": "选择之前的章节",
    "Back to library": "返回书库",
    "Back to search": "返回搜索",
    "Add to library": "添加到书库",
    "Remove from library": "从书库移除",
    "Remove series": "移除漫画",
    "Edit series": "编辑漫画",
    "Save details": "保存详情",
    "Select cover": "选择封面",
    "Select Directory": "选择目录",
    "Select extension": "选择扩展",
    "Search for a series...": "搜索漫画...",
    "Search for series...": "搜索漫画...",
    "Search": "搜索",
    "Multi-series mode": "多系列模式",
    "When multi-series mode is enabled, each item in the selected": "启用多系列模式时，所选",
    "directory is treated as a separate series.": "目录中的每一项都会被视为独立的漫画。",
    "Title": "标题",
    "Description": "简介",
    "Authors": "作者",
    "Artists": "画师",
    "Tags": "标签",
    "Language": "语言",
    "Original Language": "原始语言",
    "Author(s)": "作者",
    "Artist(s)": "画师",
    "Creator(s)": "创作者",
    "Status": "状态",
    "Progress": "进度",
    "Score": "评分",
    "Name": "名称",
    "Version": "版本",
    "Username": "用户名",
    "Password": "密码",
    "Paste access code...": "粘贴访问代码...",
    "Group": "汉化组",
    "Vol": "卷",
    "Ch": "话",
    "Unread": "未读",
    "Finished": "已读完",
    "All": "全部",
    "Any": "全部",
    "All Series": "全部漫画",
    "Filters": "筛选",
    "Sort": "排序",
    "Layout": "布局",
    "View": "视图",
    "Columns": "列数",
    "Clear filter": "清除筛选",
    "Compact grid": "紧凑网格",
    "Comfortable grid": "舒适网格",
    "Cover grid": "封面网格",
    "List": "列表",
    "No results.": "无结果。",
    "No series found.": "未找到漫画。",
    "There are no series in your library which match the current filters.": "书库中没有符合当前筛选条件的漫画。",
    "Group not found.": "未找到汉化组。",
    "Language not found.": "未找到语言。",
    "Categories": "分类",
    "Create category": "创建分类",
    "Edit category": "编辑分类",
    "Delete category": "删除分类",
    "Remove category": "移除分类",
    "New category...": "新建分类...",
    "Use categories to organize your library.": "使用分类整理你的书库。",
    "After creating a category, you can populate it by right clicking a series in your library.": "创建分类后，可以在书库中右键点击漫画将其加入分类。",
    "Edit an existing category.": "编辑现有分类。",
    "Confirm when removing series from library": "从书库移除漫画时进行确认",
    "Multi-select": "多选",
    "Exit multi-select": "退出多选",
    "Assign category": "分配分类",
    "Mark all read": "全部标为已读",
    "Mark read": "标为已读",
    "Mark unread": "标为未读",
    "Mark selected read": "将所选标为已读",
    "Mark selected unread": "将所选标为未读",

    // 库操作 / 状态
    "Refresh": "刷新",
    "Refreshing...": "正在刷新...",
    "Refresh library on startup": "启动时刷新书库",
    "Crop cover images to library grid": "裁剪封面以适配书库网格",
    "Custom download location": "自定义下载位置",
    "Reset": "重置",
    "Save": "保存",
    "Cancel": "取消",
    "Delete": "删除",
    "Edit": "编辑",
    "Remove": "移除",
    "Retry": "重试",
    "Submit": "提交",
    "Close": "关闭",
    "Not now": "暂不",
    "Don't ask again": "不再询问",
    "Unknown": "未知",
    "Reading": "在读",
    "Planning": "想看",
    "Completed": "已完结",
    "Dropped": "已抛弃",
    "Paused": "已暂停",
    "Repeating": "重读",
    "Ongoing": "连载中",
    "Cancelled": "已取消",
    "Hiatus": "休载中",
    "Not Yet Published": "尚未发布",

    // 设置
    "Theme": "主题",
    "Select the application theme.": "选择应用主题。",
    "Light": "浅色",
    "Dark": "深色",
    "Check for updates": "检查更新",
    "Check for Houdoku updates automatically": "自动检查 Houdoku 更新",
    "Backup": "备份",
    "Create Backup": "创建备份",
    "Restore Backup": "恢复备份",
    "Automatic backups": "自动备份",
    "Automatically backup your library.": "自动备份你的书库。",
    "Create up to": "最多保留",
    "daily backups.": "份每日备份。",
    "Options for backing up your data.": "数据备份选项。",
    "Save settings": "保存设置",
    "Tiyo settings": "Tiyo 设置",
    "Tiyo Extension Manager": "Tiyo 扩展管理器",
    "Adds support for importing content from other sources, including 3rd-party websites.": "支持从其他来源（包括第三方网站）导入内容。",
    "Reload Installed Plugins": "重新加载已安装插件",
    "Install": "安装",
    "Installing...": "正在安装...",
    "Uninstall": "卸载",
    "Update": "更新",
    "Check for Updates": "检查更新",
    "Use Discord Rich Presence": "使用 Discord 动态状态",
    'To use Discord Rich Presence, make sure "Share your detected activities with others" is enabled in your Discord settings (under the Activity Privacy tab).': "要使用 Discord 动态状态，请确保在 Discord 设置（活动隐私标签页）中启用“将检测到的活动分享给他人”。",
    "Syncing progress with trackers": "与追踪站点同步进度",
    'After authenticating, click the "Trackers" button on a series page to link it with your list.': "完成认证后，在漫画页面点击“进度追踪”按钮即可将其与你的列表关联。",
    "Update chapter progress automatically": "自动更新章节进度",
    "Link": "关联",
    "Unlink": "取消关联",
    "Not logged in.": "未登录。",
    "Logged in as": "已登录为",

    // 阅读器
    "Page Style": "页面样式",
    "Page Fit": "页面适应",
    "Single Page": "单页",
    "Double Page": "双页",
    "Long Strip": "条漫",
    "Single": "单页",
    "Double": "双页",
    "Vertical": "条漫",
    "Reading Direction": "阅读方向",
    "Left-to-Right": "从左到右",
    "Right-to-Left": "从右到左",
    "Image Sizing": "图像尺寸",
    "Rendering": "渲染",
    "Contain to width": "适应宽度",
    "Contain to height": "适应高度",
    "Stretch small pages": "拉伸小页面",
    "Max page width": "最大页宽",
    "Spacing between pages": "页面间距",
    "Offset first page": "首页偏移",
    "Offset all pages": "全部页面偏移",
    "No offset": "不偏移",
    "Optimize image contrast": "优化图像对比度",
    "percent": "百分比",
    "pixels": "像素",
    "Toggle sidebar": "切换侧边栏",
    "Toggle Sidebar": "切换侧边栏",
    "Toggle reading direction": "切换阅读方向",
    "Toggle page style": "切换页面样式",
    "Toggle double page offset": "切换双页偏移",
    "Toggle fullscreen": "切换全屏",
    "Show settings menu": "显示设置菜单",
    "Exit reader": "退出阅读器",
    "Turn page left": "向左翻页",
    "Turn page right": "向右翻页",
    "First page": "第一页",
    "Last page": "最后一页",
    "Change chapter left": "向左切换章节",
    "Change chapter right": "向右切换章节",
    "Unknown Chapter": "未知章节",

    // 下载
    "Download Queue": "下载队列",
    "Clear Queue": "清空队列",
    "Resume": "继续",
    "Pause": "暂停",
    "My Downloads": "我的下载",
    "Delete Selected": "删除所选",
    "Delete downloaded chapters": "删除已下载章节",
    "There are no downloads queued.": "没有排队中的下载。",
    "There are no downloaded chapters. You can download a chapter from the series page in your library.": "没有已下载的章节。你可以在书库中漫画的详情页面下载章节。",
    "There's no next chapter.": "没有下一章。",
    "Download chapters": "下载章节",
    "Download next": "下载接下来",
    "Download unread chapters": "下载未读章节",
    "Download all chapters": "下载全部章节",
    "Download selected": "下载所选",
    "chapters": "话",
    "through": "至",

    // 提示 / 对话框
    "Houdoku is loading": "Houdoku 正在加载",
    "Please wait a moment.": "请稍候。",
    "Update available": "有可用更新",
    "Download update": "下载更新",
    "Restart required": "需要重启",
    "Restart": "重启",
    "Houdoku needs to restart to finish installing updates.": "Houdoku 需要重启以完成更新安装。",
    "Adding series to your library...": "正在将漫画添加到书库...",
    "Added series": "已添加漫画",
    "Failed to add series": "添加漫画失败",
    "An error occurred while adding the series to your library.": "将漫画添加到书库时发生错误。",
    "Content source not found": "未找到内容源",
    "The content source for this series was not found. Please update your plugins.": "未找到该漫画的内容源，请更新插件。",
    "Refreshing library...": "正在刷新书库...",
    "Library refreshed": "书库已刷新",
    "Library refreshed with errors": "书库已刷新（存在错误）",
    "Library refresh failed": "书库刷新失败",
    "Starting download...": "开始下载...",
    "Download paused": "下载已暂停",
    "Sorry, something went wrong.": "抱歉，出现了一些问题。",
    "An error occurred while loading the page. Normally we would show more specific information, but the error caused the renderer to break, so we can only show you this page instead.": "加载页面时发生错误。通常我们会显示更具体的信息，但该错误导致渲染进程崩溃，因此只能显示此页面。",
    "What to do": "该怎么做",
    "Error details": "错误详情",
    "Additional logs in": "其他日志位于",
    "Report an issue on GitHub": "在 GitHub 上报告问题",
    "Got unexpected null or undefined": "获取到了意外的 null 或 undefined",
    "was released on": "发布于",
    "details...": "详情...",
    "Repository": "代码仓库",
    "Official Website": "官方网站",
    "Houdoku Backup": "Houdoku 备份",

    // 关于页面片段
    "Houdoku is a desktop manga reader. To add a series to your library, click the": "Houdoku 是一款桌面漫画阅读器。要向书库添加漫画，请点击左侧面板中的",
    "tab on the left panel and search for the series from a supported content source. To add more content sources, install a": "标签页，并从受支持的内容源中搜索漫画。要添加更多内容源，请安装",
    "Your library is empty. Install": "你的书库是空的。请安装",
    "from the tab on the left, and then go to": "标签页（位于左侧面板），然后前往",
    "to start building your library.": "开始建立你的书库。",
    "In order to track this series, please link your ": "要追踪这部漫画，请先关联你的 ",
    " account on the": " 账号，前往",
    "page.": "页面。",

    // 选择器占位符
    "placeholder": "选择列表",

    // 漫画内容语言
    "English": "英语",
    "Japanese": "日语",
    "Chinese (simplified)": "简体中文",
    "Chinese (traditional)": "繁体中文",
    "Korean": "韩语",
    "Spanish (ES)": "西班牙语（西班牙）",
    "Spanish (LATAM)": "西班牙语（拉美）",
    "French": "法语",
    "German": "德语",
    "Italian": "意大利语",
    "Portuguese (BR)": "葡萄牙语（巴西）",
    "Portuguese (PT)": "葡萄牙语（葡萄牙）",
    "Russian": "俄语",
    "Polish": "波兰语",
    "Turkish": "土耳其语",
    "Vietnamese": "越南语",
    "Indonesian": "印尼语",
    "Thai": "泰语",
    "Arabic": "阿拉伯语",
    "Hebrew": "希伯来语",
    "Hindi": "印地语",
    "Bengali": "孟加拉语",
    "Burmese": "缅甸语",
    "Mongolian": "蒙古语",
    "Persian": "波斯语",
    "Malay": "马来语",
    "Filipino": "菲律宾语",
    "Ukrainian": "乌克兰语",
    "Czech": "捷克语",
    "Danish": "丹麦语",
    "Dutch": "荷兰语",
    "Finnish": "芬兰语",
    "Greek": "希腊语",
    "Hungarian": "匈牙利语",
    "Lithuanian": "立陶宛语",
    "Romanian": "罗马尼亚语",
    "Serbo-Croatian": "塞尔维亚-克罗地亚语",
    "Swedish": "瑞典语",
    "Catalan": "加泰罗尼亚语",
    "Bulgarian": "保加利亚语",

    // 补充：确认对话框 / 错误页 / 表格状态
    "Are you sure you want to remove": "确定要从书库移除",
    "Are you sure you want to delete": "确定要删除",
    "from your library?": "吗？",
    "downloaded chapters?": "个已下载章节吗？",
    "category? Its series will remain in your library.": "分类吗？其中的漫画仍会保留在书库中。",
    "Are you sure you want to remove the": "确定要移除该",
    "- Press": "- 按",
    "- You can open the console by pressing": "- 你可以通过按",
    "to reload the client.": "以重新加载客户端。",
    ", which may contain additional information about the error.": "，其中可能包含关于该错误的更多信息。",
    ". Please copy the expanded error information below, as well as the steps you took before seeing this page.": "。请复制下方的详细错误信息，以及你在看到此页面之前所执行的操作步骤。",
    "selected": "已选中",
    "series selected": "部漫画已选中",
    "chapter(s) selected.": "个章节已选中。",
    "Authenticate on": "登录到",
    "View on": "前往",
    "Loading": "正在加载",
    "account on the": "账号，前往",
    "In order to track this series, please link your": "要追踪这部漫画，请先关联你的",
    "Chapter": "章节",
    "Ch.": "话",
    "Page": "页码",
    "of": "/",
    "- Chapter": "- 第"
  };

  // 需要保留前后空格的片段（与 JSX 文本节点完全一致）
  const RAW = {
    "Chapter ": "第 ",
    "Ch. ": "第 ",
    "Page ": "页码 ",
    "Vol. ": "第 ",
    " - Chapter ": " - 第 ",
    "Settings ": "设置 ",
    " of": " /",
    " of ": " / ",
    "Authenticate on ": "登录到 ",
    "View on ": "前往 ",
    "Loading ": "正在加载 ",
    " details...": " 详情...",
    "was released on": "发布于"
  };

  // 动态文本匹配
  const DYN = [
    [/^Vol\. (.+) · $/, "第 $1 卷 · "],
    [/^Added (.+)$/, "已添加 $1"],
    [/^Adding (.+)$/, "正在添加 $1"],
    [/^Reloaded (\d+) series$/, "已刷新 $1 部漫画"],
    [/^Reloading series (\d+)\/(\d+)$/, "正在刷新漫画 $1/$2"],
    [/^Failed to update (\d+) series$/, "$1 部漫画更新失败"],
    [/^Error while reloading series "(.+)"$/, "刷新漫画「$1」时出错"],
    [/^ by (.+)$/, "由 $1 汉化"],
    [/^Page (.+) of (.+)$/, "第 $1 页 / 共 $2 页"],
    [/^Chapter (.+) of (.+)$/, "第 $1 话 / 共 $2 话"]
  ];

  function trCore(core) {
    if (Object.prototype.hasOwnProperty.call(DICT, core)) return DICT[core];

    // 描述性动态文本
    for (let i = 0; i < DYN.length; i++) {
      const m = DYN[i][0].exec(core);
      if (m) return core.replace(DYN[i][0], DYN[i][1]);
    }

    // 章节 / 页码 / 卷号等组合文本
    let out = core
      .replace(/\bChapter (\d+(?:\.\d+)?)/g, "第 $1 话")
      .replace(/\bCh\. (\d+(?:\.\d+)?)/g, "第 $1 话")
      .replace(/\bPage (\d+)/g, "第 $1 页")
      .replace(/\bVol\. (\d+(?:\.\d+)?)/g, "第 $1 卷")
      .replace(/Unknown Chapter/g, "未知章节");
    return out;
  }

  function tr(s) {
    if (typeof s !== "string" || !s || s.length > 300) return s;
    if (!/[A-Za-z]/.test(s)) return s;
    if (Object.prototype.hasOwnProperty.call(RAW, s)) return RAW[s];
    const m = /^(\s*)([\s\S]*?)(\s*)$/.exec(s);
    const core = m[2];
    if (!core) return s;
    const out = trCore(core);
    return out === core ? s : m[1] + out + m[3];
  }

  function trNode(v) {
    if (typeof v === "string") return tr(v);
    if (Array.isArray(v)) {
      let changed = false;
      const out = v.map((item) => {
        const nv = trNode(item);
        if (nv !== item) changed = true;
        return nv;
      });
      return changed ? out : v;
    }
    return v;
  }

  const DISPLAY_PROPS = ["children", "placeholder", "title", "alt", "aria-label"];

  function trProps(props) {
    if (!props || typeof props !== "object") return props;
    let copy = null;
    for (let i = 0; i < DISPLAY_PROPS.length; i++) {
      const key = DISPLAY_PROPS[i];
      const value = props[key];
      if (value === undefined || value === null) continue;
      const nv = key === "children" ? trNode(value) : typeof value === "string" ? tr(value) : value;
      if (nv !== value) {
        if (!copy) copy = Object.assign({}, props);
        copy[key] = nv;
      }
    }
    return copy || props;
  }

  function wrapJsx(fn) {
    return function (type, props, key) {
      const nextProps = trProps(props);
      return key === undefined ? fn(type, nextProps) : fn(type, nextProps, key);
    };
  }

  jsxRuntimeExports.jsx = wrapJsx(jsxRuntimeExports.jsx);
  jsxRuntimeExports.jsxs = wrapJsx(jsxRuntimeExports.jsxs);

  if (reactExports && typeof reactExports.createElement === "function") {
    const origCreateElement = reactExports.createElement;
    reactExports.createElement = function (type, config, ...children) {
      let nextConfig = config;
      if (config && typeof config === "object") nextConfig = trProps(config);
      if (children.length) {
        const mapped = children.map((child) => (typeof child === "string" ? tr(child) : child));
        const changed = mapped.some((child, i) => child !== children[i]);
        if (changed) return origCreateElement.call(reactExports, type, nextConfig, ...mapped);
      }
      return origCreateElement.call(reactExports, type, nextConfig, ...children);
    };
  }

  window.__zh = tr;
})();
/* ===== zh-CN end ===== */
