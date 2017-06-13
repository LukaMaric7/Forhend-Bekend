import { Injectable } from '@angular/core'
import { Country } from "app/country/country.model";
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Accommodation } from './accommodation.model';
import { SocketService } from 'app/socket.service';

@Injectable()
export class AccommodationService {

    constructor(private http : Http){
     }
    
    getAll() : Observable<any> {
        return this.http.get(SocketService.socket + "api/accommodation");
    }

    getAllOData() : Observable<any> {
        return this.http.get(SocketService.socket + "api/accommodation?$expand=AccommodationType");
    }

    add(accommodation : Accommodation, file : File) : Observable<any> {
       accommodation.Place = null;
       accommodation.Rooms = null;
       accommodation.AccommodationType = null;
        let formData:FormData = new FormData();
        formData.append('accommodation', JSON.stringify(accommodation));
        formData.append('uploadFile', file, file.name);
        console.log(formData);
        let headers = new Headers();
        headers.append('enctype', 'multipart/form-data');
        
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });
        
        return this.http.post(SocketService.socket + `api/accommodation`, formData, options);
           
    }

    getByIdOData(Id : number) : Observable<any> {
        
        let ret = this.http.get(SocketService.socket + `api/accommodation?$filter=Id eq ${Id} &$expand=AccommodationType,Place,Rooms`).map(res => res.json());
        return ret;
    }

    edit(accommodation: Accommodation) : Observable<any> {
        console.log(accommodation);
        let header = new Headers();
        header.append('Content-type', 'application/json');
        console.log(JSON.stringify(accommodation));
        let opts = new RequestOptions();
        opts.headers = header;
        accommodation.Place = null;
        accommodation.AccommodationType = null;
        accommodation.Rooms = null;

        return this.http.put(SocketService.socket + `api/accommodation`, JSON.stringify(accommodation), opts);
    }

     delete(id : number) : Observable<any> {
        return this.http.delete(SocketService.socket + `api/accommodation/${id}`);
    }

    getByQuery(query : string) : Observable<any> {
        return this.http.get(SocketService.socket + `api/accommodation` + query).map(res => res.json());
    }

    getByIdPlaceName(Name : string) : Observable<any> {
        
        let ret = this.http.get(SocketService.socket + `api/accommodation?$filter=PlaceId eq 7 &$expand=Place,Place/Region,Place/Region/Country`).map(res => res.json());
        return ret;
    }
}