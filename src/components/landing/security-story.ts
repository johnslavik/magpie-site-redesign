// An illustrative journey through the documented Magpie security procedures.
export const securityStory = [
  {
    label: "Report", kind: "report", prompt: "Your project receives a security report.",
    artifact: "Incoming · private", title: "New security report",
    outputs: ["Report received", "Awaiting investigation"],
    result: "Magpie gathers the report and evidence in a private tracker.",
    handoff: "You approve starting the investigation.",
  },
  {
    label: "Triage", kind: "triage", prompt: "Find out whether it needs a fix.",
    artifact: "Investigation complete", title: "A vulnerability worth fixing",
    outputs: ["Report verified", "Duplicates checked"],
    result: "Magpie investigates and prepares a recommendation with evidence.",
    handoff: "Your security team confirms the decision.",
  },
  {
    label: "Fix & test", kind: "fix", prompt: "Prepare the fix and prove it works.",
    artifact: "Ready for review", title: "A patch with passing tests",
    outputs: ["Patch prepared", "Regression test passes"],
    result: "Magpie prepares the fix, tests it, and drafts the pull request.",
    handoff: "A maintainer reviews and merges the fix.",
  },
  {
    label: "Release", kind: "release", prompt: "Make sure users can get the fix.",
    artifact: "Release checked", title: "The fix reaches users",
    outputs: ["Fix included", "Release available"],
    result: "Magpie checks that the published release contains the fix.",
    handoff: "The release manager confirms it is ready to disclose.",
  },
  {
    label: "Disclose", kind: "advisory", prompt: "Prepare the public announcement.",
    artifact: "Ready to publish", title: "Tell users how to update",
    outputs: ["Advisory drafted", "CVE details prepared"],
    result: "Magpie turns the investigation into an advisory and CVE details.",
    handoff: "Your security team approves and publishes the announcement.",
  },
  {
    label: "Close", kind: "closed", prompt: "Close the report and keep what you learned.",
    artifact: "Resolved", title: "Fixed. Released. Disclosed.",
    outputs: ["Records linked", "Lessons recorded"],
    result: "Magpie prepares the closure and updates the project’s security model.",
    handoff: "You confirm the report can be closed.",
  },
];
