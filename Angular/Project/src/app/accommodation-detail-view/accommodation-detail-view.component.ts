import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Accommodation } from "app/accommodation/accommodation.model";
import { AccommodationService } from "app/accommodation/accommodation.service";

@Component({
  selector: 'accommodation-detail-view',
  templateUrl: './accommodation-detail-view.component.html',
  styleUrls: ['./accommodation-detail-view.component.css'],
  providers: [AccommodationService]
})
export class AccommodationDetailViewComponent implements OnInit {
  Id            : number;
  accommodation : Accommodation;

  constructor(private accommodationService :AccommodationService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
     this.activatedRoute.params.subscribe(params => {this.Id = parseInt(params["Id"])});
     this.accommodationService.getByIdOData(this.Id).subscribe(o =>{ this.accommodation = (o[0] as Accommodation); console.log(this.accommodation)});
  }

}
