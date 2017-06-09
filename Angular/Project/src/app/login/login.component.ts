import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  constructor(private loginService : LoginService) { }
  Username : string
  Password : string

  ngOnInit() {
  }

  onSubmit(){
    this.loginService.login(this.Username,this.Password, "password").subscribe( res => { this.putToken(res.json()) });

  }

  putToken(token : any){
    localStorage.setItem("username",token.access_token);
    this.Username = "";
    this.Password = "";
  }

}
