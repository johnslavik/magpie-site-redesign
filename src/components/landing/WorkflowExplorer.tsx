import { BrandText } from "./BrandName";
import SandboxStatus from "./SandboxStatus";
import { securityStages } from "./workflow-stages";
import { useEffect, useRef, useState } from "react";
import { GitPullRequest, ShieldCheck, Inbox, PackageCheck } from "lucide-react";
import { withBase } from "@/ui/lib/utils";

// Illustrative sessions grounded in the synced workflow-family documentation.
const workflows = [
  { id: "security", label: "Security reports", icon: ShieldCheck,
    title: "Magpie handles the full 16-step security workflow.",
    text: "Magpie takes each report through investigation, a tested fix, release coordination, CVE publication, and closure. It keeps the evidence and tracker in sync while your team reviews decisions, merges fixes, and sends the advisory.",
    path: "/docs/security/readme", prompt: "Investigate this security report and prepare the fix.",
    steps: [
      ["Read", "Project security model and report", "The reported path crosses a trust boundary."],
      ["Investigate", "Reproduce in an isolated workspace", "Reproducer confirms the reported behaviour."],
      ["Edit", "Private fix and regression test", "Regression test passes with the patch."],
      ["Draft", "Reporter response and advisory", "Prepared for review. Nothing sent or published."],
    ], result: "The fix and disclosure drafts are ready for your review.", approval: "Review the private patch before proceeding." },
  { id: "reviews", label: "Pull requests", icon: GitPullRequest,
    title: "Turn an incoming PR into a review you can post.",
    text: "Read the diff, check CI and project conventions, inspect the affected code, and draft line-by-line comments. Magpie proposes approve, request changes, or comment; you confirm before the review is posted.",
    path: "/docs/pr-management/readme", prompt: "Review this pull request against our project conventions.",
    steps: [
      ["Read", "Pull request diff and review criteria", "Loaded the changed files and project conventions."],
      ["Check", "CI status and affected code paths", "CI passes. One unhandled edge case needs attention."],
      ["Review", "Draft an inline comment", "Added a file reference and a suggested regression test."],
      ["Draft", "REQUEST_CHANGES review", "Review prepared locally. Nothing posted."],
    ], result: "One actionable finding, with evidence and a suggested test.", approval: "Post this review? Awaiting your confirmation." },
  { id: "issues", label: "Bug fixes", icon: Inbox,
    title: "Take a bug report through to a fix PR.",
    text: "Classify the issue, find duplicates, reproduce the bug, and prepare a fix with a regression test. Magpie follows your build and contribution instructions, then drafts the PR for your review.",
    path: "/docs/issue-management/readme", prompt: "Reproduce this bug and prepare a fix PR.",
    steps: [
      ["Triage", "Issue report and related issues", "No existing fix found. The report has enough detail."],
      ["Test", "Add a minimal reproducer", "The regression test fails on the current branch."],
      ["Edit", "Apply the fix and rerun tests", "The reproducer and related tests now pass."],
      ["Draft", "PR description and test evidence", "Included the root cause, patch, and verification."],
    ], result: "The patch, regression test, and PR draft are ready.", approval: "Review the changes before opening the PR." },
  { id: "releases", label: "Releases", icon: PackageCheck,
    title: "Carry a release from preparation to announcement.",
    text: "Prepare the release, verify the candidate, draft the vote, tally the result, and write the announcement. Your release manager keeps signing, publishing, and sending in their hands.",
    path: "/docs/release-management/readme", prompt: "Verify this release candidate and prepare the vote.",
    steps: [
      ["Read", "Release configuration and candidate", "Loaded the project’s verification requirements."],
      ["Verify", "Checksums, signatures, and source build", "Recorded verification evidence for the candidate."],
      ["Draft", "Release vote email", "Included candidate links and the voting window."],
      ["Prepare", "Release manager handoff", "Vote draft ready. No mail sent."],
    ], result: "Candidate verification and the vote draft are ready.", approval: "Review the evidence and send the vote when ready." },
];
export default function WorkflowExplorer() {
  const [selected, setSelected] = useState(0);
  const [stage, setStage] = useState(0);
  const sceneRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const conversationRef = useRef<HTMLDivElement>(null);
  const [scrollDriven, setScrollDriven] = useState(false);
  useEffect(() => {
    const media = matchMedia("(min-width: 801px) and (min-height: 760px) and (prefers-reduced-motion: no-preference)");
    const update = () => setScrollDriven(media.matches);
    update(); media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (selected !== 0) return;
    const scene = sceneRef.current, panel = panelRef.current, conversation = conversationRef.current;
    if (!scene || !panel || !conversation) return;
    const phases = Array.from(conversation.querySelectorAll<HTMLElement>("[data-conversation-phase]"));
    let frame = 0;
    const updatePhase = () => {
      const atEnd = conversation.scrollTop >= conversation.scrollHeight - conversation.clientHeight - 1;
      const index = atEnd ? phases.length - 1 : phases.reduce((current, phase, i) => phase.offsetTop <= conversation.scrollTop + 80 ? i : current, 0);
      setStage(index);
    };
    const update = () => {
      if (scrollDriven) {
        const distance = Math.max(0, 100 - scene.getBoundingClientRect().top);
        conversation.scrollTop = Math.min(distance, conversation.scrollHeight - conversation.clientHeight);
      }
      updatePhase();
    };
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update); };
    const measure = () => {
      if (scrollDriven) scene.style.height = `${panel.offsetHeight + conversation.scrollHeight - conversation.clientHeight}px`;
      update();
    };
    const observer = new ResizeObserver(measure);
    observer.observe(panel);
    if (conversation.firstElementChild) observer.observe(conversation.firstElementChild);
    if (scrollDriven) window.addEventListener("scroll", schedule, { passive: true });
    else conversation.addEventListener("scroll", schedule, { passive: true });
    measure();
    return () => {
      observer.disconnect(); cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      conversation.removeEventListener("scroll", schedule);
      scene.style.removeProperty("height");
    };
  }, [selected, scrollDriven]);
  const jumpToStage = (index: number) => {
    const conversation = conversationRef.current;
    const phase = conversation?.querySelectorAll<HTMLElement>("[data-conversation-phase]")[index];
    if (!conversation || !phase) return;
    const offset = Math.min(phase.offsetTop, conversation.scrollHeight - conversation.clientHeight);
    const behavior = matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth";
    if (scrollDriven && sceneRef.current) {
      window.scrollTo({ top: sceneRef.current.getBoundingClientRect().top + window.scrollY - 100 + offset, behavior: "instant" });
    } else conversation.scrollTo({ top: offset, behavior });
    setStage(index);
  };
  const w = workflows[selected];
  const session = selected === 0 ? securityStages[stage] : w;
  const choose = (index: number) => { setSelected(index); setStage(0); document.getElementById(`workflow-tab-${index}`)?.focus(); };
  return <div className="workflow-explorer">
    <div role="tablist" aria-label="Maintainer workflows" className="workflow-tabs">{workflows.map((item, i) => <button key={item.id} id={`workflow-tab-${i}`} role="tab" aria-selected={selected === i} aria-controls="workflow-panel" tabIndex={selected === i ? 0 : -1} onClick={() => { setSelected(i); setStage(0); }} onKeyDown={event => { if (["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) { event.preventDefault(); choose(event.key === "Home" ? 0 : event.key === "End" ? workflows.length - 1 : (i + (event.key === "ArrowRight" ? 1 : -1) + workflows.length) % workflows.length); } }}><item.icon size={18} />{item.label}</button>)}</div>
    <div className="workflow-scroll-scene" ref={sceneRef} data-scroll-driven={selected === 0 && scrollDriven}>
    <div ref={panelRef} role="tabpanel" id="workflow-panel" aria-labelledby={`workflow-tab-${selected}`} tabIndex={0} className="workflow-panel">
      <div className="workflow-description"><h3><BrandText text={w.title} /></h3><p><BrandText text={w.text} /></p>{selected === 0 && <div className="lifecycle-stages" role="group" aria-label="Security lifecycle phases">{securityStages.map((phase, i) => <button key={phase.label} type="button" aria-pressed={stage === i} aria-controls="lifecycle-session" onClick={() => jumpToStage(i)}>{phase.label}</button>)}</div>}<a className="text-link" href={withBase(w.path)}>Explore this workflow</a></div>
      {selected === 0 ? <figure className="agent-session lifecycle-conversation" id="lifecycle-session" aria-label="Example security conversation">
        <div className="session-heading"><strong>{securityStages[stage].label}</strong><span>~/your-project</span></div>
        <div className="conversation-scroll" ref={conversationRef} tabIndex={0} aria-label="Security workflow conversation" onKeyDown={event => {
          if (!scrollDriven || !["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End"].includes(event.key)) return;
          event.preventDefault();
          if (event.key === "Home" || event.key === "End") jumpToStage(event.key === "Home" ? 0 : securityStages.length - 1);
          else window.scrollBy({ top: (event.key.includes("Up") ? -1 : 1) * (event.key.startsWith("Page") ? 400 : 80), behavior: "instant" });
        }}>
          <div className="conversation-content">{securityStages.map((phase, i) => <section className="conversation-phase" data-conversation-phase key={phase.label} aria-label={phase.label}>
            <h4>{phase.label}</h4>
            <div className="session-prompt"><span aria-hidden="true">❯</span><span><BrandText text={phase.prompt} /></span></div>
            <div className="session-transcript">{phase.steps.map(([tool, label, output]) => <div className="session-step" key={tool}><div><strong>{tool}</strong><span><BrandText text={label} /></span></div><p><BrandText text={output} /></p></div>)}</div>
            <div className="session-result"><BrandText text={phase.result} /></div>
            <div className="session-approval"><BrandText text={phase.approval} /></div>
            <SandboxStatus setup={i === 0} interactive={i === 1} />
          </section>)}</div>
        </div>
      </figure> : <figure className="agent-session" id="lifecycle-session" aria-label="Example agent conversation" key={w.id}>
        <div className="session-heading"><strong>Agent session</strong><span>~/your-project</span></div>
        <div className="session-prompt"><span aria-hidden="true">❯</span><span><BrandText text={session.prompt} /></span></div>
        <div className="session-transcript">{session.steps.map(([tool, label, output]) => <div className="session-step" key={tool}><div><strong>{tool}</strong><span><BrandText text={label} /></span></div><p><BrandText text={output} /></p></div>)}</div>
        <div className="session-result"><BrandText text={session.result} /></div>
        <div className="session-approval"><BrandText text={session.approval} /><span className="terminal-cursor" aria-hidden="true" /></div>
      </figure>}
    </div>
    </div>
  </div>;
}
