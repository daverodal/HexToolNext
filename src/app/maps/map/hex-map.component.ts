import {Component, OnInit, Input, OnChanges, DoCheck} from '@angular/core';
import { MapInfo } from '../map-info';
import {HexDrawService} from "./hex-draw.service";
import { MapsService } from "../../maps.service";
import {HexPickService} from "./hex-pick.service";

@Component({
  selector: 'htn-hex-map',
  templateUrl: './hex-map.component.html',
  styles: []
})
export class HexMapComponent implements OnInit , OnChanges , DoCheck  {

  loaded: boolean = false;
  @Input() map: MapInfo;
  @Input() mapId: string;

  clickMe($event  ){
    let x = $event.offsetX;
    let y = $event.offsetY;
    console.log('( '+$event.offsetX+' , '+$event.offsetY + ' )');
    this.hexPick.myInit(this.map);
    this.hexPick.setPixels(x, y);
    console.log(this.hexPick.number);
    console.log(this.hexPick.getX());
    console.log(this.hexPick.getY());
    console.log(this.hexPick.getHexpartType());


  }
  ngDoCheck(){
  }

  ngOnChanges(changes) {
  }

  constructor(private hexDraw : HexDrawService,  private maps: MapsService, private hexPick: HexPickService) {
  }

  mapLoaded(){
    this.hexDraw.resize();
    if(this.map){
      this.refresh(this.map);
      this.hexDraw.doDraw(this.map.numX, this.map.numY);
    }

  }

  refresh(map){

    if(map){
      this.hexDraw.setMap(map);
      this.hexDraw.doDraw(map.numX, map.numY);
    }
  }
  ngOnInit() {
      }

}
