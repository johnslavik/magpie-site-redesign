import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import MagpieCard from "./MagpieCard";
import WorkflowIllustration, { type WorkflowScene } from "./WorkflowIllustration";

const examples = [
  { scene: "security" as WorkflowScene, input: "A security report arrives", skill: "security-issue-triage", work: ["Investigate the report", "Write and test the fix", "Coordinate release & CVE"], outcome: "A released fix and a published CVE", path: "/docs/security/readme" },
  { scene: "review" as WorkflowScene, input: "A pull request needs review", skill: "pr-management-code-review", work: ["Read the code changes", "Check tests and conventions", "Draft comments with evidence"], outcome: "A review ready to approve", path: "/docs/pr-management/readme" },
  { scene: "bug" as WorkflowScene, input: "A bug needs fixing", skill: "issue-fix-workflow", work: ["Reproduce the failure", "Write the fix", "Add a regression test"], outcome: "A tested fix ready to merge", path: "/docs/issue-management/readme" },
  { scene: "release" as WorkflowScene, input: "A release needs checking", skill: "release-verify-rc", work: ["Verify the build and signatures", "Prepare the release vote", "Draft the announcement"], outcome: "A release ready to publish", path: "/docs/release-management/readme" },
  { scene: "contributor" as WorkflowScene, input: "Someone wants to contribute", skill: "newcomer-issue-explainer", work: ["Find a suitable issue", "Explain the code to change", "Show how to test the change"], outcome: "A clear first task to work on", path: "/docs/mentoring/readme" },
  { scene: "dependencies" as WorkflowScene, input: "Your dependencies need updating", skill: "dependency-audit", work: ["Find vulnerable packages", "Flag abandoned dependencies", "Prioritise the fixes"], outcome: "An actionable upgrade plan", path: "/docs/repo-health/readme" },
  { scene: "pairing" as WorkflowScene, input: "Your code needs a second look", skill: "pairing-self-review", work: ["Review the local diff", "Find bugs and missing tests", "Suggest specific fixes"], outcome: "Problems caught before a PR", path: "/docs/pairing/readme" },
  { scene: "onboarding" as WorkflowScene, input: "A new committer joins", skill: "committer-onboarding", work: ["Check required paperwork", "Track access setup", "Prepare the welcome"], outcome: "Onboarding covered, step by step", path: "/docs/contributor-growth/readme" },
  { scene: "sandbox" as WorkflowScene, input: "Your agent needs a sandbox", skill: "setup-isolated-setup-install", work: ["Configure the sandbox", "Limit file and tool access", "Verify the protections"], outcome: "An isolated workspace to code in", path: "/docs/setup/secure-agent-setup" },
];

export default function HeroWorkflows() {
  const [selected, setSelected] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    setPlaying(!media.matches);
    const change = () => setPlaying(!media.matches);
    media.addEventListener("change", change);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .3 });
    if (root.current) observer.observe(root.current);
    return () => { observer.disconnect(); media.removeEventListener("change", change); };
  }, []);
  useEffect(() => {
    if (!playing || !visible) return;
    const timer = setInterval(() => { if (!document.hidden) setSelected(i => (i + 1) % examples.length); }, 6000);
    return () => clearInterval(timer);
  }, [playing, visible]);
  return <div ref={root} className="workflow-reel" role="region" aria-roledescription="carousel" aria-label="Nine ways maintainers use Magpie" onMouseEnter={() => setPlaying(false)} onFocusCapture={() => setPlaying(false)}>
    <div className="reel-window" aria-live={playing ? "off" : "polite"}>
      <div className="reel-track" style={{ transform: `translateX(-${selected * 100}%)` }}>
        {examples.map((item, i) => <div className="reel-slide" key={item.scene} aria-hidden={i !== selected} inert={i !== selected} role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${examples.length}: ${item.input}`}>
          <ol className="reel-flow">
            <li className="reel-source"><span className="reel-input">{item.input}</span><WorkflowIllustration scene={item.scene} /></li>
            <MagpieCard as="li" headingLevel="h2" className="reel-process" work={item.work} />
            <li className="reel-delivery"><strong className="reel-outcome">{item.outcome}</strong><WorkflowIllustration scene={item.scene} result /></li>
          </ol>
        </div>)}
      </div>
    </div>
    <div className="example-navigation" aria-label="Choose a use case">
      {examples.map((item, i) => <button className="reel-dot" key={item.scene} type="button" aria-label={`${i + 1}: ${item.input}`} aria-pressed={selected === i} title={item.input} onClick={() => {setSelected(i);setPlaying(false);}}><span /></button>)}
      <button type="button" className="reel-play" aria-label={playing ? "Pause examples" : "Play examples"} onClick={() => setPlaying(v => !v)}>{playing ? <Pause size={18} /> : <Play size={18} />}</button>
    </div>
  </div>;
}
