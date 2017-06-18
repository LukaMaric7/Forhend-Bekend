import { Component, OnInit } from '@angular/core';
import { Accommodation } from 'app/accommodation/accommodation.model';
import { AccommodationService } from 'app/accommodation/accommodation.service';

@Component({
  selector: 'not-approved-accommodations',
  templateUrl: './not-approved-accommodations.component.html',
  styleUrls: ['./not-approved-accommodations.component.css'],
  providers: [AccommodationService]
})
export class NotApprovedAccommodationsComponent implements OnInit {

  accommodations : Accommodation[];

  constructor(private accommodationService : AccommodationService) { 
    this.accommodations = [];
  }

  ngOnInit() {
    this.accommodationService.getAllNotApproved().subscribe(x => {this.accommodations = x.json(); console.log(this.accommodations);},
     x => {alert(x.json().Message);})
  }

  approve(accommodation : Accommodation){
    this.accommodationService.edit(new Accommodation(accommodation.Id, accommodation.Name,accommodation.Description, accommodation.Latitude,
    accommodation.Longitude, accommodation.AccommodationTypeId, accommodation.Address, accommodation.PlaceId, accommodation.UserId, true, accommodation.ImageURL)).subscribe(x => {
      let index = this.accommodations.indexOf(accommodation);
      this.accommodations.splice(index, 1);
    })
    console.log(accommodation);
  }

}
