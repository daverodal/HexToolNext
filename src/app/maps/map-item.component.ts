import { Component, OnInit, Input } from '@angular/core';
import { MapInfo } from "./map-info";
@Component({
  selector: 'app-map-item',
  templateUrl: 'map-item.component.html'
})
export class MapItemComponent implements OnInit {

  @Input() mapInfo : MapInfo;
  constructor() { }

  ngOnInit() {
  }

}