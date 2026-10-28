import React from "react";
import { Activity } from "lucide-react";
import { Link } from "react-router-dom";

export default function Brand({ light = false, compact = false }) {
  return (
    <Link className={`brand ${light ? "brand-light" : ""} ${compact ? "brand-compact" : ""}`} to="/" aria-label="RankWise AI home">
      <span className="brand-mark"><Activity size={19} strokeWidth={2.5} /></span>
      {!compact && <span className="brand-word">rankwise<span>ai</span></span>}
    </Link>
  );
}
