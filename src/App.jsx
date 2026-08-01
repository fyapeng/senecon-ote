import {
  ArrowDown,
  ArrowRight,
  BookOpenText,
  BracketsCurly,
  Copyright,
  DownloadSimple,
  FilePdf,
  GithubLogo,
  List,
  Stack,
  X,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { bookMeta, volumes } from "./content/book.generated.js";

const base = import.meta.env.BASE_URL;
const releaseBase = "https://github.com/fyapeng/senecon-ote/releases/download/v2.1";
const repositoryUrl = "https://github.com/fyapeng/senecon-ote";
const codeZip = `${releaseBase}/SenEcon-OTE-Companion-Code-v2.1.zip`;
const volumePdf = (file) => `${releaseBase}/${file}`;

const assetUrl = (name) => `${base}assets/${name}`;
const volumeCover = (number) => assetUrl(`ote-volume-${number}-cover.png`);

function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("hashchange", close);
    return () => window.removeEventListener("hashchange", close);
  }, []);

  return (
    <header className="site-header">
      <a className="author-mark" href="#top" aria-label="返回页首">Axel · Sencium</a>
      <button className="menu-button" type="button" aria-label={open ? "关闭导航" : "打开导航"} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
        {open ? <X size={25} /> : <List size={25} />}
      </button>
      <nav className={open ? "nav-links is-open" : "nav-links"} aria-label="主导航">
        <a href="#volumes">三卷结构</a>
        <a href={`${base}code/`}>配套代码</a>
        <a href={`${base}preface/`}>阅读序言</a>
        <a href={repositoryUrl} target="_blank" rel="noreferrer">GitHub</a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <Header />
      <div className="hero-field" aria-hidden="true" />
      <div className="hero-grid page-shell">
        <div className="hero-copy">
          <p className="eyebrow">三卷本教材 · 2026</p>
          <h1>最优运输理论</h1>
          <div className="gold-rule" />
          <p className="english-title">OPTIMAL<br />TRANSPORT THEORY</p>
          <p className="author">Axel · Sencium</p>
          <p className="hero-summary">从测度、耦合与对偶出发，连接计算、配置、识别与分布动态。</p>
          <div className="hero-actions">
            <a className="button button-gold" href={codeZip}><DownloadSimple size={25} /> 下载配套代码</a>
            <a className="button button-paper" href="#volumes"><FilePdf size={24} /> 下载分卷 PDF</a>
            <a className="hero-reading-link" href={`${base}preface/`}><BookOpenText size={20} /> 阅读序言</a>
          </div>
        </div>
        <div className="volume-stage" aria-label="《最优运输理论》三卷封面">
          <img className="volume-set-image" src={assetUrl("ote-three-volume-set-v2.png")} alt="《最优运输理论》三卷精装套书：数理基础、微观经济基础与经济学应用" />
          <p>VOLUME I · II · III</p>
        </div>
      </div>
      <a className="scroll-cue" href="#version" aria-label="查看版本信息"><ArrowDown size={20} /></a>
    </section>
  );
}

function VersionStrip() {
  return (
    <section className="version-section page-shell" id="version" aria-labelledby="version-title">
      <div className="section-kicker"><span /><h2 id="version-title">版本信息</h2></div>
      <div className="version-strip">
        <div><Stack size={28} /><p><span>当前版本</span><strong>v2.1 · 2026-08-02</strong></p></div>
        <div><BookOpenText size={29} /><p><span>教材规模</span><strong>{bookMeta.pages} 页</strong></p></div>
        <div><List size={29} /><p><span>内容结构</span><strong>{bookMeta.chapters} 章 · 附录 A–E</strong></p></div>
        <div><Copyright size={29} /><p><span>使用许可</span><strong><a href="https://creativecommons.org/licenses/by-nc/4.0/deed.zh-hans" target="_blank" rel="noreferrer">CC BY-NC 4.0</a></strong></p></div>
      </div>
    </section>
  );
}

