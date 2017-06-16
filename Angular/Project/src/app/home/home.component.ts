import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'app/localStorage.service';
import { Accommodation } from "app/accommodation/accommodation.model";
import { AccommodationService } from "app/accommodation/accommodation.service";
import { SocketService } from 'app/socket.service';
import { PagingService } from "app/paging.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [LocalStorageService, AccommodationService, PagingService]
})
export class HomeComponent implements OnInit {
  accommodations : Accommodation[];
  showFilter : boolean;
  pageNumber : number;
  counter : Array<number>;
  filter : string;

  constructor(private localStorageService : LocalStorageService, private accommodationService : AccommodationService, private pagingServie : PagingService) { 
    this.accommodations = [];
    this.pageNumber = 1;
    this.filter = "";
  }

  ngOnInit() {
      this.accommodationService.getAll(this.pageNumber, PagingService.pageSize, this.filter).subscribe(o => {
      this.accommodations = (o.json()).value;
      this.pagingServie.NumberOfPages(o);

      let counterLength = 2;
      if (this.pageNumber * 2 > PagingService.numberOfPages) {
        counterLength = PagingService.numberOfPages - ((this.pageNumber-1)*2);
      } 
      this.counter = new Array(counterLength);

      this.changeImageUrl();
      });
    
  }

  changeImageUrl() : void {
    for(let entry of this.accommodations){
      entry.ImageURL = SocketService.socket + entry.ImageURL;
    }
  }

  doFitler(query : string) : void {
      this.filter = query;
      this.accommodationService.getAll(this.pageNumber, PagingService.pageSize, this.filter).subscribe(o => {
      this.accommodations = (o.json()).value;
      this.pagingServie.NumberOfPages(o);

      let counterLength = 2;
      if (this.pageNumber * 2 > PagingService.numberOfPages) {
        counterLength = PagingService.numberOfPages - ((this.pageNumber-1)*2);
      } 
      this.counter = new Array(counterLength);

      this.changeImageUrl();
      });
  }

  previousPage(){
      this.pageNumber = this.pageNumber - 1;
      let counterLength = 2;
      if (this.pageNumber * 2 > PagingService.numberOfPages) {
          counterLength = PagingService.numberOfPages - ((this.pageNumber-1)*2);
      } 
      this.counter = new Array(counterLength);
  }

  showPreviousButton(){
    return this.pageNumber > 1;
  }

  nextPage(){
      this.pageNumber = this.pageNumber + 1;
      let counterLength = 2;
      if (this.pageNumber * 2 > PagingService.numberOfPages) {
          counterLength = PagingService.numberOfPages - ((this.pageNumber-1)*2);
      } 
      this.counter = new Array(counterLength);
  }

  showNextButton(){
    return (this.pageNumber * 2) < PagingService.numberOfPages;
  }

  ChangePage(page : number){
      this.accommodationService.getAll(page, PagingService.pageSize, this.filter).subscribe(o => {
      this.accommodations = (o.json()).value;
      this.pagingServie.NumberOfPages(o);
      this.changeImageUrl();
      });
  }

}
