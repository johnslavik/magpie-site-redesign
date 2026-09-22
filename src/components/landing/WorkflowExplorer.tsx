import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, UserRound } from "lucide-react";
import { securityStory } from "./security-story";
import BrandName from "./BrandName";

export default function WorkflowExplorer() {
  const [stage, setStage] = useState(0);
  const [scrollDriven, setScrollDriven] = useState(false);
  const sceneRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const stepRef = useRef(220);
  const pinTopRef = useRef(100);

  useEffect(() => {
    const scene = sceneRef.current, panel = panelRef.current;
    if (!scene || !panel) return;
    const media = matchMedia("(min-width: 901px) and (prefers-reduced-motion: no-preference)");
    let frame = 0;
    let driven = false;
    const update = () => {
      if (!driven) return;
      const distance = pinTopRef.current - scene.getBoundingClientRect().top;
      setStage(Math.max(0, Math.min(securityStory.length - 1, Math.round(distance / stepRef.current))));
    };
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update); };
    const measure = () => {
      // Use ordinary page flow when the complete story cannot fit below the header.
      driven = media.matches && panel.offsetHeight + 124 <= window.innerHeight;
      setScrollDriven(driven);
      pinTopRef.current = Math.max(100, (window.innerHeight - panel.offsetHeight + 80) / 2);
      scene.style.setProperty("--scene-top", `${pinTopRef.current}px`);
      stepRef.current = Math.min(260, Math.max(180, window.innerHeight * .22));
      scene.style.height = driven ? `${panel.offsetHeight + stepRef.current * (securityStory.length - .5)}px` : "auto";
      update();
    };
    const observer = new ResizeObserver(measure);
    observer.observe(panel);
    media.addEventListener("change", measure);
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", schedule, { passive: true });
    measure();
    return () => {
      observer.disconnect(); cancelAnimationFrame(frame);
      media.removeEventListener("change", measure);
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", schedule);
    };
  }, []);

  useEffect(() => {
    const tab = document.getElementById(`security-tab-${stage}`);
    const rail = tab?.parentElement;
    if (tab && rail && rail.scrollWidth > rail.clientWidth) rail.scrollTo({ left: tab.offsetLeft - rail.offsetLeft - (rail.clientWidth - tab.offsetWidth) / 2, behavior: "instant" });
  }, [stage]);

  const select = (index: number) => {
    setStage(index);
    if (scrollDriven && sceneRef.current) {
      window.scrollTo({ top: sceneRef.current.getBoundingClientRect().top + window.scrollY - pinTopRef.current + index * stepRef.current, behavior: "instant" });
    }
  };
  return <div className="security-walkthrough" ref={sceneRef} data-scroll-driven={scrollDriven}>
    <div className="security-workbench" ref={panelRef}>
      <div className="story-stages" role="tablist" aria-label="Security lifecycle phases">{securityStory.map((phase, i) => <button key={phase.label} type="button" role="tab" id={`security-tab-${i}`} aria-selected={stage === i} aria-controls={`security-stage-${i}`} tabIndex={stage === i ? 0 : -1} data-complete={i < stage} onClick={() => select(i)} onKeyDown={event => {
        if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
        event.preventDefault();
        const next = event.key === "Home" ? 0 : event.key === "End" ? securityStory.length - 1 : (i + (event.key === "ArrowRight" ? 1 : -1) + securityStory.length) % securityStory.length;
        select(next); document.getElementById(`security-tab-${next}`)?.focus();
      }}><span className="story-stage-point" aria-hidden="true">{i < stage && <Check size={14} />}</span>{phase.label}</button>)}</div>
      <div className="security-scenes">{securityStory.map((phase, i) => <section className="security-scene" id={`security-stage-${i}`} key={phase.label} role="tabpanel" aria-labelledby={`security-tab-${i}`} aria-hidden={stage !== i} inert={stage !== i} tabIndex={0}>
        <h3>{phase.prompt}</h3>
        <div className="story-contribution"><img src="/favicon.svg" width="32" height="32" alt="" /><p><BrandName /> {phase.result}</p></div>
        {phase.kind === "release" ? <div className="release-choice"><div><strong>By hand</strong><p>Find the merged fix, check the published version, and copy the evidence into the tracker.</p></div><div><strong>With Magpie</strong><p>“Check whether this report is ready to disclose.”</p></div></div> : <div className={`story-output output-${phase.kind}`}><Check size={22} aria-hidden="true" /><p>{phase.title}</p></div>}
        <p className="story-decision"><UserRound size={21} aria-hidden="true" />{phase.handoff}</p>
      </section>)}</div>
      <div className="story-navigation">
        <button type="button" onClick={() => select(stage - 1)} disabled={stage === 0} aria-label="Previous security stage"><ArrowLeft size={18} aria-hidden="true" />Previous</button>
        <a className="story-onward" href="#security-summary">Continue reading</a>
        {stage < securityStory.length - 1 ? <button type="button" onClick={() => select(stage + 1)} aria-label={`Next security stage: ${securityStory[stage + 1].label}`}>{securityStory[stage + 1].label}<ArrowRight size={18} aria-hidden="true" /></button> : <a href="#security-summary">See the result<ArrowRight size={18} aria-hidden="true" /></a>}
      </div>
    </div>
  </div>;
}
