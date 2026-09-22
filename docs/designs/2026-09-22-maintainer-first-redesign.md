# Maintainer-first redesign

A separate design preview for Apache Magpie, built on the existing Astro site.
Preserve documentation sync and project resources. No production publishing.

## Direction

Warm paper, deep ink, Magpie blue. Large, direct typography; generous whitespace;
small radii and quiet rules instead of gradients, glowing surfaces, or decorative
numbering. The existing magpie illustration gives the site a recognisable character.
Blue identifies actions and selected states. The logo remains unchanged.

Lead with the work maintainers want time for. Present concrete workflows, the
Airflow experience, human control, and a short route into installation. Keep
technical depth in documentation. Share header, footer, tokens, and links.
Documentation needs readable line lengths, search, mobile navigation, and an
on-page contents list. Framework docs remain generated, never hand-edited.

## Evidence

User-supplied Jarek Potiuk testimonial: distinguish his 10x volume / 3x speed
assessment from measured security-tracker data. Use an attributed excerpt.

Public source artifacts, inspected September 22, 2026:
- https://claude.ai/artifact/4FJFfDCpzcNPBvJmwWSvFf (monthly)
- https://claude.ai/artifact/DHp5F6ivDMPebBkKMrAAgX (quarterly)

Both generated September 21: 365 all-time trackers, 33 open, 7 open/untriaged,
0.64 hours median triage time. 332 closed is derived as 365 minus 33, and does
not mean 332 confirmed vulnerabilities or fixes. Adoption is marked April 1,
2026; the testimonial's February date describes incoming contribution growth.
Do not label projections as observations or infer causality from these totals.

## Preview hosting

Cloudflare Worker with static assets. Every response carries X-Robots-Tag;
HTML also carries a noindex meta tag. robots.txt disallows all crawling, the
sitemap is disabled, and production analytics are removed. These are indexing
requests, not authentication: the preview remains publicly accessible.
