import {Component, OnInit, Input, DoCheck, OnChanges} from '@angular/core';
import {MapInfo} from '../map-info';
import {HexDrawService} from './hex-draw.service';
import { MapsService } from '../../maps.service';
import {HexPickService} from './hex-pick.service';
import {TerrainProperty} from './terrain-property';
import * as _ from 'lodash';


@Component({
  selector: 'htn-clickable-hex-map',
  templateUrl: './clickable-hex-map.component.html',
  styles: []
})
export class ClickableHexMapComponent implements OnInit, DoCheck, OnChanges{

  loaded = false;
  @Input() map: MapInfo;
  @Input() mapId: string;
  @Input() terrain: any[] = [];
  terrainProperty = null;
  terrainPropArray = []
  selectedValue;

  clickMe($event  ){
    let x = $event.offsetX;
    let y = $event.offsetY;
    console.log('( ' + $event.offsetX + ' , ' + $event.offsetY + ' )');
    this.hexPick.myInit(this.map);
    this.hexPick.setPixels(x, y);

    const terrainName = this.hexPick.number + 'x' + this.hexPick.getHexpartType();
    console.log(this.hexPick.number);
    console.log(this.hexPick.getX());
    console.log(this.hexPick.getY());
    console.log(this.hexPick.getHexpartType());
    const foundTerrain = this.terrain.find( x => x.name === terrainName);
    console.log(foundTerrain);
    const isTerrain = foundTerrain.type.find( x => x.name === this.selectedValue.key);

    const filterKey = this.selectedValue.key;
    if (!isTerrain) {
      foundTerrain.type.push({name: this.selectedValue.key});
    }else{
      _.remove(foundTerrain.type, (obj:any) => {
        return obj.name === filterKey;
      });
    }
    debugger;


  }
  ngDoCheck() {
  }

  ngOnChanges(changes) {
  }

  constructor(private hexDraw: HexDrawService,  private maps: MapsService, private hexPick: HexPickService) {

    this.terrainProperty = new TerrainProperty();

    const arr = [];
    debugger;
    const theMap = this.terrainProperty.mapper;
    for (const key in theMap){
      if (theMap.hasOwnProperty(key)) {
        theMap[key].key = key;
        arr.push(theMap[key]);
      }
    }
    this.terrainPropArray = arr;
    this.selectedValue = this.terrainPropArray[0];
    debugger;
  }

  mapLoaded(){
    this.hexDraw.resize();
    if(this.map){
      debugger;
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
