import { Menu, Search } from "lucide-react";
import { withBase } from "@/ui/lib/utils";

export function SiteHeader({ search = false, currentPath = "" }: { search?: boolean; currentPath?: string }) {
  const installing = currentPath.replace(/\/$/, "") === "/start";
  return <header className="site-header">
    <a className="skip-link" href="#main-content">Skip to content</a>
    <div className="header-inner">
      <a className="brand-lockup" href={withBase("/")} aria-label="Apache Magpie home"><img className="official-wordmark" src={withBase("/wordmark.svg")} alt="Apache Magpie" width="160" height="45" /></a>
      {search ? <div className="header-actions">
        <button className="docs-menu-toggle" aria-label="Browse documentation" aria-expanded="false" aria-controls="docs-sidebar"><Menu size={21} aria-hidden="true" /><span>Browse</span></button>
        <button className="docs-search-trigger" data-search-open><Search size={18} aria-hidden="true" /><span>Search docs</span><kbd>⌘ K</kbd></button>
      </div> : <nav className="site-navigation" aria-label="Main navigation">
        <a className="nav-story" href={withBase("/#how-it-works")}>How it works</a>
        <a href={withBase("/docs")} target="_blank" rel="noreferrer">Docs</a>
        {!installing && <a className="button button-small" href={withBase("/start")} target="_blank" rel="noreferrer">Get started</a>}
      </nav>}
      <button className="theme-toggle" type="button" aria-label="Switch to dark mode" aria-pressed="false"><span aria-hidden="true">◐</span><span className="theme-label">Dark</span></button>
    </div>
  </header>;
}
