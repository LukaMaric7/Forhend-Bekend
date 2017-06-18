import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { LSE } from 'app/localStorageEnum.model';
import { Router } from '@angular/router';
import { NotificationService } from "app/notifications/notification.service";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService, NotificationService]
})
export class LoginComponent implements OnInit {


  constructor(private loginService : LoginService, private route : Router) { }
  Username : string
  Password : string

  ngOnInit() {
  }

  onSubmit(){
    this.loginService.login(this.Username,this.Password, "password").subscribe( res => {
       this.putToken(res as Response);
        });

  }

  putToken(token : Response){
    localStorage.setItem(LSE.User.toString(),token.json()['access_token']);
    localStorage.setItem(LSE.Role.toString(), token.headers.get("Role"));
    localStorage.setItem(LSE.Id.toString(), token.headers.get("Id"));
    localStorage.setItem(LSE.UserName.toString(), this.Username)
    this.route.navigate(['/home']);
    this.Username = "";
    this.Password = "";
  }

}
