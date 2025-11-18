import { Component, Input, Output, EventEmitter, effect } from '@angular/core';
import { IonCard, IonCheckbox } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { Task } from '../models/task.model';
import { CategoriService } from '../services/categori.service';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
  imports: [IonCard, IonCheckbox, FormsModule]
})
export class TaskCardComponent {

  @Input() task!: Task;
  @Output() edit = new EventEmitter<Task>();
  @Output() complete = new EventEmitter<Task>();
  
  // Signal que contendrá el nombre actual de la categoría
  categoryName: string = 'Sin categoría';

  constructor(private categoryService: CategoriService) {
    // Efecto reactivo: actualiza categoryName cuando cambie la lista de categorías
    effect(() => {
      if (!this.task) return;
      const cat = this.categoryService.categories().find(c => c.id === this.task.categoryId);
      this.categoryName = cat ? cat.name : 'Sin categoría';
    });
  }

  onEdit() {
    if (this.task.completed) return;
    this.edit.emit(this.task);    
  }

  toggleComplete(ev: any) {
    this.complete.emit({
      ...this.task,
      completed: ev.detail.checked
    });
  }
}
