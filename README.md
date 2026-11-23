# Superink redesign

Front-end pitch for superink.si: printer sales, rental and service in Slovenia.

- `site/` the static site (index, prodaja, najem, servis, kontakt). Open with any static server.
- `build.mjs` generates the HTML pages from shared partials (nav, mega menu, footer). Run `node build.mjs` after editing.
- `serve.mjs` tiny local server: `PORT=4871 node serve.mjs site`

Stack: plain HTML/CSS, GSAP + ScrollTrigger, Lenis (vendored in `site/assets/js/vendor`). Font: TT Neoris Pro (trial).
