import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { RoomReservationService } from "app/room-reservation/room-reservation.service";
import { RoomReservation } from "app/room-reservation/room-reservation.model";
import { LSE } from "app/localStorageEnum.model";


@Component({
  selector: 'app-add-room-reservation',
  templateUrl: './add-room-reservation.component.html',
  styleUrls: ['./add-room-reservation.component.css'],
  providers: [RoomReservationService]
})
export class AddRoomReservationComponent implements OnInit {
  RoomId      : number;
  UserId      : number;
  StartDate   : Date;
  EndDate     : Date;
  currentDate : string;
  minForEnd   : string;

  booking     : boolean;
  busy        : boolean;
  success     : boolean;

  constructor(private roomReservationService : RoomReservationService, private router: Router, private activatedRoute: ActivatedRoute) {
   }

  ngOnInit() {
     this.activatedRoute.params.subscribe(params => {this.RoomId = parseInt(params["Id"])});
     this.UserId = parseInt(localStorage.getItem(LSE.Id.toString()));
     this.currentDate = new Date().toJSON().split('T')[0];
     this.minForEnd = this.currentDate;
     this.booking = true;
  }

   onSubmit(){
    if(this.StartDate != undefined && this.EndDate != undefined)
    {
      this.roomReservationService.add(new RoomReservation(1,this.RoomId, this.UserId, this.StartDate, this.EndDate)).subscribe(o =>{
        this.booking = false;
        this.success = true;
        console.log("udje")
      }, o=> {this.busy = true; this.booking = false;});    
    }
    else{
      alert("Some fields are empty!");
    }
  }

  Booking(){
    return this.booking;
  }

  Busy(){
    return this.busy;
  }

  Success(){
    return this.success;
  }

  changeStartDate(){
    this.minForEnd = this.StartDate.toString();

    this.booking = true;
    this.success = false;
    this.busy = false;

    if(this.StartDate > this.EndDate)
    {
      this.EndDate = this.StartDate;
    }
  }

  changeStartDate1(){
    this.booking = true;
    this.success = false;
    this.busy = false;
  }

}
