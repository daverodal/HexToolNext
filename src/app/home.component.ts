import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'htn-home',
  template: `
  <div class="">
    <span class="breadcrumb-item active" [routerLink]="['']">home</span>&nbsp;
  </div>
  <a class="breadcrumb-item" [routerLink]="['maps']">maps</a>
  `,
  styles: []
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
