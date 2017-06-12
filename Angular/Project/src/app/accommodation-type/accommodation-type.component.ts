import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AccommodationType } from './accommodation-type.model';
import { AccommodationTypeService } from './accommodation-type.service';

@Component({
  selector: 'accommodation-type',
  templateUrl: './accommodation-type.component.html',
  styleUrls: ['./accommodation-type.component.css'],
  providers: [AccommodationTypeService]
})
export class AccommodationTypeComponent implements OnInit {
  @Input() accommodationType : AccommodationType;
  @Output() deleteType : EventEmitter<AccommodationType>;
  showEdit : Boolean;
  Name : string;
  constructor(private accommodationTypeService : AccommodationTypeService) {
    this.showEdit = false;
    this.deleteType = new EventEmitter();
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
   onSubmit(){
    this.showEdit = false;
    this.accommodationTypeService.edit(new AccommodationType(this.accommodationType.Id, this.Name)).subscribe();
  }

  deleteAccommodationType()
  {
    this.accommodationTypeService.delete(this.accommodationType.Id).subscribe(x => {this.deleteType.emit(this.accommodationType);});
  }
}
