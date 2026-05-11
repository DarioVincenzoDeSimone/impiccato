import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GameStateService } from '../../services/game-state.service';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').sort();

@Component({
  selector: 'app-multiplayer-setup',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="setup-backdrop" role="dialog" aria-modal="true" aria-label="Inserisci parola segreta">
      <h2 class="setup-title">
        Giocatore 1:<br>
        <span class="setup-title__sub">Scrivi la parola segreta</span>
      </h2>

      <!-- Word preview -->
      <div class="word-preview" aria-live="polite" aria-label="Parola inserita">
        @for (char of game.customWordInput().split(''); track $index) {
          <div class="word-preview__tile">{{ char }}</div>
        }
        @if (game.customWordInput().length === 0) {
          <div class="word-preview__placeholder">Usa la tastiera qui sotto</div>
        }
      </div>

      <!-- Virtual keyboard for word input -->
      <div class="setup-keyboard" role="group" aria-label="Tastiera per inserire la parola">
        @for (letter of alphabet; track letter) {
          <button
            type="button"
            (click)="game.typeCustomLetter(letter)"
            class="setup-key"
            [attr.aria-label]="'Aggiungi lettera ' + letter"
          >
            {{ letter }}
          </button>
        }
      </div>

      <!-- Actions -->
      <div class="setup-actions">
        <button type="button" (click)="game.backspaceCustomWord()" class="btn btn--danger" aria-label="Cancella ultima lettera">
          <span class="material-icons">backspace</span>
        </button>
        <button
          type="button"
          (click)="game.confirmCustomWord()"
          [disabled]="game.customWordInput().length === 0"
          class="btn btn--green btn--grow"
        >
          CONFERMA
        </button>
      </div>

      <button type="button" (click)="game.returnToSinglePlayer()" class="setup-cancel">
        Torna al Gioco Singolo
      </button>
    </div>
  `,
  styles: [`
    .setup-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(12,74,110,0.95);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      z-index: 50;
      animation: zoom-in 0.3s ease-out forwards;
    }

    .setup-title {
      font-size: 1.875rem;
      font-weight: 900;
      color: white;
      margin-bottom: 1.5rem;
      text-align: center;
      line-height: 1.3;
    }

    @media (min-width: 640px) { .setup-title { font-size: 2.25rem; } }

    .setup-title__sub { color: #f472b6; }

    .word-preview {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 0.25rem;
      min-height: 3.75rem;
      max-width: 100%;
      padding: 0 0.5rem;
      margin-bottom: 2rem;
    }

    @media (min-width: 640px) { .word-preview { gap: 0.5rem; } }

    .word-preview__tile {
      width: 2rem;
      height: 2.5rem;
      border-bottom: 4px solid #f472b6;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 900;
      color: white;
      font-size: 1.5rem;
      text-transform: uppercase;
    }

    @media (min-width: 640px) {
      .word-preview__tile { width: 2.5rem; height: 3rem; font-size: 1.875rem; }
    }

    .word-preview__placeholder {
      color: #7dd3fc;
      font-size: 1.125rem;
      font-weight: 500;
      margin-top: 0.5rem;
    }

    .setup-keyboard {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 0.5rem;
      width: 100%;
      max-width: 32rem;
      padding: 0 0.5rem;
      margin-bottom: 2rem;
    }

    @media (min-width: 640px) {
      .setup-keyboard { grid-template-columns: repeat(7, 1fr); }
    }

    .setup-key {
      height: 2.5rem;
      background: white;
      border: none;
      border-radius: 0.75rem;
      font-size: 1.125rem;
      font-weight: 900;
      color: #0c4a6e;
      box-shadow: 0 2px 6px rgba(0,0,0,0.2);
      cursor: pointer;
      transition: transform 0.1s, background 0.1s;
    }

    @media (min-width: 640px) { .setup-key { height: 3rem; font-size: 1.25rem; } }

    .setup-key:active { transform: scale(0.95); background: #e0f2fe; }

    .setup-actions {
      display: flex;
      gap: 1rem;
      width: 100%;
      max-width: 32rem;
      padding: 0 0.5rem;
    }

    .setup-cancel {
      margin-top: 2rem;
      color: #7dd3fc;
      background: none;
      border: none;
      font-weight: 700;
      text-decoration: underline;
      cursor: pointer;
      transition: color 0.15s;
    }

    .setup-cancel:hover { color: white; }

    @keyframes zoom-in {
      from { opacity: 0; transform: scale(0.98); }
      to   { opacity: 1; transform: scale(1); }
    }
  `]
})
export class MultiplayerSetupComponent {
  protected readonly game = inject(GameStateService);
  protected readonly alphabet = ALPHABET;
}
