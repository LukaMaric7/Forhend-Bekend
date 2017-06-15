import { Component, OnInit } from '@angular/core';
import { AppUser } from "app/register-manager/appUser.model";
import { AppUserService } from "app/register-manager/appUser.service";

@Component({
  selector: 'app-manager-list',
  templateUrl: './manager-list.component.html',
  styleUrls: ['./manager-list.component.css'],
  providers: [AppUserService]
})
export class ManagerListComponent implements OnInit {
  managers : AppUser[];

  constructor(private appUserService : AppUserService) { }

  ngOnInit() {
    this.appUserService.getAll().subscribe(o => console.log(o));
  }

}
