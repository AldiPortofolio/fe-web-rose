import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcquititionsComponent } from './acquititions.component';

describe('AcquititionsComponent', () => {
  let component: AcquititionsComponent;
  let fixture: ComponentFixture<AcquititionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcquititionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcquititionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
