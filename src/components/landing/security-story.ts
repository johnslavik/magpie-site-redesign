// An illustrative journey through the documented Magpie security procedures.
export const securityStory = [
  {
    without: "Gather the report, evidence, and conversation into a private case.",
    label: "Report", kind: "report", prompt: "A security report arrives in your project.",
    title: "You can start investigating without reconstructing the conversation.",
    work: ["Organise the report into a private case", "Collect the supporting evidence", "Keep the conversation with the case"],
    handoff: "You approve starting the investigation.",
  },
  {
    without: "Check the security model, search past reports, and assess whether a fix is needed.",
    label: "Triage", kind: "triage", prompt: "You need to know whether the report is valid.",
    title: "You can assess the recommendation against the evidence.",
    work: ["Check your project’s security model", "Search past reports", "Assess whether a fix is needed"],
    handoff: "Your security team confirms the decision.",
  },
  {
    without: "Reproduce the failure, write a patch and regression test, and run the checks.",
    label: "Fix & test", kind: "fix", prompt: "The vulnerability is confirmed, so it’s time to fix it.",
    title: "You receive a proposed patch, a regression test, and the check results.",
    work: ["Reproduce the failure", "Prepare a patch and regression test", "Run your project’s checks"],
    handoff: "A maintainer reviews and merges the fix.",
  },
  {
    without: "Find the merged fix, check the published version, and record the release evidence.",
    label: "Release", kind: "release", prompt: "The patch is merged, but users still need a release.",
    title: "The fix is in a published release",
    work: ["Check the fix is in the release", "Record the published version", "Link release evidence to the report"],
    handoff: "The release manager confirms it is ready to disclose.",
  },
  {
    without: "Gather affected versions, update instructions, and reporter credit for the advisory and CVE.",
    label: "Disclose", kind: "advisory", prompt: "Now users need to know how to protect themselves.",
    title: "You receive a draft advisory with affected versions and update instructions.",
    work: ["Draft the advisory and CVE details", "Include affected versions and update instructions", "Credit the reporter"],
    handoff: "Your security team approves and publishes the announcement.",
  },
  {
    without: "Check the public records, link the evidence, and record what future investigations should know.",
    label: "Close", kind: "closed", prompt: "The fix is public, and the report can be closed.",
    title: "The release, advisory, and investigation remain linked for future reference.",
    work: ["Check the public records", "Prepare the case for closure", "Save lessons for future investigations"],
    handoff: "You confirm the report can be closed.",
  },
];
