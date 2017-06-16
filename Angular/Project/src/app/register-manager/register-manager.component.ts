import { Component, OnInit } from '@angular/core';
import { AppUser } from "app/register-manager/appUser.model";
import { AppUserService } from './appUser.service';

@Component({
  selector: 'register-manager',
  templateUrl: './register-manager.component.html',
  styleUrls: ['./register-manager.component.css'],
  providers: [AppUserService]
})
export class RegisterManagerComponent implements OnInit {

  constructor(private appUserService : AppUserService) { }

  Username : string;
  Password : string;
  Email : string;
  Name : string;
  Lastname : string;

  ngOnInit() {
  }

  onSubmit(){
    this.appUserService.register(new AppUser(this.Username,this.Password,this.Email,"Manager", this.Lastname, this.Name)).subscribe(o=> {}, o=> alert(o.json().Message));
    this.Username = "";
    this.Password = "";
    this.Email = "";
    this.Lastname = "";
    this.Name = "";
  }

}
