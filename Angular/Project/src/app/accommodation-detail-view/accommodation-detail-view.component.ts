import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Accommodation } from "app/accommodation/accommodation.model";
import { AccommodationService } from "app/accommodation/accommodation.service";
import { SocketService } from 'app/socket.service';
import {MapInfo} from "app/map/map-info.model";


@Component({
  selector: 'accommodation-detail-view',
  templateUrl: './accommodation-detail-view.component.html',
  styleUrls: ['./accommodation-detail-view.component.css'],
  providers: [AccommodationService, SocketService]
})
export class AccommodationDetailViewComponent implements OnInit {
  Id            : number;
  accommodation : Accommodation;
  mapInfo       : MapInfo
  showEdit      : boolean;

  Name          : string; 
  Description   : string;
  Address       : string;
  

  constructor(private accommodationService :AccommodationService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.accommodation = new Accommodation();
    this.mapInfo = new MapInfo(45.242268, 19.842954, 
    "", "" , "" , "");
    this.showEdit = false;
   }

  ngOnInit() {

    let self = this;
     this.activatedRoute.params.subscribe(params => {this.Id = parseInt(params["Id"])});
     this.accommodationService.getByIdOData(this.Id).subscribe(o =>{
        self.accommodation = (o[0] as Accommodation);
        self.changeImageUrl();
        self.mapInfo = new MapInfo(this.accommodation.Latitude, this.accommodation.Longitude, "",
           this.accommodation.Name , "" , "");
        
    });
     
  }


  changeImageUrl() : void {
      this.accommodation.ImageURL = SocketService.socket + this.accommodation.ImageURL;
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
      
  }

}
