import { useState } from "react";
import { Inbox, Code2, GitPullRequest, PackageCheck, ShieldCheck, Users, Check, ArrowRight } from "lucide-react";

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
      <div className="lifecycle-flow">
        <div className="lifecycle-incoming"><h3>{phase.input}</h3><p>{phase.inputs.join(" ")}</p></div>
        <ArrowRight className="flow-connector" size={22} aria-hidden="true" />
        <div className="lifecycle-work"><img src="/wordmark.svg" alt="Magpie" width="120" height="34" /><ul>{phase.work.map(work => <li key={work}>{work}</li>)}</ul></div>
        <ArrowRight className="flow-connector" size={22} aria-hidden="true" />
        <div className="lifecycle-ready"><h3>{phase.outcome}</h3><ul>{phase.outputs.map(output => <li key={output}>{output}</li>)}</ul></div>
      </div>
      <a className="lifecycle-explore" href={phase.link} target="_blank" rel="noreferrer">Explore {phase.label.toLowerCase()} workflows <ArrowRight size={15} aria-hidden="true" /></a>
    </div>
  </div>;
}

export function ProjectRules() {
  return <div className="project-procedures project-adaptation">
    <div className="prepared-procedures">
      <div className="procedure-library-heading"><img src="/wordmark.svg" alt="Magpie" width="126" height="36" /><span>supplies the procedures</span></div>
      <ul className="procedure-list"><li><GitPullRequest size={22} aria-hidden="true" />Review a pull request</li><li><ShieldCheck size={22} aria-hidden="true" />Resolve a security report</li><li><PackageCheck size={22} aria-hidden="true" />Prepare a release</li></ul>
    </div>
    <ArrowRight className="adaptation-arrow" size={28} aria-hidden="true" />
    <div className="adapted-procedures">
      <h3>They follow your project’s rules.</h3>
      <blockquote className="rule-example">“Use our review checklist. Ask the owning team to review changes. Include a changelog entry.”</blockquote>
      <p>Save your rules once. Magpie reads them whenever it runs these workflows.</p>
      <a className="project-rules-link" href="/docs/setup/agentic-overrides" target="_blank" rel="noreferrer">See how project rules work <ArrowRight size={15} aria-hidden="true" /></a>
    </div>
  </div>;
}

export function SkillComparison() {
  return <div className="skill-comparison">
    <div className="skill-manual"><h3>Writing a skill from scratch</h3><ol className="manual-steps">{["Learn the format and write the procedure.", "Define approval points, edge cases, and tests.", "Run the tests and revise the skill."].map(step => <li key={step}>{step}</li>)}</ol></div>
    <div className="skill-assisted"><div className="comparison-label">With <img src="/wordmark.svg" alt="Magpie" width="110" height="31" /></div><blockquote className="authoring-request">“Make a skill that checks new dependencies.”</blockquote><p className="authoring-result">Magpie helps your agent write the skill, test it against examples, and improve the results.</p><p className="authoring-finish"><Check size={22} aria-hidden="true" />You review the skill and its test results before sharing it.</p></div>
  </div>;
}
