import { Injectable } from '@angular/core'
import { Region } from "app/region/region.model";
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RegionListService {

    constructor(private http : Http){
     }

    getAll() : Observable<any> {
        return this.http.get("http://localhost:54042/api/region");
    }

    getById(id : number) : Observable<any> {
        return this.http.get(`http://localhost:54042/api/region/${id}`);
    }
}