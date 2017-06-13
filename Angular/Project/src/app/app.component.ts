import { Component } from '@angular/core';
import { LocalStorageService } from './localStorage.service';
import { SocketService } from 'app/socket.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ["./bootstrap-4.0.0-alpha.6-dist/css/bootstrap.css"],
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
}