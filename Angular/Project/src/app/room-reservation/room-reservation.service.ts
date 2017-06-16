import { Injectable } from '@angular/core'
import { Room } from "app/room/room.model";
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SocketService } from 'app/socket.service';
import { RoomReservation } from "app/room-reservation/room-reservation.model";
import { LSE } from "app/localStorageEnum.model";

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
        header.append('Authorization', 'Bearer ' + localStorage.getItem(LSE.User.toString()));

        let opts = new RequestOptions();
        opts.headers = header;

        return this.http.post(SocketService.socket + `api/reservation`, 
        JSON.stringify(reservation), opts);
    }

    delete(id : number) : Observable<any> {
        let header = new Headers();
        header.append('Content-type', 'application/json');
        header.append('Authorization', 'Bearer ' + localStorage.getItem(LSE.User.toString()));

        let opts = new RequestOptions();
        opts.headers = header;

        return this.http.delete(SocketService.socket + `api/reservation/${id}`, opts);
    }

    getByUserIdOData(Id : number) : Observable<any> {
        return this.http.get(SocketService.socket + `api/reservation?$filter=UserId eq ${Id} &$expand=Room, Room/Accommodation`).map(res => res.json() );
    }

    getByAccIdUserIdAndDate(AccId : number, UserId : number, date : string) : Observable<any> {
        return this.http.get(SocketService.socket + `api/reservation?$filter=Room/Accommodation/Id eq ${AccId} and UserId eq ${UserId} and StartDate le DateTime'${date} and Canceled eq false'`).map(res => res.json() );
    }

    cancel(id : number){
        let header = new Headers();
        header.append('Content-type', 'application/json');
        header.append('Authorization', 'Bearer ' + localStorage.getItem(LSE.User.toString()));

        let opts = new RequestOptions();
        opts.headers = header;

        return this.http.delete(SocketService.socket + `api/reservation/${id}`);
    }
}