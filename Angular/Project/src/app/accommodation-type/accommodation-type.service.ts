import { Injectable } from '@angular/core'
import { Country } from "app/country/country.model";
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AccommodationType } from './accommodation-type.model';

@Injectable()
export class AccommodationTypeService {

    constructor(private http : Http){
     }
    
    add(accommodationType : AccommodationType) : Observable<any> {
        let header = new Headers();
        header.append('Content-type', 'application/json');

        let opts = new RequestOptions();
        opts.headers = header;

        return this.http.post(`http://localhost:54042/api/accommodationTypes`, 
        JSON.stringify(accommodationType), opts);
    }
}