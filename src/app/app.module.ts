import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgPipesModule } from 'ngx-pipes';


import { AppComponent } from './app.component';
import { DatabindingComponent } from './databinding/databinding.component';
import { PropertyBindingComponent } from './databinding/property-binding.component';
import { EventBindingComponent } from './databinding/event-binding.component';
import { TwoWayBindingComponent } from './databinding/two-way-binding.component';
import { LifecycleComponent } from './lifecycle.component';
import { HomeComponent } from './home.component';
import { routing } from "./app.routing";
import { MapsComponent } from './maps/maps.component';
import { MapItemComponent } from './maps/map-item.component';
import { MapComponent } from './maps/map/map.component';
import { MapsService } from './maps.service';
import { MapEditComponent } from './maps/map/map-edit.component';
import {HexDrawService} from "./maps/map/hex-draw.service";
import { HexMapComponent } from './maps/map/hex-map.component';
import { MapHexesComponent } from './maps/map/map-hexes.component';
import { HexPickService } from './maps/map/hex-pick.service';
import { HexPartService } from './maps/map/hex-part.service';

@NgModule({
  declarations: [
    AppComponent,
    DatabindingComponent,
    PropertyBindingComponent,
    EventBindingComponent,
    TwoWayBindingComponent,
    LifecycleComponent,
    HomeComponent,
    MapsComponent,
    MapItemComponent,
    MapComponent,
    MapEditComponent,
    HexMapComponent,
    MapHexesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    NgPipesModule
  ],
  providers: [MapsService, HexDrawService, HexPickService, HexPartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
