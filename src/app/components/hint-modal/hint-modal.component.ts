import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { GameStateService } from '../../services/game-state.service';

@Component({
  selector: 'app-hint-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (open()) {
      <div class="modal-backdrop" role="dialog" aria-modal="true" aria-label="Suggerimento">
        <div class="modal-card modal-card--hint">
          <div class="hint-icon-badge" aria-hidden="true">
            <span class="material-icons">lightbulb</span>
          </div>

          <h2 class="hint-title">Un piccolo aiuto!</h2>
          <p class="hint-body">{{ game.hint() }}</p>

          <button type="button" (click)="close.emit()" class="btn btn--yellow btn--full">
            HO CAPITO
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
      overflow: visible;
      animation: zoom-in 0.3s ease-out forwards;
    }

    .modal-card--hint { border-top: 8px solid #facc15; }

    .hint-icon-badge {
      width: 4rem;
      height: 4rem;
      background: #facc15;
      border-radius: 9999px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: -2rem;
      left: 50%;
      transform: translateX(-50%);
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      border: 4px solid white;
    }

    .hint-icon-badge .material-icons { color: white; font-size: 2rem; }

    .hint-title {
      font-size: 1.5rem;
      font-weight: 900;
      color: #0c4a6e;
      margin-top: 1.5rem;
      margin-bottom: 1rem;
    }

    .hint-body {
      font-size: 1.125rem;
      color: #0369a1;
      font-weight: 500;
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }

    @keyframes zoom-in {
      from { opacity: 0; transform: scale(0.95); }
      to   { opacity: 1; transform: scale(1); }
    }
  `]
})
export class HintModalComponent {
  protected readonly game = inject(GameStateService);
  readonly open = input.required<boolean>();
  readonly close = output<void>();
}
