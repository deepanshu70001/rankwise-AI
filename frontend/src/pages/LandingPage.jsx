import React from "react";
import { ArrowRight, ArrowUpRight, BarChart3, Check, ChevronRight, CircleGauge, FileSearch, Globe2, MousePointerClick, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import Brand from "../components/Brand.jsx";

const features = [
  { icon: FileSearch, title: "Find issues that matter", text: "Understand missing metadata, heading structure, image alt text, and page-level technical issues." },
  { icon: Sparkles, title: "Turn findings into action", text: "Get clear explanations and practical recommendations instead of an overwhelming audit spreadsheet." },
  { icon: BarChart3, title: "Track your progress", text: "Keep reports together and compare scans to see which improvements have been completed." },
];

function MockAuditCard() {
  return (
    <div className="hero-visual">
      <div className="visual-glow" />
      <div className="browser-window">
        <div className="browser-bar"><div className="window-dots"><i /><i /><i /></div><div className="browser-address"><ShieldCheck size={12} /> app.rankwise.ai/audit</div><div className="browser-more">•••</div></div>
        <div className="mock-content">
          <div className="mock-heading-row"><div><span className="eyebrow">WEBSITE OVERVIEW</span><h3>brightpathstudio.com</h3><p className="mock-subtitle">Last scanned just now <span className="live-dot" /></p></div><span className="mock-chip"><Check size={12} /> Scan complete</span></div>
          <div className="mock-stat-grid">
            <div className="mock-score"><div className="score-ring"><div className="score-ring-inner"><strong>84</strong><small>/100</small></div></div><div><span>SEO health score</span><strong className="positive-text">+12 points</strong><small className="muted-text">since last scan</small></div></div>
            <div className="mock-mini-stat"><span>Issues to review</span><strong>06</strong><small><span className="dot dot-amber" /> 2 high priority</small></div>
          </div>
          <div className="mock-issues-title"><strong>Recommended next steps</strong><span>View all <ChevronRight size={12} /></span></div>
          <div className="mock-issue"><span className="issue-icon issue-amber"><FileSearch size={14} /></span><div><strong>Improve page descriptions</strong><small>3 pages · Metadata</small></div><span className="priority-tag">Medium</span></div>
          <div className="mock-issue"><span className="issue-icon issue-green"><Globe2 size={14} /></span><div><strong>Add image descriptions</strong><small>5 images · Accessibility</small></div><span className="priority-tag priority-low">Low</span></div>
        </div>
      </div>
      <div className="floating-note"><span className="floating-note-icon"><Sparkles size={15} /></span><div><strong>Clear next steps</strong><small>Recommendations, not just scores</small></div><span className="float-check"><Check size={14} /></span></div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="marketing-site">
      <header className="marketing-nav container">
        <Brand />
        <nav className="marketing-links"><a href="#features">Features</a><a href="#how-it-works">How it works</a><a href="#pricing">Pricing</a></nav>
        <div className="marketing-nav-actions"><Link to="/login" className="nav-login">Log in</Link><Link to="/signup" className="button button-dark button-nav">Get started <ArrowUpRight size={16} /></Link></div>
      </header>

      <section className="hero-section container">
        <div className="hero-copy">
          <div className="announcement"><span className="announcement-icon"><Sparkles size={13} /></span> A clearer way to work on SEO <ArrowRight size={13} /></div>
          <h1>Make your website<br />work <span>smarter.</span></h1>
          <p className="hero-description">Find what is holding your website back, understand what to fix, and turn SEO tasks into a simple action plan.</p>
          <div className="hero-actions"><Link to="/signup" className="button button-primary">Start your free audit <ArrowRight size={17} /></Link><a href="#how-it-works" className="button button-quiet">See how it works <ChevronRight size={16} /></a></div>
          <div className="hero-proof"><div className="proof-avatars"><span>R</span><span>A</span><span>M</span><span>+</span></div><div><div className="proof-stars">★★★★★</div><p>Made for teams who want clarity, not complexity.</p></div></div>
          <div className="hero-footnote"><ShieldCheck size={14} /> Start free. No credit card needed.</div>
        </div>
        <MockAuditCard />
      </section>

      <section className="trust-strip"><div className="container trust-inner"><span>MADE FOR GROWING TEAMS</span><div><Globe2 size={16} /> Small businesses</div><div><CircleGauge size={16} /> SEO consultants</div><div><Zap size={16} /> Lean marketing teams</div></div></section>

      <section className="section container" id="features">
        <div className="section-heading"><span className="section-kicker">LESS GUESSWORK. MORE PROGRESS.</span><h2>Everything you need to take<br className="desktop-break" /> the next right SEO step.</h2><p>Practical website insights designed to help you move from an audit to action.</p></div>
        <div className="feature-grid">{features.map(({ icon: Icon, title, text }, i) => <article className="feature-card" key={title}><span className={`feature-icon feature-icon-${i}`}><Icon size={21} /></span><span className="feature-number">0{i + 1}</span><h3>{title}</h3><p>{text}</p><a href="#how-it-works">Explore feature <ArrowRight size={14} /></a></article>)}</div>
      </section>

      <section className="workflow-section" id="how-it-works"><div className="container workflow-grid"><div><span className="section-kicker">HOW IT WORKS</span><h2>From website URL<br />to a clearer plan.</h2><p className="workflow-intro">No jargon-heavy spreadsheets. Just a focused workflow that helps you understand what deserves attention first.</p><Link to="/signup" className="button button-dark">Try the workspace <ArrowRight size={16} /></Link></div><div className="workflow-steps"><div className="workflow-step"><span>01</span><div><h3>Enter your website</h3><p>Start with a URL and get a page-level scan.</p></div><Globe2 size={20} /></div><div className="workflow-step"><span>02</span><div><h3>Understand the findings</h3><p>See detected issues with explanations and priority.</p></div><FileSearch size={20} /></div><div className="workflow-step"><span>03</span><div><h3>Take action and recheck</h3><p>Follow the plan, then rescan to verify changes.</p></div><MousePointerClick size={20} /></div></div></div></section>

      <section className="pricing-section container" id="pricing"><div className="section-heading"><span className="section-kicker">SIMPLE TO START</span><h2>Useful from day one.</h2><p>Start with the essentials. Add advanced workflows as your needs grow.</p></div><div className="pricing-card"><div><span className="pricing-label">STARTER WORKSPACE</span><h3>Get clear on your SEO.</h3><p>Explore the product and run through the demo workflow before connecting a website.</p><div className="pricing-price">Free <span>during early access</span></div><ul><li><Check size={16} /> Website audit interface</li><li><Check size={16} /> Prioritized issue dashboard</li><li><Check size={16} /> Report history UI</li></ul></div><div className="pricing-right"><span className="pricing-spark"><Sparkles size={20} /></span><h3>Build momentum</h3><p>Join the early product journey and help shape what comes next.</p><Link to="/signup" className="button button-primary button-full">Create a free account <ArrowRight size={16} /></Link><small>No payment details required for this demo.</small></div></div></section>

      <section className="closing-section"><div className="container closing-inner"><div><span className="section-kicker section-kicker-light">YOUR NEXT STEP STARTS HERE</span><h2>Better SEO starts<br />with knowing what to fix.</h2></div><Link to="/signup" className="button button-white">Get started for free <ArrowRight size={16} /></Link><div className="closing-orb" /></div></section>
      <footer className="marketing-footer container"><Brand /><span>© 2026 RankWise AI. A clearer way to work on SEO.</span><div><a href="#features">Features</a><Link to="/login">Log in</Link><Link to="/signup">Get started</Link></div></footer>
    </div>
  );
}
