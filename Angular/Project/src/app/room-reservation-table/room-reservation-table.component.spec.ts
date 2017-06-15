import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomReservationTableComponent } from './room-reservation-table.component';

describe('RoomReservationTableComponent', () => {
  let component: RoomReservationTableComponent;
  let fixture: ComponentFixture<RoomReservationTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomReservationTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomReservationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
