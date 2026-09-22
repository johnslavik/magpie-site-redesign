import { useState } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import MagpieCard from "./MagpieCard";

const examples = [
  { input: "A security report arrives", skill: "security-issue-triage", work: ["Investigates the report", "Writes and tests the fix", "Coordinates release & CVE"], outcome: "A released fix and a published CVE", path: "/docs/security/readme" },
  { input: "A pull request needs review", skill: "pr-management-code-review", work: ["Reads the code changes", "Checks tests and conventions", "Drafts comments with evidence"], outcome: "A review ready to approve", path: "/docs/pr-management/readme" },
  { input: "A bug needs fixing", skill: "issue-fix-workflow", work: ["Reproduces the failure", "Writes the fix", "Adds a regression test"], outcome: "A tested fix ready to merge", path: "/docs/issue-management/readme" },
  { input: "A release needs checking", skill: "release-verify-rc", work: ["Verifies the build and signatures", "Prepares the release vote", "Drafts the announcement"], outcome: "A release ready to publish", path: "/docs/release-management/readme" },
  { input: "Someone wants to contribute", skill: "newcomer-issue-explainer", work: ["Finds a suitable issue", "Explains the code to change", "Shows how to test the change"], outcome: "A clear first task to work on", path: "/docs/mentoring/readme" },
  { input: "Your dependencies need updating", skill: "dependency-audit", work: ["Finds vulnerable packages", "Flags abandoned dependencies", "Prioritises the fixes"], outcome: "An actionable upgrade plan", path: "/docs/repo-health/readme" },
  { input: "Your code needs a second look", skill: "pairing-self-review", work: ["Reviews the local diff", "Finds bugs and missing tests", "Suggests specific fixes"], outcome: "Problems caught before a PR", path: "/docs/pairing/readme" },
  { input: "A new committer joins", skill: "committer-onboarding", work: ["Checks required paperwork", "Tracks access setup", "Prepares the welcome"], outcome: "Onboarding covered, step by step", path: "/docs/contributor-growth/readme" },
  { input: "Your agent needs a sandbox", skill: "setup-isolated-setup-install", work: ["Configures the sandbox", "Limits file and tool access", "Verifies the protections"], outcome: "An isolated workspace to code in", path: "/docs/setup/secure-agent-setup" },
];

export default function HeroWorkflows() {
  const [selected, setSelected] = useState(0);
  const item = examples[selected];
  return <div className="workflow-reel" role="region" aria-label="Examples of complete Magpie workflows">
    <div className="reel-window" aria-live="polite">
      <div className="reel-example" key={selected}>
          <div className="reel-active">
            <ol className="reel-flow">
              <li className="reel-source"><span className="reel-input">{item.input}</span></li>
              <MagpieCard as="li" className="reel-process" work={item.work} />
              <li className="reel-delivery"><strong className="reel-outcome">{item.outcome}</strong></li>
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
