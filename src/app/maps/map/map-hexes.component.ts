import { Component, OnInit , ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import {HexMapComponent} from './hex-map.component';
import {MapInfo} from '../map-info';
import {MapsService} from '../../maps.service';
import {ClickableHexMapComponent} from './clickable-hex-map.component';

@Component({
  selector: 'htn-map-hexes',
  templateUrl: './map-hexes.component.html',
  styles: []
})
export class MapHexesComponent implements OnInit {
  SIN  = Math.sin(Math.PI / 3);



  @ViewChild(ClickableHexMapComponent) hexMap: ClickableHexMapComponent;

  terrain =  [];
  saveTerrain = [];

  mapId :string ;
  savedMap : MapInfo = null;
  map: MapInfo;
  loaded: boolean = false;
  terrainProperty = null;
  constructor(private router : Router, private activatedRoute : ActivatedRoute, private maps: MapsService) {
    this.mapId = activatedRoute.snapshot.params['id'];
    this.map = new MapInfo();
    debugger;

  }

  meclickfeel(){
    debugger;
    if(this.terrain.length > 0){
      this.saveTerrain = this.terrain;
      this.terrain = [];
    }else {
      this.terrain = this.saveTerrain;

    }

  }

  ngOnInit() {
    debugger;
    this.maps.fetchData((maps) => {
        this.map = maps.getMap(this.mapId);
        this.loaded = true;
        this.savedMap = Object.assign({}, this.map);
        debugger;
        this.maps.fetchHexData(this.map.hexStr, (arg) => {
          this.terrain = arg;
          debugger;
        });
        // this.hexMap.refresh(this.map);
      }
    );
  }
}
