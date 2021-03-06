/**
 * Created by david on 2/23/17.
 */
import { Routes , RouterModule} from '@angular/router';
import {HomeComponent} from './home.component';
import {MapsComponent} from './maps/maps.component';
import {MapComponent} from './maps/map/map.component';
import {MapEditComponent} from './maps/map/map-edit.component';
import {MapHexesComponent} from './maps/map/map-hexes.component';


const APP_ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'maps',
    component: MapsComponent
  },
  {
    path: 'maps/:id',
    component: MapComponent
  },
  {
    path: 'maps/:id/edit',
    component: MapEditComponent
  },
  {
    path: 'maps/:id/hexes',
    component: MapHexesComponent
  }
];

export const routing = RouterModule.forRoot(APP_ROUTES, { useHash : true});
