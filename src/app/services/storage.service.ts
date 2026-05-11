import { Injectable } from '@angular/core';

const KEYS = {
  SCORE: 'impiccato_score',
  LIVES: 'impiccato_lives',
} as const;

@Injectable({ providedIn: 'root' })
export class StorageService {
  private get available(): boolean {
    return typeof localStorage !== 'undefined';
  }

  getScore(): number {
    if (!this.available) return 0;
    return parseInt(localStorage.getItem(KEYS.SCORE) ?? '0', 10) || 0;
  }

  saveScore(score: number): void {
    if (this.available) localStorage.setItem(KEYS.SCORE, score.toString());
  }

  getLives(): number {
    if (!this.available) return 6;
    return parseInt(localStorage.getItem(KEYS.LIVES) ?? '6', 10) || 6;
  }

  saveLives(lives: number): void {
    if (this.available) localStorage.setItem(KEYS.LIVES, lives.toString());
  }

  clearAll(): void {
    if (this.available) {
      localStorage.removeItem(KEYS.SCORE);
      localStorage.removeItem(KEYS.LIVES);
    }
  }
}
