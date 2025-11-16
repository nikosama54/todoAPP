import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IonCard, IonCheckbox } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
export interface Task {
  id: number;
  name: string;
  description: string;
  categoryId: number;
  completed: boolean;
}
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
