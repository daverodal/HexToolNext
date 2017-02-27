import { Injectable } from '@angular/core';
import {MapInfo} from "./maps/map-info"
import { Http,Response, Headers } from '@angular/http';


@Injectable()
export class MapsService {

  isFetched : boolean = false;
  maps : MapInfo[]  = [
  ];
  constructor(private http: Http){

  }
  setData(maps : MapInfo[]) {
    this.maps = maps;
  }

  saveData(id, data,callback){
    const headers = new Headers;
    headers.append('Content-Type', 'application/json');
    let jsonData = JSON.stringify(data);
    return this.http.put('/rest/maps/'+id, jsonData, {headers:headers})
      .map((response: Response) => response.json())
      .subscribe(
        (data: any) => {
          callback(data);
        }
      )
  }
  fetchData(callback){
    if(this.isFetched === true){
      callback(this);
      return;
    }
    this.isFetched = true;
    return this.http.get('/rest/maps')
      .map((response: Response) => response.json())
      .subscribe(
        (data: any) => {
          for(var i in data.maps){
            let map = data.maps[i];
            this.maps.push(new MapInfo(
              map.a ,
              map.b ,
              map.c ,
              map.gameName ,
              map.hexSize,
              map.hexStr ,
              map.hexes ,
              map.id ,
              map.isDefault ,
              map.mapHeight  ,
              map.mapUrl ,
              map.mapWidth ,
              map.myAttr ,
              map.numX ,
              map.numY  ,
              map.perfectHexes ,
              map.scenarioName ,
              map.trueRows ,
              map.x ,
              map.y)
            );
          }
          callback(this);
        }
      )
  }
  getData(){
    return this.maps;
  }

  getMap(mapId: string){
    for(var i in this.maps){
      if(mapId === this.maps[i].id){
        return this.maps[i];
      }
    }
  }

}
