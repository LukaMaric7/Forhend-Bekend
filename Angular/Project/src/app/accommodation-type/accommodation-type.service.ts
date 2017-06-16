import { Injectable } from '@angular/core'
import { Country } from "app/country/country.model";
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AccommodationType } from './accommodation-type.model';
import { SocketService } from 'app/socket.service';
import { LSE } from "app/localStorageEnum.model";

@Injectable()
export class AccommodationTypeService {

    constructor(private http : Http){
     }

    getAll() : Observable<any> {
        return this.http.get(SocketService.socket + "api/accommodationTypes");
    }
    
    add(accommodationType : AccommodationType) : Observable<any> {
        let header = new Headers();
        header.append('Content-type', 'application/json');
        header.append('Authorization', 'Bearer ' + localStorage.getItem(LSE.User.toString()));

        let opts = new RequestOptions();
        opts.headers = header;

        return this.http.post(SocketService.socket + `api/accommodationTypes`, 
        JSON.stringify(accommodationType), opts);
    }

    delete(id : number) : Observable<any> {
        let header = new Headers();
        header.append('Content-type', 'application/json');
        header.append('Authorization', 'Bearer ' + localStorage.getItem(LSE.User.toString()));

        let opts = new RequestOptions();
        opts.headers = header;

        return this.http.delete(SocketService.socket + `api/accommodationTypes/${id}`, opts);
    }

    edit(accommodationType: AccommodationType) : Observable<any> {
        let header = new Headers();
        header.append('Content-type', 'application/json');
        header.append('Authorization', 'Bearer ' + localStorage.getItem(LSE.User.toString()));

        let opts = new RequestOptions();
        opts.headers = header;

        return this.http.put(SocketService.socket + `api/accommodationTypes`, JSON.stringify(accommodationType), opts);
    }
}