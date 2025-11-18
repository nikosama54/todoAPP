import { Component, signal } from '@angular/core';
import { addIcons } from 'ionicons';
import { register } from 'swiper/element/bundle';
import { menu, ellipsisVerticalOutline, library, search, personOutline } from 'ionicons/icons';
import { FirebaseConfigService } from './services/remote-config.service';
import { IonApp, IonRouterOutlet, IonContent, IonFooter, IonTabBar, IonTabButton, IonIcon, } from '@ionic/angular/standalone';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
register();

document.body.classList.remove('dark');
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [IonApp, IonRouterOutlet, IonContent, IonFooter, IonTabBar, IonTabButton, IonIcon,],
})
export class AppComponent {
  currentUrl = signal('');

  constructor(public configServer: FirebaseConfigService, public router: Router) {
    addIcons({ menu, ellipsisVerticalOutline, library, search, personOutline });

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentUrl.set(event.urlAfterRedirects);
      });
  }
  goTo(url: string) {
    this.router.navigateByUrl(url);
  }


}
