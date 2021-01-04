import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import { TodoDoingComponent } from './todo-doing/todo-doing.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    TodoDoingComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
