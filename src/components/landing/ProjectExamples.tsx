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
  const [test, setTest] = useState(true);
  const [changelog, setChangelog] = useState(true);
  return <div className="rules-demo" aria-label="Example of project instructions changing a fix">
    <div className="instruction-sheet"><div className="paper-tab">Your project’s instructions</div><h3>When fixing a bug…</h3><label><input type="checkbox" checked={test} onChange={() => setTest(value => !value)} />Add a regression test</label><label><input type="checkbox" checked={changelog} onChange={() => setChangelog(value => !value)} />Write a changelog entry</label><div className="rule-command">Run the project’s tests<br /><code>npm test</code></div><small>Try changing a requirement</small></div>
    <div className="rule-transfer" aria-hidden="true"><img src="/favicon.svg" width="34" height="34" alt="" /><ArrowRight size={26} /></div>
    <div className="fix-sheet"><div className="paper-tab">The pull request <BrandName /> prepares</div><h3>Fix crash on empty input</h3><div className="patch-lines" aria-hidden="true"><span>− return items[0].name</span><span>+ return items[0]?.name ?? ""</span></div><ul aria-live="polite"><li><Check size={16} />Code change</li>{test && <li><Check size={16} />Regression test added</li>}{changelog && <li><Check size={16} />Changelog entry written</li>}<li><Check size={16} />Project tests run</li></ul><div className="result-stamp">Ready for your review</div></div>
  </div>;
}
