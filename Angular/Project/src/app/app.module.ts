import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '@angular/material';
import 'hammerjs';

import { AppComponent } from './app.component';
import { CountryListComponent } from './country-list/country-list.component';
import { CountryComponent } from './country/country.component';
import { LoginComponent } from './login/login.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { RegisterManagerComponent } from './register-manager/register-manager.component';
import { LogoutComponent } from './logout/logout.component';
import { HomeComponent } from './home/home.component';
import { AddCountryComponent } from './add-country/add-country.component';
import { AddRegionComponent } from './add-region/add-region.component';
import { RegionComponent } from './region/region.component';
import { RegionListComponent } from './region-list/region-list.component';
import { CountryDetailViewComponent } from './country-detail-view/country-detail-view.component';
import { RegionDetailViewComponent } from './region-detail-view/region-detail-view.component';
import { PlaceComponent } from './place/place.component';
import { PlaceListComponent } from './place-list/place-list.component';
import { PlaceDetailViewComponent } from './place-detail-view/place-detail-view.component';
import { AddPlaceComponent } from './add-place/add-place.component';

const Routes = [
  {path : "home", component: HomeComponent},
  {path : "register-user", component: RegisterUserComponent},
  {path : "register-manager", component: RegisterManagerComponent},
  {path : "region", component: RegionComponent},
  {path : "add-region", component: AddRegionComponent},
  {path : "region-list", component: RegionListComponent},
  {path : "add-country", component: AddCountryComponent},
  {path : "country-list", component: CountryListComponent},
  {path : "login", component: LoginComponent},
  {path : "other", component: AppComponent},
  {path : "country", component: CountryComponent},
  {path : "country-detail-view", component: CountryDetailViewComponent},
  {path : "logout", component: LogoutComponent},
  {path : "place", component: PlaceComponent},
  {path : "place-list", component: PlaceListComponent},
  {path : "place-detail-view", component: PlaceDetailViewComponent},
  {path : "region-detail-view", component: RegionDetailViewComponent},
  {path : "add-place", component: AddPlaceComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    CountryListComponent,
    CountryComponent,
    LoginComponent,
    RegisterUserComponent,
    RegisterManagerComponent,
    LogoutComponent,
    HomeComponent,
    AddCountryComponent,
    AddRegionComponent,
    RegionComponent,
    RegionListComponent,
    CountryDetailViewComponent,
    RegionDetailViewComponent,
    PlaceComponent,
    PlaceListComponent,
    PlaceDetailViewComponent,
    AddPlaceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(Routes),
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
