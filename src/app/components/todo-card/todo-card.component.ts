import { TodoSignalsService } from './../../services/todo-signals.service';
import { Component, OnInit, computed, inject } from '@angular/core';
import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { todoKeyLocalStorage } from 'src/app/models/enum/todoKeyLocalStorage';
import { Todo } from 'src/app/models/model/todo.model';

@Component({
  selector: 'app-todo-card',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    NgTemplateOutlet,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
  ],
  templateUrl: './todo-card.component.html',
  styleUrls: [],
})
export class TodoCardComponent implements OnInit {
  private todoSignalsService = inject(TodoSignalsService);
  private todosSignal = this.todoSignalsService.todosState;
  public todosList = computed(() => this.todosSignal());

  public ngOnInit(): void {
    this.getTodosInLocalStorage();
  }
  private getTodosInLocalStorage(): void {
    const todosDatas = localStorage.getItem(
      todoKeyLocalStorage.TODO_LIST
    ) as string;
    todosDatas && this.todosSignal.set(JSON.parse(todosDatas));
  }

  public handleDoneTodo(todoId: number): void {
    if (todoId) {
      this.todosSignal.mutate((todos) => {
        const todoSelected = todos.find((todo) => todo?.id === todoId) as Todo;
        todoSelected && (todoSelected.done = true);
      });
    }
  }

  private saveTodosInLocalStorage() : void {
    this.todoSignalsService.saveTodosInLocalStorage();
  }


  public handleDeleteTodo(todo: Todo): void {
      if(todo){
        const index = this.todosList().indexOf(todo);
        if(index !== -1){
          this.todosSignal.mutate((todos) => {
            todos.splice(index, 1);
            this.saveTodosInLocalStorage();
          })
        }
      }
  }
}
