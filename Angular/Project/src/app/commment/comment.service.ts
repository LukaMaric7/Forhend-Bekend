import { Injectable } from '@angular/core'
import { Comment } from "app/commment/comment.model";
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SocketService } from 'app/socket.service';
import { LSE } from "app/localStorageEnum.model";

@Injectable()
export class CommentService {

    constructor(private http : Http){
     }

    getAll() : Observable<any> {
        return this.http.get(SocketService.socket + "api/comments");
    }

    add(comment : Comment) : Observable<any> {
        let header = new Headers();
        header.append('Content-type', 'application/json');
        header.append('Authorization', 'Bearer ' + localStorage.getItem(LSE.User.toString()));

        let opts = new RequestOptions();
        opts.headers = header;

        return this.http.post(SocketService.socket + `api/comments`, JSON.stringify(comment), opts);
    }

    delete(id : number) : Observable<any> {
        let header = new Headers();
        header.append('Content-type', 'application/json');
        header.append('Authorization', 'Bearer ' + localStorage.getItem(LSE.User.toString()));

        let opts = new RequestOptions();
        opts.headers = header;

        return this.http.delete(SocketService.socket + `api/comments/${id}`, opts);
    }

    getByIdOData(Id : number) : Observable<any> {
        return this.http.get(SocketService.socket + `api/comments?$filter=Id eq ${Id} &$expand=User`).map(res => res.json());
    } 
}