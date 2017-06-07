import { Component, OnInit } from '@angular/core';
import { Country } from "app/country/country.model";
import { CountryListService } from './country-list.service'

@Component({
  selector: 'country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css'],
  providers: [CountryListService]
})

export class CountryListComponent implements OnInit {
  countries: Country [];
  Name: string;
  Code: string;

  constructor(private countryService : CountryListService) { 
    this.countries = [];
  }

  ngOnInit() {
    this.countryService.getAll().subscribe(x => this.countries = x.json());
  }

  onSubmit()
  {
    this.countryService.add(new Country(1,this.Name,this.Code));
    this.Name = "";
    this.Code = "";
  }
}
