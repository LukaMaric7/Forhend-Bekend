import { Injectable } from '@angular/core'
import { Place } from "app/place/place.model";
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SocketService } from 'app/socket.service';

@Injectable()
export class PlaceService {

    constructor(private http : Http){
     }

    getAll() : Observable<any> {
        return this.http.get(SocketService.socket + "api/places");
    }

     add(place : Place) : Observable<any> {
        let header = new Headers();
        header.append('Content-type', 'application/json');

        let opts = new RequestOptions();
        opts.headers = header;

        return this.http.post(SocketService.socket + `api/places`, 
        JSON.stringify(place), opts);
    }

     delete(id : number) : Observable<any> {
        return this.http.delete(SocketService.socket + `api/places/${id}`);
    }

       edit(place: Place) : Observable<any> {
        let header = new Headers();
        header.append('Content-type', 'application/json');

        let opts = new RequestOptions();
        opts.headers = header;

        return this.http.put(SocketService.socket + `api/places`, JSON.stringify(place), opts);
    }
}