---
trigger: always_on
---

# Business Specification: L'Impiccato (Italian Hangman for Kids)

## 1. Project Overview
**L'Impiccato** is an educational and interactive Hangman game designed specifically for Italian-speaking children aged 6 to 9. The primary goal is to provide a fun way to learn and practice vocabulary through a classic game mechanic, optimized for touch devices and young users.

## 2. Target Audience
- **Primary Users**: Children (6-9 years old).
- **Context**: Home learning, school breaks, or casual mobile gaming.
- **Key Needs**: Large clickable elements, vibrant visuals, simple instructions, and age-appropriate vocabulary.

## 3. Core Requirements & Features

### 3.1. Educational Content
- **Language**: Italian.
- **Vocabulary**: Words are curated into child-friendly categories such as Animals, Jobs, School, Fruits, etc.
- **Categorization**: The game randomly selects a word from a specific category to keep the gameplay varied and educational.

### 3.2. User Interface (UI) & Experience (UX)
- **Visual Theme**: A bright, colorful, and "playful" aesthetic using a palette of sky blue, pink, and orange.
- **Interactivity**: 
    - **No Keyboard Required**: A full alphabet grid is displayed on-screen.
    - **Touch-First Design**: Buttons are large and spaced appropriately for small fingers and mobile screens.
- **Mobile Compatibility**: Fully responsive layout designed to work seamlessly on smartphones and tablets.

### 3.3. Game Mechanics
- **Attempt System**: Players start with **6 lives**.
- **Scoring**: Players earn **10 points** for every word correctly guessed.
- **Visual Feedback**:
    - **Correct Guess**: The letter appears in the word placeholder with a bounce animation.
    - **Incorrect Guess**: The letter is highlighted in **red with an 'X' overlay**, and a part of the Hangman drawing is added.
    - **Hangman Drawing**: A step-by-step SVG drawing that builds up as lives are lost (Base -> Pole -> Rope -> Head -> Body -> Arms -> Legs).
- **Game State**: 
    - A "Game Over" or "Victory" modal appears at the end of each round.
    - Displays the correct word if the player loses.
    - Provides a "Play Again" (Gioca Ancora) button to restart with a new word/category.

## 4. Technical Architecture

### 4.1. Tech Stack
- **Framework**: Angular (Standalone Components).
- **State Management**: Angular Signals (`signal`, `computed`) for reactive and performant UI updates.
- **Styling**: Tailwind CSS for responsive utility-first styling.
- **Graphics**: Inline SVG for the dynamic Hangman drawing.
- **Icons**: Material Icons for intuitive visual cues (stars for score, hearts for lives).

### 4.2. Data Structure
- **Word Database**: Located in `src/app/db/words.config.ts`.
- **Schema**: `WordCategory` interface containing a category `name` and an array of `words`.

## 5. Maintenance & Future Integrations

### 5.1. Content Expansion
- New words and categories can be added easily by updating the `WORD_CATEGORIES` constant in `src/app/db/words.config.ts`.
- Words should remain in **uppercase** to match the UI logic.

### 5.2. Potential Roadmap
- **Sound Effects**: Adding cheerful sounds for correct guesses and a "boing" for mistakes.
- **Difficulty Levels**: Implementing "Easy" (shorter words) vs "Hard" (longer words) modes.
- **Multi-language Support**: Expanding the `words.config.ts` to support English or other languages for language learning.
- **Animations**: Enhancing the SVG drawing with smoother transitions.
- **Progressive Web App (PWA)**: Enabling offline play and "Install to Home Screen" functionality.
