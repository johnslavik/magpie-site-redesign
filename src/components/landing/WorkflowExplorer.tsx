import { useEffect, useRef, useState } from "react";
import { Check, ShieldAlert, Search, Code2, PackageCheck, Megaphone, CircleCheck } from "lucide-react";
import { securityStory } from "./security-story";
import BrandName from "./BrandName";

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
    update(); media.addEventListener("change", update); window.addEventListener("resize", update);
    return () => { media.removeEventListener("change", update); window.removeEventListener("resize", update); };
  }, []);
  useEffect(() => {
    const scene = sceneRef.current, panel = panelRef.current, conversation = conversationRef.current;
    if (!scene || !panel || !conversation) return;
    const phases = Array.from(conversation.querySelectorAll<HTMLElement>("[data-conversation-phase]"));
    let frame = 0;
    let settleTimer: ReturnType<typeof setTimeout>;
    let previousY = window.scrollY;
    let direction = 1;
    let pointerDown = false;
    const maximum = () => conversation.scrollHeight - conversation.clientHeight;
    const offsets = () => phases.map(phase => Math.min(phase.offsetTop, maximum()));
    const settle = () => {
      if (!scrollDriven || pointerDown) return;
      const start = scene.getBoundingClientRect().top + window.scrollY - 100;
      const distance = window.scrollY - start;
      // Outside the pinned story, the page scrolls normally in either direction.
      if (distance < 0 || distance > maximum()) return;
      const stops = offsets();
      if (stops.some(stop => Math.abs(stop - distance) < 3)) return;
      const target = direction > 0
        ? stops.find(stop => stop > distance) ?? maximum()
        : stops.findLast(stop => stop < distance) ?? 0;
      window.scrollTo({ top: start + target, behavior: "smooth" });
    };
    const startPointer = () => { pointerDown = true; clearTimeout(settleTimer); };
    const endPointer = () => { pointerDown = false; settleTimer = setTimeout(settle, 180); };
    const updatePhase = () => {
      const atEnd = conversation.scrollTop >= conversation.scrollHeight - conversation.clientHeight - 1;
      const index = atEnd ? phases.length - 1 : phases.reduce((current, phase, i) => phase.offsetTop <= conversation.scrollTop + conversation.clientHeight / 2 ? i : current, 0);
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
    const schedule = () => {
      const delta = window.scrollY - previousY;
      if (Math.abs(delta) > 1) direction = Math.sign(delta);
      previousY = window.scrollY;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
      clearTimeout(settleTimer);
      if (scrollDriven) settleTimer = setTimeout(settle, 180);
    };
    const measure = () => {
      scene.style.setProperty("--story-height", `${conversation.clientHeight}px`);
      // Keep native scrolling when larger text or a short screen makes a stage taller than the panel.
      if (scrollDriven && phases.some(phase => phase.offsetHeight > conversation.clientHeight + 2)) {
        setScrollDriven(false);
        return;
      }
      if (scrollDriven) scene.style.height = `${panel.offsetHeight + conversation.scrollHeight - conversation.clientHeight}px`;
      update();
    };
    const observer = new ResizeObserver(measure);
    observer.observe(panel);
    if (conversation.firstElementChild) observer.observe(conversation.firstElementChild);
    if (scrollDriven) {
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("pointerdown", startPointer, { passive: true });
      window.addEventListener("pointerup", endPointer, { passive: true });
      window.addEventListener("pointercancel", endPointer, { passive: true });
    }
    else conversation.addEventListener("scroll", schedule, { passive: true });
    measure();
    return () => {
      observer.disconnect(); cancelAnimationFrame(frame); clearTimeout(settleTimer);
      window.removeEventListener("pointerdown", startPointer);
      window.removeEventListener("pointerup", endPointer);
      window.removeEventListener("pointercancel", endPointer);
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
        <div className="lifecycle-stages" role="group" aria-label="Security lifecycle phases">{securityStory.map((phase, i) => <button key={phase.label} type="button" data-complete={i < completed} aria-label={phase.label} aria-pressed={stage === i} aria-controls="lifecycle-session" onClick={() => jumpToStage(i)}><span className="phase-point" aria-hidden="true">{i < completed && <Check size={11} />}</span><span>{phase.label}</span></button>)}</div>
        <div className="workflow-progress-track" role="progressbar" aria-label="Security story progress" aria-valuemin={0} aria-valuemax={securityStory.length} aria-valuenow={completed}><span style={{ width: `${completed / securityStory.length * 100}%` }} /></div>
      </div>
      <figure className="agent-session lifecycle-conversation" id="lifecycle-session" aria-label="Example security workflow">
        <div className="conversation-scroll" ref={conversationRef} tabIndex={0} aria-label="Security workflow conversation" onKeyDown={event => {
          if (!["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End"].includes(event.key)) return;
          if (!scrollDriven && !["Home", "End"].includes(event.key)) return;
          event.preventDefault();
          if (event.key === "Home" || event.key === "End") jumpToStage(event.key === "Home" ? 0 : securityStory.length - 1);
          else jumpToStage(Math.max(0, Math.min(securityStory.length - 1, stage + (event.key.includes("Up") ? -1 : 1))));
        }}>
          <div className="conversation-content">{securityStory.map(phase => {
            const StageIcon = { report: ShieldAlert, triage: Search, fix: Code2, release: PackageCheck, advisory: Megaphone, closed: CircleCheck }[phase.kind]!;
            return <section className="conversation-phase story-phase" data-conversation-phase key={phase.label} aria-label={phase.label}>
            <h3 className="story-prompt">{phase.prompt}</h3>
            <div className="magpie-contribution"><img src="/favicon.svg" width="30" height="30" alt="" /><p><BrandName /> {phase.result}</p></div>

            <div className={`security-artifact artifact-${phase.kind}`}>
              <div className="security-stage-icon"><StageIcon size={44} strokeWidth={1.4} aria-hidden="true" /></div>
              <p className="artifact-title">{phase.title}</p>
              {phase.kind === "closed" && <div className="closure-records"><span><Check size={19} aria-hidden="true"/>The fix is released.</span><span><Check size={19} aria-hidden="true"/>Users know how to update.</span><span><Check size={19} aria-hidden="true"/>The evidence stays linked.</span></div>}
              {phase.kind === "release" && <div className="release-comparison">
                <div className="release-by-hand"><span>By hand</span><ul><li>Find the merged fix</li><li>Check the published version</li><li>Copy evidence into the tracker</li></ul></div>
                <div className="release-with-magpie"><span>With <BrandName /></span><p>“Check whether this report is ready to disclose.”</p></div>
              </div>}
            </div>
            <p className="story-handoff">{phase.handoff}</p>

          </section>; })}</div>
        </div>
      </figure>
    </div>
  </div>;
}
