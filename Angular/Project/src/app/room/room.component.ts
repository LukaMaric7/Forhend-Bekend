import { Component, OnInit, Input } from '@angular/core';
import { Room } from './room.model';

@Component({
  selector: 'room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  @Input() room : Room;

  constructor() { }

  ngOnInit() {
  }

}
