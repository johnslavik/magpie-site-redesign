import { useState } from "react";
import { Inbox, Code2, GitPullRequest, PackageCheck, ShieldCheck, Users, FileText, Check, ArrowRight } from "lucide-react";

const lifecycle = [
  { label: "Triage", icon: Inbox, input: "New reports keep arriving", inputs: ["A user reports a failure.", "Another report looks familiar.", "Some details are missing."], work: ["Checks for duplicates", "Reproduces and classifies reports", "Drafts the next response"], title: "Know which reports need your attention", outcome: "You know what to investigate", outputs: ["The issue has steps to reproduce it.", "Missing information is requested in a draft.", "Related reports are linked."], link: "/docs/issue-management/readme", color: "peach" },
  { label: "Develop", icon: Code2, input: "A bug needs a fix", inputs: ["A user found a failing case.", "You need to prevent it happening again."], work: ["Reproduces the failure", "Writes a patch and regression test", "Runs checks and reviews the diff"], title: "Get a tested patch ready for review", outcome: "You can review the proposed fix", outputs: ["The patch addresses the failure.", "A test covers the regression.", "Check results accompany the change."], link: "/docs/issue-management/readme", color: "mint" },
  { label: "Review", icon: GitPullRequest, input: "Contributors keep sending changes", inputs: ["Someone fixes a bug.", "Another contributor adds a feature.", "More pull requests need a review."], work: ["Triages the review queue", "Checks CI and reviews the code", "Drafts feedback for each PR"], title: "Keep up with a growing review queue", outcome: "You know where you’re needed", outputs: ["Review findings are ready to approve.", "Requested changes are explained.", "Failing checks are flagged."], link: "/docs/pr-management/readme", color: "blue" },
  { label: "Release", icon: PackageCheck, input: "A release is coming", inputs: ["A candidate needs verification.", "The vote and announcement need preparing."], work: ["Verifies the release candidate", "Prepares the vote and tally", "Drafts the announcement"], title: "Give the release manager a prepared handoff", outcome: "You can make the release decision", outputs: ["Verification results are collected.", "The vote is prepared for review.", "The announcement is ready to approve."], link: "/docs/release-management/readme", color: "yellow" },
  { label: "Maintain", icon: ShieldCheck, input: "The repository keeps changing", inputs: ["Dependencies need updating.", "A workflow starts failing.", "Tests become unreliable."], work: ["Audits dependencies and licences", "Investigates failing workflows", "Recommends maintenance work"], title: "Turn repository checks into work you can act on", outcome: "You can prioritise the next fix", outputs: ["Dependency risks are explained.", "Workflow problems have findings.", "Suggested fixes are ready to assess."], link: "/docs/repo-health/readme", color: "mint" },
  { label: "Grow", icon: Users, input: "Someone wants to contribute", inputs: ["They need a suitable first issue.", "They want to understand the code."], work: ["Finds a suitable first issue", "Explains the relevant code", "Shows how to test the change"], title: "Help a new contributor make their first change", outcome: "They know how to get started", outputs: ["The first task matches their experience.", "The relevant code is explained.", "Test instructions accompany the task."], link: "/docs/mentoring/readme", color: "peach" },
];

