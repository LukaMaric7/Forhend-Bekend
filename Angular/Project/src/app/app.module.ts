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
import { LoggedInGuard } from "app/guards/logged-in.guard";
import { LocalStorageService } from "app/localStorage.service"

const Routes = [
  {path : "home", component: HomeComponent},
  {path : "register-user", component: RegisterUserComponent},
  {path : "register-manager", component: RegisterManagerComponent},
  {path : "region", component: RegionComponent},
  {path : "add-region", component: AddRegionComponent, canActivate: [LoggedInGuard]},
  {path : "region-list", component: RegionListComponent, canActivate: [LoggedInGuard]},
  {path : "add-country", component: AddCountryComponent, canActivate: [LoggedInGuard]},
  {path : "country-list", component: CountryListComponent, canActivate: [LoggedInGuard]},
  {path : "login", component: LoginComponent},
  {path : "other", component: AppComponent},
  {path : "country", component: CountryComponent},
  {path : "country-detail-view/:Id", component: CountryDetailViewComponent, canActivate: [LoggedInGuard]},
  {path : "logout", component: LogoutComponent, canActivate: [LoggedInGuard]},
  {path : "place", component: PlaceComponent},
  {path : "place-list", component: PlaceListComponent, canActivate: [LoggedInGuard]},
  {path : "place-detail-view", component: PlaceDetailViewComponent, canActivate: [LoggedInGuard]},
  {path : "region-detail-view/:Id", component: RegionDetailViewComponent, canActivate: [LoggedInGuard]},
  {path : "add-place", component: AddPlaceComponent, canActivate: [LoggedInGuard]}
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
  providers: [LocalStorageService, LoggedInGuard],
  bootstrap: [AppComponent],

})
export class AppModule { }
