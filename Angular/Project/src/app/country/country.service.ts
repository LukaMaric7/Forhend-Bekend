import { Injectable } from '@angular/core'
import { Country } from "app/country/country.model";
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SocketService } from 'app/socket.service';

@Injectable()
export class CountryService {

    constructor(private http : Http){
     }

    getAll() : Observable<any> {
        return this.http.get(SocketService.socket + "api/countries");
    }

    getById(id : number) : Observable<any> {
        return this.http.get(SocketService.socket + `api/countries/${id}`);
    }

    add(country : Country) : Observable<any> {
        let header = new Headers();
        header.append('Content-type', 'application/json');

        let opts = new RequestOptions();
        opts.headers = header;

        return this.http.post(SocketService.socket + `api/countries`, 
        JSON.stringify(country), opts);
    }

    delete(id : number) : Observable<any> {
        return this.http.delete(SocketService.socket + `api/countries/${id}`);
    }

    getByIdOData(Id : number) : Observable<any> {
        return this.http.get(SocketService.socket + `api/countries?$filter=Id eq ${Id} &$expand=Regions`).map(res => res.json());
    }

    edit(country: Country) : Observable<any> {
        let header = new Headers();
        header.append('Content-type', 'application/json');

        let opts = new RequestOptions();
        opts.headers = header;

        return this.http.put(SocketService.socket + `api/countries`, JSON.stringify(country), opts);
    }

    getByName(Name : string) : Observable<any> {
        return this.http.get(SocketService.socket + `api/countries?$filter=Name eq '${Name}' &$expand=Regions`).map(res => res.json());
    }

    
}