import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RestaurantsComponent } from './restaurants/buy-by-restaurant.component';
import { RestaurantsPageComponent } from './restaurants-page/restaurants-page.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'buy-by-restaurant', component: RestaurantsComponent },
  { path: 'app-restaurants-page', component: RestaurantsPageComponent },
  { path: 'coming-soon', component: ComingSoonComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
