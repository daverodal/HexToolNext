import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styles: ['body{color:red !important;}']
})
export class AppComponent {
  title = 'app works!';

  public toggled(open:boolean):void {
    console.log('Dropdown is now: ', open);
  }
  
}
