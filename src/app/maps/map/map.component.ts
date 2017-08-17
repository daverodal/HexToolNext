import { Component, OnInit , ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { MapsService } from '../../maps.service';
import { MapInfo } from '../map-info';
import {HexDrawService} from './hex-draw.service';
import {HexMapComponent} from './hex-map.component';
@Component({
  selector: 'htn-map',
  templateUrl: './map.component.html'
})

export class MapComponent implements OnInit {

  @ViewChild(HexMapComponent) hexMap: HexMapComponent;

  mapId: string;
  map: MapInfo;
  savedMap: MapInfo = null;
  loaded = false;
  publishing = false;
  constructor(private router : Router, private activatedRoute : ActivatedRoute, private maps: MapsService) {
    this.mapId = activatedRoute.snapshot.params['id'];
    this.map = new MapInfo();

  }

  cloneMe(){
    debugger;
    let pubUrl = '/rest/cloneFile/' + this.map.id;
    this.publishing = true;
    this.maps.publish(pubUrl, (arg) => {
      debugger;
      this.publishing = false;
    });
  }
  publishMe(){
    let pubUrl = '';
    debugger;
    let map = this.map;
    pubUrl = '/wargame/terrainInit/'+map.gameName + "/" + map.scenarioName + "/" + map.hexStr;
    this.publishing = true;
    this.maps.publish(pubUrl, (arg) => {
      debugger;
      this.publishing = false;
    });
  }

  ngOnInit() {
    this.maps.fetchData((maps) => {
        this.map = maps.getMap(this.mapId);
        this.loaded = true;
        this.hexMap.refresh(this.map);
    },
    );
  }


}
