import { Component, OnInit } from '@angular/core';
import { AddPlaceService } from './add-place.service'
import { CountryListService } from "app/country-list/country-list.service";
import { Country } from "app/country/country.model";
import { Region} from "app/region/region.model";

@Component({
  selector: 'app-add-place',
  templateUrl: './add-place.component.html',
  styleUrls: ['./add-place.component.css'],
  providers: [AddPlaceService, CountryListService]
})
export class AddPlaceComponent implements OnInit {

  countries : Country[];
  regions : Region[];
  Name : string;
  RegionId : number;
  CountryId : number;
  countrySelected : boolean;

  constructor(private countryService: CountryListService, private addPlaceService: AddPlaceService) {
    this.regions = [];
    this.CountryId = -1;
    this.countrySelected = false;
   }
  

  ngOnInit() {
    this.countryService.getAll().subscribe(x => this.countries = x.json());
  }

  getRegionsFromCountry(){
    if(this.CountryId != -1){
      this.countrySelected = true;
    }
  }

  onSubmit(){
  }

  isCountrySelected(){
    return this.countrySelected;
  }
}
