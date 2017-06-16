import { Component, OnInit } from '@angular/core';
import { Accommodation } from "app/accommodation/accommodation.model";
import { AccommodationService } from "app/accommodation/accommodation.service";
import { AccommodationType } from "app/accommodation-type/accommodation-type.model";
import { AccommodationTypeService } from "app/accommodation-type/accommodation-type.service";
import { Place } from "app/place/place.model";
import { PlaceService } from "app/place/place.service";
import { Region } from "app/region/region.model";
import { RegionService } from "app/region/region.service";
import { Country }  from "app/country/country.model";
import { CountryService } from "app/country/country.service";
import { LSE } from "app/localStorageEnum.model";
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-accommodation',
  templateUrl: './add-accommodation.component.html',
  styleUrls: ['./add-accommodation.component.css'],
  providers: [AccommodationService, PlaceService, AccommodationTypeService, RegionService, CountryService]
})
export class AddAccommodationComponent implements OnInit {
    Id                  : number;
    Name                : string; 
    Description         : string;
    Address             : string;
    AverageGrade        : number;
    Latitude            : number;
    Longitude           : number;
    ImageURL            : File;
    Approved            : boolean;
    AccommodationType   : AccommodationType;
    AccommodationTypeId : number;
    Place               : Place;
    PlaceId             : number;
    UserId              : number;
    
    Country             : Country;
    CountryId           : number;

    Region              : Region;
    RegionId            : number;

    types               : AccommodationType[];
    places              : Place[];
    regions             : Region[];
    countries           : Country[];
    file                : File;

  constructor(private accommodationTypeService : AccommodationTypeService, private accommodationService : AccommodationService, 
              private placeService : PlaceService, private regionService : RegionService, private countryService : CountryService,
              private router : Router) {
    this.types = [];
    this.places = [];
    this.regions = [];
    this.countries = [];
   }

  onChange(event: EventTarget) {
        let eventObj: MSInputMethodContext = <MSInputMethodContext> event;
        let target: HTMLInputElement = <HTMLInputElement> eventObj.target;
        let files: FileList = target.files;
        this.file = files[0];
        console.log(this.file);
    }

  ngOnInit() {
    this.accommodationTypeService.getAll().subscribe(o => this.types = o.json());
    //this.placeService.getAll().subscribe(o => this.places = o.json());
    this.countryService.getAll().subscribe(o => this.countries = o.json());
    this.Country = null;
    this.Region = null;
    this.Place = null;
  }

  onSubmit()
  {
    this.accommodationService.add(new Accommodation(1, this.Name, this.Description, this.Latitude, this.Longitude, this.AccommodationTypeId,
    this.Address, this.PlaceId, parseInt(localStorage.getItem(LSE.Id.toString()))), this.file).subscribe(x => {this.router.navigate(['/home'])}, x => {alert(x.json().Message)});
  }

  CountrySelected()
  {
    this.countryService.getByIdOData(this.CountryId).subscribe(
      o => {
        this.Country = o[0] as Country; 
        this.regions = this.Country.Regions;
      });
  }

  IsSelectedCountry() : boolean
  {
    if( this.Country == null )
      return false;
    return true;
  }

  RegionSelected()
  {
    this.regionService.getByIdOData(this.RegionId).subscribe(
      o => {
        this.Region = o[0] as Region; 
        this.places = this.Region.Places;
      });
  }

  IsSelectedRegion() : boolean
  {
    if( this.Region == null )
      return false;
    return true;
  }

}
