import { Component, OnInit, Input } from '@angular/core';
import { RegisterUserService } from './register-user.service';
import { AppUser } from "app/register-manager/appUser.model";


@Component({
  selector: 'register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css'],
  providers: [RegisterUserService]
})
export class RegisterUserComponent implements OnInit {
  Username : string;
  Password : string;
  Email : string;
  Lastname : string;
  Name : string;

  constructor(private registerUserService : RegisterUserService) { }

  ngOnInit() {
  }

   onSubmit()
  {
    this.registerUserService.register(new AppUser(this.Username,this.Password,this.Email,"AppUser", this.Lastname, this.Name)).subscribe(o=>{alert("Registration successful")}, o=>alert(o.json().Message));
    this.Username = "";
    this.Password = "";
    this.Email = "";
    this.Lastname = "";
    this.Name = "";
  }

}
