// An illustrative journey through the documented Magpie security procedures.
export const securityStory = [
  {
    label: "Report", kind: "report", prompt: "A security report arrives in your project.",
    title: "The report and its evidence are in one place",
    result: "organises the report, evidence, and conversation into one private case.",
    handoff: "You approve starting the investigation.",
  },
  {
    label: "Triage", kind: "triage", prompt: "You need to know whether the report is valid.",
    title: "You have a recommendation backed by evidence",
    result: "checks your project’s security model and past reports, then recommends whether to fix it.",
    handoff: "Your security team confirms the decision.",
  },
  {
    label: "Fix & test", kind: "fix", prompt: "The vulnerability is confirmed, so it’s time to fix it.",
    title: "The patch and regression test are ready for review",
    result: "reproduces the failure, prepares the patch and regression test, and runs your project’s checks.",
    handoff: "A maintainer reviews and merges the fix.",
  },
  {
    label: "Release", kind: "release", prompt: "The patch is merged, but users still need a release.",
    title: "The fix is in a published release",
    result: "checks the fix against the release and links the evidence to the report for you.",
    handoff: "The release manager confirms it is ready to disclose.",
  },
  {
    label: "Disclose", kind: "advisory", prompt: "Now users need to know how to protect themselves.",
    title: "The advisory is ready for approval",
    result: "uses the evidence already collected to draft the advisory and CVE details, including affected versions and reporter credit.",
    handoff: "Your security team approves and publishes the announcement.",
  },
  {
    label: "Close", kind: "closed", prompt: "The fix is public, and the report can be closed.",
    title: "The report is ready to close",
    result: "checks the public records, prepares the closure, and saves the lesson for future investigations.",
    handoff: "You confirm the report can be closed.",
  },
];
