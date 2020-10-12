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
  itemIsEditable: boolean;
  itemName: string;
  itemId: number;
  
  constructor() { 
    this.itemIsEditable = false;
  }

  public onClickDelete(itemId: number): void { // 2nd
    console.log(itemId);
    this.deleteItem.emit(itemId); // emitem un eveniment care contine id-ul itemului ce il vom sterge
  }

  public onClickDeleteAll(): void { 
    this.deleteAll.emit(); 
  }

   public update(item: TodoListComponent): void {
     this.editItem.emit(item);
   }

   public onClickEdit(itemId: number) {
   /*  for(let item in this.itemList) {
       if(itemList.id ==  itemId) {
         item.isEditable = !item.isEditable;
       }
     }*/
     this.itemIsEditable = !this.itemIsEditable;
     this.itemName = document.querySelector('[contentEditable]').textContent;
     this.itemId = itemId;
     this.itemName = this.itemName.slice(0,-10);
     console.log("editable:"+this.itemName);
     if(!this.itemIsEditable) {
        this.update(this);
        this.itemId = this.itemName = null;
     }
   }

}
