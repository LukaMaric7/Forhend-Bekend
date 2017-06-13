import { Component, OnInit, Input } from '@angular/core';
import { Accommodation }  from './accommodation.model';
import { Router } from '@angular/router';

@Component({
  selector: 'accommodation',
  templateUrl: './accommodation.component.html',
  styleUrls: ['./accommodation.component.css'],
})

export class AccommodationComponent implements OnInit {
  @Input () accommodation : Accommodation;

  constructor(private route : Router) {

   }

  ngOnInit() {
  }

  onClick()
  {
      this.route.navigate(['/accommodation-detail-view/',this.accommodation.Id]);
  }

}
