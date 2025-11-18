import { signal } from '@angular/core';

export class ThemeService {
  currentTheme = signal<'spring' | 'summer' | 'autumn' | 'winter'>('spring');

  setTheme(theme: 'spring' | 'summer' | 'autumn' | 'winter') {
    this.currentTheme.set(theme);
    document.body.setAttribute('data-theme', theme); // permite CSS dinámico
  }
}
