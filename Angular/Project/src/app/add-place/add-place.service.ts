import { Injectable } from '@angular/core'
import { Country } from "app/country/country.model";
import { Region } from "app/region/region.model";
import { Place } from "app/place/place.model";
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AddPlaceService {

    constructor(private http : Http){
     }


    add(place : Place) : Observable<any> {
        let header = new Headers();
        header.append('Content-type', 'application/json');

        let opts = new RequestOptions();
        opts.headers = header;

        return this.http.post(`http://localhost:54042/api/places`, 
        JSON.stringify(place), opts);
    }
}