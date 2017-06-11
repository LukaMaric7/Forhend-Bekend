import { Injectable } from '@angular/core'
import { Country } from "app/country/country.model";
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CountryDetailViewService {

    constructor(private http : Http){
     }

    getById(Id : number) : Observable<any> {
        return this.http.get(`http://localhost:54042/api/countries?$filter=Id eq ${Id} &$expand=Regions`).map(res => res.json());
    }

    edit
}