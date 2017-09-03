import { Component, OnInit } from '@angular/core';
import {MapInfo} from "./map-info"
import { Http } from '@angular/http';
import { Response } from '@angular/http';
import { MapsService } from '../maps.service';
import 'rxjs/Rx';
import {Router} from "@angular/router";


@Component({
  selector: 'htn-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {

  maps: MapInfo[] = [
  ];
  constructor(  private router: Router, private http:Http, private mapService : MapsService) {
  }

  newMap(){
    console.log("called NewMap")
    this.mapService.newData((arg) => {
      console.log('returned from newmap '+ arg.map.id);
      this.maps.push(arg.map);
      this.router.navigate(['/maps/',arg.map.id]);
    });
  }
  ngOnInit() {
    this.mapService.fetchData((mS)=>{this.maps = mS.maps;});

  }

}
