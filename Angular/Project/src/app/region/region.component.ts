import { Component, OnInit, Input } from '@angular/core';
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
  constructor(private regionService : RegionService) { }

  ngOnInit() {
  }
  
  deleteRegion(){
      this.regionService.delete(this.region.Id).subscribe();
  }
}
