import { Component, OnInit, Input } from '@angular/core';
import {MapInfo} from './map-info.model'

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  styles: ['agm-map {height: 300px; width: 500px;}'] //postavljamo sirinu i visinu mape
})
export class MapComponent implements OnInit {
  @Input() mapInfo: MapInfo

  constructor() { }

  ngOnInit() {
  }
}
