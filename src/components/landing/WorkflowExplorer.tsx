import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { securityStory } from "./security-story";
import MagpieCard from "./MagpieCard";

export default function WorkflowExplorer() {
  const [stage, setStage] = useState(0);
  useEffect(() => {
    const tab = document.getElementById(`security-tab-${stage}`);
    const rail = tab?.parentElement;
    if (tab && rail && rail.scrollWidth > rail.clientWidth) rail.scrollTo({ left: tab.offsetLeft - rail.offsetLeft - (rail.clientWidth - tab.offsetWidth) / 2, behavior: "instant" });
  }, [stage]);

  const select = (index: number) => setStage(index);
  return <div className="security-walkthrough">
    <div className="security-workbench">
      <div className="security-intro"><h2>Handle a security report with Magpie.</h2></div>
      <div className="story-stages" role="tablist" aria-label="Security lifecycle phases">{securityStory.map((phase, i) => <button key={phase.label} type="button" role="tab" id={`security-tab-${i}`} aria-selected={stage === i} aria-controls={`security-stage-${i}`} tabIndex={stage === i ? 0 : -1} data-complete={i < stage} onClick={() => select(i)} onKeyDown={event => {
        if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
        event.preventDefault();
        const next = event.key === "Home" ? 0 : event.key === "End" ? securityStory.length - 1 : (i + (event.key === "ArrowRight" ? 1 : -1) + securityStory.length) % securityStory.length;
        select(next); document.getElementById(`security-tab-${next}`)?.focus();
      }}><span className="story-stage-point" aria-hidden="true">{i < stage && <Check size={14} />}</span>{phase.label}</button>)}</div>
      <div className="security-scenes">{securityStory.map((phase, i) => <section className="security-scene" id={`security-stage-${i}`} key={phase.label} role="tabpanel" aria-labelledby={`security-tab-${i}`} aria-hidden={stage !== i} inert={stage !== i} tabIndex={0}>
        <h3>{phase.prompt}</h3>
        <div className="story-comparison">
          <div className="story-manual"><h4>Without Magpie</h4><p>{phase.without}</p></div>
          <MagpieCard className="story-assisted" headingLevel="h4" work={phase.work} />
        </div>
        <p className="maintainer-handoff">{phase.handoff}</p>
      </section>)}</div>
      <div className="story-navigation">
        <button type="button" onClick={() => select(stage - 1)} disabled={stage === 0} aria-label="Previous security stage"><ArrowLeft size={18} aria-hidden="true" />{stage > 0 ? securityStory[stage - 1].label : "Previous"}</button>
        {stage < securityStory.length - 1 ? <button type="button" onClick={() => select(stage + 1)} aria-label={`Next security stage: ${securityStory[stage + 1].label}`}>{securityStory[stage + 1].label}<ArrowRight size={18} aria-hidden="true" /></button> : <a href="#security-summary">See the result<ArrowRight size={18} aria-hidden="true" /></a>}
      </div>
    </div>
  </div>;
}
