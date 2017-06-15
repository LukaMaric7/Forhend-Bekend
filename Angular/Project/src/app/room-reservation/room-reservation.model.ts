import { Room } from "app/room/room.model";

export class RoomReservation {
    Id        : number;
    Room      : Room;
    RoomId    : number;
    UserId    : number;
    StartDate : Date;
    EndDate   : Date;
    Canceled  : boolean;

    constructor (id? : number, roomId? : number, userId? : number, startDate? : Date, endDate? : Date) {
        this.Id = id;
        this.RoomId = roomId;
        this.UserId = userId;
        this.StartDate = startDate;
        this.EndDate = endDate;
        this.Canceled = false;
    }
}