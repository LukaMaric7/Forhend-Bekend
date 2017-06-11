import { Injectable } from '@angular/core'
import { Region } from "app/region/region.model";
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RegionDetailViewService {

    constructor(private http : Http){
     }

    getById(Id : number) : Observable<any> {
        return this.http.get(`http://localhost:54042/api/region?$filter=Id eq ${Id} &$expand=Places`).map(res => res.json());
    }
}