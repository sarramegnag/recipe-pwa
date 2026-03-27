# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Recipe PWA — a progressive web app for managing recipes, built with React 19, TypeScript, and Vite 7. PWA support is provided by `vite-plugin-pwa` with auto-updating service worker.

## Commands

- `npm run dev` — start dev server with HMR
- `npm run build` — type-check (`tsc -b`) then production build
- `npm run lint` — ESLint across the project
- `npm run preview` — serve the production build locally

No test runner is configured yet.

## Architecture

- **Entry point**: `src/main.tsx` renders `<App />` into `#root` with StrictMode
- **PWA config**: `vite.config.ts` — `VitePWA` plugin handles service worker generation (`generateSW` mode) and web manifest. Icon assets (`pwa-192x192.png`, `pwa-512x512.png`) are expected in `public/`
- **TypeScript**: split config — `tsconfig.app.json` for app code, `tsconfig.node.json` for tooling (Vite config)
- **ESLint**: flat config in `eslint.config.js` using typescript-eslint, react-hooks, and react-refresh plugins