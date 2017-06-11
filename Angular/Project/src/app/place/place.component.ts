import { Component, OnInit, Input } from '@angular/core';
import { Place } from "app/place/place.model";
import { PlaceService } from './place.service'

@Component({
  selector: 'place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css'],
  providers: [PlaceService]
})
export class PlaceComponent implements OnInit {
  @Input () place : Place;
  constructor(private placeService : PlaceService) { }

  ngOnInit() {
  }

  deletePlace()
  {
     this.placeService.delete(this.place.Id).subscribe();
  }

}
