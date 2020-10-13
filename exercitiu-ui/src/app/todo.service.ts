import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { TodoInputComponent } from './todo-input/todo-input.component';
import { TodoListComponent } from './todo-list/todo-list.component';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  readonly BASE_API_URL = "http://localhost:3000/";

  constructor(private http: HttpClient) { }

  // request pentru toata lista de todo-uri pentru o anumita data(root)
  public getItemList(root: string): Observable<any> {
    return this.http.get(this.BASE_API_URL + "todo/" + root);
  }

  // request pentru crearea de todo item intr-o anumita data
  public createItem(todo: TodoInputComponent): Observable<any> {
    let name: string=todo.inputText;
    let date: string=todo.date;
    return this.http.post(this.BASE_API_URL + "todo/" , { "name": name, "date": date});
  }

  // request pentru stergerea unui todo pe baza de ID
   public deleteItem(todoId: number): Observable<any> {
    return this.http.delete(this.BASE_API_URL + "todo/" + todoId);
   }

   public deleteAll(): Observable<any> {
    return this.http.delete(this.BASE_API_URL + "todo/");
  }

   public editItem(todo: TodoListComponent): Observable<any> {
     let updatedName: string = todo.itemName;
     return this.http.patch(this.BASE_API_URL + "todo/" + todo.itemId , {"name" : updatedName});
   }
}
