import { Component, OnInit } from '@angular/core';
import { Country } from "app/country/country.model";
import { CountryService } from 'app/country/country.service'

@Component({
  selector: 'country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css'],
  providers: [CountryService]
})

export class CountryListComponent implements OnInit {
  countries: Country [];

  constructor(private countryService : CountryService) { 
    this.countries = [];
  }

  ngOnInit() {
    this.countryService.getAll().subscribe(x => this.countries = x.json());
  }

  deleteCountry(country : Country) : void{
    let index = this.countries.indexOf(country);
    this.countries.splice(index,1);
  }
}
