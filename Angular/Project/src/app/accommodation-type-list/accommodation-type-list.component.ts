import { Component, OnInit } from '@angular/core';
import { AccommodationType } from 'app/accommodation-type/accommodation-type.model';
import { AccommodationTypeService } from 'app/accommodation-type/accommodation-type.service';

@Component({
  selector: 'app-accommodation-type-list',
  templateUrl: './accommodation-type-list.component.html',
  styleUrls: ['./accommodation-type-list.component.css'],
  providers: [AccommodationTypeService]
})
export class AccommodationTypeListComponent implements OnInit {
  accommodationTypes : AccommodationType[];
  constructor(private accommodationTypeService : AccommodationTypeService) {
    this.accommodationTypes = [];
   }

  ngOnInit() {
    this.accommodationTypeService.getAll().subscribe(x => this.accommodationTypes = x.json());
  }

}
