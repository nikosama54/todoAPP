import { Component, effect, Input, OnInit } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonButton, IonContent,
  ToastController, IonIcon,
  IonLabel, IonInput, IonTextarea,
  IonSelect, IonSelectOption, IonButtons,
  IonNote,
  IonItem
} from '@ionic/angular/standalone';
import { ModalController } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { closeOutline, sendOutline, saveOutline } from 'ionicons/icons';
import { CategoriService } from '../services/categori.service';
import { CategoryManagerModalComponent } from '../category-manager-modal/category-manager-modal.component';
import { Task } from '../models/task.model';


@Component({
  selector: 'app-add-task-modal',
  templateUrl: './add-task-modal.component.html',
  styleUrls: ['./add-task-modal.component.scss'],
  imports: [IonHeader, IonToolbar,
    IonTitle, IonButton, IonContent,
    FormsModule, CommonModule, IonIcon,
    IonInput, IonTextarea,
    IonLabel, IonItem]
})
export class AddTaskModalComponent implements OnInit {
  @Input() task: Task | null = null;
  activeAlert: boolean = false;
  name = '';
  description = '';
  categoryId: number | null = null;
  categoryName: string = 'Sin categoría'
  selectedCategoryName = '';  
  constructor(private modalCtrl: ModalController,
    private toastController: ToastController,
    private categoryService: CategoriService) {
    addIcons({ closeOutline, sendOutline, saveOutline });

    effect(() => {
      if (!this.task) return;
      const cat = this.categoryService.categories().find(c => c.id === this.task?.categoryId);
      this.categoryName = cat ? cat.name : 'Sin categoría';
    });
  }
  ngOnInit() {
    if (this.task) {
      this.name = this.task.name;
      this.description = this.task.description;
      this.categoryId = this.task.categoryId;
      this.categoryName = this.task.categoryName ?? '';

      const c = this.categoryService.categories()
        .find(x => x.id === this.categoryId);

      this.selectedCategoryName = c?.name || '';
    }
  }

  async openCategoryManager() {
    const modal = await this.modalCtrl.create({
      component: CategoryManagerModalComponent,
    });

    modal.onDidDismiss().then(res => {
      console.log(res.data, "data")
      if (res.data) {
        this.categoryId = res.data.id;
        this.selectedCategoryName = res.data.name;
        this.categoryName = res.data.name
      } else {
        if (this.task) {
          this.selectedCategoryName = this.categoryName ?? '';

        }
      }

    });

    await modal.present();
  }
  async saveTask() {
    console.log(this.name, "nameee")
    if (!this.name.trim()) {
      const toast = await this.toastController.create({
        message: 'Porfavor ingrese un nombre para la tarea',
        duration: 2000,
        position: 'top',
      });

      await toast.present();
      return
    };
    const payload = {
      name: this.name,
      description: this.description,
      categoryId: this.categoryId ?? "Sin Categoria",
      categoryName: this.categoryName,
      id: this.task?.id ?? Date.now()
    };

    this.modalCtrl.dismiss(payload);
  }

  close() {
    this.modalCtrl.dismiss(null);
  }

}
