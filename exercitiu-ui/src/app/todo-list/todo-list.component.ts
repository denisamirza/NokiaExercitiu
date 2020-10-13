import { Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {

  @Input() public itemList = [];
  @Output() public deleteAll = new EventEmitter();
  @Output() public deleteItem = new EventEmitter<number>();
  @Output() public editItem = new EventEmitter<TodoListComponent>();
  itemName: string;
  itemId: number;
  
  constructor() { 
  }

  public onClickDelete(itemId: number): void { // 2nd
    console.log(itemId);
    this.deleteItem.emit(itemId); // emitem un eveniment care contine id-ul itemului ce il vom sterge
  }

  public onClickDeleteAll(): void { 
    this.deleteAll.emit(); 
  }

   public onClickEdit(itemId: number, itemName: string) {
        var task = prompt("Please enter the task", itemName);
        if (task != null) {
          this.itemName = task;
          this.itemId = itemId;
          this.editItem.emit(this);
     }
   }

}
