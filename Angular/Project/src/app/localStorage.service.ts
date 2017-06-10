import { Injectable } from '@angular/core'
import { AppUser } from "app/register-manager/appUser.model";
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { LSE } from "app/localStorageEnum.model";

@Injectable()
export class LocalStorageService {

    constructor() { }

    IsLoggedIn() : boolean {
        if ( localStorage.getItem(LSE.User.toString()) == null)
        {
            return false;
        }

        return true;
    }
    
}