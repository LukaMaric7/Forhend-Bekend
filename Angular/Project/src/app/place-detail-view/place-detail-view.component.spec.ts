import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceDetailViewComponent } from './place-detail-view.component';

describe('PlaceDetailViewComponent', () => {
  let component: PlaceDetailViewComponent;
  let fixture: ComponentFixture<PlaceDetailViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaceDetailViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
