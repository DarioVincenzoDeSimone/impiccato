import { ChangeDetectionStrategy, Component, OnInit, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WORD_CATEGORIES, WordCategory, Word } from './db/words.config';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col items-center justify-between h-dvh bg-sky-100 p-4 sm:p-8 font-sans text-sky-900 border-8 border-sky-300 rounded-3xl shadow-inner box-border relative overflow-hidden">
      
      <!-- Header Options -->
      <div class="absolute top-4 right-4 flex gap-3 z-10">
        @if (isMultiplayerMode()) {
          <button (click)="returnToSinglePlayer()" title="Giocatore Singolo"
            class="w-12 h-12 bg-white rounded-full shadow-md border-2 border-sky-200 flex items-center justify-center text-sky-600 active:scale-95 transition-transform">
            <span class="material-icons">person</span>
          </button>
        } @else {
          <button (click)="startMultiplayerSetup()" title="2 Giocatori"
            class="w-12 h-12 bg-white rounded-full shadow-md border-2 border-sky-200 flex items-center justify-center text-sky-600 active:scale-95 transition-transform">
            <span class="material-icons">people</span>
          </button>
        }
        <button (click)="isSettingsOpen.set(true)" title="Impostazioni"
          class="w-12 h-12 bg-white rounded-full shadow-md border-2 border-sky-200 flex items-center justify-center text-sky-600 active:scale-95 transition-transform">
          <span class="material-icons">settings</span>
        </button>
      </div>

      <!-- Header -->
      <div class="text-center mt-8 sm:mt-0">
        <h1 class="text-4xl sm:text-5xl font-black text-pink-500 drop-shadow-sm mb-2 uppercase tracking-widest">L'Impiccato</h1>
        <div class="flex items-center justify-center gap-2">
          <div class="bg-white px-4 py-1 rounded-full shadow-md inline-block border-2 border-pink-200">
            <span class="text-lg font-bold text-sky-600">Categoria: {{ currentCategory().name }}</span>
          </div>
          @if (hint()) {
            <button (click)="showHintModal.set(true)" class="bg-yellow-400 text-white w-8 h-8 rounded-full shadow-md flex items-center justify-center active:scale-95 border-2 border-yellow-500">
              <span class="material-icons text-xl">lightbulb</span>
            </button>
          }
        </div>
      </div>

      <!-- Stats -->
      <div class="flex gap-6 mt-2">
        <div class="bg-orange-400 text-white px-4 py-2 rounded-2xl shadow-lg border-b-4 border-orange-600 flex items-center gap-2">
          <span class="material-icons">star</span>
          <span class="text-xl font-black">{{ score() }}</span>
        </div>
        <div class="bg-red-400 text-white px-4 py-2 rounded-2xl shadow-lg border-b-4 border-red-600 flex items-center gap-2">
          <span class="material-icons">favorite</span>
          <span class="text-xl font-black">{{ maxLives() - mistakes() }}</span>
        </div>
      </div>

      <!-- Hangman Drawing -->
      <div class="relative w-40 h-40 sm:w-48 sm:h-48 bg-white/50 rounded-full flex items-center justify-center p-4 shadow-inner border-4 border-white overflow-hidden mt-2">
        <svg viewBox="0 0 100 100" class="w-full h-full stroke-sky-800 stroke-[5] fill-none stroke-round">
          <!-- Base -->
          <path d="M20 90 L80 90" />
          
          <!-- Pole -->
          @if (showPole()) { <path d="M30 90 L30 10" /> }
          @if (showTopBar()) { <path d="M30 10 L70 10 L70 25" /> }
          
          <!-- Rope -->
          @if (showHead()) { <path d="M70 25 L70 30" class="stroke-orange-800 stroke-[3]" /> }
          
          <!-- Head -->
          @if (showHead()) { <circle cx="70" cy="35" r="10" class="stroke-pink-500" /> }
          
          <!-- Body -->
          @if (showBody()) { <path d="M70 45 L70 70" class="stroke-pink-500" /> }
          
          <!-- Arms -->
          @if (showLeftArm()) { <path d="M70 50 L55 60" class="stroke-pink-500" /> }
          @if (showRightArm()) { <path d="M70 50 L85 60" class="stroke-pink-500" /> }
          
          <!-- Legs -->
          @if (showLeftLeg()) { <path d="M70 70 L55 85" class="stroke-pink-500" /> }
          @if (showRightLeg()) { <path d="M70 70 L85 85" class="stroke-pink-500" /> }
        </svg>
        
        @if (isGameOver() && !isGameWon()) {
          <div class="absolute inset-0 flex items-center justify-center bg-red-500/20 rounded-full animate-pulse">
            <span class="text-red-600 text-6xl font-black">X</span>
          </div>
        }
      </div>

      <!-- Word Display -->
      <div class="flex flex-nowrap justify-center w-full px-2 mt-2" [class.gap-1]="word().length > 9" [class.gap-2]="word().length <= 9">
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
      <div class="grid grid-cols-5 sm:grid-cols-7 gap-2 w-full max-w-lg px-2 mb-2">
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
        <div class="fixed inset-0 bg-sky-900/60 backdrop-blur-sm flex items-center justify-center p-6 z-40">
          <div class="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl border-t-8 border-pink-400 relative overflow-hidden animate-in zoom-in duration-300">
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

      <!-- Settings Modal -->
      @if (isSettingsOpen()) {
        <div class="fixed inset-0 bg-sky-900/60 backdrop-blur-sm flex items-center justify-center p-6 z-50">
          <div class="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl border-t-8 border-sky-400 relative overflow-hidden animate-in zoom-in duration-300">
            <h2 class="text-3xl font-black text-sky-800 mb-6">Impostazioni</h2>
            
            <div class="mb-6 text-left">
              <label class="block text-sky-700 font-bold mb-2 text-lg">Numero di Vite:</label>
              <div class="flex gap-2">
                <button (click)="maxLives.set(6)" [class.bg-sky-500]="maxLives() === 6" [class.text-white]="maxLives() === 6" [class.bg-sky-100]="maxLives() !== 6" class="flex-1 py-3 rounded-xl font-bold text-xl transition-colors">6</button>
                <button (click)="maxLives.set(7)" [class.bg-sky-500]="maxLives() === 7" [class.text-white]="maxLives() === 7" [class.bg-sky-100]="maxLives() !== 7" class="flex-1 py-3 rounded-xl font-bold text-xl transition-colors">7</button>
                <button (click)="maxLives.set(8)" [class.bg-sky-500]="maxLives() === 8" [class.text-white]="maxLives() === 8" [class.bg-sky-100]="maxLives() !== 8" class="flex-1 py-3 rounded-xl font-bold text-xl transition-colors">8</button>
              </div>
            </div>

            <div class="mb-8">
              <button (click)="resetScore()" class="w-full bg-red-100 text-red-600 hover:bg-red-200 font-bold py-3 rounded-xl border-2 border-red-200 transition-colors flex items-center justify-center gap-2">
                <span class="material-icons">delete_forever</span>
                Azzera Punteggio
              </button>
            </div>

            <button (click)="closeSettingsAndReset()" class="w-full bg-sky-500 hover:bg-sky-600 text-white text-xl font-black py-4 rounded-2xl shadow-[0_6px_0_rgb(14,165,233)] active:shadow-none active:translate-y-1 transition-all">
              SALVA E CHIUDI
            </button>
          </div>
        </div>
      }

      <!-- Hint Modal -->
      @if (showHintModal()) {
        <div class="fixed inset-0 bg-sky-900/60 backdrop-blur-sm flex items-center justify-center p-6 z-50">
          <div class="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl border-t-8 border-yellow-400 relative animate-in zoom-in duration-300">
            <div class="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center absolute -top-8 left-1/2 -translate-x-1/2 shadow-lg border-4 border-white">
              <span class="material-icons text-white text-4xl">lightbulb</span>
            </div>
            <h2 class="text-2xl font-black text-sky-800 mb-4 mt-6">Un piccolo aiuto!</h2>
            <p class="text-xl text-sky-700 font-medium leading-relaxed mb-6">
              {{ hint() }}
            </p>
            <button (click)="showHintModal.set(false)" class="w-full bg-yellow-400 hover:bg-yellow-500 text-white text-xl font-black py-3 rounded-2xl shadow-[0_4px_0_rgb(234,179,8)] active:shadow-none active:translate-y-1 transition-all">
              HO CAPITO
            </button>
          </div>
        </div>
      }

      <!-- Two Player Setup -->
      @if (isMultiplayerSetup()) {
        <div class="fixed inset-0 bg-sky-900/95 flex flex-col items-center justify-center p-4 z-50 animate-in zoom-in duration-300">
          <h2 class="text-3xl sm:text-4xl text-white font-black mb-6 text-center leading-tight">
            Giocatore 1:<br>
            <span class="text-pink-400">Scrivi la parola segreta</span>
          </h2>
          
          <div class="flex flex-wrap justify-center gap-1 sm:gap-2 mb-8 min-h-[60px] max-w-full px-2">
            @for (char of customWordInput().split(''); track $index) {
              <div class="w-8 h-10 sm:w-10 sm:h-12 border-b-4 border-pink-400 flex items-center justify-center font-black text-white text-2xl sm:text-3xl uppercase">
                {{ char }}
              </div>
            }
            @if (customWordInput().length === 0) {
              <div class="text-sky-400 text-xl font-medium mt-2">Usa la tastiera qui sotto</div>
            }
          </div>

          <div class="grid grid-cols-5 sm:grid-cols-7 gap-2 w-full max-w-lg px-2 mb-8">
            @for (letter of alphabet; track letter) {
              <button (click)="typeCustomLetter(letter)" 
                class="h-10 sm:h-12 bg-white rounded-xl text-lg sm:text-xl font-black text-sky-800 shadow-md active:scale-95 active:bg-sky-100">
                {{ letter }}
              </button>
            }
          </div>

          <div class="flex gap-4 w-full max-w-lg px-2">
            <button (click)="backspaceCustomWord()" class="flex-1 bg-red-400 text-white text-lg font-bold py-3 rounded-xl shadow-md active:scale-95 flex items-center justify-center gap-1">
              <span class="material-icons">backspace</span>
            </button>
            <button (click)="confirmCustomWord()" [disabled]="customWordInput().length === 0" 
              class="flex-[2] bg-green-500 text-white text-xl font-black py-3 rounded-xl shadow-[0_4px_0_rgb(34,197,94)] active:shadow-none active:translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
              CONFERMA
            </button>
          </div>
          
          <button (click)="cancelMultiplayer()" class="mt-8 text-sky-300 hover:text-white underline font-bold transition-colors">
            Torna al Gioco Singolo
          </button>
        </div>
      }

      <!-- Countdown -->
      @if (countdown() > 0) {
        <div class="fixed inset-0 bg-pink-500/95 flex flex-col items-center justify-center z-[60]">
          <h2 class="text-3xl sm:text-4xl text-white font-black mb-8 text-center px-4">
            Passa il dispositivo al<br>Giocatore 2!
          </h2>
          <div class="text-[10rem] text-white font-black animate-ping">{{ countdown() }}</div>
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

  // Persisted state
  score = signal<number>(0);
  maxLives = signal<number>(8);

  // Game state
  currentCategory = signal<WordCategory>(this.categories[0]);
  currentWordObj = signal<Word | null>(null);

  word = computed(() => this.currentWordObj()?.word || '');
  hint = computed(() => this.currentWordObj()?.hint || '');

  guessedLetters = signal<Set<string>>(new Set());
  mistakes = signal<number>(0);

  // UI modes
  isSettingsOpen = signal<boolean>(false);
  showHintModal = signal<boolean>(false);

  // Two Player Mode
  isMultiplayerMode = signal<boolean>(false);
  isMultiplayerSetup = signal<boolean>(false);
  customWordInput = signal<string>('');
  countdown = signal<number>(0);

  displayWord = computed(() => {
    return this.word().split('').map(char =>
      this.guessedLetters().has(char) ? char : ''
    );
  });

  isGameWon = computed(() => {
    const w = this.word();
    return w.length > 0 && w.split('').every(char => this.guessedLetters().has(char));
  });

  isGameOver = computed(() => {
    return this.mistakes() >= this.maxLives() || this.isGameWon();
  });

  wordSizeClasses = computed(() => {
    const len = this.word().length;
    if (len <= 8) return 'w-8 sm:w-10 h-12 sm:h-14 text-2xl sm:text-3xl';
    if (len <= 11) return 'w-6 sm:w-8 h-10 sm:h-12 text-xl sm:text-2xl';
    return 'w-5 sm:w-6 h-8 sm:h-10 text-lg sm:text-xl';
  });

  // Hangman Draw Logic
  showPole = computed(() => this.mistakes() >= 1);
  showTopBar = computed(() => this.mistakes() >= 2);
  showHead = computed(() => this.mistakes() >= 3);
  showBody = computed(() => this.mistakes() >= 4);

  showLeftArm = computed(() => this.mistakes() >= 5);
  showRightArm = computed(() => {
    if (this.maxLives() === 6) return this.mistakes() >= 5;
    return this.mistakes() >= 6;
  });

  showLeftLeg = computed(() => {
    if (this.maxLives() === 6) return this.mistakes() >= 6;
    if (this.maxLives() === 7) return this.mistakes() >= 7;
    return this.mistakes() >= 7;
  });

  showRightLeg = computed(() => {
    if (this.maxLives() === 6) return this.mistakes() >= 6;
    if (this.maxLives() === 7) return this.mistakes() >= 7;
    return this.mistakes() >= 8;
  });

  constructor() {
    effect(() => {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('impiccato_score', this.score().toString());
      }
    });
    effect(() => {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('impiccato_lives', this.maxLives().toString());
      }
    });
  }

  ngOnInit() {
    if (typeof localStorage !== 'undefined') {
      const savedScore = localStorage.getItem('impiccato_score');
      if (savedScore) this.score.set(parseInt(savedScore, 10) || 0);

      const savedLives = localStorage.getItem('impiccato_lives');
      if (savedLives) this.maxLives.set(parseInt(savedLives, 10) || 6);
    }

    this.resetGame();
  }

  resetGame() {
    if (this.isMultiplayerMode()) {
      this.startMultiplayerSetup();
      return;
    }

    const category = this.categories[Math.floor(Math.random() * this.categories.length)];
    this.currentCategory.set(category);

    let newWordObj;
    do {
      newWordObj = category.words[Math.floor(Math.random() * category.words.length)];
    } while (newWordObj.word === this.word() && category.words.length > 1);

    this.currentWordObj.set(newWordObj);
    this.guessedLetters.set(new Set());
    this.mistakes.set(0);
  }

  makeGuess(letter: string) {
    if (this.isGameOver() || this.guessedLetters().has(letter)) return;

    this.guessedLetters.update(set => {
      const next = new Set(set);
      next.add(letter);
      return next;
    });

    if (!this.word().includes(letter)) {
      this.mistakes.update(m => m + 1);
    } else {
      setTimeout(() => {
        if (this.isGameWon()) {
          this.score.update(s => s + 10);
        }
      }, 0);
    }
  }

  // --- Settings Methods ---
  resetScore() {
    if (typeof window !== 'undefined' && window.confirm('Sei sicuro di voler azzerare il punteggio?')) {
      this.score.set(0);
    }
  }

  closeSettingsAndReset() {
    this.isSettingsOpen.set(false);
    this.resetGame();
  }

  // --- Two Player Methods ---
  returnToSinglePlayer() {
    this.isMultiplayerMode.set(false);
    this.isMultiplayerSetup.set(false);
    this.countdown.set(0);
    this.resetGame();
  }

  startMultiplayerSetup() {
    this.isMultiplayerMode.set(true);
    this.customWordInput.set('');
    this.isMultiplayerSetup.set(true);
    this.mistakes.set(0);
    this.guessedLetters.set(new Set());
    this.currentWordObj.set({ word: '', hint: '' });
  }

  typeCustomLetter(letter: string) {
    if (this.customWordInput().length < 14) {
      this.customWordInput.update(w => w + letter);
    }
  }

  backspaceCustomWord() {
    this.customWordInput.update(w => w.slice(0, -1));
  }

  cancelMultiplayer() {
    this.returnToSinglePlayer();
  }

  confirmCustomWord() {
    const word = this.customWordInput();
    if (word.length === 0) return;

    this.isMultiplayerSetup.set(false);
    this.countdown.set(3);

    const interval = setInterval(() => {
      this.countdown.update(c => c - 1);
      if (this.countdown() === 0) {
        clearInterval(interval);
        this.startCustomGame(word);
      }
    }, 1000);
  }

  startCustomGame(word: string) {
    this.currentCategory.set({
      name: 'Parola Segreta 🤫',
      words: []
    });
    this.currentWordObj.set({
      word: word,
      hint: 'È un segreto! Nessun indizio per te! 😉'
    });
    this.guessedLetters.set(new Set());
    this.mistakes.set(0);
  }
}
