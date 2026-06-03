# 🎯 L'Impiccato — Hangman for Kids

> *Classic Hangman reimagined for children — the first game in a growing family suite.*

Live: **[DarioVincenzoDeSimone.github.io/impiccato](https://DarioVincenzoDeSimone.github.io/impiccato/)**

![Screenshot](https://github.com/user-attachments/assets/2d7598c1-ae49-4bca-8f09-a161ebd23c3f)

---

## The Philosophy — Playing Side by Side

The best education doesn't look like education. It looks like a parent and a child sitting together at a screen, taking turns guessing letters, and realising that spelling — one of the most foundational skills in language — can feel as natural as a game night.

**L'Impiccato** was designed from scratch with children in mind: no ads, no accounts, no dark patterns. Just words, letters, and the quiet satisfaction of saving the hangman one correct guess at a time.

---

## Vibe Coding as a Parenting Practice

*Vibe coding* means sitting side by side with your child and building something together — explaining what the code does in plain words, letting them suggest words to add, watching new categories appear on screen. It turns screen time into collaborative, creative, educational time.

When your child asks *"why is the astronaut in the Jobs category?"* or *"can we add a Space category?"*, a whole conversation about vocabulary and the world opens up. That is the real lesson.

---

## A Growing Family Game Suite

This game is the first in a collection, built game by game as children grow:

| Game | Description | Live |
|---|---|---|
| **L'Impiccato** | Classic Hangman — Italian vocabulary, multiplayer mode *(this project)* | [▶ Play](https://DarioVincenzoDeSimone.github.io/impiccato/) |
| [**Guess Flag!**](https://github.com/DarioVincenzoDeSimone/guess-flag) | World-flags geography quiz — 195 countries, two modes | [▶ Play](https://DarioVincenzoDeSimone.github.io/guess-flag/) |
| [**Guess Brand!**](https://github.com/DarioVincenzoDeSimone/guess-brand) | Car-brand logo quiz — 44 brands, two modes | [▶ Play](https://DarioVincenzoDeSimone.github.io/guess-brand/) |
| *More coming…* | Each game designed by a parent who cares | |

---

## How to Play

Type letters using the on-screen keyboard to reveal the hidden word. Each wrong guess draws one more part of the hangman figure (gallows → head → body → arms → legs). Guess the word before the drawing is complete.

**Hint** — stuck? Tap the lightbulb to reveal a clue about the hidden word (e.g. *"A large animal with a long trunk"*).

**Multiplayer mode** — Player 1 secretly types a custom word using the virtual keyboard; Player 2 guesses it. Perfect for two players sharing a device.

**Settings** let you choose:
- **Lives** — 6, 7, or 8 wrong guesses before game over
- The harder the word, the more lives you might want

---

## Word Categories

Words are curated for children aged 5–10, grouped by theme:

| Category | Examples |
|---|---|
| **Animals** | Leone, Elefante, Coccodrillo, Pipistrello… |
| **Jobs** | Dottore, Pompiere, Astronauta, Ballerina… |
| **Nature** | Vulcano, Arcobaleno, Terremoto… |
| **School** | Matita, Zaino, Lavagna… |
| **Food** | Cioccolato, Fragola, Spaghetti… |
| **Sports** | Nuoto, Ciclismo, Pallavolo… |
| *and more* | |

Every word comes with a child-friendly hint written to be read aloud.

---

## Technical Highlights

- **Angular 21** with standalone components, signals, OnPush everywhere
- **Angular Material + CDK** — accessible UI components out of the box
- **Tailwind CSS v4** — zero runtime CSS overhead
- **Motion** — fluid animations for the hangman reveal and game transitions
- **AI-powered hints** via Google Gemini — contextual word hints generated on demand
- **Server-Side Rendering** (Angular SSR + Express) for fast first load
- **Multiplayer** with virtual keyboard input — no third-party service needed
- **Configurable lives** (6–8) persisted across sessions via `localStorage`
- **Progressive hangman drawing** — each mistake adds exactly one body part
- **Zero tracking, zero ads**

---

## Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm start
# App available at http://localhost:3000
```

---

## Deploying to GitHub Pages

```bash
# From Git Bash (required on Windows):
npm run deploy
```

Builds with the correct `baseHref` and publishes to the `gh-pages` branch via `angular-cli-ghpages`.

---

## Project Structure

```
src/app/
  db/
    words.config.ts             # Curated word list with categories and hints
  services/
    game-state.service.ts       # Core game state (Angular signals)
    storage.service.ts          # Score & settings persistence (localStorage)
  components/
    hangman-drawing/            # Progressive SVG hangman figure
    alphabet-grid/              # On-screen A–Z keyboard
    multiplayer-setup/          # Player 1 secret word entry
    countdown-overlay/          # Countdown before Player 2 sees the board
    hint-modal/                 # Word hint display
    game-over-modal/            # Win/lose summary + next round
    settings-modal/             # Lives configuration
  app.ts                        # Root component
  app.routes.ts                 # Single-page routing
```
