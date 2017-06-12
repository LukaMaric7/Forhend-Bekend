import { Component, OnInit } from '@angular/core';
import { CountryService } from 'app/country/country.service'
import { Country } from "app/country/country.model";
import { Router, ActivatedRoute } from "@angular/router";
import { Region } from 'app/region/region.model';

@Component({
  selector: 'country-detail-view',
  templateUrl: './country-detail-view.component.html',
  styleUrls: ['./country-detail-view.component.css'],
  providers: [CountryService]
})
export class CountryDetailViewComponent implements OnInit {
  Id : number;
  country : Country;
  showEdit : Boolean;
  Name: string;
  Code: string;

  constructor(private countryService : CountryService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.country = new Country();
    this.showEdit = false;
   }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {this.Id = parseInt(params["Id"])});
    console.log(this.Id);
    this.countryService.getByIdOData(this.Id).subscribe(o => {this.country = (o[0] as Country); console.log(this.country)});
  }

  isShowEditPress() {
    return this.showEdit;
  }

  changeShowEdit()
  {
    if(this.showEdit)
    {
       this.showEdit = false;
    }
    else
    {
      this.showEdit = true;
    }
  }

  onSubmit()
    {
      this.countryService.edit(new Country(this.Id, this.Name, this.Code)).subscribe();
      this.Name = "";
      this.Code = "";
    }

  deleteRegion(region : Region) : void{
    let index = this.country.Regions.indexOf(region);
    this.country.Regions.splice(index,1);
  }
}
