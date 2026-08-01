# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

- Match the `senecon-see` editorial family: deep teal field, warm paper, gold primary action, serif reading typography, and a restrained academic tone.
- Present this title as a three-volume set. Use the authoritative first pages of the three compiled PDFs as the visible cover assets; do not collapse them into a generic single-book mockup.
- Keep the homepage focused on the three-volume structure, the preface reading route, and companion code. Public download buttons must offer only the code package; do not expose PDF, slide, or LaTeX source downloads on the website. Long content belongs on `/preface/` and `/code/`.
- Generate preface HTML and chapter/section metadata one-way from `E:\最优运输理论`; generated website content must not become an independently edited textbook source.
