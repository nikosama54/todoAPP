import { Injectable, signal, computed, WritableSignal } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TasksService {

  private _tasks: WritableSignal<Task[]> = signal([
    { id: 1, name: 'Comprar café', description: 'Café molido', completed: false, categoryId: 1, categoryName:"Personal" },
    { id: 2, name: 'Pagar internet', description: 'Claro Hogar', completed: false, categoryId: 2, categoryName:"Medicina" },
    { id: 3, name: 'Terminar ajustes en angular', description: 'modal buscar', completed: false, categoryId: 3, categoryName:"Trabajo" }
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
  }

  delete(id: number) {
    this._tasks.update(list => list.filter(t => t.id !== id));
  }

  toggleCompleted(id: number) {
    this._tasks.update(list =>
      list.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  }

  clearCompleted() {
    this._tasks.update(list => list.filter(t => !t.completed));
  }
}
