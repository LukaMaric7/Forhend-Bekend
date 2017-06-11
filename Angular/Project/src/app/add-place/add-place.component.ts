import { Component, OnInit } from '@angular/core';
import { AddPlaceService } from './add-place.service'
import { CountryListService } from "app/country-list/country-list.service";
import { Country } from "app/country/country.model";
import { Region} from "app/region/region.model";
import { Place } from "app/place/place.model";
import { RegionListService } from "app/region-list/region-list.service";

@Component({
  selector: 'app-add-place',
  templateUrl: './add-place.component.html',
  styleUrls: ['./add-place.component.css'],
  providers: [AddPlaceService, CountryListService, RegionListService]
})
export class AddPlaceComponent implements OnInit {

  regions : SVGNumberList[];
  Name : string;
  RegionId : number;

  constructor(private countryService: CountryListService, private addPlaceService: AddPlaceService, 
  private regionListService : RegionListService) {
    this.regions = [];
   }
  

  ngOnInit() {
    this.regionListService.getAll().subscribe(x => {this.regions = x.json(); console.log(this.regions);});
  }

  onSubmit(){
    this.addPlaceService.add(new Place(1,this.Name,this.RegionId)).subscribe();
    this.Name = "";
    this.RegionId = null;

  }
}
