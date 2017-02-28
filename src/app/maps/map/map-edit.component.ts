import { Component, OnInit, ViewChild, OnChanges, DoCheck} from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router"
import { MapsService } from "../../maps.service";
import { MapInfo } from "../map-info";
import {HexMapComponent} from "./hex-map.component";


@Component({
  selector: 'app-map-edit',
  templateUrl: './map-edit.component.html',
  styles: []
})
export class MapEditComponent implements OnInit, OnChanges, DoCheck {
  SIN  = Math.sin(Math.PI / 3);


  @ViewChild(HexMapComponent) hexMap: HexMapComponent;

  mapId :string ;
  savedMap : MapInfo = null;
  map: MapInfo = null;
  loaded: boolean = false;
  constructor(private router : Router, private activatedRoute : ActivatedRoute, private maps: MapsService) {
    this.mapId = activatedRoute.snapshot.params['id'];
  }

  ngDoCheck(){

    console.log("MapComponent");
    if(this.map){
      if(this.map.perfectHexes){
        let hexside = this.map.c;
        this.map.a =  hexside / 2;
        this.map.b =  hexside * this.SIN;
      }
    }
    this.hexMap.refresh(this.map);
  }

  ngOnChanges(arg){
    console.log("MapEdit Changes ");
  }

  ngOnInit() {
    this.maps.fetchData((maps)=>{
        this.map = maps.getMap(this.mapId);
        this.loaded = true;
        this.savedMap = Object.assign({}, this.map);
        console.log(this.savedMap.mapUrl);
        this.hexMap.refresh(this.map);
      }
    );
  }
  save(){
    console.log("Saving" );
    this.maps.saveData(this.mapId, {map: this.map}, maps =>{
      console.log("save");
      Object.assign(this.savedMap, this.map);
      this.router.navigateByUrl('/maps/'+this.mapId);
      console.log(this.savedMap.mapUrl);
    });


  }

  cancel(){
    Object.assign(this.map, this.savedMap);
    this.router.navigateByUrl('/maps/'+this.mapId);
    console.log(this.savedMap.mapUrl);

  }

}
