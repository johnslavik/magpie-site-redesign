import BrandName from "./BrandName";
import skillCounts from "../../data/skill-counts.json";
import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

const choices = [
  { name: "Code reviews", count: skillCounts.counts["pr-management"], procedure: "Triage the queue, check CI and project criteria, then prepare an evidence-backed review.", result: "Review comments, with code references", input: "Pull request" },
  { name: "Bug fixes", count: skillCounts.counts.issue, procedure: "Classify the report, reproduce the bug, prepare a regression test and draft the fix PR.", result: "A patch and a regression test", input: "Bug report" },
  { name: "Security reports", count: skillCounts.counts.security, procedure: "Import and triage reports, coordinate the fix and release, and prepare the CVE and disclosure.", result: "A tested fix, advisory, and CVE", input: "Private report" },
  { name: "Releases", count: skillCounts.counts["release-management"], procedure: "Prepare and verify the candidate, draft the vote, tally replies, and prepare the announcement.", result: "Verified build, vote, and announcement drafts", input: "Release candidate" },
  { name: "New contributors", count: skillCounts.counts.mentoring, procedure: "Find a suitable first task, explain the code, and guide the contributor through review.", result: "A suitable issue and instructions to get started", input: "Someone wants to help" },
  { name: "Repository checks", count: skillCounts.counts["repo-health"], procedure: "Audit dependencies, CI, licences and flaky tests, then prioritise the findings.", result: "Problems found and fixes prioritised", input: "Dependencies, CI, and tests" },
];

export function WorkflowPicker() {
  const [selected, setSelected] = useState([0, 2]);
  return <div className="selection-demo">
    <fieldset className="workflow-choices"><legend>Choose workflow families</legend>{choices.map((choice, i) => <label key={choice.name}><input type="checkbox" checked={selected.includes(i)} onChange={() => setSelected(current => current.includes(i) ? current.filter(value => value !== i) : [...current, i].sort())} /><span>{choice.name}<small>{choice.count} skills</small></span><Check size={16} aria-hidden="true" /></label>)}</fieldset>
    <div className="selected-workflows"><div className="setup-label"><img src="/favicon.svg" width="22" height="22" alt="Magpie" /><span>Procedures your agent can follow</span></div><div className="selected-results" aria-live="polite">{selected.length ? selected.map(i => <div className="selected-result" key={i}><span>{choices[i].input}</span><ArrowRight size={18} aria-hidden="true" /><div><strong>{choices[i].result}</strong><p>{choices[i].procedure}</p></div></div>) : <p className="empty-selection">Choose a task on the left to see what your agent can produce.</p>}</div><a className="text-link" href="/docs/setup/team-adoption">Install workflow families</a></div>
  </div>;
}

export function ProjectRules() {
  return <div className="rules-demo" aria-label="Example project configuration read by the fix workflow">
    <div className="instruction-sheet"><div className="paper-tab">The procedure comes with <BrandName logo /></div><h3>Fix a reported bug</h3><ol className="included-procedure"><li>Reproduce the failure</li><li>Add a regression test</li><li>Prepare and verify the patch</li><li>Draft the PR for review</li></ol><div className="config-heading">Your project supplies the details</div><div className="config-excerpt"><code>runtime-invocation.md</code><p>Install dependencies: <kbd>npm ci</kbd><br />Run tests: <kbd>npm test</kbd></p></div><div className="config-excerpt"><code>fix-workflow.md</code><p>Open fixes from a fork.<br />Include a changelog entry.</p></div><small>Saved in the project’s configuration files</small></div>
    <div className="rule-transfer" aria-hidden="true"><img src="/favicon.svg" width="34" height="34" alt="" /><ArrowRight size={26} /></div>
    <div className="fix-sheet"><div className="paper-tab">Existing procedure + your configuration</div><h3>A fix ready for your review</h3><div className="patch-lines" aria-hidden="true"><span>− Code that causes the bug</span><span>+ Patch and regression test</span></div><ul><li><Check size={16} />Changes prepared in your fork</li><li><Check size={16} />Tests run with your command</li><li><Check size={16} />Changelog entry included</li><li><Check size={16} />PR draft with test evidence</li></ul><div className="result-stamp">You review the patch and decide what to merge</div></div>
  </div>;
}
