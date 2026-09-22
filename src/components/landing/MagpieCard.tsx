import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { withBase } from "@/ui/lib/utils";

export function Checklist({ items }: { items: string[] }) {
  return <ul className="workflow-checklist">{items.map(item => <li key={item}><Check size={18} aria-hidden="true" /><span>{item}</span></li>)}</ul>;
}

export default function MagpieCard({ children, work, className = "", as: Element = "div", headingLevel = "h3" }: {
  children?: ReactNode;
  work?: string[];
  className?: string;
  as?: "div" | "li";
  headingLevel?: "h3" | "h4";
}) {
  const Heading = headingLevel;
  return <Element className={`magpie-card ${className}`}>
    <Heading className="magpie-card-brand"><img src={withBase("/favicon.svg")} alt="" width="32" height="32" /><span>Magpie</span></Heading>
    {work && <Checklist items={work} />}
    {children}
  </Element>;
}
