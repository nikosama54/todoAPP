import { Component, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { menu, ellipsisVerticalOutline, library, search } from 'ionicons/icons';
import {
  IonContent, IonHeader, IonTitle,
  IonToolbar, IonButton, IonAvatar, IonGrid, IonRow, IonCol, IonCardHeader,
  IonCardTitle, IonCardContent, IonCard, IonItem, IonLabel, IonToggle
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { TasksService } from '../services/tasks.service';
import { FirebaseConfigService } from '../services/remote-config.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule,
    FormsModule, IonAvatar, IonGrid, IonRow,
    IonCol, IonCardHeader, IonCardTitle, IonCardContent, IonCard,
    IonItem, IonLabel, IonToggle

  ]
})
export class ProfilePage implements OnInit {

  constructor(private taskService: TasksService, public firebaseConfig: FirebaseConfigService) {
    addIcons({ menu, ellipsisVerticalOutline, library, search });
  }


  toggleTheme(ev: any) {
    const enabled = ev.detail.checked;

    this.firebaseConfig.useSeasonTheme.set(enabled);
    localStorage.setItem('useSeasonTheme', String(enabled));
  }
  ngOnInit() {
  }
  user = {
    name: 'Nicolás Alarcón',
    email: 'ni-co123@hotmail.com',
    avatar: 'https://i.pravatar.cc/150?img=3',
    taskForgot: 180,
  };

  pendingCount = computed(() =>
    this.taskService.tasks().filter(t => !t.completed).length
  );
  completedCount = this.taskService.completedCounter;



}
