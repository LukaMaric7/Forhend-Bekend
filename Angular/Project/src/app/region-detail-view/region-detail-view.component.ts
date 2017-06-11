import { Component, OnInit } from '@angular/core';
import { Region } from "app/region/region.model";
import { Router, ActivatedRoute } from "@angular/router";
import { RegionService } from 'app/region/region.service';

@Component({
  selector: 'region-detail-view',
  templateUrl: './region-detail-view.component.html',
  styleUrls: ['./region-detail-view.component.css'],
  providers: [RegionService]
})
export class RegionDetailViewComponent implements OnInit {
  Id : number;
  region : Region;
  showEdit : Boolean;
  Name : string;

  constructor(private regionService : RegionService,private router: Router, private activatedRoute: ActivatedRoute) { 
    this.region = new Region();
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {this.Id = parseInt(params["Id"])});
    this.showEdit = false;
    this.regionService.getByIdOData(this.Id).subscribe(o => {this.region = (o[0] as Region);});
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

  onSubmit(){
    this.showEdit = false;
    this.regionService.edit(this.Id, new Region(this.region.Id, this.Name, this.region.CountryId)).subscribe();
  }

}
