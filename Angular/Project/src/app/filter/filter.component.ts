import { Component, OnInit, Input } from '@angular/core';
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
  @Input() accommodaitons : Accommodation[];
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
  }

  ngOnInit() {
  }

  onSubmit() {
    let query = "?$filter=";
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
      query = "";
    }
    else{
      query = query.substr(0, query.lastIndexOf('and '));
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

    
    this.accommodationService.getByQuery(query).subscribe(o => console.log(o));

/*
    if       ( this.CountryName == "" && this.RegionName == "" && this.PlaceName == "" ) {
      this.accommodationService.getAll().subscribe(o => {this.accommodaitons = o.json(); } );
    } else if( this.CountryName == "" && this.RegionName == "" && this.PlaceName != "" ) {
      this.placeService.getByNameOData(this.PlaceName).subscribe(o => {this.accommodaitons = (o[0] as Place).Accommodations; } );
    } else if( this.CountryName == "" && this.RegionName != "" && this.PlaceName == "" ) {
      this.regionService.getByNameOData(this.RegionName).subscribe( o => {
        this.places = o[0].Places;
        let query = `?$filter=PlaceId eq `;
        for(let entry of this.places) {
          query += entry.Id.toString()  + ` or PlaceId eq `; 
        }
        query = query.substr(0, query.lastIndexOf('o'));

        this.accommodationService.getByQuery(query).subscribe( o => { this.accommodaitons = o; console.log(this.accommodaitons)});
      });
    } else if( this.CountryName == "" && this.RegionName != "" && this.PlaceName != "" ) {
        this.placeService.getByNameOData(this.PlaceName).subscribe(o => {
          if( (o[0] as Place) != undefined){
            if( (o[0] as Place).Region.Name == this.RegionName){
              this.accommodaitons = (o[0] as Place).Accommodations;
            }
            else{
              this.accommodaitons = [];
            }
          }
          else{
              this.accommodaitons = [];
          }
         } );
    } else if( this.CountryName != "" && this.RegionName == "" && this.PlaceName == "" ) {
        this.countryService.getByName(this.CountryName).subscribe(o => {
          this.regions = o[0].Regions;
          
          let query = `?$filter=RegionId eq `;
          for(let entry of this.regions) {
            query += entry.Id.toString()  + ` or RegionId eq `; 
          }
          query = query.substr(0, query.lastIndexOf('or'));

          this.placeService.getByQuery(query).subscribe( o => { 
            this.places = o; 

            let query1 = `?$filter=PlaceId eq `;
            for(let entry of this.places) {
              query1 += entry.Id.toString()  + ` or PlaceId eq `; 
            }
            query1 = query1.substr(0, query1.lastIndexOf('o'));

            this.accommodationService.getByQuery(query1).subscribe( o => { this.accommodaitons = o; console.log(this.accommodaitons)});

          });
        });
    } else if( this.CountryName != "" && this.RegionName == "" && this.PlaceName != "" ) {
        this.placeService.getByNameOData(this.PlaceName).subscribe(o => {
          this.Place = o[0];
          if(this.Place != undefined)
          {
            if(this.Place.Region.Country.Name == this.CountryName) {
              this.accommodaitons = this.Place.Accommodations;
            }
            else{
              this.accommodaitons = [];
            }
          }
          else{
            this.accommodaitons = [];
          }

        });
    } else if( this.CountryName != "" && this.RegionName != "" && this.PlaceName == "" ) {
        this.regionService.getByNameOData(this.RegionName).subscribe(o => {
          this.Region = o[0];
          
          if(this.Region != undefined){
            if(this.Region.Country.Name == this.CountryName) {
              this.places = this.Region.Places;
              let query = `?$filter=PlaceId eq `;
              for(let entry of this.places) {
                query += entry.Id.toString()  + ` or PlaceId eq `; 
              }
              query = query.substr(0, query.lastIndexOf('o'));

              this.accommodationService.getByQuery(query).subscribe( o => { this.accommodaitons = o; });
            }
            else {
              this.accommodaitons = [];
            }
          }
          else{
            this.accommodaitons = [];
          }
        });
        
    } else if( this.CountryName != "" && this.RegionName != "" && this.PlaceName != "" ) {
        this.placeService.getByNameOData(this.PlaceName).subscribe(o => {
          this.Place = o[0];
          if(this.Place != undefined)
          {
            if(this.Place.Region.Country.Name == this.CountryName && this.Place.Region.Name == this.RegionName) {
              this.accommodaitons = this.Place.Accommodations;
            }
            else{
              this.accommodaitons = [];
            }
          }
          else{
            this.accommodaitons = [];
          }

        });
    }*/
 }
}


