import { Component, OnInit,Input , OnChanges} from '@angular/core';
import { MapInfo } from '../map-info';
import {HexDrawService} from "./hex-draw.service";
import { MapsService } from "../../maps.service";

@Component({
  selector: 'app-hex-map',
  templateUrl: './hex-map.component.html',
  styles: []
})
export class HexMapComponent implements OnInit , OnChanges {

  loaded: boolean = false;
  @Input() map: MapInfo;
  @Input() mapId: string;

  ngOnChanges(changes) {
    console.log("NgChan"+ changes);
  }

  constructor(private hexDraw : HexDrawService,  private maps: MapsService) { }

  mapLoaded(){
    console.log("Map;Loaded");
    this.hexDraw.resize();
    if(this.map){
      this.hexDraw.doDraw(this.map.numX, this.map.numY);
    }

  }

  refresh(map){
    console.log("Refreshing! ");
    console.log(map);
    if(map){
      this.hexDraw.setMap(map);
      this.hexDraw.doDraw(map.numX, map.numY);
    }
  }
  ngOnInit() {
      }

}
