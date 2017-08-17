import { Injectable } from '@angular/core';
import {MapInfo} from './maps/map-info';
import { Http, Response, Headers } from '@angular/http';
import {HttpErrorResponse} from '@angular/common/http';
import { FlashMessagesService } from 'angular2-flash-messages';


@Injectable()
export class MapsService {

  isFetched : boolean = false;
  maps : MapInfo[]  = [
  ];
  constructor(private http: Http, private _flashMessagesService: FlashMessagesService){

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
  newData(  callback) {
    const headers = new Headers;
    headers.append('Content-Type', 'application/json');

const myObj = {
  map: {
    a: null,
    b: null,
    c: null,
    gameName: null,
    hexSize: null,
    hexStr: null,
    hexes: null,
    isDefault: true,
    mapHeight: null,
    mapUrl: "http://davidrodal.com/battle-maps/MCW.png",
    mapWidth: "width:auto",
    myAttr: null,
    numX: null,
    numY: null,
    perfectHexes: false,
    scenarioName: null,
    trueRows: false,
    x: null,
    y: null,
  }
};




    let jsonData = JSON.stringify(myObj);
    return this.http.post('/rest/maps', jsonData, {headers: headers})
      .map((response: Response) => response.json())
      .subscribe(
        (data: any) => {
          debugger;
          const myHexstr = {hexStr: {hexEncodedStr: [], map: data.map.id}};
           this.http.post('/rest/hexStrs', JSON.stringify(myHexstr), {headers: headers})
             .map((response: Response) => response.json())
             .subscribe(
               (hData: any) => {
                 debugger;
                 myObj.map.hexStr = hData.hexStr.id;
                 this.http.put('/rest/maps/' + data.map.id, JSON.stringify(myObj), {headers: headers})
                   .map((response: Response) => response.json())
                   .subscribe((arg) => {
                   debugger;
                    callback(arg);
                 });
               })
          debugger;
        }
      );
  }
  fetchData(callback){
    if(this.isFetched === true){
      callback(this);
      return;
    }
    this.isFetched = true;
    console.log("Fetching ");
    return this.http.get('/rest/maps')
      .map((response: Response) => response.json())
      .subscribe(
        (data: any) => {
          this._flashMessagesService.show('Data Fetched', { cssClass: 'alert-success', timeout: 1000 });

          console.log("Data ");
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
        },
        (error: HttpErrorResponse) => {
          this._flashMessagesService.show('ERROR: ' + error.url + ' ' + error.statusText, { cssClass: 'alert-danger', timeout: 5000 });

          console.log('whoops'  );
          console.log(error);
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
  fetchHexData(hexstr, callback){
    // if(this.isFetched === true){
    //   callback(this);
    //   return;
    // }
    // this.isFetched = true;
    debugger;
    return this.http.get('/rest/hexStrs/' + hexstr)
      .map((response: Response) => response.json())
      .subscribe(
        (data: any) => {
          debugger;
          callback(JSON.parse(data.hexStr.hexEncodedStr));
        }
      );
  }

  saveHexData(id, data,callback){
    const headers = new Headers;
    headers.append('Content-Type', 'application/json');
    let jsonData = JSON.stringify(data);
    return this.http.put('/rest/hexStrs/'+ id, jsonData, {headers:headers})
      .map((response: Response) => response.json())
      .subscribe(
        (data: any) => {
          callback(data);
        }
      )
  }

  publish(url, callback){
    debugger;
    return this.http.get(url)
      .map((response: Response) => response.json())
      .subscribe(
        (data: any) => {
          this._flashMessagesService.show('Published', { cssClass: 'alert-success flashy', timeout: 3000 });
          callback(data);
        },
        (error: HttpErrorResponse) => {
          this._flashMessagesService.show('ERROR: ' + error.url + ' ' + error.statusText, { cssClass: 'alert-danger', timeout: 5000 });
          callback({})
          console.log(error);
        }
      );
  }

}
