import { Component, OnInit, Input } from '@angular/core';
import { Country } from "app/country/country.model";
import { CountryService } from "app/country/country.service"

@Component({
  selector: 'country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})

export class CountryComponent implements OnInit {
  @Input () country: Country;

  constructor(private countryService : CountryService) { }

  ngOnInit() {
  }

  deleteCountry()
  {
    this.countryService.delete(this.country.Id).subscribe();
  }

}
