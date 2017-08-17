import { Component, OnInit } from '@angular/core';
import {MapInfo} from "./map-info"
import { Http } from '@angular/http';
import { Response } from '@angular/http';
import { MapsService } from '../maps.service';
import 'rxjs/Rx';


@Component({
  selector: 'htn-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {

  maps: MapInfo[] = [
  ];
  constructor(private http:Http, private mapService : MapsService) {
  }

  newMap(){
    this.mapService.newData((arg) => {
      debugger;
    });
  }
  ngOnInit() {
    this.mapService.fetchData((mS)=>{this.maps = mS.maps;});

  }

}
