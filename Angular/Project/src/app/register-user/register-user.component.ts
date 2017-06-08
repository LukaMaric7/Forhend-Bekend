import { Component, OnInit, Input } from '@angular/core';
import { RegisterUserService } from './register-user.service';
import { AppUser } from "app/register-manager/appUser.model";


@Component({
  selector: 'register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  Username : string;
  Password : string;
  Email : string;

  constructor(private registerUserService : RegisterUserService) { }

  ngOnInit() {
  }

   onSubmit()
  {
    this.registerUserService.register(new AppUser(this.Username,this.Password,this.Email,"Manager")).subscribe();
    this.Username = "";
    this.Password = "";
    this.Email = "";
  }

}
