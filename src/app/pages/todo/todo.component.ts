import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/todo/shared/todo.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router'; 



@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoService]
})
export class TodoComponent implements OnInit {
  toDoListArray: any[];

  constructor(private toDoService: TodoService, public authservice: AuthService, private router: Router) { 
  }

  ngOnInit(){
    this.toDoService.getToDoList().snapshotChanges().subscribe(item =>{
      this.toDoListArray = [];
      item.forEach(element => { var x=element.payload.toJSON();
      x["$key"]=element.key;
      this.toDoListArray.push(x);
      })

      this.toDoListArray.sort((a,b) =>{
        return a.isChecked - b.isChecked;
      })
    });
  }
    onAdd(itemTitle){
      this.toDoService.addTitle(itemTitle.value);
      itemTitle.value=null;}

      alterCheck($key: string, isChecked){
        this.toDoService.checkOrUncheckTitle($key, !isChecked);
      }
      onDelete($key: string){
        this.toDoService.removeTitle($key);
      }
    }

