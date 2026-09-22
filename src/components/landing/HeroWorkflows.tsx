import { useEffect, useRef, useState } from "react";
import { Pause, Play, ChevronRight } from "lucide-react";
import { withBase } from "@/ui/lib/utils";

const examples = [
  { input: "Security report", work: ["Investigate the report", "Write and test the fix", "Coordinate release & CVE"], outcome: "Fix released. CVE published.", path: "/docs/security/readme" },
  { input: "Pull request", work: ["Read the code changes", "Check tests and conventions", "Draft comments with evidence"], outcome: "A review ready to approve", path: "/docs/pr-management/readme" },
  { input: "Bug report", work: ["Reproduce the failure", "Write the fix", "Add a regression test"], outcome: "A tested fix ready to merge", path: "/docs/issue-management/readme" },
  { input: "Release candidate", work: ["Verify the build and signatures", "Prepare the release vote", "Draft the announcement"], outcome: "A release ready to publish", path: "/docs/release-management/readme" },
  { input: "First-time contributor", work: ["Find a suitable issue", "Explain the code to change", "Show how to test the change"], outcome: "A clear first task to work on", path: "/docs/mentoring/readme" },
  { input: "Outdated dependencies", work: ["Find vulnerable packages", "Flag abandoned dependencies", "Prioritise the fixes"], outcome: "An actionable upgrade plan", path: "/docs/repo-health/readme" },
  { input: "Your uncommitted code", work: ["Review the local diff", "Find bugs and missing tests", "Suggest specific fixes"], outcome: "Problems caught before a PR", path: "/docs/pairing/readme" },
  { input: "New committer", work: ["Check required paperwork", "Track access setup", "Prepare the welcome"], outcome: "Onboarding covered, step by step", path: "/docs/contributor-growth/readme" },
  { input: "Agent setup", work: ["Configure the sandbox", "Limit file and tool access", "Verify the protections"], outcome: "An isolated workspace to code in", path: "/docs/setup/secure-agent-setup" },
];

export default function HeroWorkflows() {
  const [selected, setSelected] = useState(0);
  const [paused, setPaused] = useState(false);
  const [held, setHeld] = useState(false);
  const [reduced, setReduced] = useState(true);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update(); media.addEventListener("change", update);
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: .3 });
    if (ref.current) observer.observe(ref.current);
    return () => { media.removeEventListener("change", update); observer.disconnect(); };
  }, []);
  useEffect(() => {
    if (paused || held || reduced || !inView) return;
    const timer = window.setInterval(() => setSelected(value => (value + 1) % examples.length), 7000);
    return () => window.clearInterval(timer);
  }, [paused, held, reduced, inView]);
  const item = examples[selected];
  const move = (direction: number) => { setPaused(true); setSelected(value => (value + direction + examples.length) % examples.length); };
  return <div className="workflow-reel" ref={ref} role="region" aria-label="Examples of complete Magpie workflows" onMouseEnter={() => setHeld(true)} onMouseLeave={() => setHeld(false)} onFocusCapture={() => setHeld(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setHeld(false); }}>
    <div className="reel-window" aria-live="off">
      <div className="reel-example" key={selected}>
          <a href={withBase(item.path)} className="reel-active">
            <ol className="reel-flow">
              <li className="reel-source"><small>It starts with</small><span className="reel-input">{item.input}</span><div className="document-lines" aria-hidden="true"><i /><i /><i /></div></li>
              <li className="reel-process"><img className="process-wordmark" src={withBase("/wordmark.svg")} alt="Magpie" width="118" height="34" /><small>Runs the entire process with you</small><ul className="reel-work">{item.work.map(step => <li key={step}>{step}</li>)}</ul></li>
              <li className="reel-delivery"><span className="delivery-check" aria-hidden="true">✓</span><small>The result</small><strong className="reel-outcome">{item.outcome}</strong></li>
            </ol>
          </a>
      </div>
    </div>
    <div className="reel-controls">{!reduced && <button type="button" onClick={() => setPaused(value => !value)} aria-label={paused ? "Play workflow rotation" : "Pause workflow rotation"} title={paused ? "Play" : "Pause"}>{paused ? <Play size={14} /> : <Pause size={14} />}</button>}<button type="button" onClick={() => move(1)} aria-label="Next workflow" title="Next workflow"><ChevronRight size={17} /></button></div>
  </div>;
}
