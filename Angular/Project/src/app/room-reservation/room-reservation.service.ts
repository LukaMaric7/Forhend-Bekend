import { Injectable } from '@angular/core'
import { Room } from "app/room/room.model";
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SocketService } from 'app/socket.service';
import { RoomReservation } from "app/room-reservation/room-reservation.model";

@Injectable()
export class RoomReservationService {

    constructor(private http : Http){
     }

    getAll() : Observable<any> {
        return this.http.get(SocketService.socket + "api/reservation");
    }

     add(reservation : RoomReservation) : Observable<any> {
        let header = new Headers();
        header.append('Content-type', 'application/json');

        let opts = new RequestOptions();
        opts.headers = header;

        return this.http.post(SocketService.socket + `api/reservation`, 
        JSON.stringify(reservation), opts);
    }

     delete(id : number) : Observable<any> {
        return this.http.delete(SocketService.socket + `api/reservation/${id}`);
    }
}