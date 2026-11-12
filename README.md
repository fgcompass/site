# FG-COMPASS website

Source for the FG-COMPASS site, built with [Quarto](https://quarto.org) and published from `docs/` with GitHub Pages.

## Languages

- **English (default)**: pages at the repository root (`index.qmd`, `download.qmd`, ...), rendered to `docs/`.
- **Brazilian Portuguese**: a separate Quarto project in `pt/`, rendered to `docs/pt/`.

Each English page has a Portuguese twin with the same file name. The **PT-BR / EN** link in the navbar
takes visitors to the same page in the other language (`fg-lang.js`), so keep the file names in sync.

## Build

Render both languages from the repository root, English first:

```bash
quarto render        # English  -> docs/
quarto render pt     # Portuguese -> docs/pt/
```

`quarto render` (the English site) clears `docs/`, so always run `quarto render pt` afterwards.

## Landing page pieces

- `styles.css`: landing-page layout and colours (light and dark), shared by both languages.
- `theme.scss` / `theme-dark.scss`: Bootstrap theme (fonts: Lexend for headings, Inter for text).
- `fg-demo.js`: the "Try it" overhand-throw demo in the hero. Text comes from `window.FG_DEMO` in each `index.qmd`.
- `fg-tree.js`: the animated decision tree in "How it works". Captions come from `data-cap1..4` on `#fg-tree`.

## Portuguese assessment files

When the Portuguese decision trees and protocols are ready, add the PDFs to `static/files/` and update the
"Em breve" callout in `pt/download.qmd` (there is a comment there showing where), plus the
"Other languages" line in `download.qmd`.
