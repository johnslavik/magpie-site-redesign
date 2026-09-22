import { useEffect, useRef, useState } from "react";
import { Pause, Play, ChevronRight } from "lucide-react";
import { withBase } from "@/ui/lib/utils";

const examples = [
  { input: "A vulnerability is reported", work: "Investigates the report, tests a fix, and coordinates the release and disclosure.", outcome: "A released fix and a published CVE", path: "/docs/security/readme" },
  { input: "A pull request needs review", work: "Reads the changes, checks test results, and drafts feedback tied to the code.", outcome: "A code review ready for your approval", path: "/docs/pr-management/readme" },
  { input: "Someone reports a bug", work: "Reproduces the failure, writes a fix, and adds a regression test.", outcome: "A tested fix, ready as a pull request", path: "/docs/issue-management/readme" },
  { input: "You have a release candidate", work: "Checks the build and signatures, prepares the vote, and drafts the announcement.", outcome: "A verified release, ready for you to publish", path: "/docs/release-management/readme" },
  { input: "A newcomer wants to contribute", work: "Finds a suitable issue and explains the code to change and tests to run.", outcome: "A clear path to a first contribution", path: "/docs/mentoring/readme" },
  { input: "Your project depends on outdated packages", work: "Checks for vulnerabilities and abandoned packages, then ranks the fixes.", outcome: "A prioritised list of dependency fixes", path: "/docs/repo-health/readme" },
  { input: "You want a second look before opening a PR", work: "Reviews your local changes and separates blocking problems from minor suggestions.", outcome: "Specific fixes to make before code review", path: "/docs/pairing/readme" },
  { input: "A contributor is becoming a committer", work: "Tracks paperwork and access setup, flags steps for your team, and drafts the welcome.", outcome: "Onboarding organised through to completion", path: "/docs/contributor-growth/readme" },
  { input: "Your agent needs an isolated workspace", work: "Configures the sandbox, limits access, and checks that the protections work.", outcome: "An agent ready to work in a sandbox", path: "/docs/setup/secure-agent-setup" },
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
              <li><small>You start with</small><span className="reel-input">{item.input}</span></li>
              <li><small className="reel-work-label"><img src={withBase("/favicon.svg")} width="16" height="16" alt="" />Magpie handles the work</small><p className="reel-work">{item.work}</p></li>
              <li><small>You get</small><strong className="reel-outcome">{item.outcome}</strong></li>
            </ol>
          </a>
      </div>
    </div>
    <div className="reel-controls">{!reduced && <button type="button" onClick={() => setPaused(value => !value)} aria-label={paused ? "Play workflow rotation" : "Pause workflow rotation"} title={paused ? "Play" : "Pause"}>{paused ? <Play size={14} /> : <Pause size={14} />}</button>}<button type="button" onClick={() => move(1)} aria-label="Next workflow" title="Next workflow"><ChevronRight size={17} /></button></div>
  </div>;
}
