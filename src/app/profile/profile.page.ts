import { Component, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { menu, ellipsisVerticalOutline, library, search } from 'ionicons/icons';
import {
  IonContent, IonHeader, IonTitle,
  IonToolbar, IonButton, IonAvatar, IonGrid, IonRow, IonCol, IonCardHeader,
  IonCardTitle, IonCardContent, IonCard
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule,
    FormsModule, IonButton, IonAvatar, IonGrid, IonRow,
    IonCol, IonCardHeader, IonCardTitle, IonCardContent, IonCard

  ]
})
export class ProfilePage implements OnInit {

  constructor(private taskService:TasksService) {
    addIcons({ menu, ellipsisVerticalOutline, library, search });
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
