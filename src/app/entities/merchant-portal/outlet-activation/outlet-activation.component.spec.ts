import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutletActivationComponent } from './outlet-activation.component';

describe('OutletActivationComponent', () => {
  let component: OutletActivationComponent;
  let fixture: ComponentFixture<OutletActivationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutletActivationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutletActivationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
