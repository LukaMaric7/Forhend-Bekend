import { Injectable } from '@angular/core'
import { AppUser } from "app/register-manager/appUser.model";
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { LSE } from "app/localStorageEnum.model";

@Injectable()
export class PagingService {
    static pageSize : number = 3;
    static numberOfPages : number;

    constructor() {
        
    }

    NumberOfPages(response: Response){
        let json = response.json();
        let count = json["odata.count"];
        PagingService.numberOfPages = Math.ceil(count/PagingService.pageSize);
    }
}