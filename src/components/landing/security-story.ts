// An illustrative journey through the documented Magpie security procedures.
export const securityStory = [
  {
    label: "Report", kind: "report", prompt: "A security report arrives in your project.",
    artifact: "Incoming · private", title: "New security report",
    outputs: ["Report received", "Awaiting investigation"],
    result: "organises the report, evidence, and conversation into one private case.",
    handoff: "You approve starting the investigation.",
  },
  {
    label: "Triage", kind: "triage", prompt: "You need to know whether the report is valid.",
    artifact: "Investigation complete", title: "The investigation gives you a decision",
    outputs: ["Report verified", "Duplicates checked"],
    result: "checks your project’s security model and past reports, then recommends whether to fix it.",
    handoff: "Your security team confirms the decision.",
  },
  {
    label: "Fix & test", kind: "fix", prompt: "The vulnerability is confirmed, so it’s time to fix it.",
    artifact: "Ready for review", title: "The patch is ready for review",
    outputs: ["Patch prepared", "Regression test passes"],
    result: "reproduces the failure, prepares the patch and regression test, and runs your project’s checks.",
    handoff: "A maintainer reviews and merges the fix.",
  },
  {
    label: "Release", kind: "release", prompt: "The patch is merged, but users still need a release.",
    artifact: "Release checked", title: "The fix is in a published release",
    outputs: ["Fix included", "Release available"],
    result: "checks the fix against the release and links the evidence to the report for you.",
    handoff: "The release manager confirms it is ready to disclose.",
  },
  {
    label: "Disclose", kind: "advisory", prompt: "Now users need to know how to protect themselves.",
    artifact: "Ready to publish", title: "The advisory is ready for approval",
    outputs: ["Advisory drafted", "CVE details prepared"],
    result: "uses the evidence already collected to draft the advisory and CVE details, including affected versions and reporter credit.",
    handoff: "Your security team approves and publishes the announcement.",
  },
  {
    label: "Close", kind: "closed", prompt: "The fix is public, and the report can be closed.",
    artifact: "Resolved", title: "The report is ready to close",
    outputs: ["Records linked", "Lessons recorded"],
    result: "checks the public records, prepares the closure, and saves the lesson for future investigations.",
    handoff: "You confirm the report can be closed.",
  },
];
