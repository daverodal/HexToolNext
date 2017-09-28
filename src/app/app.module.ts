import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgPipesModule } from 'ngx-pipes';


import { HtnComponent } from './htn.component';

import { LifecycleComponent } from './lifecycle.component';
import { HomeComponent } from './home.component';
import { routing } from "./app.routing";
import { MapsComponent } from './maps/maps.component';
import { MapItemComponent } from './maps/map-item.component';
import { MapComponent } from './maps/map/map.component';
import { MapsService } from './maps.service';
import { MapEditComponent } from './maps/map/map-edit.component';
import {HexDrawService} from './maps/map/hex-draw.service';
import { HexMapComponent } from './maps/map/hex-map.component';
import { MapHexesComponent } from './maps/map/map-hexes.component';
import { HexPickService } from './maps/map/hex-pick.service';
import { HexPartService } from './maps/map/hex-part.service';
import { ClickableHexMapComponent } from './maps/map/clickable-hex-map.component';
import { FlashMessagesModule } from 'angular2-flash-messages';

@NgModule({
  declarations: [
    HtnComponent,
    LifecycleComponent,
    HomeComponent,
    MapsComponent,
    MapItemComponent,
    MapComponent,
    MapEditComponent,
    HexMapComponent,
    MapHexesComponent,
    ClickableHexMapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    NgPipesModule,
    FlashMessagesModule
  ],
  providers: [MapsService, HexDrawService, HexPickService, HexPartService],
  bootstrap: [HtnComponent]
})
export class AppModule { }
