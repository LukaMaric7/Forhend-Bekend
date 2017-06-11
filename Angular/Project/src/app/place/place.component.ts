import { Component, OnInit, Input } from '@angular/core';
import { Place } from "app/place/place.model";

@Component({
  selector: 'place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent implements OnInit {
  @Input () place : Place;
  constructor() { }

  ngOnInit() {
  }

}
