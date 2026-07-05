const moodProfiles = {
  motivated: {
    label: "Motivated",
    color: "#087f7b",
    keywords: ["ready", "build", "goal", "focus", "start", "work", "create", "learn"],
    openings: ["A brave start", "Focused effort", "One honest step"],
    lessons: ["turns intention into evidence", "makes the unknown smaller", "teaches faster than waiting"],
    reflections: [
      "Your future self needs proof, not perfection.",
      "Progress becomes real when it has a first action.",
      "You do not need the full map to begin the road."
    ],
    actions: [
      "Choose one small task and finish it in ten minutes.",
      "Write the next three steps and do the first one now.",
      "Remove one distraction before you begin."
    ]
  },
  happy: {
    label: "Happy",
    color: "#d65a45",
    keywords: ["happy", "joy", "great", "excited", "good", "proud", "smile", "fun"],
    openings: ["Joy shared", "A bright mood", "Your good energy"],
    lessons: ["becomes stronger when you use it generously", "can become fuel for someone else's day", "is a signal worth listening to"],
    reflections: [
      "Let this feeling become a useful action.",
      "Good days are also good teachers.",
      "Celebrate the spark, then give it somewhere to go."
    ],
    actions: [
      "Send one kind message to someone.",
      "Use this energy on a task you have delayed.",
      "Write down what made today feel lighter."
    ]
  },
  calm: {
    label: "Calm",
    color: "#3268a8",
    keywords: ["calm", "peace", "steady", "quiet", "relaxed", "balanced", "clear"],
    openings: ["A steady mind", "Quiet confidence", "Calm focus"],
    lessons: ["can hear the next right move", "turns noise into order", "makes patience practical"],
    reflections: [
      "Stillness is not empty; it is organized attention.",
      "Clarity often arrives when the rush leaves.",
      "A steady pace can still cover real distance."
    ],
    actions: [
      "Protect one quiet block of time today.",
      "Pick the simplest useful next move.",
      "Take three slow breaths before your next decision."
    ]
  },
  stressed: {
    label: "Stressed",
    color: "#b74b36",
    keywords: ["stress", "stressed", "pressure", "busy", "overwhelmed", "anxious", "worried", "nervous"],
    openings: ["Pressure handled gently", "A heavy day", "The busy mind"],
    lessons: ["gets lighter when it is split into pieces", "needs direction before speed", "deserves a smaller doorway"],
    reflections: [
      "You are allowed to lower the volume before you solve the problem.",
      "One clear priority can make a crowded day breathe.",
      "You do not have to carry every thought at the same time."
    ],
    actions: [
      "Write the top three tasks and circle only one.",
      "Take a five minute reset before continuing.",
      "Turn the biggest task into a first tiny action."
    ]
  },
  sad: {
    label: "Sad",
    color: "#6f62b8",
    keywords: ["sad", "low", "hurt", "lonely", "down", "tired", "empty", "lost"],
    openings: ["A tender heart", "A low moment", "Quiet courage"],
    lessons: ["still deserves gentle progress", "can move one breath at a time", "does not cancel your strength"],
    reflections: [
      "Small care still counts on heavy days.",
      "You can be slow and still be moving.",
      "A soft step is still a step."
    ],
    actions: [
      "Drink water and do one kind thing for yourself.",
      "Name the feeling without judging it.",
      "Reach out to one safe person if you need company."
    ]
  },
  confused: {
    label: "Confused",
    color: "#c58a19",
    keywords: ["confused", "unclear", "unsure", "lost", "doubt", "question", "messy", "stuck"],
    openings: ["Confusion", "An unclear path", "A messy question"],
    lessons: ["is often the start of learning", "gets easier when one question is named", "is a draft, not a verdict"],
    reflections: [
      "Clarity is built by asking a cleaner question.",
      "Not knowing yet is part of the work.",
      "A messy start can still become a useful path."
    ],
    actions: [
      "Write the one question you most need answered.",
      "Explain the problem in two simple sentences.",
      "Find one example and copy its structure."
    ]
  }
};

const quoteTemplates = [
  "{opening} {lesson}.",
  "{opening} is how growth begins: it {lesson}.",
  "Let today remind you that {openingLower} {lesson}.",
  "When the day feels real, remember this: {openingLower} {lesson}."
];

const form = document.querySelector("#quote-form");
const moodGrid = document.querySelector("#mood-grid");
const moodNote = document.querySelector("#mood-note");
const surpriseButton = document.querySelector("#surprise-button");
const quoteText = document.querySelector("#quote-text");
const moodBadge = document.querySelector("#mood-badge");
const reflectionText = document.querySelector("#reflection-text");
const actionText = document.querySelector("#action-text");
const copyButton = document.querySelector("#copy-button");
const saveButton = document.querySelector("#save-button");
const statusMessage = document.querySelector("#status-message");
const historyList = document.querySelector("#history-list");
const clearHistoryButton = document.querySelector("#clear-history");

let selectedMood = "motivated";
let currentQuote = {
  mood: "motivated",
  quote: quoteText.textContent.trim(),
  reflection: reflectionText.textContent.trim(),
  action: actionText.textContent.trim()
};

