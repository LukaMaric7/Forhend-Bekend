import { Component, OnInit } from '@angular/core';
import { Country } from "app/country/country.model";
import { CountryListService } from "app/country-list/country-list.service"

@Component({
  selector: 'add-country',
  templateUrl: './add-country.component.html',
  styleUrls: ['./add-country.component.css'],
  providers: [CountryListService]
})
export class AddCountryComponent implements OnInit {

  constructor(private countryService : CountryListService) { }

  Name: string;
  Code: string;

  ngOnInit() {
  }

  onSubmit()
  {
    this.countryService.add(new Country(2,this.Name,this.Code)).subscribe();
    this.Name = "";
    this.Code = "";
  }
}
