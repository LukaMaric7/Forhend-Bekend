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
        
        let header = new Headers();
        header.append('Content-type', 'application/x-www-form-urlencoded');
        header.append('Authorization', 'Bearer ' + localStorage.getItem(LSE.User.toString()));

        let opts = new RequestOptions();
        opts.headers = header;

        let ret = this.http.post(`http://localhost:54042/api/Account/Logout`, "", opts);
        localStorage.removeItem(LSE.User.toString());
        localStorage.removeItem(LSE.Role.toString());

        return ret;
    }
}