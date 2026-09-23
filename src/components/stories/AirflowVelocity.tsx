import type { CSSProperties } from "react";
import data from '../../data/airflow.json';
const monthly = data.series.monthly;
const series = (key: keyof typeof monthly.charts, label: string) => monthly.charts[key].find(s => s.label === label)!.values as number[];
const opened = series('c_cum', 'cumulative opened');
const closed = series('c_cum', 'cumulative closed');
const incoming = series('c_open_vs_untriaged', 'reported in month (opened + rejected)');
const triage = series('c_triage', 'Mean time to triage (hours)');
const points = monthly.buckets.flatMap((month, i) => month >= '2025-11' && month <= '2026-08' ? [{ month, incoming: incoming[i], closed: closed[i] - closed[i - 1], backlog: opened[i] - closed[i], triage: triage[i] }] : []);
const x = (i: number) => 48 + i * 49;
const panels = [{ title: 'Reports per month', max: 80, fields: ['incoming','closed'] as const }, { title: 'Open reports at month-end', max: 40, fields: ['backlog'] as const }, { title: 'Mean time to triage · hours', max: 400, fields: ['triage'] as const }];
const rows = panels.map((panel, row) => ({ ...panel, top: 30 + row * 155, y: (v: number) => 130 + row * 155 - v / panel.max * 90 }));
const colors = { incoming: '#aa4b28', closed: '#004aad', backlog: '#7651a2', triage: '#167963' };
export default function AirflowVelocity() { return (
<figure className="evidence-chart">
  <figcaption><h3>How the security workload changed.</h3></figcaption>
  <div className="chart-phases"><span>Before the reported surge<small>Nov–Jan</small></span><span>Growing pressure<small>Feb–Mar</small></span><span>Working with Magpie<small>Apr–Aug</small></span></div>
  <div className="evidence-legend"><span style={{ "--series": "#aa4b28" } as CSSProperties}>Reports received</span><span style={{ "--series": "#004aad" } as CSSProperties}>Tracked reports closed</span></div>
  <svg viewBox="0 0 530 500" role="img" aria-labelledby="evidence-title evidence-desc">
    <title id="evidence-title">Airflow security report volume, backlog and triage time</title>
    <desc id="evidence-desc">Monthly data from November 2025 to August 2026. Shaded periods separate the baseline, the growth period described by Jarek, and Magpie adoption in April. The backlog falls after March but rises again in August. Full values are in the table below.</desc>
    {rows.map(panel => <g>
        <rect x="24" y={panel.top} width="147" height="105" fill="#adc5de" opacity=".12" />
        <rect x="171" y={panel.top} width="98" height="105" fill="#dc9664" opacity=".15" />
        <rect x="269" y={panel.top} width="245" height="105" fill="#6bb695" opacity=".14" />
        <text x="24" y={panel.top - 9} className="evidence-heading">{panel.title}</text>
        {[0,panel.max / 2,panel.max].map(tick => <g><line x1="40" x2="505" y1={panel.y(tick)} y2={panel.y(tick)} stroke="currentColor" opacity=".12" /><text x="35" y={panel.y(tick) + 4} textAnchor="end" className="evidence-tick">{tick}</text></g>)}
        <line x1="269" x2="269" y1={panel.top} y2={panel.top + 105} stroke="currentColor" opacity=".4" strokeDasharray="4 4" />
        {panel.fields.map(field => <g><path d={points.map((p,i) => `${i ? 'L' : 'M'}${x(i)},${panel.y(p[field])}`).join(' ')} fill="none" stroke={colors[field]} strokeWidth="2.5" />{points.map((p,i) => <circle cx={x(i)} cy={panel.y(p[field])} r="3" fill={colors[field]}><title>{p.month}: {p[field]}</title></circle>)}</g>)}
        {points.map((p,i) => <text x={x(i)} y={panel.top + 123} textAnchor="middle" className="evidence-tick">{new Date(`${p.month}-01T12:00Z`).toLocaleString('en',{month:'short',timeZone:'UTC'})}</text>)}
      </g>)}
  </svg>
  <p className="evidence-note">February marks the influx Jarek describes. April marks adoption in the tracker. These observations do not isolate AI’s or Magpie’s effect. September is excluded because it is incomplete.</p>
  <details><summary>See values and definitions</summary><div className="evidence-table"><table><thead><tr><th>Month</th><th>Received</th><th>Closed</th><th>Open</th><th>Triage (h)</th></tr></thead><tbody>{points.map(p => <tr><th>{p.month}</th><td>{p.incoming}</td><td>{p.closed}</td><td>{p.backlog}</td><td>{p.triage}</td></tr>)}</tbody></table></div><p className="evidence-note">Received includes reports rejected before entering the tracker. Closures include outcomes other than a released fix. Triage is a monthly mean, not time to resolution. Source: <a href="/data/airflow-security.json">Airflow tracker snapshot, September 21, 2026</a>.</p></details>
</figure>
); }
