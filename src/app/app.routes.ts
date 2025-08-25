import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {RestaurantsComponent} from "./restaurants/buy-by-restaurant.component";
import {MapComponent} from "./map/map.component";
import {RestaurantsPageComponent} from "./restaurants-page/restaurants-page.component";


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Home', component: HomeComponent },
  { path: 'Restaurants', component: RestaurantsPageComponent },
  { path: '**', redirectTo: '' },
];
