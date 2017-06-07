import { Component, OnInit } from '@angular/core';
import { Country } from "app/country/country.model";

@Component({
  selector: 'country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})
export class CountryListComponent implements OnInit {
  countries: Country [];
  
  constructor() { }

  ngOnInit() {
  }

}
