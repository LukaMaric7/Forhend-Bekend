import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Room } from './room.model';
import { RoomService } from 'app/room/room.service';
import { Router, ActivatedRoute } from "@angular/router";
import { Accommodation } from 'app/accommodation/accommodation.model';
import { LocalStorageService } from 'app/localStorage.service';

@Component({
  selector: 'room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
  providers: [RoomService, LocalStorageService]
})
export class RoomComponent implements OnInit {
  @Input() room : Room;
  @Output() deleteRoomEvent : EventEmitter<Room>;
  @Input() Accommodation : Accommodation;
  Id : number;
  RoomNumber: number;
  BadCount: number;
  Description: string;
  PricePerNight: number;
  showEdit: boolean;

  constructor(private roomService : RoomService, private activatedRoute : ActivatedRoute,
  private localStorageService : LocalStorageService) {
    this.showEdit = false;
    this.deleteRoomEvent = new EventEmitter();
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

  CanEditOrDelete() : boolean {
    if(this.localStorageService.IsLoggedIn()){
      if(this.Accommodation.UserId == this.localStorageService.getUserId()){
        return true;
      }

      return false;
    }
    return false;
  }

  CanBookRoom() : boolean{
    if(this.localStorageService.IsLoggedIn()){
      if(this.localStorageService.isUser()){
        return true;
      }
      return false;
    }
    return false
  }

  deleteRoom(){
      this.roomService.delete(this.room.Id).subscribe(x => {this.deleteRoomEvent.emit(this.room);});
  }
}
