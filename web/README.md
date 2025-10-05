# wgquick.com frontend

This directory contains the React + TypeScript single-page app that powers [wgquick.com](https://wgquick.com).

## Scripts
- `pnpm install --dir web` – install dependencies
- `pnpm --dir web dev` – run the local development server
- `pnpm --dir web run lint` – lint the project
- `pnpm --dir web run build` – build the production bundle into `web/dist`

## Configuration
- Copy `.env.example` to `.env.local` and set `VITE_GA_MEASUREMENT_ID` if you want Google Analytics enabled.
- Leave the variable empty to disable analytics when deploying forks or running locally.

Refer to the repository root [README](../README.md) for architecture notes, deployment details, and licensing information.
