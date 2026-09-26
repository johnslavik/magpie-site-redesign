import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import MagpieCard from "./MagpieCard";
import WorkflowIllustration, { type WorkflowScene } from "./WorkflowIllustration";

const examples = [
  { scene: "security" as WorkflowScene, input: "A security report arrives", skill: "security-issue-triage", work: ["Investigates the report", "Writes and tests the fix", "Coordinates release & CVE"], outcome: "A released fix and a published CVE", path: "/docs/security/readme" },
  { scene: "review" as WorkflowScene, input: "A pull request needs review", skill: "pr-management-code-review", work: ["Reads the code changes", "Checks tests and conventions", "Drafts comments with evidence"], outcome: "A review ready to approve", path: "/docs/pr-management/readme" },
  { scene: "bug" as WorkflowScene, input: "A bug needs fixing", skill: "issue-fix-workflow", work: ["Reproduces the failure", "Writes the fix", "Adds a regression test"], outcome: "A tested fix ready to merge", path: "/docs/issue-management/readme" },
  { scene: "release" as WorkflowScene, input: "A release needs checking", skill: "release-verify-rc", work: ["Verifies the build and signatures", "Prepares the release vote", "Drafts the announcement"], outcome: "A release ready to publish", path: "/docs/release-management/readme" },
  { scene: "contributor" as WorkflowScene, input: "Someone wants to contribute", skill: "newcomer-issue-explainer", work: ["Finds a suitable issue", "Explains the code to change", "Shows how to test the change"], outcome: "A clear first task to work on", path: "/docs/mentoring/readme" },
  { scene: "dependencies" as WorkflowScene, input: "Your dependencies need updating", skill: "dependency-audit", work: ["Finds vulnerable packages", "Flags abandoned dependencies", "Prioritises the fixes"], outcome: "An actionable upgrade plan", path: "/docs/repo-health/readme" },
  { scene: "pairing" as WorkflowScene, input: "Your code needs a second look", skill: "pairing-self-review", work: ["Reviews the local diff", "Finds bugs and missing tests", "Suggests specific fixes"], outcome: "Problems caught before a PR", path: "/docs/pairing/readme" },
  { scene: "onboarding" as WorkflowScene, input: "A new committer joins", skill: "committer-onboarding", work: ["Checks required paperwork", "Tracks access setup", "Prepares the welcome"], outcome: "Onboarding covered, step by step", path: "/docs/contributor-growth/readme" },
  { scene: "sandbox" as WorkflowScene, input: "Your agent needs a sandbox", skill: "setup-isolated-setup-install", work: ["Configures the sandbox", "Limits file and tool access", "Verifies the protections"], outcome: "An isolated workspace to code in", path: "/docs/setup/secure-agent-setup" },
];

export default function HeroWorkflows() {
  const [selected, setSelected] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
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
    const boundary = root.current?.closest(".agent-shell") ?? root.current;
    if (!boundary) return;
    const hover = () => setHovered(boundary.matches(":hover"));
    const focus = (event?: Event) => setFocused(boundary.contains(event?.type === "focusout" ? (event as FocusEvent).relatedTarget as Node | null : document.activeElement));
    boundary.addEventListener("mouseenter", hover);
    boundary.addEventListener("mouseleave", hover);
    boundary.addEventListener("focusin", focus);
    boundary.addEventListener("focusout", focus);
    hover(); focus();
    return () => {
      boundary.removeEventListener("mouseenter", hover);
      boundary.removeEventListener("mouseleave", hover);
      boundary.removeEventListener("focusin", focus);
      boundary.removeEventListener("focusout", focus);
    };
  }, []);
  const advancing = playing && visible && !hovered && !focused;
  useEffect(() => {
    if (!advancing) return;
    const timer = setInterval(() => {
      const boundary = root.current?.closest(".agent-shell") ?? root.current;
      if (!document.hidden && boundary && !boundary.matches(":hover") && !boundary.contains(document.activeElement)) {
        setSelected(i => (i + 1) % examples.length);
      }
    }, 8000);
    return () => clearInterval(timer);
  }, [advancing]);
  return <div ref={root} className="workflow-reel" role="region" aria-roledescription="carousel" aria-label="Nine ways maintainers use Magpie">
    <div className="reel-window" aria-live={advancing ? "off" : "polite"}>
      <div className="reel-track" style={{ transform: `translateX(-${selected * 100}%)` }}>
        {examples.map((item, i) => <div className="reel-slide" key={item.scene} aria-hidden={i !== selected} inert={i !== selected} role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${examples.length}: ${item.input}`}>
          <ol className="reel-flow">
            <li className="reel-source"><span className="reel-input">{item.input}</span><WorkflowIllustration scene={item.scene} /></li>
            <MagpieCard as="li" headingLevel="h2" className="reel-process" toolkit work={item.work} />
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
