import { Component } from "@angular/core";
import { IonIcon, ModalController } from "@ionic/angular/standalone";
import { CategoriService } from "../services/categori.service";
import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonTitle, IonToolbar } from "@ionic/angular/standalone";
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { closeOutline, pencilOutline, trash } from "ionicons/icons";

@Component({
  selector: "app-category-manager-modal",
  templateUrl: "./category-manager-modal.component.html",
  styleUrls: ["./category-manager-modal.component.scss"],
  imports:[IonHeader,IonToolbar,IonTitle,IonButton,IonContent,IonList,IonItem,IonLabel,IonInput,FormsModule,IonIcon]
})
export class CategoryManagerModalComponent {

  newName = '';
  editingId: number | null = null;

  constructor(
    private modalCtrl: ModalController,
    public categoryService: CategoriService
  ) {
    addIcons({ closeOutline, pencilOutline, trash });
  }

  selectCategory(category: any) {
    this.modalCtrl.dismiss(category);
  }

  startEdit(category: any) {
    this.editingId = category.id;
    this.newName = category.name;
  }

  saveEdit() {
    if (this.editingId) {
      this.categoryService.updateCategory(this.editingId, this.newName);
    } else {
      this.categoryService.addCategory(this.newName);
    }

    this.editingId = null;
    this.newName = '';
  }

  delete(id: number) {
    this.categoryService.deleteCategory(id);
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
