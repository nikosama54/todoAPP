import { Component, Input, OnInit } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonButton, IonContent,
  ToastController, IonIcon,
  IonItem, IonLabel, IonInput, IonTextarea,
  IonList, IonSelect, IonSelectOption, IonButtons
} from '@ionic/angular/standalone';
import { ModalController } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { closeOutline,sendOutline,saveOutline } from 'ionicons/icons';

export interface Task {
  id: number;
  name: string;
  description: string;
  categoryId: number;
  completed: boolean;
}
@Component({
  selector: 'app-add-task-modal',
  templateUrl: './add-task-modal.component.html',
  styleUrls: ['./add-task-modal.component.scss'],
  imports: [IonHeader, IonToolbar,
    IonTitle, IonButton, IonContent,
    FormsModule, CommonModule, IonIcon,
    IonInput, IonTextarea,
    IonSelect, IonSelectOption]
})
export class AddTaskModalComponent implements OnInit {
  @Input() task: Task | null = null;
  activeAlert: boolean = false;
  name = '';
  description = '';
  categoryId: number | null = null;

  categories = [
    { id: 1, name: 'Todas' },
    { id: 2, name: 'Personal' },
    { id: 3, name: 'Medicina' },
    { id: 4, name: 'Trabajo' }
  ];
  constructor(private modalCtrl: ModalController, private toastController: ToastController) {
    addIcons({ closeOutline,sendOutline,saveOutline });
  }
  ngOnInit() {
    if (this.task) {
      this.name = this.task.name;
      this.description = this.task.description;
      this.categoryId = this.task.categoryId;
    }
  }

  async saveTask() {
    if (!this.name.trim()) {
      const toast = await this.toastController.create({
        message: 'Porfavor ingrese un nombre para la tarea',
        duration: 2000,
        position: 'middle',
      });

      await toast.present();
      console.log('ingrese nombre porfavor')
      return
    };
    const payload = {
      name: this.name,
      description: this.description,
      categoryId: this.categoryId ?? "Sin Categoria",
      id: this.task?.id ?? Date.now()
    };

    this.modalCtrl.dismiss(payload);
  }

  close() {
    this.modalCtrl.dismiss(null);
  }

}
