import { Component, OnInit, Input } from '@angular/core';
import { Accommodation }  from './accommodation.model';

@Component({
  selector: 'accommodation',
  templateUrl: './accommodation.component.html',
  styleUrls: ['./accommodation.component.css'],
})

export class AccommodationComponent implements OnInit {
  @Input () accommodation : Accommodation;

  constructor() {

   }

  ngOnInit() {
    console.log(this.accommodation);
  }


}
