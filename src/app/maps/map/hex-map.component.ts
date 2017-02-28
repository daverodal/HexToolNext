import {Component, OnInit, Input, OnChanges, DoCheck} from '@angular/core';
import { MapInfo } from '../map-info';
import {HexDrawService} from "./hex-draw.service";
import { MapsService } from "../../maps.service";

@Component({
  selector: 'app-hex-map',
  templateUrl: './hex-map.component.html',
  styles: []
})
export class HexMapComponent implements OnInit , OnChanges , DoCheck  {

  loaded: boolean = false;
  @Input() map: MapInfo;
  @Input() mapId: string;

  ngDoCheck(){
    console.log("HexMap Do check");
  }

  ngOnChanges(changes) {
    console.log("NgChan"+ changes);
  }

  constructor(private hexDraw : HexDrawService,  private maps: MapsService) { }

  mapLoaded(){
    console.log("Map;Loaded");
    debugger;
    this.hexDraw.resize();
    if(this.map){
      this.refresh(this.map);
      this.hexDraw.doDraw(this.map.numX, this.map.numY);
    }

  }

  refresh(map){
    console.log("Refreshing! ");
    console.log(map);
    console.log(this.map);
    if(map){
      this.hexDraw.setMap(map);
      this.hexDraw.doDraw(map.numX, map.numY);
    }
  }
  ngOnInit() {
      }

}
