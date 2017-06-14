import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomReservationComponent } from './room-reservation.component';

describe('RoomReservationComponent', () => {
  let component: RoomReservationComponent;
  let fixture: ComponentFixture<RoomReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
