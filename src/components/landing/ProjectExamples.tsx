import BrandName from "./BrandName";
import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

const choices = [
  { name: "Code reviews", result: "Review comments, with code references", input: "Pull request" },
  { name: "Bug fixes", result: "A patch and a regression test", input: "Bug report" },
  { name: "Security reports", result: "A tested fix, advisory, and CVE", input: "Private report" },
  { name: "Releases", result: "Verified build, vote, and announcement drafts", input: "Release candidate" },
  { name: "New contributors", result: "A suitable issue and instructions to get started", input: "Someone wants to help" },
  { name: "Repository checks", result: "Problems found and fixes prioritised", input: "Dependencies, CI, and tests" },
];

export function WorkflowPicker() {
  const [selected, setSelected] = useState([0, 1]);
  return <div className="selection-demo">
    <fieldset className="workflow-choices"><legend>What would you like help with?</legend>{choices.map((choice, i) => <label key={choice.name}><input type="checkbox" checked={selected.includes(i)} onChange={() => setSelected(current => current.includes(i) ? current.filter(value => value !== i) : [...current, i].sort())} /><span>{choice.name}</span><Check size={16} aria-hidden="true" /></label>)}</fieldset>
    <div className="selected-workflows"><div className="setup-label"><img src="/favicon.svg" width="22" height="22" alt="Magpie" /><span>What this adds to your agent</span></div><div className="selected-results" aria-live="polite">{selected.length ? selected.map(i => <div className="selected-result" key={i}><span>{choices[i].input}</span><ArrowRight size={18} aria-hidden="true" /><strong>{choices[i].result}</strong></div>) : <p className="empty-selection">Choose a task on the left to see what your agent can produce.</p>}</div><a className="text-link" href="/docs/setup/team-adoption">How to install your selection <span aria-hidden="true">↗</span></a></div>
  </div>;
}

export function ProjectRules() {
  return <div className="rules-demo" aria-label="Example project configuration read by the fix workflow">
    <div className="instruction-sheet"><div className="paper-tab">Example project configuration</div><h3>How this project works</h3><div className="config-excerpt"><code>runtime-invocation.md</code><p>Install dependencies: <kbd>npm ci</kbd><br />Run tests: <kbd>npm test</kbd></p></div><div className="config-excerpt"><code>fix-workflow.md</code><p>Open fixes from a fork.<br />Include a changelog entry.</p></div><small>Saved in the project’s configuration files</small></div>
    <div className="rule-transfer" aria-hidden="true"><img src="/favicon.svg" width="34" height="34" alt="" /><ArrowRight size={26} /></div>
    <div className="fix-sheet"><div className="paper-tab"><BrandName />’s fix workflow reads those files</div><h3>A fix prepared for this project</h3><div className="patch-lines" aria-hidden="true"><span>− Code that causes the bug</span><span>+ Patch and regression test</span></div><ul><li><Check size={16} />Changes prepared in your fork</li><li><Check size={16} />Tests run with your command</li><li><Check size={16} />Changelog entry included</li><li><Check size={16} />PR draft with test evidence</li></ul><div className="result-stamp">You review the patch and decide what to merge</div></div>
  </div>;
}
