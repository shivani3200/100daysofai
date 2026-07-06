const predictionSets = {
  drink: {
    intent: "drink",
    keywords: ["drink", "tea", "coffee", "water", "thirsty", "cup"],
    reason: 'The input contains a drink-related token.',
    candidates: [
      { word: "tea", score: 9 },
      { word: "coffee", score: 7 },
      { word: "water", score: 6 },
      { word: "book", score: 1 }
    ]
  },
  study: {
    intent: "study",
    keywords: ["study", "learn", "read", "class", "exam", "practice"],
    reason: 'The input contains a learning-related token.',
    candidates: [
      { word: "AI", score: 9 },
      { word: "coding", score: 8 },
      { word: "notes", score: 5 },
      { word: "pizza", score: 1 }
    ]
  },
  build: {
    intent: "build",
    keywords: ["build", "create", "make", "project", "app", "website"],
    reason: 'The input contains a building-related token.',
    candidates: [
      { word: "app", score: 9 },
      { word: "project", score: 8 },
      { word: "website", score: 7 },
      { word: "cloud", score: 2 }
    ]
  },
  travel: {
    intent: "travel",
    keywords: ["travel", "go", "trip", "visit", "train", "flight"],
    reason: 'The input contains a travel-related token.',
    candidates: [
      { word: "home", score: 8 },
      { word: "airport", score: 7 },
      { word: "station", score: 6 },
      { word: "syntax", score: 1 }
    ]
  },
  default: {
    intent: "general",
    keywords: [],
    reason: "No strong keyword was found, so the app uses a general fallback.",
    candidates: [
      { word: "idea", score: 5 },
      { word: "next", score: 4 },
      { word: "something", score: 3 },
      { word: "maybe", score: 2 }
    ]
  }
};

const samples = [
  "I want to drink",
  "Today I will study",
  "I want to build",
  "Tomorrow I will travel"
];

const form = document.querySelector("#predictor-form");
const input = document.querySelector("#sentence-input");
const sampleButton = document.querySelector("#sample-button");
const topPrediction = document.querySelector("#top-prediction");
const confidenceBadge = document.querySelector("#confidence-badge");
const intentText = document.querySelector("#intent-text");
const whyText = document.querySelector("#why-text");
const tokenList = document.querySelector("#token-list");
const scoreList = document.querySelector("#score-list");
const probabilityList = document.querySelector("#probability-list");

let sampleIndex = 0;

function tokenize(sentence) {
  return sentence
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function detectPredictionSet(tokens) {
  const scoredSets = Object.values(predictionSets).map((set) => {
    const matches = tokens.filter((token) => set.keywords.includes(token));

    return {
      ...set,
      matchCount: matches.length,
      matchedTokens: matches
    };
  });

  const bestSet = scoredSets
    .filter((set) => set.intent !== "general")
    .sort((a, b) => b.matchCount - a.matchCount)[0];

  if (!bestSet || bestSet.matchCount === 0) {
    return {
      ...predictionSets.default,
      matchedTokens: []
    };
  }

  return bestSet;
}

function calculateProbabilities(candidates) {
  const totalScore = candidates.reduce((sum, item) => sum + item.score, 0);

  return candidates
    .map((candidate) => ({
      ...candidate,
      probability: Math.round((candidate.score / totalScore) * 100)
    }))
    .sort((a, b) => b.probability - a.probability);
}

function renderTokens(tokens) {
  if (tokens.length === 0) {
    tokenList.innerHTML = '<span class="token">empty input</span>';
    return;
  }

  tokenList.innerHTML = tokens
    .map((token) => `<span class="token">${token}</span>`)
    .join("");
}

function renderScores(predictions) {
  const maxScore = Math.max(...predictions.map((item) => item.score));

  scoreList.innerHTML = predictions
    .map((item) => {
      const width = Math.round((item.score / maxScore) * 100);

      return `
        <div class="prediction-row">
          <span>${item.word}: score ${item.score}</span>
          <div class="bar" aria-hidden="true">
            <div class="bar-fill" style="--width: ${width}%"></div>
          </div>
        </div>
      `;
    })
    .join("");
}

function renderProbabilities(predictions) {
  probabilityList.innerHTML = predictions
    .map((item) => {
      return `
        <div class="prediction-row">
          <span>${item.word}: ${item.probability}%</span>
          <div class="bar" aria-hidden="true">
            <div class="bar-fill" style="--width: ${item.probability}%"></div>
          </div>
        </div>
      `;
    })
    .join("");
}

function predict(sentence) {
  const tokens = tokenize(sentence);
  const predictionSet = detectPredictionSet(tokens);
  const predictions = calculateProbabilities(predictionSet.candidates);
  const bestPrediction = predictions[0];
  const matchedTokenText = predictionSet.matchedTokens?.length
    ? ` Matched token: "${predictionSet.matchedTokens[0]}".`
    : "";

  topPrediction.textContent = bestPrediction.word;
  confidenceBadge.textContent = `${bestPrediction.probability}%`;
  intentText.textContent = predictionSet.intent;
  whyText.textContent = `${predictionSet.reason}${matchedTokenText}`;

  renderTokens(tokens);
  renderScores(predictions);
  renderProbabilities(predictions);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  predict(input.value);
});

sampleButton.addEventListener("click", () => {
  sampleIndex = (sampleIndex + 1) % samples.length;
  input.value = samples[sampleIndex];
  predict(input.value);
});

predict(input.value);
