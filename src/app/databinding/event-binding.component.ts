import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'dmr-event-binding',
  template: `
    <button (click)="onClicked()"> Click click</button>
  `,
  styles: []
})
export class EventBindingComponent {

  @Output() clicked = new EventEmitter<string>();
  onClicked(){
    this.clicked.emit("it worked dude");
  }
}
