import { Component } from '@angular/core';
import { LocalStorageService } from './localStorage.service';
import { SocketService } from 'app/socket.service';
import { PagingService } from 'app/paging.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ["./app.component.css"],
  providers: [LocalStorageService]
})
export class AppComponent {
  title = 'app';

  constructor(private localStorageService : LocalStorageService) {
    SocketService.socket = "http://localhost:54042/";
   }

  IsLoggedIn() : boolean {
    return this.localStorageService.IsLoggedIn();
  }


  isAdmin() : Boolean {
    return this.localStorageService.isAdmin();
  }

  isManager() : Boolean {
    return this.localStorageService.isManager();
  }

  isUser() : Boolean {
    return this.localStorageService.isUser();
  }
}