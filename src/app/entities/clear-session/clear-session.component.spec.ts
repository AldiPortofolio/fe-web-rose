import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearSessionComponent } from './clear-session.component';

describe('ClearSessionComponent', () => {
  let component: ClearSessionComponent;
  let fixture: ComponentFixture<ClearSessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClearSessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClearSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
