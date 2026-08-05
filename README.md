# AC Simulator

A playful React app for young children (~5 years old) to pretend-play with a remote control, a table fan, and an air conditioner — built with React, TypeScript, Vite, Tailwind CSS, and Framer Motion.

## Features

- **Home screen** with big, colorful buttons to choose Remote, Fan, or Air Conditioner
- **Remote**: 9 selectable designs — 5 fun cartoon styles plus 4 realistic brand-styled remotes (Haier, Gree, Panasonic, Dawlance), each with a working LCD display, power, temperature, mode, fan speed, and swing controls
- **Fan**: a large animated table fan with 5 color designs, adjustable speed, oscillation, spin direction, and a night light
- **Air Conditioner**: an animated indoor unit (with digital display and swinging vent fins) connected to a realistic outdoor condenser unit, controllable via an on-screen remote, with mode-based airflow color/feel and an Ice mode with falling ice particles. Includes selectable brand stickers (Euro-Aire, Haier, Gree, Panasonic, Dawlance).
- **Sound effects** synthesized with the Web Audio API (clicks, chimes, whoosh, motor hum) — no audio files required
- **Light/dark theme** toggle available on every screen

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`) in your browser.

## Tech stack

- [Vite](https://vite.dev/)
- [React](https://react.dev/) + TypeScript
- [Tailwind CSS](https://tailwindcss.com/) v4
- [Framer Motion](https://www.framer.com/motion/)
