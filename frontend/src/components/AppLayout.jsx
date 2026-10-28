import React, { useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Activity, Bell, ChevronDown, FileBarChart2, LayoutDashboard, Menu, Plus, Settings2, Sparkles, X, LogOut } from "lucide-react";
import Brand from "./Brand.jsx";

const navItems = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/audit/new", label: "New audit", icon: Plus },
  { to: "/reports", label: "Audit history", icon: FileBarChart2 },
  { to: "/settings", label: "Settings", icon: Settings2 },
];

export default function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const pageTitle = location.pathname === "/dashboard" ? "Overview"
    : location.pathname === "/audit/new" ? "Website audit"
    : location.pathname === "/reports" ? "Audit history" : "Workspace settings";

  return (
    <div className="app-shell">
      {mobileOpen && <button className="mobile-scrim" aria-label="Close menu" onClick={() => setMobileOpen(false)} />}
      <aside className={`sidebar ${mobileOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-brand-row">
          <Brand />
          <button className="icon-button mobile-close" onClick={() => setMobileOpen(false)} aria-label="Close navigation"><X size={18} /></button>
        </div>
        <div className="workspace-switcher">
          <span className="workspace-avatar">RW</span>
          <span className="workspace-copy"><strong>My workspace</strong><small>Free plan</small></span>
          <ChevronDown size={15} className="muted-icon" />
        </div>
        <div className="nav-label">WORKSPACE</div>
        <nav className="side-nav">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} onClick={() => setMobileOpen(false)}>
              <Icon size={18} strokeWidth={1.8} /><span>{label}</span>
              {label === "New audit" && <span className="nav-plus">+</span>}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-spacer" />
        <div className="sidebar-tip">
          <span className="tip-icon"><Sparkles size={17} /></span>
          <strong>Make every page count</strong>
          <p>Run an audit to uncover your next SEO improvement.</p>
          <button className="text-button" onClick={() => navigate("/audit/new")}>Start an audit <span>→</span></button>
        </div>
        <div className="sidebar-bottom">
          <div className="avatar">DG</div>
          <div className="user-copy"><strong>Demo User</strong><small>demo@rankwise.ai</small></div>
          <button className="icon-button" aria-label="Demo sign out" title="Demo sign out" onClick={() => navigate("/login")}><LogOut size={16} /></button>
        </div>
      </aside>

      <div className="main-column">
        <header className="app-topbar">
          <div className="topbar-left">
            <button className="icon-button mobile-menu" aria-label="Open navigation" onClick={() => setMobileOpen(true)}><Menu size={20} /></button>
            <div className="breadcrumbs"><span>Workspace</span><span className="crumb-slash">/</span><strong>{pageTitle}</strong></div>
          </div>
          <div className="topbar-actions">
            <span className="demo-pill"><span /> Demo workspace</span>
            <button className="icon-button notification-button" aria-label="Notifications"><Bell size={18} /><i /></button>
            <div className="profile-wrap">
              <button className="profile-trigger" onClick={() => setProfileOpen(v => !v)} aria-expanded={profileOpen}>
                <span className="avatar avatar-small">DG</span><ChevronDown size={14} />
              </button>
              {profileOpen && <div className="profile-menu"><strong>Demo User</strong><small>demo@rankwise.ai</small><button onClick={() => { setProfileOpen(false); navigate("/settings"); }}>Workspace settings</button><button onClick={() => { setProfileOpen(false); navigate("/login"); }}>Sign out of demo</button></div>}
            </div>
          </div>
        </header>
        <main className="app-content"><Outlet /></main>
        <footer className="app-footer"><span>© 2026 RankWise AI</span><span><Activity size={13} /> Built for clearer SEO decisions</span></footer>
      </div>
    </div>
  );
}
