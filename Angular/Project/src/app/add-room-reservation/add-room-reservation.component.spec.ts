import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRoomReservationComponent } from './add-room-reservation.component';

describe('AddRoomReservationComponent', () => {
  let component: AddRoomReservationComponent;
  let fixture: ComponentFixture<AddRoomReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRoomReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRoomReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
