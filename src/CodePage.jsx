import { ArrowLeft, ArrowRight, CheckCircle, DownloadSimple, FileCode, Flask, GithubLogo, Package } from "@phosphor-icons/react";
import { codeIndex, volumes } from "./content/book.generated.js";

const base = import.meta.env.BASE_URL;
const repositoryUrl = "https://github.com/fyapeng/senecon-ote";
const codeZip = "https://github.com/fyapeng/senecon-ote/releases/download/v2.1/OTE_companion_code_v2.1.zip";
const chapterMap = new Map(volumes.flatMap((volume) => volume.chapters.map((chapter) => [chapter.number, { ...chapter, volume }])));

function Header() {
  return <header className="code-header code-shell"><a href={base}>Axel · Sencium</a><nav><a href={base}>首页</a><a href={`${base}preface/`}>序言与目录</a><a href={repositoryUrl} target="_blank" rel="noreferrer">GitHub</a></nav></header>;
}

export function CodePage() {
  return (
    <main className="code-page">
      <section className="code-hero"><Header /><div className="code-hero-inner code-shell"><div><p className="eyebrow">最优运输理论 · Numerical certificates</p><h1>配套代码</h1><p>下载代码包后，可以统一运行全书计算证书，也可以按章节进入对应目录，复核算法、图形和数值结果。</p><div className="code-actions"><a className="button button-gold" href={codeZip}><DownloadSimple size={23} /> 下载配套代码</a><a href="#index">浏览章节索引 <ArrowRight size={18} /></a></div></div><div className="certificate-card"><Package size={35} /><span>代码包内容</span><strong>{codeIndex.length} 个章节目录</strong><p>Python 求解器 · 数值证书 · 依赖与运行说明</p></div></div></section>

      <section className="code-intro code-shell"><div className="section-kicker"><span /><h2>如何使用代码</h2></div><ol className="usage-steps"><li><span>01</span><div><strong>解压并保留目录结构</strong><p>代码包以 <code>code/</code> 为根目录，章节文件位于 <code>ch06/</code> 至 <code>ch25/</code>。</p></div></li><li><span>02</span><div><strong>安装 Python 依赖</strong><p><code>python -m pip install -r code/requirements.txt</code></p></div></li><li><span>03</span><div><strong>统一运行或按章复核</strong><p>执行 <code>python code/run_all_certificates.py</code>，也可以直接运行某一章中的脚本。</p></div></li></ol></section>

      <section className="certificate-principles"><div className="code-shell"><div className="section-kicker kicker-light"><span /><h2>每个证书检查什么</h2></div><div className="principle-grid"><article><Flask size={30} /><h3>数学残差</h3><p>原始可行性、边际约束、对偶间隙、互补条件和离散方程。</p></article><article><CheckCircle size={30} /><h3>经济闭合</h3><p>价格清算、激励约束、福利核算、政策约束与均衡条件。</p></article><article><FileCode size={30} /><h3>数值记录</h3><p>容差、网格、迭代次数、随机种子和可复查的 JSON / CSV 输出。</p></article></div></div></section>

      <section className="code-index code-shell" id="index"><div className="section-kicker"><span /><h2>章节代码索引</h2></div><p className="index-intro">目录名与全书连续章号一致。文件数量来自当前教材工程，发布包中还包含相应数据、证书与运行记录。</p><div className="code-volume-groups">{volumes.map((volume) => { const entries = codeIndex.filter((entry) => volume.chapters.some((chapter) => chapter.number === entry.number)); if (!entries.length) return null; return <article key={volume.number} className={`code-volume accent-${volume.accent}`}><header><span>{volume.roman}</span><div><h3>{volume.title}</h3><p>{volume.english}</p></div></header><ol>{entries.map((entry) => { const chapter = chapterMap.get(entry.number); return <li key={entry.number}><code>{entry.path}</code><div><strong>第 {entry.number} 章 · {chapter.title}</strong><span>{entry.pythonFiles} 个 Python 文件 · {entry.certificateFiles} 个证书相关文件</span></div></li>; })}</ol></article>; })}</div></section>

      <section className="code-cta"><div className="code-shell"><div><p className="eyebrow">OTE companion code v2.1</p><h2>下载配套代码并开始复核。</h2></div><div><a className="button button-gold" href={codeZip}><DownloadSimple size={22} /> 下载代码</a><a href={base}><ArrowLeft size={18} /> 返回首页</a></div></div></section>
    </main>
  );
}
