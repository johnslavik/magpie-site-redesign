import { useState } from "react";
import { ArrowRight, ArrowDown } from "lucide-react";
import { withBase } from "@/ui/lib/utils";

const examples = [
  { input: "Security report", skill: "security-issue-triage", work: ["Investigate the report", "Write and test the fix", "Coordinate release & CVE"], outcome: "A released fix and a published CVE", path: "/docs/security/readme" },
  { input: "Pull request", skill: "pr-management-code-review", work: ["Read the code changes", "Check tests and conventions", "Draft comments with evidence"], outcome: "A review ready to approve", path: "/docs/pr-management/readme" },
  { input: "Bug report", skill: "issue-fix-workflow", work: ["Reproduce the failure", "Write the fix", "Add a regression test"], outcome: "A tested fix ready to merge", path: "/docs/issue-management/readme" },
  { input: "Release candidate", skill: "release-verify-rc", work: ["Verify the build and signatures", "Prepare the release vote", "Draft the announcement"], outcome: "A release ready to publish", path: "/docs/release-management/readme" },
  { input: "First-time contributor", skill: "newcomer-issue-explainer", work: ["Find a suitable issue", "Explain the code to change", "Show how to test the change"], outcome: "A clear first task to work on", path: "/docs/mentoring/readme" },
  { input: "Outdated dependencies", skill: "dependency-audit", work: ["Find vulnerable packages", "Flag abandoned dependencies", "Prioritise the fixes"], outcome: "An actionable upgrade plan", path: "/docs/repo-health/readme" },
  { input: "Your uncommitted code", skill: "pairing-self-review", work: ["Review the local diff", "Find bugs and missing tests", "Suggest specific fixes"], outcome: "Problems caught before a PR", path: "/docs/pairing/readme" },
  { input: "New committer", skill: "committer-onboarding", work: ["Check required paperwork", "Track access setup", "Prepare the welcome"], outcome: "Onboarding covered, step by step", path: "/docs/contributor-growth/readme" },
  { input: "Agent setup", skill: "setup-isolated-setup-install", work: ["Configure the sandbox", "Limit file and tool access", "Verify the protections"], outcome: "An isolated workspace to code in", path: "/docs/setup/secure-agent-setup" },
];

export default function HeroWorkflows() {
  const [selected, setSelected] = useState(0);
  const item = examples[selected];
  return <div className="workflow-reel" role="region" aria-label="Examples of complete Magpie workflows">
    <div className="reel-window" aria-live="polite">
      <div className="reel-example" key={selected}>
          <div className="reel-active">
            <ol className="reel-flow">
              <li className="reel-source"><small>When you have</small><span className="reel-input">{item.input}</span></li>
              <li className="reel-process"><img className="process-wordmark" src={withBase("/wordmark.svg")} alt="Magpie" width="118" height="34" /><small>We’ve already written this workflow for your agent.</small><ul className="reel-work">{item.work.map(step => <li key={step}><span aria-hidden="true">✓</span>{step}</li>)}</ul><a className="reel-doc-link" href={withBase(item.path)} target="_blank" rel="noreferrer">Explore this workflow <ArrowRight size={17} aria-hidden="true" /></a></li>
              <li className="reel-delivery"><span className="delivery-check" aria-hidden="true">✓</span><small>The result</small><strong className="reel-outcome">{item.outcome}</strong></li>
            </ol>
          </div>
      </div>
    </div>
    <div className="example-navigation">
      {selected < examples.length - 1 ? <button className="another-use-case" type="button" onClick={() => setSelected(value => value + 1)}>See another use case <ArrowRight size={18} aria-hidden="true" /></button> : <a className="another-use-case" href="#airflow">Keep reading <ArrowDown size={18} aria-hidden="true" /></a>}
    </div>
  </div>;
}
