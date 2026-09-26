// An illustrative journey through the documented Magpie security procedures.
export const securityStory = [
  {
    without: ["Collect the report and conversation", "Copy evidence into a private case", "Keep every discussion in sync"],
    label: "Report", kind: "report", prompt: "A security report arrives in your project",
    title: "You can start investigating without reconstructing the conversation.",
    work: ["Organises the report into a private case", "Collects the supporting evidence", "Keeps the conversation with the case"],
    handoff: "You approve starting the investigation.",
  },
  {
    without: ["Read the project’s security model", "Search earlier reports by hand", "Assess whether a fix is needed"],
    label: "Triage", kind: "triage", prompt: "You need to know whether the report is valid",
    title: "You can assess the recommendation against the evidence.",
    work: ["Checks your project’s security model", "Searches past reports", "Recommends whether a fix is needed"],
    handoff: "Your security team confirms the decision.",
  },
  {
    without: ["Reproduce the failure yourself", "Write the patch and regression test", "Run and inspect the checks"],
    label: "Fix & test", kind: "fix", prompt: "The vulnerability is confirmed, so it’s time to fix it",
    title: "You receive a proposed patch, a regression test, and the check results.",
    work: ["Reproduces the failure", "Prepares a patch and regression test", "Runs your project’s checks"],
    handoff: "A maintainer reviews and merges the fix.",
  },
  {
    without: ["Find the fix in the release", "Check the published version", "Copy release evidence into the case"],
    label: "Release", kind: "release", prompt: "The patch is merged, but users still need a release",
    title: "The fix is in a published release",
    work: ["Checks the fix is in the release", "Records the published version", "Links release evidence to the report"],
    handoff: "The release manager confirms it is ready to disclose.",
  },
  {
    without: ["Write the advisory and CVE details", "Gather versions and update steps", "Track down the reporter’s credit"],
    label: "Disclose", kind: "advisory", prompt: "Now users need to know how to protect themselves",
    title: "You receive a draft advisory with affected versions and update instructions.",
    work: ["Drafts the advisory and CVE details", "Includes affected versions and update instructions", "Credits the reporter"],
    handoff: "Your security team approves and publishes the announcement.",
  },
  {
    without: ["Check each public record", "Gather evidence to close the case", "Write up lessons for next time"],
    label: "Close", kind: "closed", prompt: "The fix is public, and the report can be closed",
    title: "The release, advisory, and investigation remain linked for future reference.",
    work: ["Checks the public records", "Prepares the case for closure", "Saves lessons for future investigations"],
    handoff: "You confirm the report can be closed.",
  },
];
