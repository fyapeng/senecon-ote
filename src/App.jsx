import {
  ArrowDown,
  ArrowRight,
  BookOpenText,
  BracketsCurly,
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
const combinedPdf = `${releaseBase}/BOOK_OT_complete_electronic_v2.1.pdf`;
const sourceZip = `${releaseBase}/OTE_TeX_source_v2.2.zip`;

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
      <a className="author-mark" href="#top" aria-label="返回页首">Axel·Sencium</a>
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
          <p className="author">Axel·Sencium</p>
          <p className="hero-summary">从测度、耦合与对偶出发，连接计算、配置、识别与分布动态。</p>
          <div className="hero-actions">
            <a className="button button-gold" href={combinedPdf}><DownloadSimple size={25} /> 下载合订版</a>
            <a className="button button-paper" href={`${base}preface/`}><BookOpenText size={24} /> 阅读序言</a>
          </div>
        </div>
        <div className="volume-stage" aria-label="《最优运输理论》三卷封面">
          {volumes.map((volume) => (
            <img key={volume.number} className={`volume-cover volume-cover-${volume.number}`} src={volumeCover(volume.number)} alt={`《最优运输理论》第${volume.number}卷：${volume.title}`} />
          ))}
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
        <div><Stack size={28} /><p><span>出版结构</span><strong>三卷 · 2026</strong></p></div>
        <div><BookOpenText size={29} /><p><span>教材规模</span><strong>{bookMeta.pages} 页</strong></p></div>
        <div><List size={29} /><p><span>内容结构</span><strong>{bookMeta.chapters} 章 · 附录 A–E</strong></p></div>
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
          <p>三卷章号连续，可以按数学基础、微观经济和现代应用分开阅读，也可以下载 2024 页合订版。</p>
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
                <a href={`${releaseBase}/${volume.file}`}>下载本卷 <DownloadSimple size={18} /></a>
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
        <div><p className="eyebrow eyebrow-dark">PDF · Code · Source</p><h2 id="resources-title">下载与配套材料</h2></div>
        <p>正式 PDF 与源文件继续通过版本化 Release 保存，网页提供稳定入口与内容说明。</p>
      </div>
      <div className="resource-grid">
        <article><FilePdf size={34} /><h3>完整电子版</h3><p>三卷合订 · 2024 页 · 约 9.2 MB</p><a href={combinedPdf}>下载 PDF <ArrowRight size={18} /></a></article>
        <article><BracketsCurly size={34} /><h3>配套代码</h3><p>第 6–25 章数值证书、求解程序与可复核输出。</p><a href={`${base}code/`}>浏览代码总页 <ArrowRight size={18} /></a></article>
        <article><GithubLogo size={34} /><h3>LaTeX 源文件</h3><p>教材工程、图形、代码与三卷编译入口。</p><a href={sourceZip}>下载源文件 <ArrowRight size={18} /></a></article>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer><div className="page-shell footer-inner"><div><strong>最优运输理论</strong><span>Optimal Transport Theory</span></div><p>Axel·Sencium · 2026</p><a href={repositoryUrl} target="_blank" rel="noreferrer" aria-label="访问 GitHub 仓库"><GithubLogo size={24} /></a></div></footer>
  );
}

export function App() {
  return <main><Hero /><VersionStrip /><Introduction /><VolumeSection /><Resources /><Footer /></main>;
}
