import { Component, OnInit } from '@angular/core';
import { Region } from "app/region/region.model";
import { Country } from "app/country/country.model";
import { AddRegionService } from './add-region.service'
import { CountryListService } from "app/country-list/country-list.service";

@Component({
  selector: 'add-region',
  templateUrl: './add-region.component.html',
  styleUrls: ['./add-region.component.css'],
  providers: [AddRegionService, CountryListService]
})
export class AddRegionComponent implements OnInit {
  Name: string;
  Country: Country;
  countries: Country [];
  CountryID: number;

  constructor(private countryService: CountryListService, private addRegionService: AddRegionService) {
    this.countries = [];
   }

  ngOnInit() {
    this.countryService.getAll().subscribe(x => this.countries = x.json());
  }

  onSubmit(param : any){
    console.log(param);
    this.addRegionService.add(new Region(1, this.Name, this.CountryID)).subscribe();
    this.Name = "";
    this.Country = null;
  }

}
