import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { GameStateService } from '../../services/game-state.service';

@Component({
  selector: 'app-settings-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="modal-backdrop" role="dialog" aria-modal="true" aria-label="Impostazioni">
      <div class="modal-card modal-card--settings">
        <h2 class="settings-title">Impostazioni</h2>

        <div class="settings-section">
          <label class="settings-label" id="lives-label">Numero di Vite:</label>
          <div class="lives-picker" role="group" aria-labelledby="lives-label">
            @for (opt of livesOptions; track opt) {
              <button
                type="button"
                (click)="game.maxLives.set(opt)"
                class="lives-btn"
                [class.lives-btn--active]="game.maxLives() === opt"
                [attr.aria-pressed]="game.maxLives() === opt"
              >
                {{ opt }}
              </button>
            }
          </div>
        </div>

        <div class="settings-section">
          <button type="button" (click)="onResetScore()" class="btn btn--danger btn--full">
            <span class="material-icons">delete_forever</span>
            Azzera Punteggio
          </button>
        </div>

        <button type="button" (click)="close.emit()" class="btn btn--sky btn--full">
          SALVA E CHIUDI
        </button>
      </div>
    </div>
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
      z-index: 50;
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

    .modal-card--settings { border-top: 8px solid #38bdf8; }

    .settings-title {
      font-size: 1.875rem;
      font-weight: 900;
      color: #0c4a6e;
      margin-bottom: 1.5rem;
    }

    .settings-section {
      margin-bottom: 1.5rem;
      text-align: left;
    }

    .settings-label {
      display: block;
      font-weight: 700;
      color: #0369a1;
      font-size: 1.125rem;
      margin-bottom: 0.5rem;
    }

    .lives-picker {
      display: flex;
      gap: 0.5rem;
    }

    .lives-btn {
      flex: 1;
      padding: 0.75rem;
      border-radius: 0.75rem;
      font-weight: 700;
      font-size: 1.25rem;
      border: 2px solid #e0f2fe;
      background: #e0f2fe;
      color: #0369a1;
      cursor: pointer;
      transition: background 0.15s, color 0.15s;
    }

    .lives-btn--active {
      background: #0ea5e9;
      color: white;
      border-color: #0ea5e9;
    }

    @keyframes zoom-in {
      from { opacity: 0; transform: scale(0.95); }
      to   { opacity: 1; transform: scale(1); }
    }
  `]
})
export class SettingsModalComponent {
  protected readonly game = inject(GameStateService);
  readonly close = output<void>();
  protected readonly livesOptions = [6, 7, 8] as const;

  onResetScore(): void {
    if (typeof window !== 'undefined' && window.confirm('Sei sicuro di voler azzerare il punteggio?')) {
      this.game.resetScore();
    }
  }
}
