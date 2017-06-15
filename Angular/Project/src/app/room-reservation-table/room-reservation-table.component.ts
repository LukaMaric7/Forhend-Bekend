import { Component, OnInit } from '@angular/core';
import { RoomReservationService } from "app/room-reservation/room-reservation.service";
import { RoomReservation } from "app/room-reservation/room-reservation.model";
import { LSE } from "app/localStorageEnum.model";

@Component({
  selector: 'app-room-reservation-table',
  templateUrl: './room-reservation-table.component.html',
  styleUrls: ['./room-reservation-table.component.css'],
  providers: [RoomReservationService]
})
export class RoomReservationTableComponent implements OnInit {
  reservations : RoomReservation[];

  constructor(private reservaationService : RoomReservationService) { }

  ngOnInit() {
    this.reservaationService.getByUserIdOData(parseInt(localStorage.getItem(LSE.Id.toString()))).subscribe( o => {
      this.reservations = o;
      console.log(this.reservations);
    });
  }
  Cancel(Id : number)
  {
    this.reservaationService.cancel(Id).subscribe(o => {
      this.reservations.find(o=>o.Id == Id).Canceled = true;
    });
  }

}
