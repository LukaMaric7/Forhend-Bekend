import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
import { SocketService } from "app/socket.service";
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
  providers: [AccommodationService, AccommodationTypeService, PlaceService, RegionService, CountryService, SocketService]
})
export class FilterComponent implements OnInit {
 accommodaitons : Accommodation[];
 @Output() filterEvent : EventEmitter<string>;
  Name                  : string; 
  AverageGrade          : number;
  AccommodationTypeName : string;
  PlaceName             : string;
  CountryName           : string;
  RegionName            : string;
  BedCount              : number;
  MinPrice              : number;
  MaxPrice              : number;

  types                 : AccommodationType[];  
  places                : Place[];
  regions               : Region[];
  countries             : Country[];
  Place                 : Place;
  Region                : Region;



  constructor(private accommodationTypeService : AccommodationTypeService, private accommodationService : AccommodationService, 
              private placeService : PlaceService, private regionService : RegionService, private countryService : CountryService, private http : Http) {
    this.types = [];
    this.places = [];
    this.regions = [];
    this.countries = [];
    this.Name = "";
    this.AccommodationTypeName = "";
    this.CountryName = "";
    this.RegionName = "";
    this.PlaceName = "";
    this.filterEvent = new EventEmitter();
  }

  ngOnInit() {
  }

  Remove(){
    let query = `&$filter=Approved eq true `;
    
    //this.accommodationService.getByQuery(query).subscribe(o => { console.log(o); this.accommodaitons = o;
        this.filterEvent.emit(query);
  }

  onSubmit() {
    let query = "&$filter=Approved eq true and ";
    if(this.CountryName != ""){
      query += `Place/Region/Country/Name eq '${this.CountryName}' and `;
    }

    if(this.RegionName != ""){
      query += `Place/Region/Name eq '${this.RegionName}' and `;
    }

    if(this.PlaceName != ""){
      query += `Place/Name eq '${this.PlaceName}' and `;
    }

    if(this.AccommodationTypeName != ""){
      query += `AccommodationType/Name eq '${this.AccommodationTypeName}' and `;
    }

    if(this.Name != "")
    {
      query += `Name eq '${this.Name}' and `;
    }

    if(this.BedCount != undefined)
    {
      query += `Rooms/any(room : room/BadCount eq ${this.BedCount}) and `;
    }

    if(this.MinPrice != undefined)
    {
      query += `Rooms/any(room : room/PricePerNight ge ${this.MinPrice}) and `;
    }

    if(this.MaxPrice != undefined)
    {
      query += `Rooms/any(room : room/PricePerNight le ${this.MaxPrice}) and `;
    }

    if(this.AverageGrade != undefined)
    {
      query += `AverageGrade ge ${this.AverageGrade} and `;
    }


    if(this.CountryName == "" && this.RegionName == "" && this.PlaceName == "" && this.AccommodationTypeName == "" && this.Name == "" &&
       this.BedCount == undefined && this.MinPrice == undefined && this.MaxPrice == undefined && this.AverageGrade == undefined){
      query = `?$expand=Place,AccommodationType`;
    }
    else{
      query = query.substr(0, query.lastIndexOf('and '));
      query += `&$expand=Place,AccommodationType`;
      this.CountryName = "";
      this.RegionName = "";
      this.PlaceName = "";
      this.Name = "";
      this.AccommodationTypeName = "";
      this.BedCount = undefined;
      this.MinPrice = undefined;
      this.MaxPrice = undefined;
      this.AverageGrade = undefined;
    }

    
    //this.accommodationService.getByQuery(query).subscribe(o => { console.log(o); this.accommodaitons = o;
     this.filterEvent.emit(query);
 }
}


