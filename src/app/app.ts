import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { GameStateService } from './services/game-state.service';
import { HangmanDrawingComponent } from './components/hangman-drawing/hangman-drawing.component';
import { AlphabetGridComponent } from './components/alphabet-grid/alphabet-grid.component';
import { GameOverModalComponent } from './components/game-over-modal/game-over-modal.component';
import { HintModalComponent } from './components/hint-modal/hint-modal.component';
import { SettingsModalComponent } from './components/settings-modal/settings-modal.component';
import { MultiplayerSetupComponent } from './components/multiplayer-setup/multiplayer-setup.component';
import { CountdownOverlayComponent } from './components/countdown-overlay/countdown-overlay.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  imports: [
    HangmanDrawingComponent,
    AlphabetGridComponent,
    GameOverModalComponent,
    HintModalComponent,
    SettingsModalComponent,
    MultiplayerSetupComponent,
    CountdownOverlayComponent,
  ],
  template: `
    <div class="game-shell">

      <!-- ── Header Actions ──────────────────────────────── -->
      <div class="header-actions">
        @if (game.isMultiplayerMode()) {
          <button type="button" (click)="game.returnToSinglePlayer()" class="icon-btn" title="Torna al gioco singolo" aria-label="Torna al gioco singolo">
            <span class="material-icons">person</span>
          </button>
        } @else {
          <button type="button" (click)="game.beginMultiplayerSetup()" class="icon-btn" title="2 Giocatori" aria-label="Modalità 2 giocatori">
            <span class="material-icons">people</span>
          </button>
        }
        <button type="button" (click)="isSettingsOpen.set(true)" class="icon-btn" title="Impostazioni" aria-label="Apri impostazioni">
          <span class="material-icons">settings</span>
        </button>
      </div>

      <!-- ── Header ─────────────────────────────────────── -->
      <header class="game-header">
        <h1 class="game-title">L'Impiccato</h1>
        <div class="category-bar">
          <div class="category-pill">
            <span>Categoria: {{ game.currentCategory().name }}</span>
          </div>
          @if (game.hint()) {
            <button type="button" (click)="isHintOpen.set(true)" class="hint-btn" aria-label="Mostra suggerimento">
              <span class="material-icons">lightbulb</span>
            </button>
          }
        </div>
      </header>

      <!-- ── Stats ──────────────────────────────────────── -->
      <div class="stats-bar" aria-label="Statistiche">
        <div class="stat-chip stat-chip--score" aria-label="Punteggio">
          <span class="material-icons" aria-hidden="true">star</span>
          <span class="stat-chip__value">{{ game.score() }}</span>
        </div>
        <div class="stat-chip stat-chip--lives" aria-label="Vite rimanenti">
          <span class="material-icons" aria-hidden="true">favorite</span>
          <span class="stat-chip__value">{{ game.livesLeft() }}</span>
        </div>
      </div>

      <!-- ── Hangman SVG ─────────────────────────────────── -->
      <app-hangman-drawing />

      <!-- ── Word Display ───────────────────────────────── -->
      <div class="word-display"
           [class.word-display--tight]="game.word().length > 9"
           role="status"
           aria-label="Parola da indovinare">
        @for (char of game.displayWord(); track $index) {
          @let sizeClass = game.wordSizeClasses();
          <div class="word-tile border-b-4 border-sky-400 flex items-center justify-center font-black text-sky-800 uppercase transition-all duration-300"
               [class]="sizeClass"
               [class.text-pink-500]="char !== ''"
               [class.animate-bounce]="char !== '' && game.isGameWon()">
            {{ char }}
          </div>
        }
      </div>

      <!-- ── Alphabet Grid ──────────────────────────────── -->
      <app-alphabet-grid />

      <!-- ── Modals & Overlays ───────────────────────────── -->
      <app-game-over-modal />

      @if (isSettingsOpen()) {
        <app-settings-modal (close)="isSettingsOpen.set(false)" />
      }

      @if (isHintOpen()) {
        <app-hint-modal [open]="isHintOpen()" (close)="isHintOpen.set(false)" />
      }

      @if (game.isMultiplayerMode() && game.word().length === 0 && game.countdown() === 0) {
        <app-multiplayer-setup />
      }

      <app-countdown-overlay />
    </div>
  `,
  styles: [`
    :host { display: block; height: 100dvh; }

    .game-shell {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      height: 100%;
      background: #e0f2fe;
      padding: 1rem;
      font-family: sans-serif;
      color: #0c4a6e;
      border: 8px solid #bae6fd;
      border-radius: 1.5rem;
      box-shadow: inset 0 2px 16px rgba(0,0,0,0.08);
      box-sizing: border-box;
      position: relative;
      overflow: hidden;
    }

    @media (min-width: 640px) { .game-shell { padding: 2rem; } }

    /* Header actions */
    .header-actions {
      position: absolute;
      top: 1rem;
      right: 1rem;
      display: flex;
      gap: 0.75rem;
      z-index: 10;
    }

    .icon-btn {
      width: 3rem;
      height: 3rem;
      background: white;
      border: 2px solid #bae6fd;
      border-radius: 9999px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #0284c7;
      cursor: pointer;
      box-shadow: 0 2px 6px rgba(0,0,0,0.1);
      transition: transform 0.1s;
    }
    .icon-btn:active { transform: scale(0.95); }

    /* Header */
    .game-header {
      text-align: center;
      margin-top: 3rem;
    }

    @media (min-width: 640px) { .game-header { margin-top: 0; } }

    .game-title {
      font-size: 2.5rem;
      font-weight: 900;
      color: #ec4899;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 0.5rem;
      filter: drop-shadow(0 1px 2px rgba(0,0,0,0.1));
    }

    @media (min-width: 640px) { .game-title { font-size: 3rem; } }

    .category-bar {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }

    .category-pill {
      background: white;
      padding: 0.25rem 1rem;
      border-radius: 9999px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.1);
      border: 2px solid #fbcfe8;
      font-weight: 700;
      font-size: 1.125rem;
      color: #0284c7;
    }

    .hint-btn {
      width: 2rem;
      height: 2rem;
      background: #facc15;
      border: 2px solid #eab308;
      border-radius: 9999px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      cursor: pointer;
      box-shadow: 0 2px 6px rgba(0,0,0,0.1);
      transition: transform 0.1s;
    }
    .hint-btn:active { transform: scale(0.95); }
    .hint-btn .material-icons { font-size: 1.25rem; }

    /* Stats */
    .stats-bar {
      display: flex;
      gap: 1.5rem;
    }

    .stat-chip {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 1rem;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }

    .stat-chip--score { background: #fb923c; border-bottom: 4px solid #ea8c00; }
    .stat-chip--lives { background: #f87171; border-bottom: 4px solid #dc2626; }
    .stat-chip__value { font-size: 1.25rem; font-weight: 900; }

    /* Word display */
    .word-display {
      display: flex;
      flex-wrap: nowrap;
      justify-content: center;
      width: 100%;
      padding: 0 0.5rem;
      gap: 0.5rem;
    }
    .word-display--tight { gap: 0.25rem; }

    /* Word tile bounce animation */
    @keyframes bounce {
      from { transform: translateY(0); }
      to   { transform: translateY(-10px); }
    }
    .animate-bounce { animation: bounce 0.5s infinite alternate; }
  `]
})
export class App implements OnInit {
  protected readonly game = inject(GameStateService);

  // Local UI state (not part of game logic)
  protected readonly isSettingsOpen = signal(false);
  protected readonly isHintOpen = signal(false);

  ngOnInit(): void {
    this.game.startNewSinglePlayerGame();
  }

}
