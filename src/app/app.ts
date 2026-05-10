import { ChangeDetectionStrategy, Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WORD_CATEGORIES, WordCategory } from './db/words.config';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col items-center justify-between h-dvh bg-sky-100 p-4 sm:p-8 font-sans text-sky-900 border-8 border-sky-300 rounded-3xl shadow-inner box-border">
      <!-- Header -->
      <div class="text-center">
        <h1 class="text-4xl sm:text-5xl font-black text-pink-500 drop-shadow-sm mb-2 uppercase tracking-widest">L'Impiccato</h1>
        <div class="bg-white px-4 py-1 rounded-full shadow-md inline-block border-2 border-pink-200">
          <span class="text-lg font-bold text-sky-600">Categoria: {{ currentCategory().name }}</span>
        </div>
      </div>

      <!-- Stats -->
      <div class="flex gap-6">
        <div class="bg-orange-400 text-white px-4 py-2 rounded-2xl shadow-lg border-b-4 border-orange-600 flex items-center gap-2">
          <span class="material-icons">star</span>
          <span class="text-xl font-black">{{ score() }}</span>
        </div>
        <div class="bg-red-400 text-white px-4 py-2 rounded-2xl shadow-lg border-b-4 border-red-600 flex items-center gap-2">
          <span class="material-icons">favorite</span>
          <span class="text-xl font-black">{{ attemptsLeft() }}</span>
        </div>
      </div>

      <!-- Hangman Drawing -->
      <div class="relative w-40 h-40 sm:w-48 sm:h-48 bg-white/50 rounded-full flex items-center justify-center p-4 shadow-inner border-4 border-white overflow-hidden">
        <svg viewBox="0 0 100 100" class="w-full h-full stroke-sky-800 stroke-[5] fill-none stroke-round">
          <!-- Base (always visible) -->
          <path d="M20 90 L80 90" />
          
          <!-- Pole -->
          @if (attemptsLeft() < 6) { <path d="M30 90 L30 10" /> }
          @if (attemptsLeft() < 5) { <path d="M30 10 L70 10 L70 25" /> }
          
          <!-- Rope -->
          @if (attemptsLeft() < 4) { <path d="M70 25 L70 30" class="stroke-orange-800 stroke-[3]" /> }
          
          <!-- Head -->
          @if (attemptsLeft() < 4) { <circle cx="70" cy="35" r="10" class="stroke-pink-500" /> }
          
          <!-- Body -->
          @if (attemptsLeft() < 3) { <path d="M70 45 L70 70" class="stroke-pink-500" /> }
          
          <!-- Arms -->
          @if (attemptsLeft() < 2) { <path d="M70 50 L55 60 M70 50 L85 60" class="stroke-pink-500" /> }
          
          <!-- Legs -->
          @if (attemptsLeft() < 1) { <path d="M70 70 L55 85 M70 70 L85 85" class="stroke-pink-500" /> }
        </svg>
        
        @if (isGameOver() && !isGameWon()) {
          <div class="absolute inset-0 flex items-center justify-center bg-red-500/20 rounded-full animate-pulse">
            <span class="text-red-600 text-6xl font-black">?</span>
          </div>
        }
      </div>

      <!-- Word Display -->
      <div class="flex flex-nowrap justify-center w-full px-2" [class.gap-1]="word().length > 9" [class.gap-2]="word().length <= 9">
        @for (char of displayWord(); track $index) {
          <div class="border-b-4 border-sky-400 flex items-center justify-center font-black text-sky-800 uppercase
                      transition-all duration-300"
               [ngClass]="wordSizeClasses()"
               [class.text-pink-500]="char !== ''"
               [class.animate-bounce]="char !== '' && isGameWon()">
            {{ char || '' }}
          </div>
        }
      </div>

      <!-- Alphabet Grid -->
      <div class="grid grid-cols-5 sm:grid-cols-7 gap-2 w-full max-w-lg px-2">
        @for (letter of alphabet; track letter) {
          <button 
            (click)="makeGuess(letter)"
            [disabled]="isGameOver() || guessedLetters().has(letter)"
            class="h-10 sm:h-12 rounded-xl text-lg sm:text-xl font-black shadow-md transition-all active:scale-95 disabled:cursor-not-allowed
                   flex items-center justify-center relative overflow-hidden"
            [class.bg-white]="!guessedLetters().has(letter)"
            [class.border-2]="!guessedLetters().has(letter)"
            [class.border-sky-200]="!guessedLetters().has(letter)"
            [class.text-sky-600]="!guessedLetters().has(letter)"
            [class.bg-green-400]="guessedLetters().has(letter) && word().includes(letter)"
            [class.text-white]="guessedLetters().has(letter)"
            [class.bg-red-400]="guessedLetters().has(letter) && !word().includes(letter)"
          >
            {{ letter }}
            @if (guessedLetters().has(letter) && !word().includes(letter)) {
              <span class="absolute inset-0 flex items-center justify-center text-red-700/40 text-2xl">X</span>
            }
          </button>
        }
      </div>

      <!-- Game Over Overlay -->
      @if (isGameOver()) {
        <div class="fixed inset-0 bg-sky-900/60 backdrop-blur-sm flex items-center justify-center p-6 z-50">
          <div class="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl border-t-8 border-pink-400 relative overflow-hidden animate-in zoom-in duration-300">
            <!-- Decorative elements -->
            <div class="absolute -top-10 -left-10 w-32 h-32 bg-pink-100 rounded-full -z-10"></div>
            <div class="absolute -bottom-10 -right-10 w-32 h-32 bg-sky-100 rounded-full -z-10"></div>

            <h2 class="text-4xl font-black mb-4" [class.text-green-500]="isGameWon()" [class.text-red-500]="!isGameWon()">
              {{ isGameWon() ? 'GRANDE! 🎉' : 'OH NO! 😱' }}
            </h2>
            
            <p class="text-xl text-sky-700 mb-6 font-medium">
              {{ isGameWon() ? 'Hai indovinato la parola!' : 'La parola era:' }}
              <br>
              <span class="text-3xl font-black uppercase text-pink-500 block mt-2 tracking-widest">{{ word() }}</span>
            </p>

            <button 
              (click)="resetGame()"
              class="w-full bg-orange-400 hover:bg-orange-500 text-white text-2xl font-black py-4 rounded-2xl shadow-[0_6px_0_rgb(234,140,0)] 
                     active:shadow-none active:translate-y-1 transition-all flex items-center justify-center gap-3"
            >
              <span class="material-icons text-3xl">refresh</span>
              GIOCA ANCORA
            </button>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    :host { display: block; }
    .animate-bounce {
      animation: bounce 0.5s infinite alternate;
    }
    @keyframes bounce {
      from { transform: translateY(0); }
      to { transform: translateY(-10px); }
    }
    .stroke-round {
      stroke-linecap: round;
      stroke-linejoin: round;
    }
    @keyframes zoom-in {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }
    .animate-in {
      animation: zoom-in 0.3s ease-out forwards;
    }
  `]
})
export class App implements OnInit {
  readonly alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').sort();

  categories: WordCategory[] = WORD_CATEGORIES;

  currentCategory = signal<WordCategory>(this.categories[0]);
  word = signal<string>('');
  guessedLetters = signal<Set<string>>(new Set());
  score = signal<number>(0);
  attemptsLeft = signal<number>(6);

  displayWord = computed(() => {
    return this.word().split('').map(char =>
      this.guessedLetters().has(char) ? char : ''
    );
  });

  isGameWon = computed(() => {
    return this.word().length > 0 && this.word().split('').every(char => this.guessedLetters().has(char));
  });

  isGameOver = computed(() => {
    return this.attemptsLeft() === 0 || this.isGameWon();
  });

  wordSizeClasses = computed(() => {
    const len = this.word().length;
    if (len <= 8) return 'w-8 sm:w-10 h-12 sm:h-14 text-2xl sm:text-3xl';
    if (len <= 11) return 'w-6 sm:w-8 h-10 sm:h-12 text-xl sm:text-2xl';
    return 'w-5 sm:w-6 h-8 sm:h-10 text-lg sm:text-xl';
  });

  ngOnInit() {
    this.resetGame();
  }

  resetGame() {
    const category = this.categories[Math.floor(Math.random() * this.categories.length)];
    this.currentCategory.set(category);

    let newWord;
    do {
      newWord = category.words[Math.floor(Math.random() * category.words.length)];
    } while (newWord === this.word() && category.words.length > 1);

    this.word.set(newWord);
    this.guessedLetters.set(new Set());
    this.attemptsLeft.set(6);
  }

  makeGuess(letter: string) {
    if (this.isGameOver() || this.guessedLetters().has(letter)) return;

    this.guessedLetters.update(set => {
      const next = new Set(set);
      next.add(letter);
      return next;
    });

    if (!this.word().includes(letter)) {
      this.attemptsLeft.update(a => a - 1);
    } else {
      // Check if this guess won the game
      setTimeout(() => {
        if (this.isGameWon()) {
          this.score.update(s => s + 10);
        }
      }, 0);
    }
  }
}
