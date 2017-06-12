import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Country } from "app/country/country.model";
import { CountryService } from "app/country/country.service"

@Component({
  selector: 'country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css'],
  providers: [CountryService]
})

export class CountryComponent implements OnInit {
  @Input () country: Country;
  @Output () deleteCountryEvent : EventEmitter<Country>;

  constructor(private countryService : CountryService) {
    this.deleteCountryEvent = new EventEmitter();
   }

  ngOnInit() {
  }

  deleteCountry()
  {
    this.countryService.delete(this.country.Id).subscribe(x => {this.deleteCountryEvent.emit(this.country);});
  }

}
