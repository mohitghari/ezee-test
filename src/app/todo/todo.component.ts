import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Todo } from '../todo';
declare var UIkit: any
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  constructor() { }

  contacts: Todo[] = [];
  todoToBeUpdate: Todo;
  @ViewChild('contactModal', { static: false }) contactModal: ElementRef;

  ngOnInit() {
    console.log(JSON.parse(localStorage.getItem('Todo')))
    if (JSON.parse(localStorage.getItem('Todo')) as Todo[]) {
      this.contacts = JSON.parse(localStorage.getItem('Todo')) as Todo[]
    }
  }

  additems(name: string) {
    if (name == "") {
      UIkit.notification({
        message: 'Please enter name!',
        status: 'warning',
        pos: 'top-center',
        timeout: 500
      });
    }
    else {
      let contact: Todo = {
        id: new Date().getTime(),
        name: name,
        completed: false
      }; // here object is created of class Contact
      contact.completed = false;
      this.contacts.push(contact);
      console.log("contact", contact)
    }
    localStorage.setItem('Todo', JSON.stringify(this.contacts))
  }
  deleteItem(contat: Todo, event: Event) {
    event.stopPropagation()
    const index = this.contacts.findIndex(con => con.id === contat.id)
    this.contacts.splice(index, 1);
    localStorage.setItem('Todo', JSON.stringify(this.contacts))
  }

  select(contact: Todo) {
    contact.completed = !contact.completed;
    setTimeout(() => { localStorage.setItem('Todo', JSON.stringify(this.contacts)) }, 500)
  }

  updateItem(contact: Todo, event: Event) {
    event.stopPropagation();
    this.todoToBeUpdate = contact
  }

  saveUpdatedItem(value: string) {
    if (value == "") {
      UIkit.notification({
        message: 'Please enter name!',
        status: 'warning',
        pos: 'top-center',
        timeout: 500
      });
      return;
    }
    const index = this.contacts.findIndex(con => con.id === this.todoToBeUpdate.id)
    this.contacts[index].name = value
    UIkit.modal(this.contactModal.nativeElement).hide();
    console.log('new', this.contacts)
    setTimeout(() => { localStorage.setItem('Todo', JSON.stringify(this.contacts)) }, 500)
  }

}
