import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
  imports: [IonicModule, FormsModule, CommonModule]
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
  constructor(private modalCtrl: ModalController) { }
  ngOnInit() {
    if (this.task) {
      // Si estamos editando, rellenamos los campos
      this.name = this.task.name;
      this.description = this.task.description;
      this.categoryId = this.task.categoryId;
    }
  }

  saveTask() {
    if (!this.name.trim()) {
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
