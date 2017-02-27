import { Component } from '@angular/core';

@Component({
  selector: 'dmr-two-way-binding',
  template: `
      <input type="text" [(ngModel)]="person.name">
      <input type="text" [(ngModel)]="person.name">
    `
})
export class TwoWayBindingComponent {


  person = {
    name: 'Dave',
    age: 59
  }

}
