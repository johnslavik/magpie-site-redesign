import { useEffect, useRef, useState } from "react";
import { ShieldCheck, PackageCheck, ScanSearch, GitPullRequest, Bug, Users, UserPlus, FileCheck2, Settings2, Check, Pause, Play, ChevronRight } from "lucide-react";
import { withBase } from "@/ui/lib/utils";

const examples = [
  { input: "Security report", steps: ["Investigate", "Fix & test", "Disclose"], outcome: "Released fix + public CVE", path: "/docs/security/readme", icon: ShieldCheck },
  { input: "Pull request", steps: ["Read the diff", "Check CI", "Review"], outcome: "Review ready to post", path: "/docs/pr-management/readme", icon: GitPullRequest },
  { input: "Bug report", steps: ["Reproduce", "Fix", "Test"], outcome: "Tested fix PR", path: "/docs/issue-management/readme", icon: Bug },
  { input: "Release candidate", steps: ["Verify", "Coordinate vote", "Announce"], outcome: "Verified, announced release", path: "/docs/release-management/readme", icon: PackageCheck },
  { input: "New contributor", steps: ["Find a task", "Guide", "Review"], outcome: "First contribution ready", path: "/docs/mentoring/readme", icon: Users },
  { input: "Repository", steps: ["Audit", "Diagnose", "Prioritise"], outcome: "Repository health action plan", path: "/docs/repo-health/readme", icon: ScanSearch },
  { input: "Local changes", steps: ["Read", "Review", "Suggest fixes"], outcome: "Changes checked before a PR", path: "/docs/pairing/readme", icon: FileCheck2 },
  { input: "New committer", steps: ["Prepare", "Coordinate", "Onboard"], outcome: "Committer onboarding completed", path: "/docs/contributor-growth/readme", icon: UserPlus },
  { input: "Your agent", steps: ["Isolate", "Guard", "Verify"], outcome: "Sandboxed workspace", path: "/docs/setup/secure-agent-setup", icon: Settings2 },
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
  const Icon = item.icon;
  const move = (direction: number) => { setPaused(true); setSelected(value => (value + direction + examples.length) % examples.length); };
  return <div className="workflow-reel" ref={ref} role="region" aria-label="Examples of complete Magpie workflows" onMouseEnter={() => setHeld(true)} onMouseLeave={() => setHeld(false)} onFocusCapture={() => setHeld(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setHeld(false); }}>
    <div className="reel-window" aria-live="off">
      <div className="reel-example" key={selected}>
          <a href={withBase(item.path)} className="reel-active">
            <ol className="reel-flow">
              <li><span className="flow-node" aria-hidden="true"><Icon size={17} strokeWidth={1.6} /></span><div><small>Start with</small><span className="reel-input">{item.input}</span></div></li>
              <li><span className="flow-node" aria-hidden="true"><img src={withBase("/favicon.svg")} width="20" height="20" alt="" /></span><div><small>Magpie handles</small><span className="reel-steps">{item.steps.map((step, i) => <span key={step}>{i > 0 && <span className="flow-arrow" aria-hidden="true">→</span>}{step}</span>)}</span></div></li>
              <li><span className="flow-node flow-finished" aria-hidden="true"><Check size={17} strokeWidth={2} /></span><div><small>You get</small><strong className="reel-outcome">{item.outcome}</strong></div></li>
            </ol>
          </a>
      </div>
    </div>
    <div className="reel-controls">{!reduced && <button type="button" onClick={() => setPaused(value => !value)} aria-label={paused ? "Play workflow rotation" : "Pause workflow rotation"} title={paused ? "Play" : "Pause"}>{paused ? <Play size={14} /> : <Pause size={14} />}</button>}<button type="button" onClick={() => move(1)} aria-label="Next workflow" title="Next workflow"><ChevronRight size={17} /></button></div>
  </div>;
}
