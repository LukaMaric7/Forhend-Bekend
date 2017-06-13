import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationDetailViewComponent } from './accommodation-detail-view.component';

describe('AccommodationDetailViewComponent', () => {
  let component: AccommodationDetailViewComponent;
  let fixture: ComponentFixture<AccommodationDetailViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccommodationDetailViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccommodationDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
