import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HwcComponent } from './hwc.component';

describe('HwcComponent', () => {
  let component: HwcComponent;
  let fixture: ComponentFixture<HwcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HwcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HwcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
