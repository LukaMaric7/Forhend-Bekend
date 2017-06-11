import { Component, OnInit, Input } from '@angular/core';
import { Country } from "app/country/country.model";
import { CountryListService } from "app/country-list/country-list.service"

@Component({
  selector: 'country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})

export class CountryComponent implements OnInit {
  @Input () country: Country;

  constructor(private countryService : CountryListService) { }

  ngOnInit() {
  }

  deleteCountry()
  {
    this.countryService.delete(this.country.Id).subscribe();
  }

}
