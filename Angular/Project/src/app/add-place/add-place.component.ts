import { Component, OnInit } from '@angular/core';
import { PlaceService } from 'app/place/place.service'
import { CountryService } from "app/country/country.service";
import { Country } from "app/country/country.model";
import { Region} from "app/region/region.model";
import { Place } from "app/place/place.model";
import { RegionService } from "app/region/region.service";

@Component({
  selector: 'app-add-place',
  templateUrl: './add-place.component.html',
  styleUrls: ['./add-place.component.css'],
  providers: [PlaceService, CountryService, RegionService]
})
export class AddPlaceComponent implements OnInit {

  regions : SVGNumberList[];
  Name : string;
  RegionId : number;

  constructor(private countryService: CountryService, private PlaceService: PlaceService, 
  private regionListService : RegionService) {
    this.regions = [];
   }
  

  ngOnInit() {
    this.regionListService.getAll().subscribe(x => {this.regions = x.json(); console.log(this.regions);});
  }

  onSubmit(){
    this.PlaceService.add(new Place(1,this.Name,this.RegionId)).subscribe();
    this.Name = "";
    this.RegionId = null;

  }
}
