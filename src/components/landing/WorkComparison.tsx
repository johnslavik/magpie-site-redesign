import { useEffect, useRef, useState, type CSSProperties } from "react";
import { FileText, Search, Code2, PackageCheck, Megaphone, Archive, Check, MessageSquare, ListChecks } from "lucide-react";

const tasks = [
  ["Report", "Evidence", "Conversation"], ["Past cases", "Security model", "Findings"],
  ["Patch", "Tests", "Results"], ["Fix", "Version", "Release"],
  ["Versions", "Advisory", "Credits"], ["Records", "Evidence", "Lessons"],
];
const icons = [FileText, Search, Code2, PackageCheck, Megaphone, Archive];
export default function WorkComparison({ stage }: { stage: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } }, { threshold: .4 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  const Icon = icons[stage];
  return <div ref={ref} className="work-animation" data-started={started} style={{ "--fatigue": `${4 + stage * 3}deg`, "--manual-duration": `${6 + stage}s` } as CSSProperties}>
    {[false, true].map(assisted => <div key={String(assisted)} className={`work-vignette ${assisted ? "assisted" : "manual"}`}>
      <svg viewBox="0 0 110 95" className="working-person" aria-hidden="true"><g className="person-pose"><circle cx="48" cy="25" r="16" fill="none" stroke="currentColor" strokeWidth="2"/><path d={assisted ? "M41 29 Q48 36 55 29" : "M41 32 Q48 27 55 32"} fill="none" stroke="currentColor" strokeWidth="2"/><path d="M43 21h1m9 0h1M48 43v28M48 50L25 68M48 50l24 12M48 71L30 90m18-19 18 19" fill="none" stroke="currentColor" strokeWidth="2"/></g><path d="M62 67h45M90 67v26" stroke="currentColor" strokeWidth="2"/>{assisted && <image href="/favicon.svg" x="75" y="35" width="26" height="26"/>}</svg>
      <div className="work-piles">{tasks[stage].map((task, i) => <div className="work-pile" key={task} style={{ "--pile": i } as CSSProperties}>{i === 0 ? <Icon size={22} aria-hidden="true"/> : i === 1 ? <ListChecks size={22} aria-hidden="true"/> : <MessageSquare size={22} aria-hidden="true"/>}<span>{task}</span><Check className="pile-check" size={15} aria-hidden="true"/></div>)}</div>
      <span className="work-complete"><Check size={15} aria-hidden="true"/>Completed</span>
      <span className="work-caption">{assisted ? "You review the prepared work" : "You gather and process each item"}</span>
    </div>)}
    <small>Illustration of the workflow, not measured completion times.</small>
  </div>;
}
