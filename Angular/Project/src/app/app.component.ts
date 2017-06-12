import { Component } from '@angular/core';
import { LocalStorageService } from './localStorage.service';
import { AccommodationService } from 'app/accommodation/accommodation.service';
import { Accommodation } from 'app/accommodation/accommodation.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [LocalStorageService, AccommodationService]
})
export class AppComponent {
  title = 'app';
  accommodations : Accommodation[];

  constructor(private localStorageService : LocalStorageService, private accommodationService : AccommodationService
  , private route : Router) { }

  IsLoggedIn() : boolean {
    return this.localStorageService.IsLoggedIn();
  }


  isAdmin() : Boolean {
    return this.localStorageService.isAdmin();
  }

  isManager() : Boolean {
    return this.localStorageService.isManager();
  }

  initialHomeComponent() : void {
    this.accommodationService.getAllOData().subscribe(o => {this.accommodations = o.json(); this.route.navigate(['/home',JSON.stringify(this.accommodations)])});
  }
}


