import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationTypeListComponent } from './accommodation-type-list.component';

describe('AccommodationTypeListComponent', () => {
  let component: AccommodationTypeListComponent;
  let fixture: ComponentFixture<AccommodationTypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccommodationTypeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccommodationTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