export function SoftwareLifecycle() {
  const [active, setActive] = useState(0);
  const phase = lifecycle[active];
  const select = (index: number) => { setActive(index); document.getElementById(`lifecycle-tab-${index}`)?.focus(); };
  return <div className="software-lifecycle">
    <div className="software-phases" role="tablist" aria-label="Software lifecycle">{lifecycle.map((item, i) => <button role="tab" key={item.label} id={`lifecycle-tab-${i}`} aria-label={item.label} aria-controls="lifecycle-detail" aria-selected={active === i} tabIndex={active === i ? 0 : -1} data-complete={i < active} onClick={() => setActive(i)} onKeyDown={event => { if (["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) { event.preventDefault(); select(event.key === "Home" ? 0 : event.key === "End" ? lifecycle.length - 1 : (i + (event.key === "ArrowRight" ? 1 : -1) + lifecycle.length) % lifecycle.length); } }}><span className="software-phase-icon"><item.icon size={24} strokeWidth={1.5} aria-hidden="true" /></span><span>{item.label}</span></button>)}</div>
    <div id="lifecycle-detail" className={`lifecycle-detail lifecycle-sequence tone-${phase.color}`} role="tabpanel" aria-labelledby={`lifecycle-tab-${active}`}>
      <h3 className="lifecycle-story-title">{phase.title}</h3>
      <div className="lifecycle-flow">
        <div className="lifecycle-incoming"><span className="flow-label">Your project</span><h4>{phase.input}</h4>
          {phase.label === "Review" && <div className="contributor-crowd" aria-hidden="true">{Array.from({ length: 18 }, (_, i) => <span key={i} style={{background: ["#a1b9d6", "#b9ccaa", "#d8bfa8", "#bcb3d2"][i % 4]}}><Users size={13} /></span>)}</div>}
          <div className={`incoming-items ${phase.label === "Review" ? "incoming-prs" : ""}`}>{phase.inputs.map(input => <div key={input}><phase.icon size={15} aria-hidden="true" /><span>{input}</span></div>)}</div>
        </div>
        <ArrowRight className="flow-connector" size={22} aria-hidden="true" />
        <div className="lifecycle-work"><img src="/wordmark.svg" alt="Magpie" width="120" height="34" /><ul>{phase.work.map(work => <li key={work}><Check size={15} aria-hidden="true" />{work}</li>)}</ul></div>
        <ArrowRight className="flow-connector" size={22} aria-hidden="true" />
        <div className="lifecycle-ready"><span className="flow-label">For your team</span><h4>{phase.outcome}</h4><div className="ready-items">{phase.outputs.map((output, i) => <div key={output} className={`ready-item status-${i}`}><span className="status-dot" aria-hidden="true" />{output}</div>)}</div></div>
      </div>
      <a className="lifecycle-explore" href={phase.link} target="_blank" rel="noreferrer">Explore {phase.label.toLowerCase()} workflows <ArrowRight size={15} aria-hidden="true" /></a>
    </div>
  </div>;
}

export function ProjectRules() {
  return <div className="project-procedures">
    <div className="procedure-library-heading"><img src="/wordmark.svg" alt="Magpie" width="126" height="36" /><span>supplies the procedures</span></div>
    <div className="procedure-library">
      <div className="procedure-books">
        <div><GitPullRequest size={23}/><h3>Review a PR</h3><p>Magpie checks CI, inspects the diff, and drafts feedback.</p></div>
        <div><ShieldCheck size={23}/><h3>Resolve a report</h3><p>Magpie prepares the investigation, fix, and disclosure.</p></div>
        <div><PackageCheck size={23}/><h3>Prepare a release</h3><p>Magpie verifies the candidate and drafts the vote and announcement.</p></div>
      </div>
      <p className="procedure-caption">The steps, checks, and approval points are already written.</p>
    </div>
    <div className="project-rule-bridge"><strong>Magpie’s workflows adapt to your project.</strong></div>
    <div className="shared-project-rules">
      <div className="rule-example"><span>For example</span><p>“Use our review checklist. Ask the owning team to review changes. Include a changelog entry.”</p></div>
      <div className="rules-applied"><FileText size={26} aria-hidden="true"/><div><strong>Save the rules with your project.</strong><p>Magpie reads them when running its workflows. Your team can reuse the procedures and change the steps that need to work differently.</p></div></div>
    </div>
    <a className="project-rules-link" href="/docs/setup/agentic-overrides" target="_blank" rel="noreferrer">See how project rules work <ArrowRight size={15} aria-hidden="true" /></a>
  </div>;
}

export function SkillComparison() {
  return <div className="skill-comparison">
    <div className="skill-manual"><span className="comparison-label">Writing a skill from scratch</span><h3>You assemble every part.</h3><div className="manual-notes">{["Learn the skill format", "Write the procedure", "Think through edge cases", "Add approval points", "Create test cases", "Check the results and revise"].map((step,i)=><div key={step}><span aria-hidden="true">□</span>{step}<i aria-hidden="true" style={{width:`${70-i*4}%`}} /></div>)}</div></div>
    <div className="skill-assisted"><div className="comparison-label">With <img src="/wordmark.svg" alt="Magpie" width="96" height="27" /></div><h3>Follow Magpie’s skill-writing procedure.</h3><div className="authoring-prompt">“Make a skill that checks new dependencies.”</div><div className="authoring-tool"><FileText size={16}/><code>write-skill</code><span>Magpie’s authoring procedure</span></div><ol className="authoring-steps"><li><strong>Define the job</strong><span>Clarify examples and the decisions that need your approval.</span></li><li><strong>Write the procedure</strong><span>Use Magpie’s templates and validation checks.</span></li><li><strong>Test and improve it</strong><span>Create example cases, run them, and refine the skill.</span></li></ol><div className="authored-skill"><div><FileText size={22}/><strong>check-dependency / SKILL.md</strong></div><ul><li><Check size={16}/>Instructions and approval points</li><li><Check size={16}/>Edge cases and example inputs</li><li><Check size={16}/>Expected results to test against</li></ul></div><p className="authoring-finish">You review the skill and its test results before sharing it.</p></div>
  </div>;
}
