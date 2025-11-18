import { Injectable, signal } from '@angular/core';
export interface Category {
  id: number;
  name: string;
}
@Injectable({
  providedIn: 'root',
})
export class CategoriService {
  categories = signal<Category[]>([
    { id: 1, name: "Personal" },
    { id: 2, name: "Medicina" },
    { id: 3, name: "Trabajo" }
  ]);

  addCategory(name: string) {
    const newCategory = { id: Date.now(), name };
    this.categories.update(list => [...list, newCategory]);
  }

  updateCategory(id: number, name: string) {
    this.categories.update(list =>
      list.map(c => c.id === id ? { ...c, name } : c)
    );
  }

  deleteCategory(id: number) {
    this.categories.update(list => list.filter(c => c.id !== id));
  }
}
