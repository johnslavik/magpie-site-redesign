import { useState } from "react";
import { withBase } from "@/ui/lib/utils";

const modes = [
  { id: "sandbox", label: "Regular permissions", tag: "[sandbox]", detail: "Commands run inside the sandbox with the usual permission checks." },
  { id: "auto", label: "Auto-allow", tag: "[sandbox-auto]", detail: "Commands inside the sandbox run without a prompt. Commands outside it still need permission." },
  { id: "off", label: "No sandbox", tag: "[NO SANDBOX]", detail: "The sandbox is off. Magpie makes that visible in red, including in linked worktrees." },
] as const;

/** Illustration of Magpie's documented Claude Code statusLine helper. */
export default function SandboxStatus({ setup, interactive }: { setup: boolean; interactive: boolean }) {
  const [mode, setMode] = useState<(typeof modes)[number]["id"]>(setup ? "off" : "sandbox");
  const current = modes.find(item => item.id === mode)!;
  return <div className="sandbox-demo">
    {interactive && <div className="sandbox-mode-picker">
      <code>/sandbox</code>
      <div role="group" aria-label="Example sandbox mode">{modes.map(item => <button key={item.id} type="button" aria-pressed={mode === item.id} onClick={() => setMode(item.id)}>{item.label}</button>)}</div>
      <p>{current.detail}</p>
    </div>}
    <div className="sandbox-statusline" aria-live="polite" aria-label="Example sandbox status line">
      <a className="sandbox-state" href={withBase("/docs/setup/secure-agent-setup#sandbox-state-status-line")} aria-label={`${current.tag}: Magpie sandbox status for Claude Code`} title="About this sandbox status"><strong data-mode={mode}>{current.tag}</strong></a>
      <span className="status-project">example-app{setup ? "" : "/security-fix"}</span>
      <span aria-hidden="true">|</span><span>{setup ? "main" : "fix/archive-path * +2"}</span>
      <span aria-hidden="true">|</span><span>Opus</span>
    </div>
  </div>;
}
