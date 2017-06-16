import { Component, OnInit } from '@angular/core';
import { Country } from "app/country/country.model";
import { CountryService } from "app/country/country.service"
import { Router } from '@angular/router';

@Component({
  selector: 'add-country',
  templateUrl: './add-country.component.html',
  styleUrls: ['./add-country.component.css'],
  providers: [CountryService]
})
export class AddCountryComponent implements OnInit {

  constructor(private countryService : CountryService, private router : Router) { }

  Name: string;
  Code: string;

  ngOnInit() {
  }

  onSubmit()
  {
    this.countryService.add(new Country(2,this.Name,this.Code)).subscribe(x => {this.router.navigate(['/home']);}, x => {alert(x.json().Message)});
    this.Name = "";
    this.Code = "";
  }
}
