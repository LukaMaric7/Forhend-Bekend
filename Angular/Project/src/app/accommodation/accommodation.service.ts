import { Injectable } from '@angular/core'
import { Country } from "app/country/country.model";
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Accommodation } from './accommodation.model';

@Injectable()
export class AccommodationService {

    constructor(private http : Http){
     }
    
    getAll() : Observable<any> {
        return this.http.get("http://localhost:54042/api/accommodation");
    }

    add(accommodation : Accommodation) : Observable<any> {
        let header = new Headers();
        header.append('Content-type', 'application/json');

        let opts = new RequestOptions();
        opts.headers = header;

        return this.http.post(`http://localhost:54042/api/accommodation`, 
        JSON.stringify(accommodation), opts);
    }
}