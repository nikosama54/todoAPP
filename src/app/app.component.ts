import { Component } from '@angular/core';
import { addIcons } from 'ionicons';
import { register } from 'swiper/element/bundle';
import { menu,ellipsisVerticalOutline,library,search } from 'ionicons/icons';
import { FirebaseConfigService } from './services/remote-config.service';
import { IonApp, IonRouterOutlet,IonContent,IonFooter,IonTabBar,IonTabButton,IonIcon } from '@ionic/angular/standalone';
register();

document.body.classList.remove('dark');
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [IonApp,IonRouterOutlet,IonContent,IonFooter,IonTabBar ,IonTabButton,IonIcon], 
})
export class AppComponent {

  constructor(public configServer: FirebaseConfigService) {
    addIcons({ menu,ellipsisVerticalOutline,library,search });    
  } 

  
}
