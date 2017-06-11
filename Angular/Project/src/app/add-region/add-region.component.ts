import { Component, OnInit } from '@angular/core';
import { Region } from "app/region/region.model";
import { Country } from "app/country/country.model";
import { RegionService } from 'app/region/region.service'
import { CountryService } from "app/country/country.service";

@Component({
  selector: 'add-region',
  templateUrl: './add-region.component.html',
  styleUrls: ['./add-region.component.css'],
  providers: [RegionService, CountryService]
})
export class AddRegionComponent implements OnInit {
  Name: string;
  Country: Country;
  countries: Country [];
  CountryID: number;

  constructor(private countryService: CountryService, private addRegionService: RegionService) {
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
