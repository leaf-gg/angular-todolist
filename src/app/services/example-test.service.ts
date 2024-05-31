import { TodoSignalsService } from 'src/app/services/todo-signals.service';
import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { Todo } from '../models/model/todo.model';

@Injectable({providedIn: 'root'})

export class ExampleTestService {
  public testNamesList: Array<{ id: number, name: string}> = [
    {
      id: 1,
      name: 'test 1'
    },
    {
      id: 2,
      name: 'test 2'
    },
  ];
  constructor(private todoSignalsService: TodoSignalsService){}

  public getTestNamesList(): Observable<Array<{ id: number, name: string}>> {
    return of(this.testNamesList);
  }

  public handleCreateTodo(todo: Todo): Observable<Array<Todo>>{
    if(todo){
      this.todoSignalsService.updateTodos(todo)
    }
    return of(this.todoSignalsService.todosState());
  }
}
