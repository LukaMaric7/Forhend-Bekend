import { Component, OnInit } from '@angular/core';
import { AppUser } from "app/register-manager/appUser.model";
import { AppUserService } from './appUser.service';

@Component({
  selector: 'register-manager',
  templateUrl: './register-manager.component.html',
  styleUrls: ['./register-manager.component.css']
})
export class RegisterManagerComponent implements OnInit {

  constructor(private appUserService : AppUserService) { }

  Username : string;
  Password : string;
  Email : string;

  ngOnInit() {
  }

  onSubmit(){
    this.appUserService.register(new AppUser(this.Username,this.Password,this.Email,"Manager")).subscribe();
    this.Username = "";
    this.Password = "";
    this.Email = "";
  }

}
