import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dmr-lifecycle',
  template: `
    <p>
      lifecycle Works!
    </p>
  `,
  styles: []
})
export class LifecycleComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
