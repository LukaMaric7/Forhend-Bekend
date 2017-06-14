import { Injectable } from '@angular/core'
import { Comment } from "app/commment/comment.model";
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SocketService } from 'app/socket.service';

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

        let opts = new RequestOptions();
        opts.headers = header;

        return this.http.post(SocketService.socket + `api/comments`, 
        JSON.stringify(comment), opts);
    }

    delete(id : number) : Observable<any> {
        return this.http.delete(SocketService.socket + `api/comments/${id}`);
    }

    getByIdOData(Id : number) : Observable<any> {
        return this.http.get(SocketService.socket + `api/comments?$filter=Id eq ${Id} &$expand=Regions`).map(res => res.json());
    }


    
}