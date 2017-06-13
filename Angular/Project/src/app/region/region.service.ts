import { Injectable } from '@angular/core'
import { Region } from "app/region/region.model";
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SocketService } from 'app/socket.service';

@Injectable()
export class RegionService {

    json : String;
    constructor(private http : Http){
     }

     add(region : Region) : Observable<any> {
        let header = new Headers();
        header.append('Content-type', 'application/json');

        let opts = new RequestOptions();
        opts.headers = header;

        return this.http.post(SocketService.socket + `api/region`, 
        JSON.stringify(region), opts);
    }

     getAll() : Observable<any> {
        return this.http.get(SocketService.socket + "api/region?$expand=Country");
    }

    getById(id : number) : Observable<any> {
        return this.http.get(SocketService.socket + `api/region/${id}`);
    }

     getByIdOData(Id : number) : Observable<any> {
        return this.http.get(SocketService.socket + `api/region?$filter=Id eq ${Id} &$expand=Places`).map(res => res.json());
    }

    edit(Id : number, region : Region){
        let header = new Headers();
        header.append('Content-type', 'application/json');

        let opts = new RequestOptions();
        opts.headers = header;

        return this.http.put(SocketService.socket + `api/region`, 
        JSON.stringify(region), opts);
    }

     delete(id : number) : Observable<any> {
        return this.http.delete(SocketService.socket + `api/region/${id}`);
    }

    getByNameOData(Name : string) : Observable<any> {
        return this.http.get(SocketService.socket + `api/region?$filter=Name eq '${Name}' &$expand=Places, Country`).map(res => res.json());
    }
}