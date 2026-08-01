import { ArrowLeft, ArrowRight, CheckCircle, DownloadSimple, FileCode, Flask, GithubLogo, Package } from "@phosphor-icons/react";
import { codeIndex, volumes } from "./content/book.generated.js";

const base = import.meta.env.BASE_URL;
const repositoryUrl = "https://github.com/fyapeng/senecon-ote";
const sourceZip = "https://github.com/fyapeng/senecon-ote/releases/download/v2.1/OTE_TeX_source_v2.2.zip";
const chapterMap = new Map(volumes.flatMap((volume) => volume.chapters.map((chapter) => [chapter.number, { ...chapter, volume }])));

function Header() {
  return <header className="code-header code-shell"><a href={base}>Axel·Sencium</a><nav><a href={base}>首页</a><a href={`${base}preface/`}>序言与目录</a><a href={repositoryUrl} target="_blank" rel="noreferrer">GitHub</a></nav></header>;
}

export function CodePage() {
  return (
    <main className="code-page">
      <section className="code-hero"><Header /><div className="code-hero-inner code-shell"><div><p className="eyebrow">最优运输理论 · Numerical certificates</p><h1>配套代码</h1><p>从动态运输与梯度流开始，配套程序覆盖算法、配置、匹配、结构估计、分布宏观、空间与金融应用。</p><div className="code-actions"><a className="button button-gold" href={sourceZip}><DownloadSimple size={23} /> 下载完整源文件</a><a href="#index">浏览章节索引 <ArrowRight size={18} /></a></div></div><div className="certificate-card"><Package size={35} /><span>代码覆盖</span><strong>第 6–25 章</strong><p>{codeIndex.length} 个章节目录 · Python 求解器与数值证书</p></div></div></section>

      <section className="code-intro code-shell"><div className="section-kicker"><span /><h2>为什么从第 6 章开始</h2></div><div><p>第 1–5 章侧重有限规划、测度、对偶、Brenier 理论和 Wasserstein 几何，核心内容以证明为主。第 6 章进入动态方程与数值离散后，章节开始配备可运行的 Python 证书。</p><p>网页提供稳定索引；实际程序继续随教材源文件以版本包保存，确保代码、章节公式与图形处在同一版本中。</p></div></section>

      <section className="certificate-principles"><div className="code-shell"><div className="section-kicker kicker-light"><span /><h2>每个证书检查什么</h2></div><div className="principle-grid"><article><Flask size={30} /><h3>数学残差</h3><p>原始可行性、边际约束、对偶间隙、互补条件和离散方程。</p></article><article><CheckCircle size={30} /><h3>经济闭合</h3><p>价格清算、激励约束、福利核算、政策约束与均衡条件。</p></article><article><FileCode size={30} /><h3>数值记录</h3><p>容差、网格、迭代次数、随机种子和可复查的 JSON / CSV 输出。</p></article></div></div></section>

      <section className="code-index code-shell" id="index"><div className="section-kicker"><span /><h2>章节代码索引</h2></div><p className="index-intro">目录名与全书连续章号一致。文件数量来自当前教材工程，发布包中还包含相应数据、证书与运行记录。</p><div className="code-volume-groups">{volumes.map((volume) => { const entries = codeIndex.filter((entry) => volume.chapters.some((chapter) => chapter.number === entry.number)); if (!entries.length) return null; return <article key={volume.number} className={`code-volume accent-${volume.accent}`}><header><span>{volume.roman}</span><div><h3>{volume.title}</h3><p>{volume.english}</p></div></header><ol>{entries.map((entry) => { const chapter = chapterMap.get(entry.number); return <li key={entry.number}><code>{entry.path}</code><div><strong>第 {entry.number} 章 · {chapter.title}</strong><span>{entry.pythonFiles} 个 Python 文件 · {entry.certificateFiles} 个证书相关文件</span></div></li>; })}</ol></article>; })}</div></section>

      <section className="code-cta"><div className="code-shell"><div><p className="eyebrow">OTE source package v2.2</p><h2>下载代码、LaTeX 与三卷编译入口。</h2></div><div><a className="button button-gold" href={sourceZip}><DownloadSimple size={22} /> 下载源文件</a><a href={base}><ArrowLeft size={18} /> 返回首页</a></div></div></section>
    </main>
  );
}
