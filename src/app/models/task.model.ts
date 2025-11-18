export interface Task {
  id: number;
  name: string;         // nombre de la tarea
  description: string;
  categoryId: number | null;
  categoryName:string;
  completed: boolean;
}