import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { WORD_CATEGORIES, Word, WordCategory } from '../db/words.config';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class GameStateService {
  private readonly storage = inject(StorageService);
  private readonly categories: WordCategory[] = WORD_CATEGORIES;

  // ── Persisted state ──────────────────────────────────────────
  readonly score = signal<number>(this.storage.getScore());
  readonly maxLives = signal<number>(this.storage.getLives());

  // ── Game state ───────────────────────────────────────────────
  readonly currentCategory = signal<WordCategory>(this.categories[0]);
  readonly currentWordObj = signal<Word | null>(null);

  readonly word = computed(() => this.currentWordObj()?.word ?? '');
  readonly hint = computed(() => this.currentWordObj()?.hint ?? '');

  readonly guessedLetters = signal<Set<string>>(new Set());
  readonly mistakes = signal<number>(0);

  // ── Multiplayer state ────────────────────────────────────────
  readonly isMultiplayerMode = signal<boolean>(false);
  readonly customWordInput = signal<string>('');
  readonly countdown = signal<number>(0);

  // ── Derived state ────────────────────────────────────────────
  readonly displayWord = computed(() =>
    this.word()
      .split('')
      .map(char => (this.guessedLetters().has(char) ? char : ''))
  );

  readonly isGameWon = computed(() => {
    const w = this.word();
    return w.length > 0 && w.split('').every(char => this.guessedLetters().has(char));
  });

  readonly isGameOver = computed(
    () => this.mistakes() >= this.maxLives() || this.isGameWon()
  );

  readonly livesLeft = computed(() => this.maxLives() - this.mistakes());

  readonly wordSizeClasses = computed(() => {
    const len = this.word().length;
    if (len <= 8) return 'word-tile--lg';
    if (len <= 11) return 'word-tile--md';
    return 'word-tile--sm';
  });

  // ── Hangman drawing gates ────────────────────────────────────
  readonly showPole     = computed(() => this.mistakes() >= 1);
  readonly showTopBar   = computed(() => this.mistakes() >= 2);
  readonly showHead     = computed(() => this.mistakes() >= 3);
  readonly showBody     = computed(() => this.mistakes() >= 4);

  readonly showLeftArm  = computed(() => this.mistakes() >= 5);
  readonly showRightArm = computed(() =>
    this.maxLives() === 6 ? this.mistakes() >= 5 : this.mistakes() >= 6
  );

  readonly showLeftLeg = computed(() => {
    if (this.maxLives() === 6) return this.mistakes() >= 6;
    return this.mistakes() >= 7;
  });

  readonly showRightLeg = computed(() => {
    if (this.maxLives() === 6) return this.mistakes() >= 6;
    if (this.maxLives() === 7) return this.mistakes() >= 7;
    return this.mistakes() >= 8;
  });

  constructor() {
    // Persist score whenever it changes
    effect(() => this.storage.saveScore(this.score()));
    // Persist lives whenever it changes
    effect(() => this.storage.saveLives(this.maxLives()));
  }

  // ── Actions ──────────────────────────────────────────────────

  startNewSinglePlayerGame(): void {
    const category = this.categories[Math.floor(Math.random() * this.categories.length)];
    this.currentCategory.set(category);

    let newWord: Word;
    do {
      newWord = category.words[Math.floor(Math.random() * category.words.length)];
    } while (newWord.word === this.word() && category.words.length > 1);

    this.currentWordObj.set(newWord);
    this._resetRound();
  }

  makeGuess(letter: string): void {
    if (this.isGameOver() || this.guessedLetters().has(letter)) return;

    this.guessedLetters.update(set => new Set([...set, letter]));

    if (!this.word().includes(letter)) {
      this.mistakes.update(m => m + 1);
    } else {
      // Use setTimeout so that all signals settle before checking isGameWon
      setTimeout(() => {
        if (this.isGameWon()) this.score.update(s => s + 10);
      }, 0);
    }
  }

  resetScore(): void {
    this.score.set(0);
  }

  // ── Multiplayer ───────────────────────────────────────────────

  beginMultiplayerSetup(): void {
    this.isMultiplayerMode.set(true);
    this.customWordInput.set('');
    this.currentWordObj.set({ word: '', hint: '' });
    this._resetRound();
  }

  typeCustomLetter(letter: string): void {
    if (this.customWordInput().length < 14) {
      this.customWordInput.update(w => w + letter);
    }
  }

  backspaceCustomWord(): void {
    this.customWordInput.update(w => w.slice(0, -1));
  }

  confirmCustomWord(): void {
    const word = this.customWordInput();
    if (!word) return;

    this.countdown.set(3);
    const interval = setInterval(() => {
      this.countdown.update(c => c - 1);
      if (this.countdown() === 0) {
        clearInterval(interval);
        this._startCustomGame(word);
      }
    }, 1000);
  }

  returnToSinglePlayer(): void {
    this.isMultiplayerMode.set(false);
    this.countdown.set(0);
    this.startNewSinglePlayerGame();
  }

  onGameOver(): void {
    if (this.isMultiplayerMode()) {
      this.beginMultiplayerSetup();
    } else {
      this.startNewSinglePlayerGame();
    }
  }

  // ── Private helpers ──────────────────────────────────────────

  private _resetRound(): void {
    this.guessedLetters.set(new Set());
    this.mistakes.set(0);
  }

  private _startCustomGame(word: string): void {
    this.currentCategory.set({ name: 'Parola Segreta 🤫', words: [] });
    this.currentWordObj.set({ word, hint: 'È un segreto! Nessun indizio per te! 😉' });
    this._resetRound();
  }
}
