import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { register } from 'swiper/element/bundle';
import { menu,ellipsisVerticalOutline,library,search } from 'ionicons/icons';
register();

document.body.classList.remove('dark');
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [IonicModule], 
})
export class AppComponent {

  constructor() {
    addIcons({ menu,ellipsisVerticalOutline,library,search });    
  } 

  
}
