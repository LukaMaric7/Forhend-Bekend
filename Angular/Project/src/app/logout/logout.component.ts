import { Component, OnInit } from '@angular/core';
import { LogoutService } from './logout.service'
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
  providers: [LogoutService]
})

export class LogoutComponent implements OnInit {

  constructor(private logoutService : LogoutService) { }

  ngOnInit() {
  }

  onSubmit(){
    
  }

}
