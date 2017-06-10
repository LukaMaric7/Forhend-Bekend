import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionDetailViewComponent } from './region-detail-view.component';

describe('RegionDetailViewComponent', () => {
  let component: RegionDetailViewComponent;
  let fixture: ComponentFixture<RegionDetailViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegionDetailViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
