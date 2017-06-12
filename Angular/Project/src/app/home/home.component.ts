import { Component, OnInit, Input } from '@angular/core';
import { LocalStorageService } from 'app/localStorage.service';
import { Accommodation } from "app/accommodation/accommodation.model";
import { AccommodationService } from "app/accommodation/accommodation.service";
import { Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [LocalStorageService, AccommodationService]
})
export class HomeComponent implements OnInit {
  jsonString : string;
  accommodations : Accommodation[];

  constructor(private localStorageService : LocalStorageService, private accommodationService : AccommodationService,
  private activatedRoute : ActivatedRoute) { 
    this.accommodations = [];
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {this.jsonString = params["acc"] ; this.accommodations = JSON.parse(this.jsonString); console.log(this.accommodations[0].AccommodationType = this.accommodations[0].AccommodationType)});
    
  }
}
