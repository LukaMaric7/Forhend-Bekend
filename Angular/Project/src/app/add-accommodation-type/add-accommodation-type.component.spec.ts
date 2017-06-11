import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAccommodationTypeComponent } from './add-accommodation-type.component';

describe('AddAccommodationTypeComponent', () => {
  let component: AddAccommodationTypeComponent;
  let fixture: ComponentFixture<AddAccommodationTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAccommodationTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAccommodationTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
