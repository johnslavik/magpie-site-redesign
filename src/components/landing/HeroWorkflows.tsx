import { useState } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { withBase } from "@/ui/lib/utils";

const examples = [
  { input: "A security report arrives", skill: "security-issue-triage", work: ["Investigate the report", "Write and test the fix", "Coordinate release & CVE"], outcome: "A released fix and a published CVE", path: "/docs/security/readme" },
  { input: "A pull request needs review", skill: "pr-management-code-review", work: ["Read the code changes", "Check tests and conventions", "Draft comments with evidence"], outcome: "A review ready to approve", path: "/docs/pr-management/readme" },
  { input: "A bug needs fixing", skill: "issue-fix-workflow", work: ["Reproduce the failure", "Write the fix", "Add a regression test"], outcome: "A tested fix ready to merge", path: "/docs/issue-management/readme" },
  { input: "A release needs checking", skill: "release-verify-rc", work: ["Verify the build and signatures", "Prepare the release vote", "Draft the announcement"], outcome: "A release ready to publish", path: "/docs/release-management/readme" },
  { input: "Someone wants to contribute", skill: "newcomer-issue-explainer", work: ["Find a suitable issue", "Explain the code to change", "Show how to test the change"], outcome: "A clear first task to work on", path: "/docs/mentoring/readme" },
  { input: "Your dependencies need updating", skill: "dependency-audit", work: ["Find vulnerable packages", "Flag abandoned dependencies", "Prioritise the fixes"], outcome: "An actionable upgrade plan", path: "/docs/repo-health/readme" },
  { input: "Your code needs a second look", skill: "pairing-self-review", work: ["Review the local diff", "Find bugs and missing tests", "Suggest specific fixes"], outcome: "Problems caught before a PR", path: "/docs/pairing/readme" },
  { input: "A new committer joins", skill: "committer-onboarding", work: ["Check required paperwork", "Track access setup", "Prepare the welcome"], outcome: "Onboarding covered, step by step", path: "/docs/contributor-growth/readme" },
  { input: "Your agent needs a sandbox", skill: "setup-isolated-setup-install", work: ["Configure the sandbox", "Limit file and tool access", "Verify the protections"], outcome: "An isolated workspace to code in", path: "/docs/setup/secure-agent-setup" },
];

export default function HeroWorkflows() {
  const [selected, setSelected] = useState(0);
  const item = examples[selected];
  return <div className="workflow-reel" role="region" aria-label="Examples of complete Magpie workflows">
    <div className="reel-window" aria-live="polite">
      <div className="reel-example" key={selected}>
          <div className="reel-active">
            <ol className="reel-flow">
              <li className="reel-source"><small>When this happens</small><span className="reel-input">{item.input}</span></li>
              <li className="reel-process"><img className="process-wordmark" src={withBase("/wordmark.svg")} alt="Magpie" width="118" height="34" /><small className="prepared-workflow-label">Been there, done that.<span className="workflow-reuse">Reuse our workflow.</span></small><ul className="reel-work">{item.work.map(step => <li key={step}><span aria-hidden="true">✓</span>{step}</li>)}</ul></li>
              <li className="reel-delivery"><small>So you get</small><strong className="reel-outcome">{item.outcome}</strong></li>
            </ol>
          </div>
      </div>
    </div>
    <div className="example-navigation">
      <button className="example-back" type="button" aria-label="Previous use case" onClick={() => setSelected(value => (value - 1 + examples.length) % examples.length)}><ArrowLeft size={22} aria-hidden="true" /></button>
      <span className="example-position" aria-live="polite">{selected + 1} / {examples.length}</span>
      <button className="example-next" type="button" aria-label="Next use case" onClick={() => setSelected(value => (value + 1) % examples.length)}><ArrowRight size={22} aria-hidden="true" /></button>
    </div>
  </div>;
}
