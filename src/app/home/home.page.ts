import { Component, computed } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { menu, ellipsisVerticalOutline, add,trash } from 'ionicons/icons';
import { TaskCardComponent } from '../task-card/task-card.component';
import { signal } from '@angular/core';
import { addIcons } from 'ionicons';
import { ModalController } from '@ionic/angular';
import { AddTaskModalComponent } from '../add-task-modal/add-task-modal.component';

export interface Task {
  id: number;
  name: string;
  description: string;
  categoryId: number;
  completed: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonicModule, TaskCardComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePage {

  tasks = signal<Task[]>([]);
  selectedTask = signal<Task | null>(null);

  constructor(private modalCtrl: ModalController) {
    /* iconos*/
    addIcons({ menu, ellipsisVerticalOutline, add, trash });
  }

  /*  TAREAS PENDIENTES */
  pendingTasks = computed(() =>
    this.tasks().filter(t => !t.completed)
  );

  /*  TAREAS COMPLETADAS */
  completedTasks = computed(() =>
    this.tasks().filter(t => t.completed)
  );

  addTask(task: Task) {
    this.tasks.update(list => [...list, task]);
  }

  updateTask(updated: Task) {
    this.tasks.update(list =>
      list.map(t => t.id === updated.id ? updated : t)
    );
  }

  async openNewTaskModal() {
    const modal = await this.modalCtrl.create({
      component: AddTaskModalComponent,
      componentProps: {
        task: null
      }
    });

    modal.onDidDismiss().then(res => {
      if (res.data) this.addTask(res.data);
    });

    await modal.present();
  }

  openEditModal(task: Task) {
    this.editTask(task);
  }

  async editTask(task: Task) {
    const modal = await this.modalCtrl.create({
      component: AddTaskModalComponent,
      componentProps: { task }
    });

    modal.onDidDismiss().then(res => {
      if (res.data) this.updateTask(res.data);
    });

    await modal.present();
  }

  categorys: any = [
    { name: 'Todas', id: 1 },
    { name: 'Personal', id: 2 },
    { name: 'Medicina', id: 3 },
    { name: 'Trabajo', id: 4 },
  ];

  selectedCategoryId = 1;

  selectCategory(category: any) {
    this.selectedCategoryId = category.id;
  }
  clearCompleted() {
    this.tasks.update(list => list.filter(t => !t.completed));
  }
}
