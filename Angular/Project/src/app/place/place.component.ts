import { Component, OnInit, Input } from '@angular/core';
import { Place } from "app/place/place.model";
import { PlaceService } from './place.service'

@Component({
  selector: 'place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css'],
  providers: [PlaceService]
})
export class PlaceComponent implements OnInit {
  @Input () place : Place;
  showEdit : boolean;
  Name : string;

  constructor(private placeService : PlaceService) { }

  ngOnInit() {
  }

  deletePlace()
  {
     this.placeService.delete(this.place.Id).subscribe();
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
    this.placeService.edit(new Place(this.place.Id, this.Name, this.place.RegionId)).subscribe();
  }


}