function normalizeText(text) {
  return text.toLowerCase().replace(/[^a-z\s]/g, " ");
}

function chooseFrom(items, seed) {
  return items[Math.abs(seed) % items.length];
}

function textSeed(text) {
  return Array.from(text).reduce((sum, letter, index) => {
    return sum + letter.charCodeAt(0) * (index + 1);
  }, Date.now());
}

function analyzeMood(note) {
  const cleanNote = normalizeText(note);
  const words = cleanNote.split(/\s+/).filter(Boolean);
  const scores = Object.fromEntries(Object.keys(moodProfiles).map((mood) => [mood, 0]));

  scores[selectedMood] += 3;

  for (const word of words) {
    for (const [mood, profile] of Object.entries(moodProfiles)) {
      if (profile.keywords.includes(word)) {
        scores[mood] += 2;
      }
    }
  }

  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
}

function buildQuote(mood, note = "") {
  const profile = moodProfiles[mood];
  const seed = textSeed(`${mood}-${note}-${Math.random()}`);
  const opening = chooseFrom(profile.openings, seed);
  const lesson = chooseFrom(profile.lessons, seed + 7);
  const template = chooseFrom(quoteTemplates, seed + 13);

  const quote = template
    .replace("{opening}", opening)
    .replace("{openingLower}", opening.toLowerCase())
    .replace("{lesson}", lesson);

  return {
    mood,
    quote,
    reflection: chooseFrom(profile.reflections, seed + 23),
    action: chooseFrom(profile.actions, seed + 37)
  };
}

function renderQuote(result) {
  const profile = moodProfiles[result.mood];

  currentQuote = result;
  quoteText.textContent = result.quote;
  moodBadge.textContent = profile.label;
  moodBadge.style.backgroundColor = profile.color;
  reflectionText.textContent = result.reflection;
  actionText.textContent = result.action;
}

function setStatus(message) {
  statusMessage.textContent = message;
  window.clearTimeout(setStatus.timer);
  setStatus.timer = window.setTimeout(() => {
    statusMessage.textContent = "";
  }, 2600);
}

function getSavedQuotes() {
  try {
    return JSON.parse(localStorage.getItem("moodquote-saved")) || [];
  } catch {
    return [];
  }
}

function setSavedQuotes(quotes) {
  localStorage.setItem("moodquote-saved", JSON.stringify(quotes));
}

function renderHistory() {
  const savedQuotes = getSavedQuotes();

  if (savedQuotes.length === 0) {
    historyList.innerHTML = '<p class="empty-state">Saved quotes will appear here.</p>';
    return;
  }

  historyList.innerHTML = savedQuotes
    .map((item) => {
      const profile = moodProfiles[item.mood] || moodProfiles.motivated;

      return `
        <article class="history-item" style="border-left-color: ${profile.color}">
          <p>${item.quote}</p>
          <span>${profile.label}</span>
        </article>
      `;
    })
    .join("");
}

function updateActiveMood(nextMood) {
  selectedMood = nextMood;
  const chips = moodGrid.querySelectorAll(".mood-chip");

  chips.forEach((chip) => {
    const isActive = chip.dataset.mood === nextMood;

    chip.classList.toggle("is-active", isActive);
    chip.setAttribute("aria-pressed", String(isActive));
  });
}

moodGrid.addEventListener("click", (event) => {
  const chip = event.target.closest(".mood-chip");

  if (!chip) {
    return;
  }

  updateActiveMood(chip.dataset.mood);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const detectedMood = analyzeMood(moodNote.value);
  renderQuote(buildQuote(detectedMood, moodNote.value));
});

surpriseButton.addEventListener("click", () => {
  const moods = Object.keys(moodProfiles);
  const randomMood = chooseFrom(moods, Math.floor(Math.random() * 1000));
  updateActiveMood(randomMood);
  renderQuote(buildQuote(randomMood, "surprise"));
});

copyButton.addEventListener("click", async () => {
  const text = `${currentQuote.quote}\n\nReflection: ${currentQuote.reflection}\nNext step: ${currentQuote.action}`;

  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
    } else {
      const copyArea = document.createElement("textarea");

      copyArea.value = text;
      copyArea.setAttribute("readonly", "");
      copyArea.style.position = "fixed";
      copyArea.style.opacity = "0";
      document.body.appendChild(copyArea);
      copyArea.select();
      document.execCommand("copy");
      document.body.removeChild(copyArea);
    }

    setStatus("Copied to clipboard.");
  } catch {
    setStatus("Copy is unavailable in this browser.");
  }
});

saveButton.addEventListener("click", () => {
  const savedQuotes = getSavedQuotes();
  const nextQuotes = [currentQuote, ...savedQuotes].slice(0, 6);

  setSavedQuotes(nextQuotes);
  renderHistory();
  setStatus("Saved locally in this browser.");
});

clearHistoryButton.addEventListener("click", () => {
  setSavedQuotes([]);
  renderHistory();
  setStatus("Saved quotes cleared.");
});

renderHistory();
