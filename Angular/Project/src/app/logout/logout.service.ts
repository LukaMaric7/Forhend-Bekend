import { Injectable } from '@angular/core'
import { AppUser } from "app/register-manager/appUser.model";
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { LSE } from "app/localStorageEnum.model";

@Injectable()
export class LogoutService {

    constructor(private http : Http){
     }

    logout() : Observable<any> {
        
        localStorage.removeItem(LSE.User.toString());

        return this.http.post(`http://localhost:54042/api/Account/Logout`, "");
    }
}