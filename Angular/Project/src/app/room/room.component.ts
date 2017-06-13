import { Component, OnInit, Input } from '@angular/core';
import { Room } from './room.model';
import { RoomService } from 'app/room/room.service';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
  providers: [RoomService]
})
export class RoomComponent implements OnInit {
  @Input() room : Room;
  Id : number;
  RoomNumber: number;
  BadCount: number;
  Description: string;
  PricePerNight: number;
  showEdit: boolean;

  constructor(private roomService : RoomService, private activatedRoute : ActivatedRoute) {
    this.showEdit = false;
   }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {this.Id = parseInt(params["Id"])});
    
    this.RoomNumber = this.room.RoomNumber;
    this.BadCount = this.room.BadCount;
    this.Description = this.room.Description;
    this.PricePerNight = this.room.PricePerNight;
  }

  onSubmit(){
    this.roomService.edit(new Room(this.room.Id, this.RoomNumber, this.BadCount, this.Description, 
    this.PricePerNight, this.room.AccommodationId)).subscribe();
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
