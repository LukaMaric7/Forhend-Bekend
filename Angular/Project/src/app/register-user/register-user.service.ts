import { Injectable } from '@angular/core'
import { AppUser } from "app/register-manager/appUser.model";
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SocketService } from 'app/socket.service';

@Injectable()
export class RegisterUserService {

    constructor(private http : Http){
     }

    register(appUser : AppUser) : Observable<any> {
        let header = new Headers();
        header.append('Content-type', 'application/json');

        let opts = new RequestOptions();
        opts.headers = header;

        return this.http.post(SocketService.socket + `api/Account/Register`, 
        JSON.stringify(appUser), opts);
    }
}