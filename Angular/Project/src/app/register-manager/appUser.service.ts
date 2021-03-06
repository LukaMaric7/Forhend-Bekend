import { Injectable } from '@angular/core'
import { AppUser } from "app/register-manager/appUser.model";
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SocketService } from 'app/socket.service';
import { LSE } from "app/localStorageEnum.model";

@Injectable()
export class AppUserService {

    constructor(private http : Http){
     }

    register(user : AppUser) : Observable<any> {
        let header = new Headers();
        header.append('Content-type', 'application/json');

        let opts = new RequestOptions();
        opts.headers = header;

        return this.http.post(SocketService.socket + `api/Account/Register`, 
        JSON.stringify(user), opts);
    }

    getAll() : Observable<any>{
        let header = new Headers();
        header.append('Content-type', 'application/json');
        header.append('Authorization', 'Bearer ' + localStorage.getItem(LSE.User.toString()));

        let opts = new RequestOptions();
        opts.headers = header;

        return this.http.get(SocketService.socket + `api/manager`, opts);
    }

    banUnban(Id : number) : Observable<any>{
        let header = new Headers();
        header.append('Content-type', 'application/json');
        header.append('Authorization', 'Bearer ' + localStorage.getItem(LSE.User.toString()));

        let opts = new RequestOptions();
        opts.headers = header;

        return this.http.delete(SocketService.socket + `api/manager/${Id}`,opts);
    }
}