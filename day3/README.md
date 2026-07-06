# NextWord AI

Day 3 project for the 100 Days of AI challenge.

NextWord AI is a frontend-only beginner project that demonstrates how AI-style
prediction can work at a very small scale.

The app shows this technical flow:

```text
Input -> Tokens -> Scores -> Probabilities -> Output
```

There is no backend, API key, package install, or build step. The project is
plain HTML, CSS, and JavaScript, so it works on GitHub Pages.

## Live Demo

```text
https://shivani3200.github.io/100daysofai/day3/
```

## How to Run Locally

Open this file in a browser:

```text
index.html
```

## Project Thinking

The goal for Day 3 was to teach a technical AI concept without jumping too fast
into real machine learning.

The concept is prediction.

A beginner often hears that AI "predicts" something, but that can feel abstract.
So this project turns prediction into visible frontend steps:

1. The user enters a sentence.
2. JavaScript breaks the sentence into tokens.
3. The app detects a possible intent from simple keywords.
4. It gives candidate next words a score.
5. It converts scores into probabilities.
6. It selects the word with the highest probability.

This is not a trained machine learning model. It is a rule-based simulation.
That is intentional because it makes the AI pipeline easier to inspect.

Before learning neural networks or large language models, it helps to understand
the basic shape:

```text
represent input -> score options -> choose output
```

## Technical Concepts Practiced

- Text input handling
- Tokenization using JavaScript string methods
- Rule-based intent detection
- Candidate scoring
- Probability calculation
- DOM rendering
- Responsive CSS layout
- GitHub Pages deployment

## Analogy

If someone says:

```text
I want to drink ___
```

your brain may guess:

```text
tea
coffee
water
```

You are not guessing randomly. You are using patterns you have seen before.

This project does the same idea with simple JavaScript rules.

## Interview Explanation

If someone asks what this project teaches, say:

> I built a frontend-only next word predictor to understand AI prediction. The
> app tokenizes user input, detects intent using keyword rules, assigns scores
> to possible next words, converts those scores into probabilities, and returns
> the highest probability output.

## Files

```text
day3/
  index.html
  styles.css
  script.js
  README.md
  .gitignore
```

## MVP Scope

Included:

- Static frontend app
- Token display
- Score display
- Probability display
- Next word prediction
- Beginner-friendly README
- GitHub Pages ready structure

Not included:

- Backend
- API calls
- Database
- Real machine learning training
- User accounts
- Build tooling
