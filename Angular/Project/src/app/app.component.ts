import { Component } from '@angular/core';
import { LocalStorageService } from './localStorage.service';
import { SocketService } from 'app/socket.service';
import { PagingService } from 'app/paging.service';
import { LSE } from "app/localStorageEnum.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ["./app.component.css"],
  providers: [LocalStorageService]
})
export class AppComponent {
  title = 'app';
  name : string;

  constructor(private localStorageService : LocalStorageService) {
    SocketService.socket = "http://localhost:54042/";
   
   }

  IsLoggedIn() : boolean {
    if( this.localStorageService.IsLoggedIn() )
    {
      this.name = localStorage.getItem(LSE.UserName.toString());
      return true;
    }
    else{
      return false;
    }
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