import { Component, OnInit } from '@angular/core';
import { AccommodationTypeService } from 'app/accommodation-type/accommodation-type.service';
import { AccommodationType } from 'app/accommodation-type/accommodation-type.model';

@Component({
  selector: 'app-add-accommodation-type',
  templateUrl: './add-accommodation-type.component.html',
  styleUrls: ['./add-accommodation-type.component.css'],
  providers: [AccommodationTypeService]
})
export class AddAccommodationTypeComponent implements OnInit {

  Name : string;

  constructor(private accommodationTypeService : AccommodationTypeService) { }

  ngOnInit() {
  }

  onSubmit(){
    this.accommodationTypeService.add(new AccommodationType(1, this.Name)).subscribe();
    this.Name = "";
  }
}
