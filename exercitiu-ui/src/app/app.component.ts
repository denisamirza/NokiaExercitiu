import { Component, OnInit } from '@angular/core';
import { TodoInputComponent } from './todo-input/todo-input.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  public title: string = 'exerciutiuAC';
  public items: any = []; // aici tinem lista de items care vor fi afisate in todo list
  date: string;

  public constructor(private todoService: TodoService) {
    // am injectat TodoService
    // nimic altceva de facut in constructor
  }

  public ngOnInit(): void {
    this.todoService.getItemList(this.date).subscribe((response) => {
      this.items = response; // raspunsul contine lista de items
                             // fiecare item are forma { id: number, name: string } 
   });
  }

  public onValueChange(value: Date): void {
    var year = value.getFullYear();
    var month = value.getMonth()+1;
    var day = value.getDate();
    this.date = year +"-"+month+"-"+ day;
    console.log("date: "+this.date);
    this.ngOnInit();
  }
  
  public onCreateItem(todo: TodoInputComponent): void {
    this.todoService.createItem(todo).subscribe((response: any) => {
      this.items.push({name: todo.inputText, id: response.id}); // cand requestul a fost facut cu succes si am primit raspunsul, push-uim itemul in lista impreuna cu id-ul din raspuns
        todo.inputText = "";                                     // o alta varianta ar fi sa facem refresh la toata lista cu getItemList(). 
    });
  }

   public onDeleteItem(itemId: number): void {
     this.todoService.deleteItem(itemId).subscribe(() => {
       this.items = this.items.filter((item) => item.id != itemId);
     });
   }

   public onDeleteItems(): void {
    this.todoService.deleteAll().subscribe(() => {
      this.items.splice(0, this.items.length)
    });
  }

   public onEditItem(item: TodoListComponent) {
    this.todoService.editItem(item).subscribe(() => {
      for(var i =0; i < this.items.length; i++){    
        if(this.items[i].id == item.itemId){
          this.items[i].name = item.itemName;
        }
      }     
    });
  }
}
