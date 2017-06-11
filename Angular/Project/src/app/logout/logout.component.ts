import { Component, OnInit } from '@angular/core';
import { LogoutService } from './logout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
  providers: [LogoutService]
})

export class LogoutComponent implements OnInit {

  constructor(private logoutService : LogoutService, private route : Router) { }

  ngOnInit() {
    this.logoutService.logout().subscribe();
    this.route.navigate(['/home']);
  }

}
