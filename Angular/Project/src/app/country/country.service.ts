import { Injectable } from '@angular/core'
import { Country } from "app/country/country.model";
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CountryService {

    constructor(private http : Http){
     }

    getAll() : Observable<any> {
        return this.http.get("http://localhost:54042/api/countries");
    }

    getById(id : number) : Observable<any> {
        return this.http.get(`http://localhost:54042/api/countries/${id}`);
    }

    add(country : Country) : Observable<any> {
        let header = new Headers();
        header.append('Content-type', 'application/json');

        let opts = new RequestOptions();
        opts.headers = header;

        return this.http.post(`http://localhost:54042/api/countries`, 
        JSON.stringify(country), opts);
    }

    delete(id : number) : Observable<any> {
        return this.http.delete(`http://localhost:54042/api/countries/${id}`);
    }

    getByIdOData(Id : number) : Observable<any> {
        return this.http.get(`http://localhost:54042/api/countries?$filter=Id eq ${Id} &$expand=Regions`).map(res => res.json());
    }

    edit(id: number, country: Country) : Observable<any> {
        let header = new Headers();
        header.append('Content-type', 'application/json');

        let opts = new RequestOptions();
        opts.headers = header;
        console.log( country);
        return this.http.put(`http://localhost:54042/api/countries`, JSON.stringify(country), opts);
    }
}