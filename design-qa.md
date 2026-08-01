# Design QA · code-only and pen-name revision

Source visual truth:

- `E:\senecon-ote\public\assets\ote-three-volume-set-v2.png` — final three-volume product image.
- `C:\Users\ENAN\AppData\Local\Temp\codex-clipboard-acbf11a5-c59f-4787-9d93-f53adb7d98ce.png` — user-marked code-section state to replace.

Rendered implementation:

- `E:\senecon-ote\implementation-home-v2-desktop.png`
- `E:\senecon-ote\implementation-home-v2-mobile.png`
- `E:\senecon-ote\implementation-code-v2-mobile.png`

Comparison evidence: `E:\senecon-ote\design-qa-comparison-v2.png`.

Viewport and normalization: desktop CSS viewport 1280 × 900 and mobile CSS viewport 390 × 844, device scale factor 1. The desktop full-page capture is 1264 × 3578 px; its first 900 px are normalized beside the 1693 × 929 px product source in a 1600 × 940 comparison board. The focused checks use the native hero image and the mobile code-page capture, so no density conversion is required.

State: initial page load, desktop and mobile; mobile navigation closed. Download links were checked in their default state.

## Findings

No actionable P0, P1, or P2 finding remains.

- P3 — Very small spine typography is necessarily less legible after the three-book image is reduced on mobile. The volume colors and large cover titles still distinguish all three books, so this is acceptable at the current breakpoint.

## Required fidelity surfaces

- Fonts and typography: the editorial Chinese serif hierarchy remains consistent across the hero and reading pages; labels and controls retain their compact sans/mono treatment. The author is rendered consistently as `Axel · Sencium` without an affiliation.
- Spacing and layout rhythm: the desktop hero keeps the two-column composition and gives the thicker three-volume product image sufficient width. Mobile stacks title, actions, and books without overlap or document overflow.
- Colors and tokens: deep navy-teal, warm paper, ochre actions, and the three volume accent colors remain coherent with the LaTeX covers.
- Image quality: the hero uses the generated raster product image with visible spines, page blocks, cover thickness, and contact shadows. The individual volume cards use freshly rendered LaTeX cover images. No placeholder or CSS-drawn book art remains.
- Copy and content: all public download actions say companion code and point to the code-only archive. The code page now explains folder structure, dependency installation, the all-chapter runner, and per-chapter execution. PDF, slides, and LaTeX source downloads are absent.

## Browser and interaction checks

- Homepage: hero, three-volume navigation, preface action, code download, mobile layout, and zero horizontal overflow.
- Code page: `如何使用代码`, three usage steps, 20 chapter entries, two code-only download actions, and zero horizontal overflow.
- Link audit: zero PDF links and zero source-package links; the release archive returns HTTP 200.
- Identity audit: homepage, preface, code page, cover fronts, and cover spines show `Axel · Sencium`; repository search finds no real-name or institution string.
- Console: no browser-rendered runtime error was observed during the checked routes.
- Production build and all four Sites packaging tests pass.

## Comparison history

1. The earlier implementation exposed complete-PDF and full-source downloads and used flat front-cover panels. These were replaced with a single code package, rewritten usage guidance, and a generated three-volume product image with real spine and shadow cues.
2. The first generated product image retained the previous author line. The LaTeX author metadata and cover variables were updated, all three covers were re-rendered, and the product image was regenerated with only `Axel · Sencium`.
3. The final combined comparison shows the intended three-volume asset at a strong hero scale with no clipping; no actionable P0/P1/P2 issue remains.

## Implementation checklist

- [x] Code-only public download policy
- [x] Practical code usage section
- [x] Pen name and no institution across site and covers
- [x] Stronger spines, page thickness, and shadows
- [x] Desktop and mobile browser checks
- [x] Production build and packaging tests

final result: passed
