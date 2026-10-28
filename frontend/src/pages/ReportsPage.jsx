import React, { useMemo, useState } from "react";
import { ArrowDownToLine, ArrowUpRight, CalendarDays, ChevronDown, FileBarChart2, FileSearch, Filter, MoreHorizontal, Plus, Search } from "lucide-react";
import { Link } from "react-router-dom";

const initialReports = [
  { id: "RW-1048", domain: "brightpathstudio.com", label: "Marketing website", score: 84, issues: 6, date: "Oct 28, 2026", status: "Complete", color: "blue" },
  { id: "RW-1047", domain: "northstarlearn.in", label: "Education", score: 76, issues: 11, date: "Oct 27, 2026", status: "Complete", color: "purple" },
  { id: "RW-1046", domain: "studioleaf.co", label: "Creative services", score: 68, issues: 14, date: "Oct 25, 2026", status: "Review needed", color: "orange" },
  { id: "RW-1045", domain: "fieldandform.in", label: "E-commerce", score: 88, issues: 3, date: "Oct 23, 2026", status: "Complete", color: "green" },
];

export default function ReportsPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All reports");
  const [notice, setNotice] = useState("");
  const reports = useMemo(() => initialReports.filter(r => `${r.domain} ${r.label} ${r.id}`.toLowerCase().includes(query.toLowerCase()) && (status === "All reports" || (status === "Complete" ? r.status === "Complete" : r.status !== "Complete"))), [query, status]);
  function exportCsv() {
    const csv = ["ID,Website,Category,Score,Issues,Date,Status", ...reports.map(r => [r.id, r.domain, r.label, r.score, r.issues, r.date, r.status].map(v => `"${String(v).replaceAll('"', '""')}"`).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "rankwise-audit-history.csv";
    link.click();
    URL.revokeObjectURL(link.href);
    setNotice("CSV exported with the currently filtered sample reports.");
  }
  return (
    <div className="page-wrap">
      <div className="page-heading-row">
        <div><span className="section-kicker">YOUR SEO WORKSPACE</span><h1>Audit history</h1><p>Review past audits and keep track of your next steps.</p></div>
        <div className="heading-actions"><button className="button button-secondary" onClick={exportCsv}><ArrowDownToLine size={16} /> Export CSV</button><Link to="/audit/new" className="button button-primary"><Plus size={16} /> New audit</Link></div>
      </div>
      <div className="demo-banner"><span className="demo-banner-icon"><FileBarChart2 size={17} /></span><div><strong>Sample reports</strong><p>These are example records to preview the interface. New live audit records will appear once persistence is connected.</p></div></div>
      <div className="reports-summary-grid"><div className="reports-summary-card"><span>Total sample audits</span><strong>24</strong><small><FileSearch size={13} /> Across 4 example websites</small></div><div className="reports-summary-card"><span>Average SEO score</span><strong>79<span>/100</span></strong><small className="positive-text"><ArrowUpRight size={13} /> +6.2% this month</small></div><div className="reports-summary-card"><span>Need attention</span><strong>07</strong><small>Across the example workspace</small></div></div>
      <section className="panel reports-table-panel">
        <div className="report-toolbar"><div className="search-box"><Search size={16} /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search websites or report ID…" /></div><label className="filter-select"><Filter size={15} /><select value={status} onChange={e => setStatus(e.target.value)}><option>All reports</option><option>Complete</option><option>Review needed</option></select><ChevronDown size={14} /></label></div>
        {notice && <div className="success-notice">{notice}<button onClick={() => setNotice("")}>×</button></div>}
        <div className="reports-table">
          <div className="reports-table-head"><span>REPORT / WEBSITE</span><span>SEO SCORE</span><span>ISSUES</span><span>DATE</span><span>STATUS</span><span /></div>
          {reports.map(r => <div className="reports-table-row" key={r.id}><div className="report-website"><span className={`site-favicon site-favicon-${r.color}`}>{r.domain.charAt(0).toUpperCase()}</span><span><strong>{r.domain}</strong><small>{r.id} · {r.label}</small></span></div><div className="report-score"><strong>{r.score}</strong><div className="score-track"><span style={{ width: `${r.score}%` }} /></div></div><span className={r.issues > 10 ? "issue-count issue-count-high" : "issue-count"}>{r.issues} issues</span><span className="report-date"><CalendarDays size={14} /> {r.date}</span><span><span className={`status-pill ${r.status === "Complete" ? "status-good" : "status-review"}`}>{r.status}</span></span><button className="icon-button report-more" aria-label={`More options for ${r.domain}`} onClick={() => setNotice(`Report ${r.id} is a sample record. Live report detail pages are planned.`)}><MoreHorizontal size={18} /></button></div>)}
          {reports.length === 0 && <div className="empty-state"><Search size={22} /><strong>No reports found</strong><p>Try another website name or change the status filter.</p></div>}
        </div>
        <div className="reports-table-footer"><span>Showing {reports.length} of {initialReports.length} sample reports</span><span>Sample data <span className="footer-dot">•</span> Demo workspace</span></div>
      </section>
    </div>
  );
}
