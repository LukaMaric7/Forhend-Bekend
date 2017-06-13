import { Component, OnInit, Input } from '@angular/core';
import { Accommodation } from 'app/accommodation/accommodation.model';

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  @Input() accommodaitons : Accommodation[];

  constructor() { }

  ngOnInit() {
  }

}
