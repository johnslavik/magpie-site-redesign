import SandboxStatus from "./SandboxStatus";
import { securityStages } from "./workflow-stages";
import { useState } from "react";
import { GitPullRequest, ShieldCheck, Inbox, PackageCheck } from "lucide-react";
import { withBase } from "@/ui/lib/utils";

// Illustrative sessions grounded in the synced workflow-family documentation.
const workflows = [
  { id: "security", label: "Security reports", icon: ShieldCheck,
    title: "From the first report to a published CVE.",
    text: "A complete 16-step security lifecycle, with setup and privacy controls built in. Magpie handles the investigation, fix, CVE paperwork, release handoffs, and tracker updates. Your team approves decisions, merges the fix, and sends the advisory.",
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
  const w = workflows[selected];
  const session = selected === 0 ? securityStages[stage] : w;
  const choose = (index: number) => { setSelected(index); setStage(0); document.getElementById(`workflow-tab-${index}`)?.focus(); };
  return <div className="workflow-explorer">
    <div role="tablist" aria-label="Maintainer workflows" className="workflow-tabs">{workflows.map((item, i) => <button key={item.id} id={`workflow-tab-${i}`} role="tab" aria-selected={selected === i} aria-controls="workflow-panel" tabIndex={selected === i ? 0 : -1} onClick={() => { setSelected(i); setStage(0); }} onKeyDown={event => { if (["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) { event.preventDefault(); choose(event.key === "Home" ? 0 : event.key === "End" ? workflows.length - 1 : (i + (event.key === "ArrowRight" ? 1 : -1) + workflows.length) % workflows.length); } }}><item.icon size={18} />{item.label}</button>)}</div>
    <div role="tabpanel" id="workflow-panel" aria-labelledby={`workflow-tab-${selected}`} tabIndex={0} className="workflow-panel">
      <div className="workflow-description"><h3>{w.title}</h3><p>{w.text}</p>{selected === 0 && <div className="lifecycle-stages" role="group" aria-label="Security lifecycle phases">{securityStages.map((phase, i) => <button key={phase.label} type="button" aria-pressed={stage === i} aria-controls="lifecycle-session" onClick={() => setStage(i)}>{phase.label}</button>)}</div>}<a className="text-link" href={withBase(w.path)}>Explore this workflow</a></div>
      <figure className="agent-session" id="lifecycle-session" key={w.id}>
        <div className="session-heading"><strong>{selected === 0 ? securityStages[stage].label : "Agent session"}</strong><span>~/your-project</span></div>
        <div className="session-prompt"><span aria-hidden="true">❯</span><span>{session.prompt}</span></div>
        <div className="session-transcript">{session.steps.map(([tool, label, output]) => <div className="session-step" key={tool}><div><strong>{tool}</strong><span>{label}</span></div><p>{output}</p></div>)}</div>
        <div className="session-result">{session.result}</div>
        <div className="session-approval">{session.approval}<span className="terminal-cursor" aria-hidden="true" /></div>
        {selected === 0 && <SandboxStatus key={stage} setup={stage === 0} interactive={stage === 1} />}
        {selected === 0 && <div className="session-navigation"><button type="button" disabled={stage === 0} onClick={() => setStage(stage - 1)}>Previous phase</button><button type="button" disabled={stage === securityStages.length - 1} onClick={() => setStage(stage + 1)}>Next phase</button></div>}<figcaption>Illustrative session · {selected === 0 ? "Fictional report; real workflow" : "Magpie workflows"}</figcaption>
      </figure>
    </div>
  </div>;
}
