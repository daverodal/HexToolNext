import { Component } from '@angular/core';

@Component({
  selector: 'dmr-databinding',
  templateUrl: './databinding.component.html',
  styleUrls: ['./databinding.component.css']
})
export class DatabindingComponent  {
  stringInterpolation = ' a string 4 u ';
  numberInterpolation = 3;

  isColorful(){
    return "colorful";
  }
  onClick(value: string){
    alert(value);
  }
}
