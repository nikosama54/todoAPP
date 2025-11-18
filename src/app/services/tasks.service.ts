import { Injectable, signal, computed, WritableSignal } from '@angular/core';
import { Task } from '../models/task.model';
import { list } from 'ionicons/icons';

@Injectable({ providedIn: 'root' })
export class TasksService {
  completedCounter = signal(0);
  completedTaskStates = new Map<number, boolean>();

  _tasks: WritableSignal<Task[]> = signal([
    { id: 1, name: 'Comprar café', description: 'Café molido', completed: false, categoryId: 1, categoryName: "Personal"},
    { id: 2, name: 'Pagar internet', description: 'Claro Hogar', completed: false, categoryId: 2, categoryName: "Medicina"},
    { id: 3, name: 'Terminar ajustes en angular', description: 'modal buscar', completed: false, categoryId: 3, categoryName: "Trabajo" }
  ]);

  // -------------------------------------
  // GETTERS
  // -------------------------------------

  tasks = computed(() => this._tasks());

  pendingTasks = computed(() =>
    this._tasks().filter(t => !t.completed)
  );

  completedTasks = computed(() =>
    this._tasks().filter(t => t.completed)
  );

  // -------------------------------------
  // CRUD
  // -------------------------------------

  addTask(task: Task) {
    this._tasks.update(list => [...list, task]);
  }

  update(task: Task) {
    this._tasks.update(list =>
      list.map(t => (t.id === task.id ? task : t))
    );
    this.toggleComplete(task);
  }

  delete(id: number) {
    this._tasks.update(list => list.filter(t => t.id !== id));
  }

  toggleComplete(task: Task) {
    const previous = this.completedTaskStates.get(task.id) ?? false;
    const now = task.completed;

    task.completed = now;
    this.completedTaskStates.set(task.id, now);

    if (!previous && now) {
      this.completedCounter.update(v => v + 1);
    }
    if (previous && !now) {
      this.completedCounter.update(v => v - 1);
    }

    this._tasks.update(list => [...list]);
  }

  clearCompleted() {
    this._tasks.update(list => list.filter(t => !t.completed));
  }

  removeCategoryFromTasks(categoryId: number) {
    this._tasks.update(list =>
      list.map(t =>
        t.categoryId === categoryId
          ? { ...t, categoryName: 'Sin categoria' }
          : t
      )
    );
  }
}
