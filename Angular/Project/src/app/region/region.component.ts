import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Region } from "app/region/region.model";
import { RegionService } from './region.service';

@Component({
  selector: 'region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css'],
  providers: [RegionService]
})
export class RegionComponent implements OnInit {
  @Input () region: Region;
  @Output () deleteRegionEvent : EventEmitter<Region>;

  constructor(private regionService : RegionService) {
    this.deleteRegionEvent = new EventEmitter();
   }

  ngOnInit() {
  }
  
  deleteRegion(){
      this.regionService.delete(this.region.Id).subscribe(x => {this.deleteRegionEvent.emit(this.region);}, o => alert(o.json().Message));
  }
}
