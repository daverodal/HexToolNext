import {Component, OnInit, Input, DoCheck, OnChanges} from '@angular/core';
import {MapInfo} from '../map-info';
import {HexDrawService} from './hex-draw.service';
import { MapsService } from '../../maps.service';
import {HexPickService} from './hex-pick.service';
import {TerrainProperty} from './terrain-property';
import * as _ from 'lodash';
import {Router} from '@angular/router';


@Component({
  selector: 'htn-clickable-hex-map',
  templateUrl: './clickable-hex-map.component.html',
  styles: []
})
export class ClickableHexMapComponent implements OnInit, DoCheck, OnChanges{

  seeOnlySelected = false;
  seeAny = true;
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

    const filterKey = this.selectedValue.key;
    if(foundTerrain) {
      const isTerrain = foundTerrain.type.find( x => x.name === this.selectedValue.key);
      if (!isTerrain) {
        foundTerrain.type.push({name: this.selectedValue.key});
      } else {
        _.remove(foundTerrain.type, (obj: any) => {
          return obj.name === filterKey;
        });
      }
    } else {
      this.hexPick.setHexpartXY(this.hexPick.getX(), this.hexPick.getY());
      const newTerrain = {name: terrainName ,
        x: this.hexPick.getPixelX() + 3 +  'px',
        y: this.hexPick.getPixelY() + 'px', number: this.hexPick.number, hexpartType : this.hexPick.getHexpartType(),
        type: [ { name: this.selectedValue.key} ]};
      this.terrain.push(newTerrain);
    }


  }

  saveHex(){

    this.maps.saveHexData(this.map.hexStr, {hexStr: {map: this.mapId, hexEncodedStr: JSON.stringify(this.terrain)}}, (arg) => {
      this.router.navigate(['/maps/' + this.mapId]);
    });
  }

  cancelHex() {
    this.router.navigate(['/maps/' + this.mapId]);
  }

  ngDoCheck() {
  }

  ngOnChanges(changes) {
  }

  constructor(private router: Router, private hexDraw: HexDrawService,  private maps: MapsService, private hexPick: HexPickService) {

    this.terrainProperty = new TerrainProperty();

    const arr = [];
    const theMap = this.terrainProperty.mapper;
    for (const key in theMap){
      if (theMap.hasOwnProperty(key)) {
        theMap[key].key = key;
        arr.push(theMap[key]);
      }
    }
    this.terrainPropArray = arr;
    this.selectedValue = this.terrainPropArray[0];
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
