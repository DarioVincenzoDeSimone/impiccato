import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GameStateService } from '../../services/game-state.service';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').sort();

@Component({
  selector: 'app-alphabet-grid',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="alphabet-grid" role="group" aria-label="Tastiera lettere">
      @for (letter of alphabet; track letter) {
        @let guessed = game.guessedLetters().has(letter);
        @let correct = guessed && game.word().includes(letter);
        @let wrong   = guessed && !game.word().includes(letter);

        <button
          type="button"
          (click)="game.makeGuess(letter)"
          [disabled]="game.isGameOver() || guessed"
          [attr.aria-label]="'Lettera ' + letter"
          [attr.aria-pressed]="guessed"
          class="letter-btn"
          [class.letter-btn--idle]="!guessed"
          [class.letter-btn--correct]="correct"
          [class.letter-btn--wrong]="wrong"
        >
          {{ letter }}
          @if (wrong) {
            <span class="letter-btn__x" aria-hidden="true">X</span>
          }
        </button>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      max-width: 32rem;
      padding: 0 0.5rem;
    }

    .alphabet-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 0.5rem;
      width: 100%;
      margin-bottom: 0.5rem;
    }

    @media (min-width: 640px) {
      .alphabet-grid { grid-template-columns: repeat(7, 1fr); }
    }

    .letter-btn {
      height: 2.5rem;
      border-radius: 0.75rem;
      font-size: 1.125rem;
      font-weight: 900;
      box-shadow: 0 2px 6px rgba(0,0,0,0.15);
      transition: transform 0.1s, box-shadow 0.1s;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
      cursor: pointer;
      border: none;
    }

    @media (min-width: 640px) {
      .letter-btn { height: 3rem; font-size: 1.25rem; }
    }

    .letter-btn:active:not(:disabled) { transform: scale(0.95); }
    .letter-btn:disabled { cursor: not-allowed; }

    .letter-btn--idle {
      background: white;
      border: 2px solid #bae6fd;
      color: #0284c7;
    }

    .letter-btn--correct {
      background: #4ade80;
      color: white;
    }

    .letter-btn--wrong {
      background: #f87171;
      color: white;
    }

    .letter-btn__x {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      color: rgba(185,28,28,0.4);
    }
  `]
})
export class AlphabetGridComponent {
  protected readonly game = inject(GameStateService);
  protected readonly alphabet = ALPHABET;
}
