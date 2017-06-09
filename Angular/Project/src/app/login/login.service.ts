import { Injectable } from '@angular/core'
import { AppUser } from "app/register-manager/appUser.model";
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginService {

    constructor(private http : Http){
     }

    login(username: string, password: string, Grant_type: string) : Observable<any> {
        let header = new Headers();
        header.append('Content-type', 'application/x-www-form-urlencoded');

        let opts = new RequestOptions();
        opts.headers = header;

        return this.http.post(`http://localhost:54042/oauth/token`, 
        `username=${username}&password=${password}&grant_type=${Grant_type}`, opts);
    }
}