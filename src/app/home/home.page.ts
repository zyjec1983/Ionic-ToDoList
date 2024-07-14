import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  todos: { task: string, completed: boolean }[] = [];
  newTodo: string = '';

  constructor(
    private toastController: ToastController,
    private storage: Storage) {
      this.storage.create();
      this.getItem();
  }

  setItem(){    
    localStorage.setItem('tarea1', JSON.stringify(this.todos));
  }

  getItem(){    
    var projecto1 = localStorage.getItem('tarea1');

    this.todos= JSON.parse(projecto1!);
    console.log('Informacion local', projecto1)    
  }


  addToDo() {
    if (this.newTodo.trim().length > 0) {
      this.todos.push({ task: this.newTodo, completed: false });
      this.newTodo = '';
      this.setItem();
      this.getItem();
    } else {
      this.errorToast('No se guardan tareas vacías'); // Muestra el toast si el campo está vacío
    }
  }

  toggleComplete(index: number) {
    this.todos[index].completed = !this.todos[index].completed;
  }

  // Metodo para elimina tareas vacias
  removeTask(index: number) {
    this.todos.splice(index, 1);
    this.setItem();
    this.okToast('Tarea eliminada.');
  }

  // Metodo de error para tareas vacias
  async errorToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: 'danger',
    });
    await toast.present();
  }

   // Metodo de error para tareas vacias
   async okToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: 'success',
    });
    await toast.present();
  }
}
