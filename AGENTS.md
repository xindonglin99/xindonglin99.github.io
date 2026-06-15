# AGENTS.md

This file provides guidance to Codex (Codex.ai/Codex) when working with this repository.

## Project Overview

Personal academic website for Xindong Lin - a single-page portfolio built with Next.js.

## Tech Stack

- **Framework:** Next.js 15.4.1 + React 19 + TypeScript
- **Styling:** Tailwind CSS 3.4.1 with custom serif fonts (Noto Serif, PT Serif)
- **Icons:** Lucide React
- **Deployment:** GitHub Actions → GitHub Pages

## Project Structure

```
src/
├── app/           # Next.js app router (layout.tsx, page.tsx, globals.css)
├── components/    # React components (profile, publications, news, education, etc.)
└── data/          # Content as TypeScript files - edit these to update website content
public/
├── images/        # Profile photos, project images, GIFs
└── pdfs/          # CV, reports
```

## Common Commands

```bash
npm install        # Install dependencies
npm run dev        # Start dev server at localhost:3000
npm run build      # Production build
npm run lint       # Run ESLint
```

## Architecture Notes

- **Data-driven design:** Content is stored in `src/data/*.ts` files. Update these to change website content without modifying components.
- **Section order:** Controlled by `src/data/section-order.ts`
- **Single-page layout:** Two-column design with sticky profile sidebar (left) and scrolling content sections (right)
- **Path alias:** Use `@/` to reference `src/` directory (configured in tsconfig.json)

## Key Data Files

- `src/data/aboutme.ts` - Bio, name, contact info, social links
- `src/data/publication.ts` - Research publications
- `src/data/portfolio.ts` - Project portfolio
- `src/data/education.ts` - Education history
- `src/data/experience.ts` - Work experience
- `src/data/news.ts` - News/announcements

## Deployment

Automatic deployment via GitHub Actions on push to `main` branch. Workflow defined in `.github/workflows/nextjs.yml`.
