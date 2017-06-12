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

    add(accommodation : Accommodation, file : File) : Observable<any> {
      
  
        let formData:FormData = new FormData();
        formData.append('uploadFile', file, file.name);
        formData.append('accommodation', JSON.stringify(accommodation));
        let headers = new Headers();
        headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });
        
        return this.http.post(`http://localhost:54042/api/accommodation`, formData, options);
           
    }
}