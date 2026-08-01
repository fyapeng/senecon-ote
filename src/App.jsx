import {
  ArrowDown,
  ArrowRight,
  BookOpenText,
  BracketsCurly,
  FilePdf,
  Notebook,
} from "@phosphor-icons/react";

const volumes = [
  {
    number: "I",
    title: "理论基础",
    english: "Mathematical foundations",
    description: "测度空间、耦合、对偶、几何与计算方法。",
    pages: "第 1–9 章",
  },
  {
    number: "II",
    title: "微观经济基础",
    english: "Microeconomic foundations",
    description: "配置、需求、匹配、机制与市场设计。",
    pages: "第 10–17 章",
  },
  {
    number: "III",
    title: "经济学应用",
    english: "Economic applications",
    description: "结构估计、宏观分布、空间、金融与稳健决策。",
    pages: "第 18–25 章",
  },
];

function App() {
  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="SenEcon OTE home">
          SenEcon <span>/</span> OTE
        </a>
        <nav className="main-nav" aria-label="主导航">
          <a href="#contents">目录</a>
          <a href="#downloads">下载</a>
          <a href="#code">代码</a>
          <a href="#about">关于</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">SenEcon Academic Archive · 2026</p>
          <h1>最优运输理论</h1>
          <p className="hero-subtitle">Optimal Transport Theory</p>
          <div className="accent-rule" aria-hidden="true"><span /><i /></div>
          <p className="hero-intro">
            一部连接数学理论、计算方法与经济学应用的系统性教材。
            从边际分布与耦合出发，进入配置、价格、识别和分布动态。
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#downloads">
              下载电子版 <ArrowDown size={18} weight="bold" />
            </a>
            <a className="text-link" href="#contents">
              浏览目录 <ArrowRight size={17} weight="bold" />
            </a>
          </div>
        </div>
        <div className="hero-book-wrap">
          <div className="book-halo" aria-hidden="true" />
          <img className="hero-book" src="/assets/ote-book-mockup.png" alt="《最优运输理论》立体书籍封面" />
          <p className="book-caption">Mathematics · Economics · Optimal Transport</p>
        </div>
      </section>

      <section className="preface-section" id="about">
        <div className="section-label"><span>01</span><p>前言 · Preface</p></div>
        <div className="preface-grid">
          <h2>经济学经常面对分布，<br /><em>而不只面对均值。</em></h2>
          <div className="preface-copy">
            <p>
              消费者分散在不同偏好与收入状态中，工人与企业具有异质能力，居民、岗位和公共设施分布在空间上，风险以不同方式跨主体和时期传递。
            </p>
            <p>
              最优运输为这些问题提供了一套统一而有区分力的语言：边际分布描述资源或类型构成，耦合描述尚未确定的联合结构，成本或剩余函数记录技术、偏好、距离、风险与信息损失。
            </p>
            <a className="text-link" href="#downloads">阅读前言节选 <ArrowRight size={17} weight="bold" /></a>
          </div>
        </div>
      </section>

      <section className="contents-section" id="contents">
        <div className="section-heading">
          <div className="section-label"><span>02</span><p>目录 · Contents</p></div>
          <p className="section-note">三部 · 二十五章 · 技术附录 A–E</p>
        </div>
        <div className="volume-list">
          {volumes.map((volume) => (
            <article className="volume-row" key={volume.number}>
              <span className="volume-number">{volume.number}</span>
              <div className="volume-title"><h3>{volume.title}</h3><p>{volume.english}</p></div>
              <p className="volume-description">{volume.description}</p>
              <span className="volume-pages">{volume.pages}</span>
              <ArrowRight className="volume-arrow" size={19} weight="bold" />
            </article>
          ))}
        </div>
      </section>

      <section className="downloads-section" id="downloads">
        <div className="section-heading">
          <div className="section-label"><span>03</span><p>资源 · Downloads</p></div>
          <p className="section-note">免费用于学术阅读、引用与教学</p>
        </div>
        <div className="resource-list">
          <a className="resource-row resource-primary" href="/downloads/BOOK_OT_complete_electronic_v2.1.pdf" download>
            <FilePdf size={30} weight="thin" />
            <div><h3>完整电子版</h3><p>Complete PDF · 三部合订版</p></div>
            <span>约 9.6 MB</span><ArrowDown size={19} weight="bold" />
          </a>
          <a className="resource-row" href="#downloads">
            <BookOpenText size={30} weight="thin" />
            <div><h3>分卷 PDF</h3><p>Volume I · II · III</p></div>
            <span>按卷下载</span><ArrowRight size={19} weight="bold" />
          </a>
          <a className="resource-row" href="#code">
            <BracketsCurly size={30} weight="thin" />
            <div><h3>源代码与附录</h3><p>Python scripts · LaTeX source</p></div>
            <span>浏览代码</span><ArrowRight size={19} weight="bold" />
          </a>
          <a className="resource-row" href="#about">
            <Notebook size={30} weight="thin" />
            <div><h3>书籍信息</h3><p>简介、引用与更新记录</p></div>
            <span>查看说明</span><ArrowRight size={19} weight="bold" />
          </a>
        </div>
      </section>

      <section className="code-section" id="code">
        <div className="section-label"><span>04</span><p>代码 · Code</p></div>
        <div className="code-callout">
          <div><h2>理论需要可复核的计算。</h2><p>配套代码围绕离散化、求解器、残差、对偶间隙和数值证书组织，服务于教材中的理论与例子。</p></div>
          <a className="text-link" href="#downloads">访问代码库 <ArrowRight size={17} weight="bold" /></a>
        </div>
      </section>

      <footer className="site-footer">
        <div><span className="wordmark">SenEcon <span>/</span> OTE</span><p>最优运输理论 · 数字出版物展示页</p></div>
        <p>付亚鹏 · 2026</p>
      </footer>
    </main>
  );
}

export { App };
