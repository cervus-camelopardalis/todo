import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {

  constructor() { }

  /********************************************/
  /*********** GET/UPDATE TODO LIST ***********/
  /********************************************/
  /* Function to grab the list of todos */
  async getTodos() {
    const response = await fetch(this.baseUrl);
    const data = await response.json();
    this.todos = await data;
  }

  /* This function runs everytime the component loads */
  ngOnInit() {
    this.getTodos();
  }

  /********************************************/
  /***************** ADD TODO *****************/
  /********************************************/
  todos: Array<any> = [];

  baseUrl: string = 'http://localhost:5000/todos';

  /* Properties to bind */
  createDescription: string = '';

  /* Take data from the form and create a new todo */
  async createTodo() {
    await fetch(this.baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        description: this.createDescription
      })
    });

    /* Update the todo list and reset the form */
    this.getTodos();
    this.createDescription = '';
  }

  /********************************************/
  /***************** EDIT TODO ****************/
  /********************************************/
  /* Properties to bind */
  editId: number = 0;
  editDescription: string = '';

  editSelect(todo: any) {
    this.editId = todo.id;
    this.editDescription = todo.description;
  }

  /* Take data from the database and edit a todo */
  async editTodo() {
    await fetch(this.baseUrl + '/' + this.editId, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: this.editId,
        description: this.editDescription
      })
    });

    /* Update the todo list and reset the form */
    this.getTodos();
    this.editId = 0;
    this.editDescription = '';
  }

  /********************************************/
  /**************** DELETE TODO ***************/
  /********************************************/
  /* Take data from the database and delete a todo */
  async deleteTodo(todo: any) {
    await fetch(this.baseUrl + '/' + todo.id, {
      method: 'DELETE'
    });

    /* Update the todo list */
    this.getTodos();
  }

}
