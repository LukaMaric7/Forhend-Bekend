import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { LSE } from 'app/localStorageEnum.model';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  constructor(private loginService : LoginService, private route : Router) { }
  Username : string
  Password : string

  ngOnInit() {
  }

  onSubmit(){
    this.loginService.login(this.Username,this.Password, "password").subscribe( res => { this.putToken(res.json()) });

  }

  putToken(token : any){
    localStorage.setItem(LSE.User.toString(),token.access_token);
    this.route.navigate(['/home']);
    this.Username = "";
    this.Password = "";
  }

}
