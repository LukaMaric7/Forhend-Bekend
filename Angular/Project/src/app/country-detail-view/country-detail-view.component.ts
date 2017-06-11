import { Component, OnInit } from '@angular/core';
import { CountryDetailViewService } from './country-detail-view.service'
import { Country } from "app/country/country.model";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'country-detail-view',
  templateUrl: './country-detail-view.component.html',
  styleUrls: ['./country-detail-view.component.css'],
  providers: [CountryDetailViewService]
})
export class CountryDetailViewComponent implements OnInit {
  Id : number;
  country : Country;
  showEdit : Boolean;

  constructor(private countryService : CountryDetailViewService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.country = new Country();
    this.showEdit = false;
   }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {this.Id = parseInt(params["Id"])});
    console.log(this.Id);
    this.countryService.getById(this.Id).subscribe(o => {this.country = (o[0] as Country); console.log(this.country)});
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

}
