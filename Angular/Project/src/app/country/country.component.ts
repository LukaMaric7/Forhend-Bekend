import { Component, OnInit, Input } from '@angular/core';
import { Country } from "app/country/country.model";

@Component({
  selector: 'country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})

export class CountryComponent implements OnInit {
  @Input () country: Country;

  constructor() { }

  ngOnInit() {
  }

}
