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

    isAdmin() : boolean {
        if ( localStorage.getItem(LSE.Role.toString()) == "Admin")
        {
            return true;
        }

        return false;
    }

    isManager() : boolean {
        if ( localStorage.getItem(LSE.Role.toString()) == "Manager")
        {
            return true;
        }

        return false;
    }

    getUserId() : string{
        return localStorage.getItem(LSE.Id.toString());
    }
    
}