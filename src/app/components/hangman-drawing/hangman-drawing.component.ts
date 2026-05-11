import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GameStateService } from '../../services/game-state.service';

@Component({
  selector: 'app-hangman-drawing',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="hangman-container">
      <svg viewBox="0 0 100 100" class="hangman-svg">
        <!-- Base (always visible) -->
        <path d="M20 90 L80 90" />

        @if (game.showPole())   { <path d="M30 90 L30 10" /> }
        @if (game.showTopBar()) { <path d="M30 10 L70 10 L70 25" /> }

        <!-- Rope -->
        @if (game.showHead())   { <path d="M70 25 L70 30" class="rope" /> }

        <!-- Head -->
        @if (game.showHead())   { <circle cx="70" cy="35" r="10" class="body-part" /> }

        <!-- Body -->
        @if (game.showBody())   { <path d="M70 45 L70 70" class="body-part" /> }

        <!-- Arms -->
        @if (game.showLeftArm())  { <path d="M70 50 L55 60" class="body-part" /> }
        @if (game.showRightArm()) { <path d="M70 50 L85 60" class="body-part" /> }

        <!-- Legs -->
        @if (game.showLeftLeg())  { <path d="M70 70 L55 85" class="body-part" /> }
        @if (game.showRightLeg()) { <path d="M70 70 L85 85" class="body-part" /> }
      </svg>

      @if (game.isGameOver() && !game.isGameWon()) {
        <div class="hangman-lost-overlay">
          <span>X</span>
        </div>
      }
    </div>
  `,
  styles: [`
    .hangman-container {
      position: relative;
      width: 10rem;
      height: 10rem;
      background: rgba(255,255,255,0.5);
      border-radius: 9999px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      box-shadow: inset 0 2px 10px rgba(0,0,0,0.1);
      border: 4px solid white;
      overflow: hidden;
    }

    @media (min-width: 640px) {
      .hangman-container { width: 12rem; height: 12rem; }
    }

    .hangman-svg {
      width: 100%;
      height: 100%;
      stroke: #0c4a6e;
      stroke-width: 5;
      fill: none;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    .rope     { stroke: #7c2d12; stroke-width: 3; }
    .body-part { stroke: #ec4899; }

    .hangman-lost-overlay {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(239,68,68,0.2);
      border-radius: 9999px;
      animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }

    .hangman-lost-overlay span {
      font-size: 4rem;
      font-weight: 900;
      color: #dc2626;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: .5; }
    }
  `]
})
export class HangmanDrawingComponent {
  protected readonly game = inject(GameStateService);
}
