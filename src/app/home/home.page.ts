import { Component, computed, signal } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { menu, ellipsisVerticalOutline, add, trash } from 'ionicons/icons';
import { TaskCardComponent } from '../task-card/task-card.component';
import { addIcons } from 'ionicons';
import { ModalController } from '@ionic/angular/standalone';
import { AddTaskModalComponent } from '../add-task-modal/add-task-modal.component';
import { TasksService } from '../services/tasks.service';
import { Task } from '../models/task.model';
import { CategoriService } from '../services/categori.service';
import { CategoryManagerModalComponent } from '../category-manager-modal/category-manager-modal.component';
import { IonButton, IonContent, IonPopover,IonList,IonItem,IonFab,IonIcon,IonAccordionGroup,IonAccordion,
  IonLabel,IonFabButton, IonSearchbar} from '@ionic/angular/standalone';
import { FirebaseConfigService } from '../services/remote-config.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [TaskCardComponent,IonButton, 
    IonContent,IonPopover,IonList,IonItem,IonFab,
    IonIcon,IonAccordionGroup,IonAccordion,IonLabel,
    IonFabButton,IonSearchbar],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePage {
  searchText = signal('');
  selectedCategoryId = signal<number | null>(null);  
  filterMode = signal<'category' | 'search'>('category');
  categories;
  ActiveSearch:boolean=false

  constructor(
    private modalCtrl: ModalController,
    private taskService: TasksService,
    categoriService: CategoriService,
    public configService: FirebaseConfigService
  ) {
    addIcons({ menu, ellipsisVerticalOutline, add, trash });   
    this.categories = categoriService.categories;
  }
  /* ======================
      FILTROS DE TAREAS
  ====================== */

 filteredTasks = computed(() => {
  const mode = this.filterMode();
  const id = this.selectedCategoryId();
  const search = this.searchText().toLowerCase();

  let tasks = this.taskService.tasks();

  if (mode === 'category') {
    if (id !== null) {
      tasks = tasks.filter(t => t.categoryId === id);
    }
  } else if (mode === 'search') {
    if (search) {
      tasks = tasks.filter(t => 
      t.name.toLowerCase().includes(search) ||
      t.description.toLowerCase().includes(search)
    );
    }
  }

  return tasks;
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
      console.log(res.data, "hooooooooola")
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
