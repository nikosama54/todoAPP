export interface Task {
  id: number;
  name: string;
  description: string;
  completed: boolean;
  categoryId: number | null;
  categoryName?: string; // opcional
}