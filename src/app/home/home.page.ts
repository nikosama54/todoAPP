import { Component, computed, signal } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { menu, ellipsisVerticalOutline, add, trash } from 'ionicons/icons';
import { TaskCardComponent } from '../task-card/task-card.component';
import { addIcons } from 'ionicons';
import { ModalController } from '@ionic/angular';
import { AddTaskModalComponent } from '../add-task-modal/add-task-modal.component';
import { TasksService } from '../services/tasks.service';
import { Task } from '../models/task.model';
import { CategoriService } from '../services/categori.service';
import { CategoryManagerModalComponent } from '../category-manager-modal/category-manager-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonicModule, TaskCardComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePage {

  selectedCategoryId = signal<number | null>(null);

  // ← ahora categories es un SIGNAL real
  categories;

  constructor(
    private modalCtrl: ModalController,
    private taskService: TasksService,
    categoriService: CategoriService
  ) {
    addIcons({ menu, ellipsisVerticalOutline, add, trash });

    // Guardamos el signal, NO su valor
    this.categories = categoriService.categories;
  }

  /* ======================
      FILTROS DE TAREAS
  ====================== */

  filteredTasks = computed(() => {
    const id = this.selectedCategoryId();
    if (id === null) return this.taskService.tasks();
    return this.taskService.tasks().filter(t => t.categoryId === id);
  });

  pendingTasks = computed(() =>
    this.filteredTasks().filter(t => !t.completed)
  );

  completedTasks = computed(() =>
    this.filteredTasks().filter(t => t.completed)
  );

  /* ======================
      CRUD TAREAS
  ====================== */

  updateTask(updated: Task) {
    this.taskService.update(updated);
  }

  async openAddTaskModal() {
    const modal = await this.modalCtrl.create({
      component: AddTaskModalComponent,
    });

    modal.onDidDismiss().then(res => {
      if (res.data) this.taskService.addTask(res.data);
    });

    await modal.present();
  }

  async editTask(task: Task) {
    const modal = await this.modalCtrl.create({
      component: AddTaskModalComponent,
      componentProps: { task, categories: this.categories() }
    });

    modal.onDidDismiss().then(res => {
      if (res.data) this.taskService.update(res.data);
    });

    await modal.present();
  }

  clearCompleted() {
    this.taskService.clearCompleted();
  }

  /* ======================
      CATEGORÍAS
  ====================== */

  selectCategory(category: { id: number } | null) {
    this.selectedCategoryId.set(category ? category.id : null);
  }
  async openCategoryManager() {
    const modal = await this.modalCtrl.create({
      component: CategoryManagerModalComponent,
    });
    

    await modal.present();
  }
}
