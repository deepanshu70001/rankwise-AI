import React from "react";
import { ArrowDownRight, ArrowRight, ArrowUpRight, Check, ChevronRight, CircleAlert, Clock3, FileSearch, Globe2, Plus, Search, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const bars = [35, 46, 41, 58, 52, 63, 56, 72, 66, 78, 72, 88, 76, 93, 84, 100];

export default function DashboardPage() {
  const user = sessionStorage.getItem("rankwise_demo_user");
  return (
    <div className="page-wrap">
      <div className="page-heading-row">
        <div><span className="section-kicker">WEDNESDAY, OCTOBER 28, 2026</span><h1>Good afternoon{user ? `, ${user.split("@")[0]}` : ""} <span className="wave">✳</span></h1><p>Here's what's happening with your website's SEO.</p></div>
        <Link to="/audit/new" className="button button-primary"><Plus size={17} /> Run new audit</Link>
      </div>
      <div className="demo-banner"><span className="demo-banner-icon"><Sparkles size={17} /></span><div><strong>You're exploring the demo workspace</strong><p>Metrics and audit findings below are sample data. Connect the backend to scan real websites.</p></div><button aria-label="Dismiss notice" className="dismiss-banner" onClick={e => e.currentTarget.parentElement.remove()}>×</button></div>
      <section className="metric-grid">
        <div className="metric-card"><div className="metric-top"><span>Websites monitored</span><span className="metric-icon mint"><Globe2 size={18} /></span></div><div className="metric-number">04</div><div className="metric-foot"><span className="metric-neutral">Across your workspace</span></div></div>
        <div className="metric-card"><div className="metric-top"><span>Average SEO score</span><span className="metric-icon blue"><FileSearch size={18} /></span></div><div className="metric-number">78<span className="metric-outof">/100</span></div><div className="metric-foot"><span className="trend-up"><ArrowUpRight size={14} /> +8.4%</span><span>vs. previous scans</span></div></div>
        <div className="metric-card"><div className="metric-top"><span>Issues to review</span><span className="metric-icon amber"><CircleAlert size={18} /></span></div><div className="metric-number">23</div><div className="metric-foot"><span className="severity-mini"><i /> 4 high priority</span></div></div>
        <div className="metric-card"><div className="metric-top"><span>Fixes verified</span><span className="metric-icon violet"><Check size={18} /></span></div><div className="metric-number">16</div><div className="metric-foot"><span className="trend-up"><ArrowUpRight size={14} /> +5 this week</span></div></div>
      </section>

      <div className="dashboard-main-grid">
        <section className="panel chart-panel">
          <div className="panel-header"><div><h2>SEO health over time</h2><p>A snapshot of your tracked websites</p></div><button className="select-button">Last 30 days <ChevronRight size={14} /></button></div>
          <div className="chart-summary"><strong>78 <span>/ 100</span></strong><span className="trend-up"><ArrowUpRight size={14} /> 8.4% <small>vs previous period</small></span></div>
          <div className="chart-area"><div className="chart-y-labels"><span>100</span><span>75</span><span>50</span><span>25</span><span>0</span></div><div className="chart-plot"><div className="grid-lines"><i /><i /><i /><i /><i /></div><div className="bar-chart">{bars.map((height, i) => <div className={`chart-bar ${i === bars.length - 1 ? "chart-bar-current" : ""}`} style={{ height: `${height}%` }} key={i}><span /></div>)}</div></div></div>
          <div className="chart-x-labels"><span>Oct 01</span><span>Oct 07</span><span>Oct 14</span><span>Oct 21</span><span>Oct 28</span></div>
        </section>
        <section className="panel score-panel">
          <div className="panel-header"><div><h2>Audit score</h2><p>Latest sample scan</p></div><button className="more-button">•••</button></div>
          <div className="large-score-ring"><div><strong>84</strong><span>out of 100</span></div></div>
          <div className="score-state"><span className="state-dot" /> Good foundation</div>
          <p className="score-description">A solid starting point. A few targeted improvements could make this page more complete.</p>
          <div className="score-legend"><span><i className="legend-green" /> Passed <strong>24</strong></span><span><i className="legend-amber" /> To review <strong>06</strong></span><span><i className="legend-gray" /> Not checked <strong>03</strong></span></div>
        </section>
      </div>

      <div className="dashboard-bottom-grid">
        <section className="panel sites-panel">
          <div className="panel-header"><div><h2>Tracked websites</h2><p>Overview of your current projects</p></div><Link to="/reports" className="panel-link">View all <ArrowRight size={14} /></Link></div>
          <div className="site-table">
            <div className="site-table-head"><span>WEBSITE</span><span>SEO SCORE</span><span>STATUS</span><span>LAST AUDIT</span><span /></div>
            <div className="site-row"><span className="site-info"><span className="site-favicon site-favicon-blue">B</span><span><strong>brightpathstudio.com</strong><small>Marketing website</small></span></span><span className="site-score">84 <i>↗</i></span><span><span className="status-pill status-good">Healthy</span></span><span className="site-date">Today, 10:42 AM</span><Link to="/reports" className="row-chevron" aria-label="View report"><ChevronRight size={16} /></Link></div>
            <div className="site-row"><span className="site-info"><span className="site-favicon site-favicon-purple">N</span><span><strong>northstarlearn.in</strong><small>Education</small></span></span><span className="site-score">76 <i>↗</i></span><span><span className="status-pill status-review">Needs review</span></span><span className="site-date">Yesterday</span><Link to="/reports" className="row-chevron" aria-label="View report"><ChevronRight size={16} /></Link></div>
            <div className="site-row"><span className="site-info"><span className="site-favicon site-favicon-orange">S</span><span><strong>studioleaf.co</strong><small>Creative services</small></span></span><span className="site-score">68 <i className="score-down"><ArrowDownRight size={13} /></i></span><span><span className="status-pill status-action">Action needed</span></span><span className="site-date">Oct 25, 2026</span><Link to="/reports" className="row-chevron" aria-label="View report"><ChevronRight size={16} /></Link></div>
          </div>
          <div className="table-mobile-note">Sample website data for layout preview.</div>
        </section>
        <section className="panel recommendations-panel">
          <div className="panel-header"><div><h2>Recommended next steps</h2><p>Small wins to focus on first</p></div><span className="recommend-count">3</span></div>
          <div className="recommendation"><span className="rec-icon rec-orange"><CircleAlert size={16} /></span><div><strong>Review missing descriptions</strong><p>3 pages are missing meta descriptions.</p><span className="rec-meta">MEDIUM PRIORITY</span></div></div>
          <div className="recommendation"><span className="rec-icon rec-blue"><Search size={16} /></span><div><strong>Check internal linking</strong><p>Help visitors find related content.</p><span className="rec-meta">OPPORTUNITY</span></div></div>
          <div className="recommendation"><span className="rec-icon rec-green"><Check size={16} /></span><div><strong>Verify recent changes</strong><p>Rescan pages after updates.</p><span className="rec-meta">NEXT STEP</span></div></div>
          <Link className="recommendation-link" to="/audit/new">Open audit workspace <ArrowRight size={14} /></Link>
        </section>
      </div>
      <div className="dashboard-footnote"><Clock3 size={14} /> Sample dashboard data · Real scan metrics will appear when the backend is connected.</div>
    </div>
  );
}
