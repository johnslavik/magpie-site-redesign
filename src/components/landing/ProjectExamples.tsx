import { useState } from "react";
import { Inbox, Code2, GitPullRequest, PackageCheck, ShieldCheck, Users, FileText, Check, ArrowRight } from "lucide-react";

const lifecycle = [
  { label: "Triage", icon: Inbox, input: "An incoming bug report", title: "Know which reports need attention.", outputs: ["Duplicates identified", "Issue classified", "Reproduction steps"], detail: "Issue intake, classification, reproduction, and follow-up.", link: "/docs/issue-management/readme", color: "peach" },
  { label: "Develop", icon: Code2, input: "A bug to fix", title: "Prepare the patch and prove it works.", outputs: ["Regression test", "Tested patch", "PR draft"], detail: "Fix workflows, local self-review, and independent review passes.", link: "/docs/pairing/readme", color: "mint" },
  { label: "Review", icon: GitPullRequest, input: "A pull request", title: "Arrive at the review with the evidence.", outputs: ["CI checked", "Code findings", "Review comments"], detail: "Queue triage, code review, contributor feedback, and merge readiness.", link: "/docs/pr-management/readme", color: "blue" },
  { label: "Release", icon: PackageCheck, input: "A release candidate", title: "Prepare everything the release manager needs.", outputs: ["Verified candidate", "Vote draft & tally", "Announcement draft"], detail: "Preparation, verification, voting, publication handoffs, and archiving.", link: "/docs/release-management/readme", color: "yellow" },
  { label: "Maintain", icon: ShieldCheck, input: "A repository that keeps changing", title: "Find the risks and prepare the next fix.", outputs: ["Dependency findings", "CI & licence checks", "Prioritised fixes"], detail: "Security reports, dependency audits, workflow checks, and flaky tests.", link: "/docs/repo-health/readme", color: "mint" },
  { label: "Grow", icon: Users, input: "A new contributor", title: "Help the next maintainer get started.", outputs: ["Suitable first issue", "Code explained", "Onboarding checklist"], detail: "Newcomer guidance, mentoring, contributor growth, and committer onboarding.", link: "/docs/mentoring/readme", color: "peach" },
];

export function SoftwareLifecycle() {
  const [active, setActive] = useState(0);
  const phase = lifecycle[active];
  const select = (index: number) => { setActive(index); document.getElementById(`lifecycle-tab-${index}`)?.focus(); };
  return <div className="software-lifecycle">
    <div className="software-phases" role="tablist" aria-label="Software lifecycle">{lifecycle.map((item, i) => <button role="tab" key={item.label} id={`lifecycle-tab-${i}`} aria-controls="lifecycle-detail" aria-selected={active === i} tabIndex={active === i ? 0 : -1} onClick={() => setActive(i)} onKeyDown={event => { if (["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) { event.preventDefault(); select(event.key === "Home" ? 0 : event.key === "End" ? lifecycle.length - 1 : (i + (event.key === "ArrowRight" ? 1 : -1) + lifecycle.length) % lifecycle.length); } }}><item.icon size={24} strokeWidth={1.5} /><span>{item.label}</span></button>)}</div>
    <div id="lifecycle-detail" className={`lifecycle-detail tone-${phase.color}`} role="tabpanel" aria-labelledby={`lifecycle-tab-${active}`}>
      <div className="lifecycle-situation"><span>When you have</span><h3>{phase.input}</h3><p>{phase.detail}</p><a href={phase.link} target="_blank" rel="noreferrer">Explore {phase.label.toLowerCase()} workflows</a></div>
      <div className="lifecycle-deliverables"><div className="lifecycle-deliverables-label"><img src="/favicon.svg" alt="Magpie" width="26" height="26" /><h3>{phase.title}</h3></div><div className="deliverable-stack">{phase.outputs.map((output, i) => <div className="deliverable-sheet" key={output}><FileText size={21} strokeWidth={1.5} /><span>{output}</span><Check size={17} /><div className="sheet-lines" aria-hidden="true"><i /><i style={{width:`${70 - i * 12}%`}} /></div></div>)}</div></div>
    </div>
  </div>;
}

const projects = [
  {name: "Python", label: "Python library", setup: "uv sync", test: "uv run pytest", change: "Regression test in tests/", file: "test_archive.py"},
  {name: "TypeScript", label: "TypeScript app", setup: "npm ci", test: "npm test", change: "Regression test beside the code", file: "archive.test.ts"},
  {name: "Java", label: "Java service", setup: "./mvnw install -DskipTests", test: "./mvnw test", change: "Regression test in src/test/", file: "ArchiveTest.java"},
];
export function ProjectRules() {
  const [active, setActive] = useState(0);
  const project = projects[active];
  return <div className="project-adaptation">
    <div className="provided-procedure"><img src="/wordmark.svg" alt="Magpie" width="142" height="40" /><span>Already written for you</span><h3>The bug-fix procedure</h3><ul>{["Reproduce the failure", "Write a regression test", "Prepare and verify the patch", "Draft the PR for review"].map(step => <li key={step}><Check size={17} />{step}</li>)}</ul></div>
    <div className="project-customisation"><div className="project-selector" role="group" aria-label="Example project language">{projects.map((item,i)=><button key={item.name} type="button" aria-pressed={i===active} onClick={()=>setActive(i)}>{item.name}</button>)}</div><div className="project-example"><span>Your project’s commands</span><h3>{project.label}</h3><div className="project-command"><span>Install</span><code>{project.setup}</code></div><div className="project-command"><span>Test</span><code>{project.test}</code></div><div className="adaptation-result"><FileText size={24}/><div><strong>Same procedure. A fix for this project.</strong><span>{project.file} · patch · PR draft</span></div><Check size={20}/></div></div></div>
  </div>;
}

export function SkillComparison() {
  return <div className="skill-comparison">
    <div className="skill-manual"><span className="comparison-label">Writing a skill from scratch</span><h3>You assemble every part.</h3><div className="manual-notes">{["Learn the skill format", "Write the procedure", "Think through edge cases", "Add approval points", "Create test cases", "Check the results and revise"].map((step,i)=><div key={step}><span aria-hidden="true">□</span>{step}<i aria-hidden="true" style={{width:`${70-i*4}%`}} /></div>)}</div></div>
    <div className="skill-assisted"><div className="comparison-label">With <img src="/wordmark.svg" alt="Magpie" width="96" height="27" /></div><h3>Describe the job. Build it with your agent.</h3><div className="authoring-prompt">“Make a skill that checks new dependencies.”</div><div className="authoring-tool"><FileText size={16}/><code>write-skill</code><span>Procedure loaded</span></div><div className="authored-skill"><div><FileText size={22}/><strong>check-dependency / SKILL.md</strong></div><ul><li><Check size={16}/>Instructions and approval points</li><li><Check size={16}/>Edge cases and example inputs</li><li><Check size={16}/>Expected results to test against</li></ul></div><div className="authoring-review"><span>Draft</span><ArrowRight size={14}/><span>Test</span><ArrowRight size={14}/><span>Improve</span><strong>You review and share.</strong></div></div>
  </div>;
}
