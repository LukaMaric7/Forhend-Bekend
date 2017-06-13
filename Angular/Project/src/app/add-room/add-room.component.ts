import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { RoomService } from 'app/room/room.service';
import { Room } from 'app/room/room.model';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css']
})
export class AddRoomComponent implements OnInit {
  AccommodationId: number;
  RoomNumber: number;
  BadCount: number;
  Description: string;
  PrivePerNight: number;

  constructor(private activatedRoute: ActivatedRoute, private roomService: RoomService, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {this.AccommodationId = parseInt(params["Id"])});
  }

  onSubmit(){
    this.roomService.add(new Room(1,this.RoomNumber,this.BadCount,this.Description,this.PrivePerNight,this.AccommodationId)).subscribe();
    this.router.navigate(['/home']);
  }

}
