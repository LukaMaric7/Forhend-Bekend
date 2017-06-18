import { Component, OnInit, NgZone } from '@angular/core';
import { NotificationService } from './notification.service';
import { Observable } from 'rxjs/Observable';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { LSE } from "app/localStorageEnum.model";

@Component({
  selector: 'notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
  providers: [NotificationService]
})
export class NotificationsComponent implements OnInit {

  isConnected: Boolean;
  notifications: string[];
  time: string;
  notApproved : number;

  constructor(private notifService: NotificationService, private http: Http,private ngZone: NgZone) {
    this.isConnected = false;
    if( this.notifications == undefined)
    {
      this.notifications = [];
    }
   }

  ngOnInit() {
    this.checkConnection();
    this.subscribeForNotApprovedNotification();
    this.subscribeForNewAccommodationNotification();
  }

  private checkConnection(){
    this.notifService.connectionEstablished.subscribe(e => {this.isConnected = e; 
        if (e) {
          this.notifService.sendHello()
        }
    });
  }

  private subscribeForNotApprovedNotification () {
    this.notifService.notificationReceived.subscribe(e => this.onNotification(e));
  }

  private subscribeForNewAccommodationNotification () {
    this.notifService.notificationReceived2.subscribe(e => this.onNotification2(e));
  }

  public onNotification(notif: string) {

     this.ngZone.run(() => { 
       this.notApproved = parseInt(notif);
    });  
  }
  public onNotification2(notif: string) {
     this.ngZone.run(() => { 
       this.notifications.push(notif);  
      // this.notApproved++;
    });  
  }


  public onClick() {
    if (this.isConnected) {
      this.click().subscribe(data => console.log(data));
    }
  } 



   click(): Observable<any> {
        const headers: Headers = new Headers();
        headers.append("Accept", "text/plain")
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(LSE.User.toString()));
        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;
        
        return this.http.post("http://localhost:54042/api/WSClick", "", opts);
    }
}
