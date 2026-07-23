# Leap Edge Renovation — React

React conversion of the bundled **Leap Edge Website** HTML export (Design Canvas format).

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Project structure

| Path | Purpose |
|------|---------|
| `src/App.jsx` | Root component wiring state + view |
| `src/useLeapEdgeState.js` | Page navigation, filters, contact form logic |
| `src/LeapEdgeView.jsx` | Auto-generated JSX from the original DC template |
| `src/ImageSlot.jsx` | Placeholder component for project images |
| `src/fonts.css` | Cormorant Garamond + Jost `@font-face` rules |
| `public/assets/` | Fonts unpacked from the original bundle |
| `convert.cjs` | Re-run to regenerate `LeapEdgeView.jsx` from `xdc-template.html` |

## Re-converting from the bundled HTML

If you receive an updated `.html` bundle:

1. Place it at `~/Downloads/Leap Edge Website.html`
2. Run `node unpack.cjs` then `node extract.cjs` then `node convert.cjs`

## Features preserved

- Multi-page SPA: Home, Studio, Portfolio, Services, Process, Catalogue, Clients, Contact
- Portfolio and catalogue filters
- Contact form with validation
- Scroll-reveal animations on sections
- Brand accent color via CSS variable `--accent`
