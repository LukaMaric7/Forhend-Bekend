import { Component, OnInit, Input } from '@angular/core';
import { Comment } from './comment.model';

@Component({
  selector: 'commment',
  templateUrl: './commment.component.html',
  styleUrls: ['./commment.component.css']
})
export class CommmentComponent implements OnInit {
  @Input() comment : Comment;
  @Input() accommodationId : number;
  showEdit : boolean;
  userName : string;

  constructor() { }

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

  haveText() : boolean {
    if(this.comment.Text != "")
    {
      return false;
    }
    
    return true;
  }

}
