# MoodQuote AI

Day 2 project for the 100 Days of AI challenge.

MoodQuote AI is a frontend-only quote generator that creates a short quote,
reflection, and next step based on the user's mood. It runs entirely in the
browser, so there is no backend, database, API key, or build step.

## Live Demo

After GitHub Pages is enabled, the app will be available at:

```text
https://<your-github-username>.github.io/<your-repo-name>/day2/
```

Example:

```text
https://shivani3200.github.io/100daysofai/day2/
```

## How to Run Locally

Open this file in a browser:

```text
index.html
```

Because the project is plain HTML, CSS, and JavaScript, no installation is
needed.

## Project Thinking

The goal for Day 2 was to keep the project small, understandable, and easy to
share. Instead of using a real AI API, this app uses a lightweight local
"AI-style" mood engine. That makes it safe for GitHub Pages because GitHub Pages
can only host static frontend files.

The thinking process was:

1. Keep the user flow simple: choose a mood, optionally write a note, then
   generate a quote.
2. Use mood keywords to detect the user's emotional direction from their text.
3. Build a quote from small reusable phrase parts instead of hardcoding only one
   quote per mood.
4. Add reflection and next-step text so the result feels useful, not just
   decorative.
5. Store saved quotes in `localStorage` so the app still has a small interactive
   feature without needing a backend.
6. Make it GitHub Pages friendly by avoiding frameworks, server routes, and
   environment variables.

## How the Mood Logic Works

The JavaScript file contains mood profiles such as:

- motivated
- happy
- calm
- stressed
- sad
- confused

Each mood profile has:

- keywords
- quote openings
- quote lessons
- reflections
- next-step actions
- a display color

When the user writes a note, the app checks the words against the keyword lists.
The selected mood also gets a score boost. The highest scoring mood is used to
generate the final quote.

This is not a machine learning model. It is a beginner-friendly simulation of an
AI feature using rule-based logic.

## Features

- Mood selection buttons
- Optional mood description input
- Local mood detection
- Generated quote, reflection, and next step
- Copy quote button
- Save quote button using browser `localStorage`
- Clear saved quotes
- Responsive design for mobile and desktop
- No backend and no dependencies

## Files

```text
day2/
  index.html
  styles.css
  script.js
  assets/
    mood-compass.svg
  README.md
  .gitignore
```

## GitHub Pages Setup

1. Push the repository to GitHub.
2. Open the repository on GitHub.
3. Go to `Settings`.
4. Open `Pages`.
5. Set source to `Deploy from a branch`.
6. Choose the branch, usually `main`.
7. Choose `/ (root)` as the folder.
8. Save.

Then open:

```text
https://<your-github-username>.github.io/<your-repo-name>/day2/
```

## MVP Scope

Included:

- static frontend app
- mood-based quote generation
- local saved quotes
- responsive layout
- GitHub Pages friendly setup

Not included:

- backend API
- login
- database
- real AI model
- user accounts
- build tooling
