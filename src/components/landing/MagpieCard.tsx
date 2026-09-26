import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { withBase } from "@/ui/lib/utils";

export function Checklist({ items }: { items: string[] }) {
  return <ul className="workflow-checklist">{items.map(item => <li key={item}><Check size={18} aria-hidden="true" /><span>{item}</span></li>)}</ul>;
}

export default function MagpieCard({ children, work, className = "", as: Element = "div", headingLevel = "h3", toolkit = false }: {
  toolkit?: boolean;
  children?: ReactNode;
  work?: string[];
  className?: string;
  as?: "div" | "li";
  headingLevel?: "h2" | "h3" | "h4";
}) {
  const Heading = headingLevel;
  return <Element className={`magpie-card ${className}`}>
    <Heading className="magpie-card-brand">{toolkit ? <svg className="magpie-toolkit" viewBox="0 0 64 56" aria-hidden="true">
      <path d="M23 13V9a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v4" fill="none" stroke="currentColor" strokeWidth="2" />
      <rect x="5" y="13" width="54" height="38" rx="8" fill="var(--prepared-bg)" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 27h52" stroke="currentColor" strokeOpacity=".3" />
      <image href={withBase("/favicon.svg")} x="20" y="19" width="24" height="24" />
    </svg> : <img src={withBase("/favicon.svg")} alt="" width="32" height="32" />}<span>Magpie{toolkit && <small className="toolkit-caption">A toolkit under your control</small>}</span></Heading>
    {work && <Checklist items={work} />}
    {children}
  </Element>;
}
