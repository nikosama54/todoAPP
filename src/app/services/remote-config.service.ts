import { Injectable, Injector, runInInjectionContext, signal } from '@angular/core';
import { RemoteConfig, fetchAndActivate, getValue } from '@angular/fire/remote-config';


@Injectable({
  providedIn: 'root',
})
export class FirebaseConfigService {
  nombreApp = signal<string>('Cargando...');
  showBottomMenu = signal<boolean>(false);

  constructor(
    private remoteConfig: RemoteConfig,
    private injector: Injector
  ) {
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

        this.nombreApp.set(nombre || 'No definido');
        this.showBottomMenu.set(mostrarFooter);
      });
    } catch (error) {
      console.error('Error cargando Remote Config:', error);
      this.nombreApp.set('Error');
      this.showBottomMenu.set(false);
    }
  }
}
