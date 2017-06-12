import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'app/localStorage.service';
import { Accommodation } from "app/accommodation/accommodation.model";
import { AccommodationService } from "app/accommodation/accommodation.service";
import { SocketService } from 'app/socket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [LocalStorageService, AccommodationService]
})
export class HomeComponent implements OnInit {
  accommodations : Accommodation[];

  constructor(private localStorageService : LocalStorageService, private accommodationService : AccommodationService) { 
    this.accommodations = [];
  }

  ngOnInit() {
    this.accommodationService.getAllOData().subscribe(o => {this.accommodations = o.json();
      this.changeImageUrl();
      });
    
  }

  changeImageUrl() : void {
    for(let entry of this.accommodations){
      entry.ImageURL = SocketService.socket + entry.ImageURL;
    }
  }

}
