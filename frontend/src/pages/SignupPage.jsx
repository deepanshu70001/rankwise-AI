import React, { useState } from "react";
import { ArrowLeft, ArrowRight, Eye, EyeOff, LockKeyhole, Mail, UserRound } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Brand from "../components/Brand.jsx";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || password.length < 8) {
      setError("Add your name, a valid email, and a password of at least 8 characters.");
      return;
    }
    // Demo-only navigation. No account is created or password stored.
    sessionStorage.setItem("rankwise_demo_user", email.trim());
    navigate("/dashboard");
  }

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-brand-row"><Brand /><Link className="back-home" to="/"><ArrowLeft size={15} /> Back to home</Link></div>
        <div className="auth-form-wrap signup-form-wrap">
          <div className="auth-icon"><UserRound size={22} /></div>
          <span className="section-kicker">EARLY ACCESS</span>
          <h1>Make room for<br />better SEO.</h1>
          <p className="auth-subtitle">Create your workspace and explore the product.</p>
          <div className="demo-alert"><LockKeyhole size={15} /><span><strong>Demo mode</strong> — account creation is simulated. No account or password is saved.</span></div>
          <form className="auth-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Your name</label>
            <div className="input-wrap"><UserRound size={17} /><input id="name" type="text" placeholder="Alex Morgan" autoComplete="name" value={name} onChange={e => setName(e.target.value)} /></div>
            <label htmlFor="email">Work email</label>
            <div className="input-wrap"><Mail size={17} /><input id="email" type="email" placeholder="you@company.com" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} /></div>
            <label htmlFor="password">Password</label>
            <div className="input-wrap"><LockKeyhole size={17} /><input id="password" type={showPassword ? "text" : "password"} placeholder="At least 8 characters" autoComplete="new-password" value={password} onChange={e => setPassword(e.target.value)} /><button type="button" className="password-toggle" onClick={() => setShowPassword(v => !v)} aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}</button></div>
            {error && <p className="form-error">{error}</p>}
            <button className="button button-primary button-full auth-submit" type="submit">Create your workspace <ArrowRight size={16} /></button>
            <p className="auth-terms">By continuing, you agree to the product's terms and privacy policy once these are published for launch.</p>
          </form>
          <p className="auth-switch">Already have a workspace? <Link to="/login">Log in</Link></p>
        </div>
        <div className="auth-bottom"><span>© 2026 RankWise AI</span><span><LockKeyhole size={13} /> Demo interface</span></div>
      </div>
      <div className="auth-right"><div className="auth-pattern" /><div className="auth-testimonial"><span className="testimonial-mark">“</span><h2>A small step today.<br />A stronger website<br /><em>tomorrow.</em></h2><p>Start with simple, understandable insights—and turn them into consistent improvements.</p><div className="testimonial-bottom"><span className="testimonial-avatar">RW</span><div><strong>RankWise AI</strong><small>SEO clarity for growing teams</small></div></div></div><div className="auth-right-footer">Your next step starts here <ArrowRight size={14} /></div></div>
    </div>
  );
}
