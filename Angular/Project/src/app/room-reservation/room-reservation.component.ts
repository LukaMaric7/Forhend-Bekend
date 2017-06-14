import { Component, OnInit, Input } from '@angular/core';
import { RoomReservation } from "app/room-reservation/room-reservation.model";
import { Router, ActivatedRoute } from "@angular/router";
import { RoomReservationService } from "app/room-reservation/room-reservation.service";

@Component({
  selector: 'app-room-reservation',
  templateUrl: './room-reservation.component.html',
  styleUrls: ['./room-reservation.component.css']
})
export class RoomReservationComponent implements OnInit {
  @Input() roomReservation : RoomReservation;

  constructor() { }

  ngOnInit() {
  }

}
