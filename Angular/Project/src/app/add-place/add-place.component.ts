import { Component, OnInit } from '@angular/core';
import { PlaceService } from 'app/place/place.service'
import { CountryService } from "app/country/country.service";
import { Country } from "app/country/country.model";
import { Region} from "app/region/region.model";
import { Place } from "app/place/place.model";
import { RegionService } from "app/region/region.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-place',
  templateUrl: './add-place.component.html',
  styleUrls: ['./add-place.component.css'],
  providers: [PlaceService, CountryService, RegionService]
})
export class AddPlaceComponent implements OnInit {

  regions : Region[];
  Name : string;
  RegionId : number;

  constructor(private countryService: CountryService, private PlaceService: PlaceService, 
  private regionService : RegionService, private route : Router) {
    this.regions = [];
   }
  

  ngOnInit() {
    this.regionService.getAll().subscribe(x => {this.regions = x.json();},);
  }

  onSubmit(){
    this.PlaceService.add(new Place(1,this.Name,this.RegionId)).subscribe(o => {this.route.navigate(['/home/']);}, o => alert(o.json().Message));
    this.Name = "";
    this.RegionId = null;

  }
}
