import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'app/localStorage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [LocalStorageService]
})
export class HomeComponent implements OnInit {

  constructor(private localStorageService : LocalStorageService) { }

  ngOnInit() {
  }
}
