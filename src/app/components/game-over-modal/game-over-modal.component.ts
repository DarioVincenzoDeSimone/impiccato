import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GameStateService } from '../../services/game-state.service';

@Component({
  selector: 'app-game-over-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (game.isGameOver()) {
      <div class="modal-backdrop" role="dialog" aria-modal="true" [attr.aria-label]="game.isGameWon() ? 'Hai vinto!' : 'Hai perso!'">
        <div class="modal-card modal-card--game-over">
          <div class="modal-decor modal-decor--tl"></div>
          <div class="modal-decor modal-decor--br"></div>

          <h2 class="game-over-title" [class.game-over-title--won]="game.isGameWon()" [class.game-over-title--lost]="!game.isGameWon()">
            {{ game.isGameWon() ? 'GRANDE! 🎉' : 'OH NO! 😱' }}
          </h2>

          <p class="game-over-word-label">
            {{ game.isGameWon() ? 'Hai indovinato la parola!' : 'La parola era:' }}
            <br>
            <span class="game-over-word">{{ game.word() }}</span>
          </p>

          <button type="button" (click)="game.onGameOver()" class="btn btn--orange btn--full">
            <span class="material-icons">refresh</span>
            GIOCA ANCORA
          </button>
        </div>
      </div>
    }
  `,
  styles: [`
    .modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(12,74,110,0.6);
      backdrop-filter: blur(4px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
      z-index: 40;
    }

    .modal-card {
      background: white;
      border-radius: 1.5rem;
      padding: 2rem;
      max-width: 24rem;
      width: 100%;
      text-align: center;
      box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
      position: relative;
      overflow: hidden;
      animation: zoom-in 0.3s ease-out forwards;
    }

    .modal-card--game-over { border-top: 8px solid #f472b6; }

    .modal-decor {
      position: absolute;
      width: 8rem;
      height: 8rem;
      border-radius: 9999px;
      z-index: -1;
    }
    .modal-decor--tl { top: -2.5rem; left: -2.5rem; background: #fce7f3; }
    .modal-decor--br { bottom: -2.5rem; right: -2.5rem; background: #e0f2fe; }

    .game-over-title {
      font-size: 2.25rem;
      font-weight: 900;
      margin-bottom: 1rem;
    }
    .game-over-title--won  { color: #22c55e; }
    .game-over-title--lost { color: #ef4444; }

    .game-over-word-label {
      font-size: 1.25rem;
      color: #0369a1;
      font-weight: 500;
      margin-bottom: 1.5rem;
    }

    .game-over-word {
      display: block;
      font-size: 1.875rem;
      font-weight: 900;
      text-transform: uppercase;
      color: #ec4899;
      letter-spacing: 0.1em;
      margin-top: 0.5rem;
    }

    @keyframes zoom-in {
      from { opacity: 0; transform: scale(0.95); }
      to   { opacity: 1; transform: scale(1); }
    }
  `]
})
export class GameOverModalComponent {
  protected readonly game = inject(GameStateService);
}
