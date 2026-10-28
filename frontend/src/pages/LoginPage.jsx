import React, { useState } from "react";
import { ArrowLeft, ArrowRight, Eye, EyeOff, LockKeyhole, Mail, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Brand from "../components/Brand.jsx";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim() || !password) {
      setError("Enter an email and password to continue.");
      return;
    }
    // Demo-only navigation. Replace with backend authentication before launch.
    sessionStorage.setItem("rankwise_demo_user", email.trim());
    navigate("/dashboard");
  }

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-brand-row"><Brand /><Link className="back-home" to="/"><ArrowLeft size={15} /> Back to home</Link></div>
        <div className="auth-form-wrap">
          <div className="auth-icon"><LockKeyhole size={22} /></div>
          <span className="section-kicker">WELCOME BACK</span>
          <h1>Good to see you<br />again.</h1>
          <p className="auth-subtitle">Sign in to pick up where you left off.</p>
          <div className="demo-alert"><Sparkles size={15} /><span><strong>Prototype mode</strong> — this form is not connected to real authentication yet.</span></div>
          <form className="auth-form" onSubmit={handleSubmit}>
            <label htmlFor="email">Email address</label>
            <div className="input-wrap"><Mail size={17} /><input id="email" type="email" placeholder="you@company.com" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} /></div>
            <div className="label-row"><label htmlFor="password">Password</label><button type="button" className="inline-link" onClick={() => setError("Password recovery will be available after backend authentication is connected.")}>Forgot password?</button></div>
            <div className="input-wrap"><LockKeyhole size={17} /><input id="password" type={showPassword ? "text" : "password"} placeholder="Enter your password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} /><button type="button" className="password-toggle" onClick={() => setShowPassword(v => !v)} aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}</button></div>
            {error && <p className="form-error">{error}</p>}
            <button className="button button-primary button-full auth-submit" type="submit">Continue to workspace <ArrowRight size={16} /></button>
          </form>
          <p className="auth-switch">New to RankWise? <Link to="/signup">Create an account</Link></p>
        </div>
        <div className="auth-bottom"><span>© 2026 RankWise AI</span><span><LockKeyhole size={13} /> Demo interface</span></div>
      </div>
      <div className="auth-right"><div className="auth-pattern" /><div className="auth-testimonial"><span className="testimonial-mark">“</span><h2>SEO should give you<br />direction, not more<br /><em>noise.</em></h2><p>Understand the issues, see the next steps, and keep making progress.</p><div className="testimonial-bottom"><span className="testimonial-avatar">RW</span><div><strong>RankWise AI</strong><small>SEO clarity for growing teams</small></div></div></div><div className="auth-right-footer">Built for small teams with big plans <Sparkles size={14} /></div></div>
    </div>
  );
}
