import { Injectable, Injector, runInInjectionContext, signal, effect } from '@angular/core';
import { RemoteConfig, fetchAndActivate, getValue } from '@angular/fire/remote-config';

@Injectable({
  providedIn: 'root',
})
export class FirebaseConfigService {

  nombreApp = signal<string>('Cargando...');
  showBottomMenu = signal<boolean>(false);

  // Tema recibido desde Firebase
  seasonTheme = signal<'spring' | 'summer' | 'autumn' | 'winter'>('spring');

  // Usuario decide si usar tema de temporada
  useSeasonTheme = signal<boolean>(false);

  // Tema local por defecto
  localTheme = signal<'default'>('default');

  constructor(
    private remoteConfig: RemoteConfig,
    private injector: Injector
  ) {
    
    const saved = localStorage.getItem('useSeasonTheme');
    
    if (saved !== null) {
      this.useSeasonTheme.set(saved === 'true');
    }

    // Efecto que aplica el tema cuando cambian signals
    effect(() => {
      const useSeason = this.useSeasonTheme();
      const season = this.seasonTheme();
      const local = this.localTheme();

      const applied = useSeason ? season : local;
      this.applyTheme(applied);
    });

    // Carga inicial de remote config
    this.loadRemoteConfig();
  }

  private async runAsyncInInjectionContext<T>(fn: () => Promise<T>): Promise<T> {
    return await runInInjectionContext(this.injector, () => {
      return new Promise((resolve, reject) => {
        fn().then(resolve).catch(reject);
      });
    });
  }

  private async loadRemoteConfig() {
    try {
      await this.runAsyncInInjectionContext(async () => {
        await fetchAndActivate(this.remoteConfig);

        const nombre = getValue(this.remoteConfig, 'nombreApp').asString();
        const mostrarFooter = getValue(this.remoteConfig, 'showBottomMenu').asBoolean();
        const themeValue = getValue(this.remoteConfig, 'theme').asString();

        this.nombreApp.set(nombre || 'No definido');
        this.showBottomMenu.set(mostrarFooter);

        if (themeValue) {
          // validar valor
          const val = (['spring','summer','autumn','winter'] as const).includes(themeValue as any)
            ? (themeValue as 'spring'|'summer'|'autumn'|'winter')
            : 'spring';
          this.seasonTheme.set(val);
        }

      });
    } catch (error) {
      console.error('Error cargando Remote Config:', error);
      this.nombreApp.set('Error');
      this.showBottomMenu.set(false);
    }
  }

  // Aplica el tema (se asegura de poner un string válido en data-theme)
  private applyTheme(theme: string) {
    if (!theme) return;
    try {
      document.body.setAttribute('data-theme', theme);
    } catch (e) {
      console.error('applyTheme error', e);
    }
  }

  // Para guardar preferencia del usuario al cambiar el toggle
  setUseSeasonTheme(value: boolean) {
    this.useSeasonTheme.set(value);
    localStorage.setItem('useSeasonTheme', value ? 'true' : 'false');
  }
}
