import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Todo } from '../todo';
declare var UIkit: any
@Component({
  selector: 'app-todo-doing',
  templateUrl: './todo-doing.component.html',
  styleUrls: ['./todo-doing.component.scss']
})
export class TodoDoingComponent implements OnInit {

  contacts: Todo[] = [];
  todoToBeUpdate: Todo;
  @ViewChild('contactModalOne', { static: false }) contactModalOne: ElementRef;

  ngOnInit() {
    console.log(JSON.parse(localStorage.getItem('TodoDoing')))
    if (JSON.parse(localStorage.getItem('TodoDoing')) as Todo[]) {
      this.contacts = JSON.parse(localStorage.getItem('TodoDoing')) as Todo[]
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
    localStorage.setItem('TodoDoing', JSON.stringify(this.contacts))
  }
  deleteItem(contat: Todo, event: Event) {
    event.stopPropagation()
    const index = this.contacts.findIndex(con => con.id === contat.id)
    this.contacts.splice(index, 1);
    localStorage.setItem('TodoDoing', JSON.stringify(this.contacts))
  }

  select(contact: Todo) {
    contact.completed = !contact.completed;
    setTimeout(() => { localStorage.setItem('TodoDoing', JSON.stringify(this.contacts)) }, 500)
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
    UIkit.modal(this.contactModalOne.nativeElement).hide();
    console.log('new', this.contacts)
    setTimeout(() => { localStorage.setItem('TodoDoing', JSON.stringify(this.contacts)) }, 500)
  }

}
