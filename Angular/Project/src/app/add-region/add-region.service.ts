import { Injectable } from '@angular/core'
import { Country } from "app/country/country.model";
import { Region } from "app/region/region.model";
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AddRegionService {

    constructor(private http : Http){
     }


    add(region : Region) : Observable<any> {
        let header = new Headers();
        header.append('Content-type', 'application/json');

        let opts = new RequestOptions();
        opts.headers = header;

        return this.http.post(`http://localhost:54042/api/region`, 
        JSON.stringify(region), opts);
    }
}