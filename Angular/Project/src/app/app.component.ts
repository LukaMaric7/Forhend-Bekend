import { Component } from '@angular/core';
import { LocalStorageService } from './localStorage.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [LocalStorageService]
})
export class AppComponent {
  title = 'app';

  constructor(private localStorageService : LocalStorageService) { }

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