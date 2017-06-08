import { Component, OnInit, Input } from '@angular/core';
import { RegisterUserService } from './register-user.service';
import { AppUser } from "app/register-manager/appUser.model";


@Component({
  selector: 'register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  appUser: AppUser;

  constructor(private registerUserService : RegisterUserService) { }

  ngOnInit() {
  }

   onSubmit()
  {
    this.registerUserService.register(appUser).subscribe();

  }

}
