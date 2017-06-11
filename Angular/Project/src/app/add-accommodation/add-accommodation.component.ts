import { Component, OnInit } from '@angular/core';
import { Accommodation } from "app/accommodation/accommodation.model";
import { AccommodationService } from "app/accommodation/accommodation.service";
import { AccommodationType } from "app/accommodation-type/accommodation-type.model";
import { Place } from "app/place/place.model";

@Component({
  selector: 'app-add-accommodation',
  templateUrl: './add-accommodation.component.html',
  styleUrls: ['./add-accommodation.component.css'],
  providers: [AccommodationService]
})
export class AddAccommodationComponent implements OnInit {
    Id                  : number;
    Name                : string; 
    Description         : string;
    Address             : string;
    AverageGrade        : number;
    Latitude            : number;
    Longitude           : number;
    ImageURL            : string;
    Approved            : boolean;
    Accommodation       : AccommodationType;
    AccommodationTypeId : number;
    Place               : Place;
    PlaceId             : number;
    UserId              : number;
  constructor() { }

  ngOnInit() {
  }

  onSubmit()
  {
    
  }

}