function Introduction() {
  return (
    <section className="introduction-section page-shell" aria-labelledby="introduction-title">
      <div>
        <div className="section-kicker"><span /><h2 id="introduction-title">序言</h2></div>
        <blockquote>经济学经常面对分布，而不只面对均值。</blockquote>
        <p>最优运输为边际分布、联合结构、匹配、价格与动态路径提供共同语言。本书以数学理论为基础，经由微观配置与制度问题，进入统计、结构估计、宏观分布、空间、金融和稳健决策。</p>
        <a className="text-link" href={`${base}preface/`}>阅读全文与完整目录 <ArrowRight size={18} /></a>
      </div>
      <div className="introduction-motif"><img src={assetUrl("ote-cover-background.png")} alt="《最优运输理论》运输路径封面图形" /></div>
    </section>
  );
}

function VolumeSection() {
  return (
    <section className="volumes-section" id="volumes" aria-labelledby="volumes-title">
      <div className="page-shell">
        <div className="section-heading-row">
          <div><p className="eyebrow eyebrow-dark">A three-volume course</p><h2 id="volumes-title">三卷结构</h2></div>
          <p>三卷章号连续，依次展开数学基础、微观经济基础与经济学应用；网页提供全书序言和节级目录。</p>
        </div>
        <div className="volume-grid">
          {volumes.map((volume) => (
            <article className={`volume-card accent-${volume.accent}`} key={volume.number}>
              <img src={volumeCover(volume.number)} alt="" aria-hidden="true" />
              <div>
                <span>第 {volume.number} 卷 · {volume.pages} 页</span>
                <h3>{volume.title}</h3>
                <p>{volume.english}</p>
                <p>第 {volume.chapters[0].number}–{volume.chapters.at(-1).number} 章 · {volume.chapters.length} 章</p>
                <div className="volume-links"><a href={volumePdf(volume.file)}><DownloadSimple size={18} /> 下载本卷 PDF</a><a href={`${base}preface/#contents`}>查看本卷目录 <ArrowRight size={18} /></a></div>
              </div>
            </article>
          ))}
        </div>
        <a className="catalogue-link" href={`${base}preface/#contents`}>查看 25 章完整目录 <ArrowRight size={18} /></a>
      </div>
    </section>
  );
}

function Resources() {
  return (
    <section className="resources-section page-shell" aria-labelledby="resources-title">
      <div className="section-heading-row">
        <div><p className="eyebrow eyebrow-dark">Texts · Code · Updates</p><h2 id="resources-title">教材与配套材料</h2></div>
        <p>三卷教材 PDF 与配套代码按 v2.1 发布；LaTeX 源码和构建文件不公开下载。</p>
      </div>
      <div className="resource-grid">
        <article><BracketsCurly size={34} /><h3>配套代码包</h3><p>Python 程序、依赖说明、章节数值证书与统一运行器。</p><a href={codeZip}>下载代码 <ArrowRight size={18} /></a></article>
        <article><FilePdf size={34} /><h3>分卷教材 PDF</h3><p>三卷分别下载，文件名统一包含项目、卷次、英文副标题和版本号。</p><a href="#volumes">选择分卷 <ArrowRight size={18} /></a></article>
        <article><BookOpenText size={34} /><h3>使用说明</h3><p>查看安装、运行、按章查找以及结果核对方法。</p><a href={`${base}code/`}>阅读代码指南 <ArrowRight size={18} /></a></article>
        <article><GithubLogo size={34} /><h3>勘误与更新</h3><p>查看网站与配套材料的版本记录和后续修订。</p><a href={repositoryUrl} target="_blank" rel="noreferrer">访问 GitHub <ArrowRight size={18} /></a></article>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer><div className="page-shell footer-inner"><div><strong>最优运输理论</strong><span>Optimal Transport Theory</span></div><p>Axel · Sencium · 2026</p><a href={repositoryUrl} target="_blank" rel="noreferrer" aria-label="访问 GitHub 仓库"><GithubLogo size={24} /></a></div></footer>
  );
}

export function App() {
  return <main><Hero /><VersionStrip /><Introduction /><VolumeSection /><Resources /><Footer /></main>;
}
