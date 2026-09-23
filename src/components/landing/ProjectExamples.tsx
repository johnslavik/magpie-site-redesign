import MagpieCard from "./MagpieCard";
import { useState } from "react";
import { Inbox, Code2, GitPullRequest, PackageCheck, ShieldCheck, Users, Check, ArrowRight } from "lucide-react";

const lifecycle = [
  { label: "Triage", icon: Inbox, input: "New reports keep arriving", inputs: ["A user reports a failure.", "Another report looks familiar.", "Some details are missing."], work: ["Check for duplicates", "Reproduce and classify reports", "Draft the next response"], title: "Know which reports need your attention", outcome: "You know what to investigate", outputs: ["The issue has steps to reproduce it.", "Missing information is requested in a draft.", "Related reports are linked."], link: "/docs/issue-management/readme", color: "peach" },
  { label: "Develop", icon: Code2, input: "A bug needs a fix", inputs: ["A user found a failing case.", "You need to prevent it happening again."], work: ["Reproduce the failure", "Write a patch and regression test", "Run checks and review the diff"], title: "Get a tested patch ready for review", outcome: "You can review the proposed fix", outputs: ["The patch addresses the failure.", "A test covers the regression.", "Check results accompany the change."], link: "/docs/issue-management/readme", color: "mint" },
  { label: "Review", icon: GitPullRequest, input: "Contributors keep sending changes", inputs: ["Someone fixes a bug.", "Another contributor adds a feature.", "More pull requests need a review."], work: ["Triage the review queue", "Check CI and review the code", "Draft feedback for each PR"], title: "Keep up with a growing review queue", outcome: "You know where you’re needed", outputs: ["Review findings are ready to approve.", "Requested changes are explained.", "Failing checks are flagged."], link: "/docs/pr-management/readme", color: "blue" },
  { label: "Release", icon: PackageCheck, input: "A release is coming", inputs: ["A candidate needs verification.", "The vote and announcement need preparing."], work: ["Verify the release candidate", "Prepare the vote and tally", "Draft the announcement"], title: "Give the release manager a prepared handoff", outcome: "You can make the release decision", outputs: ["Verification results are collected.", "The vote is prepared for review.", "The announcement is ready to approve."], link: "/docs/release-management/readme", color: "yellow" },
  { label: "Maintain", icon: ShieldCheck, input: "The repository keeps changing", inputs: ["Dependencies need updating.", "A workflow starts failing.", "Tests become unreliable."], work: ["Audit dependencies and licences", "Investigate failing workflows", "Assess maintenance work"], title: "Turn repository checks into work you can act on", outcome: "You can prioritise the next fix", outputs: ["Dependency risks are explained.", "Workflow problems have findings.", "Suggested fixes are ready to assess."], link: "/docs/repo-health/readme", color: "mint" },
  { label: "Grow", icon: Users, input: "Someone wants to contribute", inputs: ["They need a suitable first issue.", "They want to understand the code."], work: ["Find a suitable first issue", "Explain the relevant code", "Show how to test the change"], title: "Help a new contributor make their first change", outcome: "They know how to get started", outputs: ["The first task matches their experience.", "The relevant code is explained.", "Test instructions accompany the task."], link: "/docs/mentoring/readme", color: "peach" },
];

export function SoftwareLifecycle() {
  const [active, setActive] = useState(0);
  const select = (index: number) => setActive(index);
  return <div className="software-lifecycle">
    <div className="software-workbench">
    <div className="lifecycle-heading"><h2 id="choose-work-title">Skills for the rest of your project.</h2><p>Choose an area to see how you can use Magpie.</p></div>
    <div className="software-phases" role="tablist" aria-label="Software lifecycle">{lifecycle.map((item, i) => <button role="tab" key={item.label} id={`lifecycle-tab-${i}`} aria-label={item.label} aria-controls={`lifecycle-detail-${i}`} aria-selected={active === i} tabIndex={active === i ? 0 : -1} data-complete={i < active} onClick={() => select(i)} onKeyDown={event => { if (["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) { event.preventDefault(); const next = event.key === "Home" ? 0 : event.key === "End" ? lifecycle.length - 1 : (i + (event.key === "ArrowRight" ? 1 : -1) + lifecycle.length) % lifecycle.length; select(next); document.getElementById(`lifecycle-tab-${next}`)?.focus(); } }}><span className="software-phase-icon"><item.icon size={24} strokeWidth={1.5} aria-hidden="true" /></span><span>{item.label}</span></button>)}</div>
    <div className="software-scenes">{lifecycle.map((phase, index) => <div key={phase.label} id={`lifecycle-detail-${index}`} className={`lifecycle-detail lifecycle-sequence tone-${phase.color}`} role="tabpanel" aria-labelledby={`lifecycle-tab-${index}`} aria-hidden={active !== index} inert={active !== index} tabIndex={0}>
      <div className="lifecycle-flow">
        <div className="lifecycle-incoming"><h3>{phase.input}</h3><p>{phase.inputs.join(" ")}</p></div>
        <MagpieCard className="lifecycle-work" work={phase.work} />
        <div className="lifecycle-ready"><h3>{phase.outcome}</h3><ul>{phase.outputs.map(output => <li key={output}><Check size={18} aria-hidden="true" /><span>{output}</span></li>)}</ul></div>
      </div>
      <a className="lifecycle-explore" href={phase.link} target="_blank" rel="noreferrer">Explore {phase.label.toLowerCase()} workflows <ArrowRight size={15} aria-hidden="true" /></a>
    </div>)}</div>
    </div>
  </div>;
}

export function ProjectRules() {
  return <div className="project-procedures project-adaptation">
    <MagpieCard className="prepared-procedures" work={["Check the changes and CI results", "Review the code for problems", "Draft actionable feedback"]} />
    <ArrowRight className="adaptation-arrow" size={28} aria-hidden="true" />
    <div className="adapted-procedures">
      <h3>Make Magpie your own.</h3>
      <blockquote className="rule-example">“Use our review checklist. Ask the owning team to review changes. Include a changelog entry.”</blockquote>
      <p>Save your team’s conventions and lessons in the skills you use. Review and refine them as your project changes.</p>
      <a className="project-rules-link" href="/docs/setup/agentic-overrides" target="_blank" rel="noreferrer">See how project rules work <ArrowRight size={15} aria-hidden="true" /></a>
    </div>
  </div>;
}

export function SkillComparison() {
  return <div className="skill-comparison">

    <MagpieCard className="skill-assisted"><blockquote className="authoring-request">“Make a skill that checks new dependencies.”</blockquote><p className="authoring-result">Magpie helps your agent write, test, and improve the skill <strong>faster</strong>.</p></MagpieCard>
  </div>;
}
