import { ArrowRight, FileWarning, FileCheck2, ShieldAlert, PackageCheck, GitPullRequest, MessageSquare, Bug, Code2, TestTube2, Package, UserRound, ListChecks, Boxes, Search, UserPlus, KeyRound, Bot, FolderCode, ShieldCheck, CircleCheck } from "lucide-react";

const scenes = {
  security: { input: FileWarning, badge: ShieldAlert, output: PackageCheck, next: FileCheck2, labels: ["Release", "CVE"] },
  review: { input: GitPullRequest, badge: Search, output: Code2, next: MessageSquare, labels: ["Code", "Review"] },
  bug: { input: Bug, badge: Search, output: Code2, next: TestTube2, labels: ["Patch", "Tests"] },
  release: { input: Package, badge: Search, output: PackageCheck, next: FileCheck2, labels: ["Verified", "Release"] },
  contributor: { input: UserRound, badge: Search, output: ListChecks, next: Code2, labels: ["First task", "Code"] },
  dependencies: { input: Boxes, badge: ShieldAlert, output: Search, next: ListChecks, labels: ["Findings", "Upgrades"] },
  pairing: { input: Code2, badge: Search, output: Search, next: CircleCheck, labels: ["Review", "Fixes"] },
  onboarding: { input: UserPlus, badge: KeyRound, output: KeyRound, next: UserRound, labels: ["Access", "Welcome"] },
  sandbox: { input: Bot, badge: ShieldAlert, output: Bot, next: FolderCode, labels: ["Agent", "Project"] },
};

export type WorkflowScene = keyof typeof scenes;

export default function WorkflowIllustration({ scene, result = false }: { scene: WorkflowScene; result?: boolean }) {
  const { input: Input, badge: Badge, output: Output, next: Next, labels } = scenes[scene];
  return <div className={`workflow-illustration ${result ? "illustration-result" : "illustration-input"}`} aria-hidden="true">
    {result ? <div className={`illustration-pair ${scene === "sandbox" ? "illustration-sandbox" : ""}`}>
      <div><Output size={30} strokeWidth={1.5} /><span>{labels[0]}</span></div>
      {scene === "sandbox" ? <ShieldCheck size={20} strokeWidth={1.5} /> : <ArrowRight size={20} strokeWidth={1.5} />}
      <div><Next size={30} strokeWidth={1.5} /><span>{labels[1]}</span></div>
    </div> : <div className="illustration-document">
      <Input size={30} strokeWidth={1.5} />
      <div className="illustration-lines"><i /><i /><i /></div>
      <span className="illustration-badge"><Badge size={22} strokeWidth={1.5} /></span>
    </div>}
  </div>;
}
