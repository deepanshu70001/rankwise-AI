import React, { useState } from "react";
import { AlertCircle, ArrowRight, CheckCircle2, ExternalLink, FileSearch, Globe2, LoaderCircle, LockKeyhole, Search, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { scanWebsite } from "../services/api.js";

const demoFindings = [
  { type: "high", title: "Review the page title", detail: "Make sure the title clearly describes this page and its purpose.", category: "Metadata" },
  { type: "medium", title: "Check the meta description", detail: "A useful description can help searchers understand the page before visiting.", category: "Metadata" },
  { type: "medium", title: "Review image alternative text", detail: "Ensure meaningful images have useful alt text; decorative images may use empty alt text.", category: "Accessibility" },
];

export default function NewAuditPage() {
  const [url, setUrl] = useState("");
  const [mode, setMode] = useState("single");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  async function handleScan(e) {
    e.preventDefault();
    setError("");
    setResult(null);
    if (!url.trim()) {
      setError("Enter a website URL to continue.");
      return;
    }
    let normalized = url.trim();
    if (!/^https?:\/\//i.test(normalized)) normalized = `https://${normalized}`;
    try {
      const parsed = new URL(normalized);
      if (!["http:", "https:"].includes(parsed.protocol)) throw new Error("Use an http or https website address.");
    } catch {
      setError("Enter a valid website URL, such as https://example.com.");
      return;
    }
    setLoading(true);
    try {
      const response = await scanWebsite(normalized);
      if (response?.mode === "demo") {
        setResult({ url: normalized, score: 84, demo: true, findings: demoFindings });
      } else {
        setResult({ ...response, url: normalized, demo: false, findings: response.issues || [] });
      }
    } catch (err) {
      setError(err.message || "The audit could not be completed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page-wrap audit-page">
      <div className="page-heading-row">
        <div><span className="section-kicker">WEBSITE ANALYSIS</span><h1>Run a new audit</h1><p>Start with one page. Get a clear view of what to review next.</p></div>
        <Link to="/reports" className="button button-secondary"><FileSearch size={16} /> View past audits</Link>
      </div>
      <div className="audit-layout">
        <div className="audit-main">
          <section className="panel audit-form-panel">
            <div className="form-step"><span>01</span><div><h2>Choose what to scan</h2><p>Enter the public website you want to review.</p></div></div>
            <form onSubmit={handleScan}>
              <label className="field-label" htmlFor="site-url">Website URL</label>
              <div className="url-input"><Globe2 size={18} /><input id="site-url" type="text" placeholder="https://yourwebsite.com" value={url} onChange={e => setUrl(e.target.value)} /><span className="url-secure"><LockKeyhole size={13} /> Public URL</span></div>
              <div className="field-help">Start with the homepage. We'll add multi-page crawling after the first version is connected.</div>
              <div className="scan-options">
                <label className={`scan-option ${mode === "single" ? "selected" : ""}`}><input type="radio" name="scanMode" value="single" checked={mode === "single"} onChange={() => setMode("single")} /><span className="scan-option-icon"><Search size={18} /></span><span><strong>Single page</strong><small>Review one URL in detail</small></span><span className="option-radio" /></label>
                <label className={`scan-option ${mode === "site" ? "selected" : ""} disabled-option`}><input type="radio" name="scanMode" value="site" checked={mode === "site"} onChange={() => setMode("site")} /><span className="scan-option-icon"><Globe2 size={18} /></span><span><strong>Entire website</strong><small>Multi-page crawl · Coming soon</small></span><span className="soon-tag">SOON</span></label>
              </div>
              {error && <div className="inline-error"><AlertCircle size={16} /> {error}</div>}
              <div className="form-actions"><button type="submit" className="button button-primary" disabled={loading}>{loading ? <><LoaderCircle size={16} className="spin" /> Scanning…</> : <>Analyze website <ArrowRight size={16} /></>}</button><span><ShieldCheck size={14} /> We only scan public pages</span></div>
            </form>
          </section>

          {result && <section className="panel audit-results">
            <div className="audit-result-heading"><div><span className="section-kicker">AUDIT RESULTS</span><h2>{result.url}</h2><p>{result.demo ? "Sample result for UI preview — not a live website scan." : "Scan completed. Review the findings below."}</p></div><div className="result-score"><strong>{result.score ?? "—"}</strong><span>SEO score</span></div></div>
            {result.demo && <div className="demo-banner slim-banner"><Sparkles size={15} /><span>This is illustrative demo data. Connect the Python API for live analysis.</span></div>}
            <div className="findings-heading"><strong>Recommended findings</strong><span>{result.findings.length} items</span></div>
            {result.findings.map((finding, i) => <div className="finding-row" key={finding.title || i}><span className={`finding-status finding-${finding.type || (finding.severity || "").toLowerCase()}`}><AlertCircle size={16} /></span><div><strong>{finding.title}</strong><p>{finding.detail}</p></div><span className="finding-category">{finding.category || finding.severity || "Review"}</span></div>)}
            <div className="result-actions"><button className="button button-secondary" onClick={() => { setResult(null); }}>Clear results</button><Link to="/reports" className="button button-primary">View audit history <ArrowRight size={15} /></Link></div>
          </section>}
        </div>
        <aside className="audit-aside">
          <div className="panel audit-help-card"><span className="audit-help-icon"><Sparkles size={19} /></span><h3>What you'll get</h3><p>A practical checklist to help you understand the basics before spending time on advanced SEO.</p><div className="audit-benefit"><CheckCircle2 size={16} /><span>Page metadata and heading checks</span></div><div className="audit-benefit"><CheckCircle2 size={16} /><span>Image alt-text review</span></div><div className="audit-benefit"><CheckCircle2 size={16} /><span>Prioritized next steps</span></div><div className="audit-benefit"><CheckCircle2 size={16} /><span>A report you can revisit</span></div></div>
          <div className="privacy-note"><ShieldCheck size={17} /><div><strong>Safe by design</strong><p>Before public launch, URL scanning will be handled by a protected backend with destination validation, timeouts, and crawl limits.</p></div></div>
          <div className="audit-doc-link"><span><ExternalLink size={16} /></span><div><strong>New to SEO audits?</strong><p>Start by checking titles, descriptions, headings, and important page links.</p></div></div>
        </aside>
      </div>
    </div>
  );
}
