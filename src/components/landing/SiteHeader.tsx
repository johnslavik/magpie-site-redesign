import { Menu, X, Search } from "lucide-react";
import { withBase } from "@/ui/lib/utils";

export function SiteHeader({ home = false, search = false }: { home?: boolean; search?: boolean }) {
  const links = [
    ["Results", "/#airflow"],
    ["How it works", "/#how-it-works"],
    ["Documentation", "/docs"],
  ];
  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="header-inner">
        <a className="brand-lockup" href={withBase("/")} aria-label="Apache Magpie home">
          <img className="official-wordmark" src={withBase("/wordmark.svg")} alt="Apache Magpie" width="160" height="45" />
        </a>
        {home ? <nav className="desktop-nav" aria-label="Main navigation">{links.map(([label, href]) => <a key={label} href={withBase(href)}>{label}</a>)}</nav> : <a className="docs-header-label" href={withBase("/docs")}>Documentation</a>}
        <div className="header-actions">
          {search && <><button className="docs-menu-toggle" aria-expanded="false" aria-controls="docs-sidebar"><Menu size={19}/><span>Browse</span></button><button className="docs-search-trigger" data-search-open><Search size={15}/><span>Search docs</span><kbd>⌘ K</kbd></button></>}
          {!search && <a className="button button-small" href={withBase("/docs/quick-start")}>Get started</a>}
          {home && <details className="mobile-menu"><summary aria-label="Toggle navigation"><Menu className="menu-open" size={22} /><X className="menu-close" size={22} /></summary><nav aria-label="Mobile navigation">{links.map(([label, href]) => <a key={label} href={withBase(href)}>{label}</a>)}</nav></details>}
        </div>
      </div>
    </header>
  );
}
