import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '@angular/material';
import 'hammerjs';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

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
import { IsAdminGuard } from "app/guards/isAdmin.guard";
import { LocalStorageService } from "app/localStorage.service";
import { AccommodationComponent } from './accommodation/accommodation.component';
import { AccommodationTypeComponent } from './accommodation-type/accommodation-type.component';
import { AddAccommodationTypeComponent } from './add-accommodation-type/add-accommodation-type.component';
import { AddAccommodationComponent } from './add-accommodation/add-accommodation.component';
import { AccommodationTypeListComponent } from './accommodation-type-list/accommodation-type-list.component';
import { AccommodationDetailViewComponent } from './accommodation-detail-view/accommodation-detail-view.component';
import { AddRoomComponent } from './add-room/add-room.component';
import { RoomComponent } from './room/room.component';

const Routes = [
  {path : "home", component: HomeComponent},
  {path : "register-user", component: RegisterUserComponent},
  {path : "register-manager", component: RegisterManagerComponent},
  {path : "add-region", component: AddRegionComponent, canActivate: [LoggedInGuard, IsAdminGuard]},
  {path : "region-list", component: RegionListComponent, canActivate: [LoggedInGuard, IsAdminGuard]},
  {path : "add-country", component: AddCountryComponent, canActivate: [LoggedInGuard, IsAdminGuard]},
  {path : "country-list", component: CountryListComponent, canActivate: [LoggedInGuard, IsAdminGuard]},
  {path : "login", component: LoginComponent},
  {path : "other", component: AppComponent},
  {path : "country-detail-view/:Id", component: CountryDetailViewComponent, canActivate: [LoggedInGuard, IsAdminGuard]},
  {path : "logout", component: LogoutComponent, canActivate: [LoggedInGuard]},
  {path : "place-list", component: PlaceListComponent, canActivate: [LoggedInGuard, IsAdminGuard]},
  {path : "place-detail-view", component: PlaceDetailViewComponent, canActivate: [LoggedInGuard, IsAdminGuard]},
  {path : "region-detail-view/:Id", component: RegionDetailViewComponent, canActivate: [LoggedInGuard, IsAdminGuard]},
  {path : "add-place", component: AddPlaceComponent, canActivate: [LoggedInGuard, IsAdminGuard]},
  {path : "add-accommodation-type", component: AddAccommodationTypeComponent, canActivate: [LoggedInGuard, IsAdminGuard]},
  {path : "accommodation-type-list", component: AccommodationTypeListComponent, canActivate: [LoggedInGuard, IsAdminGuard]},
  {path : "add-accommodation", component: AddAccommodationComponent, canActivate: [LoggedInGuard]},
  {path : "accommodation-detail-view/:Id", component: AccommodationDetailViewComponent},
  {path : "add-room/:Id", component: AddRoomComponent,canActivate: [LoggedInGuard/*dodati za menadzera guard*/]}
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
    AddPlaceComponent,
    AccommodationComponent,
    AccommodationTypeComponent,
    AddAccommodationTypeComponent,
    AddAccommodationComponent,
    AccommodationTypeListComponent,
    AccommodationDetailViewComponent,
    AddRoomComponent,
    RoomComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(Routes),
    MaterialModule,
    NgbModule.forRoot()
  ],
  providers: [LocalStorageService, LoggedInGuard, IsAdminGuard],
  bootstrap: [AppComponent],

})
export class AppModule { }
