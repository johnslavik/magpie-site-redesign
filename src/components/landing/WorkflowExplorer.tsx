import { useEffect, useRef, useState } from "react";
import { Check, ShieldCheck, ShieldAlert, Search, Code2, PackageCheck, Megaphone, CircleCheck } from "lucide-react";
import { securityStory } from "./security-story";

export default function WorkflowExplorer() {
  const [stage, setStage] = useState(0);
  const [completed, setCompleted] = useState(0);
  const sceneRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const conversationRef = useRef<HTMLDivElement>(null);
  const [scrollDriven, setScrollDriven] = useState(false);
  useEffect(() => {
    const media = matchMedia("(min-width: 801px) and (min-height: 760px) and (prefers-reduced-motion: no-preference)");
    const update = () => setScrollDriven(media.matches);
    update(); media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    const scene = sceneRef.current, panel = panelRef.current, conversation = conversationRef.current;
    if (!scene || !panel || !conversation) return;
    const phases = Array.from(conversation.querySelectorAll<HTMLElement>("[data-conversation-phase]"));
    let frame = 0;
    const updatePhase = () => {
      const atEnd = conversation.scrollTop >= conversation.scrollHeight - conversation.clientHeight - 1;
      const index = atEnd ? phases.length - 1 : phases.reduce((current, phase, i) => phase.offsetTop <= conversation.scrollTop + 80 ? i : current, 0);
      setStage(index);
      setCompleted(atEnd ? phases.length : index);
    };
    const update = () => {
      if (scrollDriven) {
        const distance = Math.max(0, 100 - scene.getBoundingClientRect().top);
        conversation.scrollTop = Math.min(distance, conversation.scrollHeight - conversation.clientHeight);
      }
      updatePhase();
    };
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update); };
    const measure = () => {
      if (scrollDriven) scene.style.height = `${panel.offsetHeight + conversation.scrollHeight - conversation.clientHeight}px`;
      update();
    };
    const observer = new ResizeObserver(measure);
    observer.observe(panel);
    if (conversation.firstElementChild) observer.observe(conversation.firstElementChild);
    if (scrollDriven) window.addEventListener("scroll", schedule, { passive: true });
    else conversation.addEventListener("scroll", schedule, { passive: true });
    measure();
    return () => {
      observer.disconnect(); cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      conversation.removeEventListener("scroll", schedule);
      scene.style.removeProperty("height");
    };
  }, [scrollDriven]);
  const jumpToStage = (index: number) => {
    const conversation = conversationRef.current;
    const phase = conversation?.querySelectorAll<HTMLElement>("[data-conversation-phase]")[index];
    if (!conversation || !phase) return;
    const offset = Math.min(phase.offsetTop, conversation.scrollHeight - conversation.clientHeight);
    const behavior = matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth";
    if (scrollDriven && sceneRef.current) {
      window.scrollTo({ top: sceneRef.current.getBoundingClientRect().top + window.scrollY - 100 + offset, behavior: "instant" });
    } else conversation.scrollTo({ top: offset, behavior });
    setStage(index);
  };
  return <div className="workflow-scroll-scene security-story" ref={sceneRef} data-scroll-driven={scrollDriven}>
    <div ref={panelRef} className="workflow-workbench">
      <div className="workflow-progress">
        <div className="lifecycle-stages" role="group" aria-label="Security lifecycle phases">{securityStory.map((phase, i) => <button key={phase.label} type="button" data-complete={i < completed} aria-label={phase.label} aria-pressed={stage === i} aria-controls="lifecycle-session" onClick={() => jumpToStage(i)}>{phase.label}</button>)}</div>
        <div className="workflow-progress-track" role="progressbar" aria-label="Security story progress" aria-valuemin={0} aria-valuemax={securityStory.length} aria-valuenow={completed}><span style={{ width: `${completed / securityStory.length * 100}%` }} /></div>
      </div>
      <figure className="agent-session lifecycle-conversation" id="lifecycle-session" aria-label="Example security workflow">
        <div className="session-heading"><span><img src="/favicon.svg" width="22" height="22" alt="Magpie" /> Your project · Security workflow</span><span><ShieldCheck size={14} /> Private investigation</span></div>
        <div className="conversation-scroll" ref={conversationRef} tabIndex={0} aria-label="Security workflow conversation" onKeyDown={event => {
          if (!scrollDriven || !["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End"].includes(event.key)) return;
          event.preventDefault();
          if (event.key === "Home" || event.key === "End") jumpToStage(event.key === "Home" ? 0 : securityStory.length - 1);
          else window.scrollBy({ top: (event.key.includes("Up") ? -1 : 1) * (event.key.startsWith("Page") ? 400 : 80), behavior: "instant" });
        }}>
          <div className="conversation-content">{securityStory.map(phase => {
            const StageIcon = { report: ShieldAlert, triage: Search, fix: Code2, release: PackageCheck, advisory: Megaphone, closed: CircleCheck }[phase.kind]!;
            return <section className="conversation-phase story-phase" data-conversation-phase key={phase.label} aria-label={phase.label}>
            <div className="story-prompt"><span aria-hidden="true">❯</span>{phase.prompt}</div>

            <div className={`security-artifact artifact-${phase.kind}`}>
              <div className="security-stage-icon"><StageIcon size={44} strokeWidth={1.4} aria-hidden="true" /></div>
              <span className="artifact-type">{phase.artifact}</span><h3>{phase.title}</h3>
              <div className="security-outputs">{phase.outputs.map(output => <span key={output}>{phase.kind !== "report" && <Check size={15} aria-hidden="true" />}{output}</span>)}</div>
              <div className="artifact-result"><Check size={17} />{phase.result}</div>
            </div>
            <p className="story-handoff">{phase.handoff}</p>

          </section>; })}</div>
        </div>
      </figure>
    </div>
  </div>;
}
