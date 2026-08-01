import { ArrowLeft, BookOpenText, Clock, DownloadSimple, ListBullets } from "@phosphor-icons/react";
import { useEffect } from "react";
import { bookMeta, volumes } from "./content/book.generated.js";
import prefaceHtml from "./content/preface.generated.html?raw";

const base = import.meta.env.BASE_URL;
const releaseBase = "https://github.com/fyapeng/senecon-ote/releases/download/v2.1";
const readingSections = [
  ["从土方搬运到分布几何", "从土方搬运到分布几何"],
  ["为什么现代经济学需要最优运输", "为什么现代经济学需要最优运输"],
  ["本书的组织原则", "本书的组织原则"],
  ["如何使用本书", "如何使用本书"],
  ["全书章节安排", "全书章节安排"],
  ["记号约定", "记号约定"],
  ["结语", "结语"],
];

function useMathJax() {
  useEffect(() => {
    window.MathJax = { tex: { inlineMath: [["\\(", "\\)"]], displayMath: [["\\[", "\\]"]] }, chtml: { scale: 0.94 }, options: { enableMenu: false } };
    const typeset = () => window.MathJax?.typesetPromise?.();
    const existing = document.getElementById("mathjax-script");
    if (existing) { typeset(); return undefined; }
    const script = document.createElement("script");
    script.id = "mathjax-script";
    script.src = "https://cdn.jsdelivr.net/npm/mathjax@3.2.2/es5/tex-mml-chtml.js";
    script.async = true;
    script.onload = typeset;
    document.head.appendChild(script);
    return undefined;
  }, []);
}

function Header() {
  return <header className="reading-header reading-shell"><a href={base}>Axel · Sencium</a><nav aria-label="阅读页导航"><a href={base}>首页</a><a href="#contents">完整目录</a><a href={`${base}code/`}>配套代码</a></nav></header>;
}

function Catalogue() {
  return (
    <section className="reading-catalogue reading-shell" id="contents" aria-labelledby="contents-title">
      <div className="section-kicker"><span /><h2 id="contents-title">三卷完整目录</h2></div>
      <p className="catalogue-intro">二十五章按三卷连续编号。展开任一章即可查看与正式 PDF 一致的 section 层级目录。</p>
      <div className="catalogue-volumes">
        {volumes.map((volume) => (
          <article key={volume.number} className={`catalogue-volume accent-${volume.accent}`}>
            <header><span>{volume.roman}</span><div><h3>{volume.title}</h3><p>{volume.english} · {volume.pages} 页</p></div></header>
            <div>
              {volume.chapters.map((chapter) => (
                <details key={chapter.number}>
                  <summary><span>{String(chapter.number).padStart(2, "0")}</span><strong>{chapter.title}</strong><small>{chapter.sections.length} 节</small></summary>
                  <ol>{chapter.sections.map((section, index) => <li key={`${chapter.number}-${index}`}><span>{chapter.number}.{index + 1}</span><span>{section}</span></li>)}</ol>
                </details>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function PrefacePage() {
  useMathJax();
  return (
    <main className="reading-page">
      <section className="reading-hero">
        <Header />
        <div className="reading-hero-inner reading-shell">
          <div><p className="eyebrow">最优运输理论 · 阅读</p><h1>序言</h1><p className="reading-deck">从边际分布与耦合出发，在数学理论、经济配置与现代应用之间建立共同语言。</p><div className="reading-meta"><span><Clock size={18} /> 约 20 分钟</span><span><BookOpenText size={18} /> {bookMeta.prefaceSections} 节 · 三卷二十五章</span></div></div>
          <div className="reading-cover-stack">{volumes.map((volume) => <img key={volume.number} src={`${base}assets/ote-volume-${volume.number}-cover.png`} alt={`第${volume.number}卷封面`} />)}</div>
        </div>
      </section>
      <div className="reading-layout reading-shell">
        <aside className="reading-rail" aria-label="序言目录"><p><ListBullets size={18} /> 本页目录</p><ol>{readingSections.map(([id,title],index)=><li key={id}><a href={`#${id}`}><span>{String(index+1).padStart(2,"0")}</span>{title}</a></li>)}</ol><a className="rail-home" href={base}><ArrowLeft size={17} /> 返回首页</a></aside>
        <article className="preface-content" dangerouslySetInnerHTML={{ __html: prefaceHtml }} />
      </div>
      <Catalogue />
      <section className="reading-cta"><div className="reading-shell"><div><p className="eyebrow">v2.1 · 三卷电子版</p><h2>继续阅读完整证明、习题与附录</h2></div><div className="reading-volume-downloads">{volumes.map((volume) => <a className="button button-gold" key={volume.number} href={`${releaseBase}/${volume.file}`}><DownloadSimple size={21} /> 下载第 {volume.number} 卷</a>)}</div></div></section>
    </main>
  );
}
