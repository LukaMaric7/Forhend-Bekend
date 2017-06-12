import { Component, OnInit } from '@angular/core';
import { Region } from "app/region/region.model";
import { RegionService } from 'app/region/region.service'

@Component({
  selector: 'region-list',
  templateUrl: './region-list.component.html',
  styleUrls: ['./region-list.component.css']
})
export class RegionListComponent implements OnInit {
  regions : Region[];
 
  constructor(private regionService: RegionService) { 
    this.regions = [];
  }

  ngOnInit() {
    this.regionService.getAll().subscribe(x => this.regions = x.json());
  }
}
