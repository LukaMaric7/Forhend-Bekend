import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Accommodation } from "app/accommodation/accommodation.model";
import { AccommodationService } from "app/accommodation/accommodation.service";
import { SocketService } from 'app/socket.service';
import { Room } from 'app/room/room.model';
import { Comment } from 'app/commment/comment.model';
import { CommentService } from 'app/commment/comment.service';
import { MapInfo } from "app/map/map-info.model";
import { LSE } from 'app/localStorageEnum.model';
import { LocalStorageService } from 'app/localStorage.service';
import { RoomReservationService } from 'app/room-reservation/room-reservation.service';
import { RoomReservation } from 'app/room-reservation/room-reservation.model';


@Component({
  selector: 'accommodation-detail-view',
  templateUrl: './accommodation-detail-view.component.html',
  styleUrls: ['./accommodation-detail-view.component.css'],
  providers: [AccommodationService, SocketService, CommentService, RoomReservationService]
})
export class AccommodationDetailViewComponent implements OnInit {
  Id            : number;
  accommodation : Accommodation;
  mapInfo       : MapInfo
  showEdit      : boolean;
  showComment   : boolean;
  Comment       : string;
  Grade         : number;
  canComment    : boolean;

  Name          : string; 
  Description   : string;
  Address       : string;
  ImageURL      : string;
  Reservations  : RoomReservation[];
  

  constructor(private accommodationService :AccommodationService, private router: Router, 
  private activatedRoute: ActivatedRoute, private commentService : CommentService, 
  private localStorageService : LocalStorageService, private roomReservationService : RoomReservationService) {
    this.accommodation = new Accommodation();
    this.mapInfo = new MapInfo(45.242268, 19.842954, 
    "", "" , "" , "");
    this.showEdit = false;
    this.showComment = false;
    this.canComment = false;
   }

  ngOnInit() {

    let self = this;
     this.activatedRoute.params.subscribe(params => {this.Id = parseInt(params["Id"])});
     this.accommodationService.getByIdOData(this.Id).subscribe(o =>{
        self.accommodation = (o[0] as Accommodation);
        self.changeImageUrl();
        self.mapInfo = new MapInfo(this.accommodation.Latitude, this.accommodation.Longitude, "",
           this.accommodation.Name , "" , "");
        this.Name = this.accommodation.Name;
        this.Description = this.accommodation.Description;
        this.Address = this.accommodation.Address;
    });
    this.CheckIfCanComment();
     
  }


  changeImageUrl() : void {
      this.ImageURL = this.accommodation.ImageURL;
      this.accommodation.ImageURL = SocketService.socket + this.accommodation.ImageURL;
  }

   isShowEditPress() {
    return this.showEdit;
  }

  changeShowEdit()
  {
    if(this.showEdit)
    {
       this.showEdit = false;
    }
    else
    {
      this.showEdit = true;
    }
  }

  isShowCommentPress() {
    return this.showComment;
  }

  changeShowComment()
  {
    if(this.showComment)
    {
       this.showComment = false;
    }
    else
    {
      this.showComment = true;
    }
  }

  onSubmit()
  {
      this.accommodationService.edit(new Accommodation(this.accommodation.Id, this.Name, this.Description, this.accommodation.Latitude, this.accommodation.Longitude,
             this.accommodation.AccommodationTypeId, this.Address, this.accommodation.PlaceId, this.accommodation.UserId, 
             this.accommodation.Approved, this.ImageURL)).subscribe( o => { this.accommodation.Name = this.Name; this.accommodation.Address = this.Address; this.accommodation.Description = this.Description;}, o => {alert(o.json().Message);});
      this.showEdit = false;
  }

  onSubmitComment(){
    this.commentService.add(new Comment(1,this.Grade,this.Comment, this.Id, this.localStorageService.getUserId())).subscribe(o => {
      let com = o.json();
      this.commentService.getByIdOData(com.Id).subscribe(o => {
        this.accommodation.Comments.push(o[0]);});
    });
    this.Grade = undefined;
    this.Comment = "";
    this.changeShowComment();
  }

  CanComment() : boolean {
    return this.canComment;
  }

  CheckIfCanComment() : void {
    this.roomReservationService.getByAccIdUserIdAndDate(this.Id, this.localStorageService.getUserId(), new Date().toJSON().split('T')[0]).subscribe(o => {this.Reservations = o as RoomReservation[];
    console.log(this.Reservations)
    if(this.Reservations.length > 0){
      this.canComment = true;
    }
    else{
      this.canComment = false;
    }})
  }

  CanEditOrDeleteOrAdd() : boolean {
    if(this.localStorageService.IsLoggedIn()){
      if(this.accommodation.UserId == this.localStorageService.getUserId()){
        return true;
      }

      return false;
    }
    return false;
  }

  CanBookRoom() : boolean{
    if(this.localStorageService.IsLoggedIn()){
      if(this.localStorageService.isUser()){
        return true;
      }
      return false;
    }
    return false
  }
  
  deleteRoom(room : Room) : void{
    let index = this.accommodation.Rooms.indexOf(room);
    this.accommodation.Rooms.splice(index,1);
  }

  deleteAccommodation(){
    this.accommodationService.delete(this.accommodation.Id).subscribe(o => {
      this.router.navigate(['/home']);
    }, o => {alert(o.json().Message);} );

  }

  deleteComment(comment : Comment) : void {
    let index = this.accommodation.Comments.indexOf(comment);
    this.accommodation.Comments.splice(index,1);
  }

}
