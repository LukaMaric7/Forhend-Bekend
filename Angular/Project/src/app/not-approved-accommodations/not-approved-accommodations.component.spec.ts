import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotApprovedAccommodationsComponent } from './not-approved-accommodations.component';

describe('NotApprovedAccommodationsComponent', () => {
  let component: NotApprovedAccommodationsComponent;
  let fixture: ComponentFixture<NotApprovedAccommodationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotApprovedAccommodationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotApprovedAccommodationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
