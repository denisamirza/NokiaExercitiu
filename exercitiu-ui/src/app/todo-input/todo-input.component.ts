import { Component, Output, EventEmitter, Optional, Input } from "@angular/core";

@Component({
    selector: "todo-input",
    templateUrl : "./todo-input.component.html"
})
export class TodoInputComponent{
    @Input() public date: string = "";
    public inputText: string = "";
    @Output() public addItem = new EventEmitter<TodoInputComponent>();

    public onClickAdd() {
        this.addItem.emit(this);
        //this.inputText = "";
    }

}
