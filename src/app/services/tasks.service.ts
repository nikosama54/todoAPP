import { Injectable, signal, computed } from '@angular/core';

export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

@Injectable({ providedIn: 'root' })
export class TasksService {

  private tasks = signal<Task[]>([
    { id: 1, title: 'Comprar café', description: 'Café molido', completed: false },
    { id: 2, title: 'Pagar internet', description: 'Claro Hogar', completed: false }
  ]);

  // Computados
  pendingTasks = computed(() => this.tasks().filter(t => !t.completed));
  completedTasks = computed(() => this.tasks().filter(t => t.completed));

  toggleCompleted(id: number) {
    this.tasks.update(list =>
      list.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    );
  }

  clearCompleted() {
    this.tasks.update(list => list.filter(t => !t.completed));
  }
}

