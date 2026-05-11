import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GameStateService } from '../../services/game-state.service';

@Component({
  selector: 'app-countdown-overlay',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (game.countdown() > 0) {
      <div class="countdown-backdrop" aria-live="assertive" aria-label="Conto alla rovescia">
        <h2 class="countdown-message">
          Passa il dispositivo al<br>Giocatore 2!
        </h2>
        <div class="countdown-number" aria-hidden="true">{{ game.countdown() }}</div>
      </div>
    }
  `,
  styles: [`
    .countdown-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(236,72,153,0.95);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 60;
    }

    .countdown-message {
      font-size: 1.875rem;
      font-weight: 900;
      color: white;
      text-align: center;
      margin-bottom: 2rem;
      padding: 0 1rem;
      line-height: 1.3;
    }

    @media (min-width: 640px) { .countdown-message { font-size: 2.25rem; } }

    .countdown-number {
      font-size: 10rem;
      font-weight: 900;
      color: white;
      animation: ping 0.8s cubic-bezier(0, 0, 0.2, 1) infinite;
    }

    @keyframes ping {
      0%   { transform: scale(1);    opacity: 1; }
      70%  { transform: scale(1.1);  opacity: 0.7; }
      100% { transform: scale(1);    opacity: 1; }
    }
  `]
})
export class CountdownOverlayComponent {
  protected readonly game = inject(GameStateService);
}
