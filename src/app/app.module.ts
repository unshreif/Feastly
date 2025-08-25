import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module'; // إضا��ة الـ routing module
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RestaurantsComponent } from './restaurants/buy-by-restaurant.component';
import { MapComponent } from './map/map.component';
import { RestaurantsPageComponent } from './restaurants-page/restaurants-page.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RestaurantsComponent,
    MapComponent,
    RestaurantsPageComponent,
    ComingSoonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule // إضافة الـ routing هنا
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
