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
  RoomId    : number;
  UserId    : number;
  StartDate : Date;
  EndDate   : Date;
  currentDate: Date;
  

  constructor(private roomReservationService : RoomReservationService, private router: Router, private activatedRoute: ActivatedRoute) {

   }

  ngOnInit() {
     this.activatedRoute.params.subscribe(params => {this.RoomId = parseInt(params["Id"])});
     this.UserId = parseInt(localStorage.getItem(LSE.Id.toString()));
     this.currentDate = new Date();
     console.log(this.currentDate);
  }

   onSubmit(){
     this.roomReservationService.add(new RoomReservation(1,this.RoomId, this.UserId, this.StartDate, this.EndDate)).subscribe();
  }

}
