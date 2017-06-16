import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Comment } from './comment.model';
import { CommentService } from 'app/commment/comment.service';
import { LocalStorageService } from 'app/localStorage.service';


@Component({
  selector: 'commment',
  templateUrl: './commment.component.html',
  styleUrls: ['./commment.component.css'],
  providers: [CommentService, LocalStorageService]
})
export class CommmentComponent implements OnInit {
  @Input() comment : Comment;
  @Input() accommodationId : number;
  @Output() commentDeletedEvent : EventEmitter<Comment>
  showEdit : boolean;
  userName : string;

  constructor(private commentService : CommentService, private localStorageService : LocalStorageService) {
    this.commentDeletedEvent = new EventEmitter();
   }

  ngOnInit() {
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

  deleteComment() : void {
    this.commentService.delete(this.comment.Id).subscribe(o => {this.commentDeletedEvent.emit(this.comment);}, x => {alert(x.json().Message)});
  }

  haveText() : boolean {
    if(this.comment.Text != "")
    {
      return true;
    }
    
    return false;
  }

  yourComment() : boolean {
    if(this.localStorageService.IsLoggedIn()){
    if(this.comment.UserId == this.localStorageService.getUserId()){
      return true;
    }
     return false;
    }
    return false;
  }

}
