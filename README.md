# SenEcon / OTE

《最优运输理论》的出版物展示页与资源下载页。

页面定位为一本学术教材的数字书籍封面：展示书籍简介、前言节选、三卷目录、PDF 下载和配套代码说明。完整正文继续以 PDF 作为正式阅读版本，不转换为整站 HTML。

## Local development

```powershell
npm install
npm run dev
npm run build
npm run test:sites
```

## Publication model

网页通过 GitHub Pages 发布，路径为 `/senecon-ote/`。三卷 PDF 与配套代码作为 GitHub Release 附件保存，网页中的下载入口指向对应版本，避免把大型二进制文件放入 Git 历史。LaTeX 源码和构建文件不公开发布。

## Current resources

- GitHub Release：三卷 PDF 与配套代码；
- `public/assets/ote-book-mockup.png`：首页书籍样本图；
- `public/assets/ote-cover-background.png`：教材封面背景素材；
- `design-qa.md`：Product Design 视觉校验报告。

## Release assets

`v2.1` Release 发布三卷分册 PDF 与配套代码。Slides 可在形成稳定课程版本后另行发布，LaTeX 源码不进入公开下载。
