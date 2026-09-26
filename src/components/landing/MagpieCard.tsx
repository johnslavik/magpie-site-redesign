import type { ReactNode } from "react";
import { Check, type LucideIcon } from "lucide-react";
import { withBase } from "@/ui/lib/utils";

export function MagpieToolkit() { return <svg className="magpie-toolkit" viewBox="0 0 64 56" aria-hidden="true">
      <path d="M23 13V9a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v4" fill="none" stroke="currentColor" strokeWidth="2" />
      <rect x="5" y="13" width="54" height="38" rx="8" fill="var(--prepared-bg)" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 27h52" stroke="currentColor" strokeOpacity=".3" />
      <image href={withBase("/favicon.svg")} x="20" y="19" width="24" height="24" />
    </svg>; }

export function OldWayMark() {
  return <svg className="old-way-mark" viewBox="0 0 64 56" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M13 7 37 5 43 11 41 46 34 51 10 49 7 41 9 13Z" fill="var(--manual-bg)" />
    <path d="m16 18 17-1M16 26h15M15 34l13 1" strokeOpacity=".65" />
    <path d="m45 39 9-23 5 2-9 23-6 6Z" />
    <path d="m53 20 5 2M45 39l5 2" />
  </svg>;
}

export function Checklist({ items, icon: Icon = Check }: { items: string[]; icon?: LucideIcon }) {
  return <ul className="workflow-checklist">{items.map(item => <li key={item}><Icon size={18} aria-hidden="true" /><span>{item}</span></li>)}</ul>;
}

export default function MagpieCard({ children, work, className = "", as: Element = "div", headingLevel = "h3", toolkit = false, checklistIcon }: {
  toolkit?: boolean;
  checklistIcon?: LucideIcon;
  children?: ReactNode;
  work?: string[];
  className?: string;
  as?: "div" | "li";
  headingLevel?: "h2" | "h3" | "h4";
}) {
  const Heading = headingLevel;
  return <Element className={`magpie-card ${className}`}>
    <Heading className="magpie-card-brand"><MagpieToolkit /><span>Magpie{toolkit && <small className="toolkit-caption">A toolkit under your control</small>}</span></Heading>
    {work && <Checklist items={work} icon={checklistIcon} />}
    {children}
  </Element>;
}
