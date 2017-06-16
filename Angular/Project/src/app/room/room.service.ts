import { Injectable } from '@angular/core'
import { Room } from "app/room/room.model";
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SocketService } from 'app/socket.service';
import { LSE } from "app/localStorageEnum.model";

@Injectable()
export class RoomService {

    constructor(private http : Http){
     }

    getAll() : Observable<any> {
        return this.http.get(SocketService.socket + "api/places");
    }

     add(room : Room) : Observable<any> {
        let header = new Headers();
        header.append('Content-type', 'application/json');
        header.append('Authorization', 'Bearer ' + localStorage.getItem(LSE.User.toString()));

        let opts = new RequestOptions();
        opts.headers = header;

        return this.http.post(SocketService.socket + `api/room`, 
        JSON.stringify(room), opts);
    }

    delete(id : number) : Observable<any> {
        let header = new Headers();
        header.append('Content-type', 'application/json');
        header.append('Authorization', 'Bearer ' + localStorage.getItem(LSE.User.toString()));

        let opts = new RequestOptions();
        opts.headers = header;
        
        return this.http.delete(SocketService.socket + `api/room/${id}`, opts);
    }

    edit(room: Room) : Observable<any> {
        let header = new Headers();
        header.append('Content-type', 'application/json');
        header.append('Authorization', 'Bearer ' + localStorage.getItem(LSE.User.toString()));

        let opts = new RequestOptions();
        opts.headers = header;

        return this.http.put(SocketService.socket + `api/room`, JSON.stringify(room), opts);
    }
}