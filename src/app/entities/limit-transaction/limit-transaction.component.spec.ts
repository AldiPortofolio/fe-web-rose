import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LimitTransactionComponent } from './limit-transaction.component';

describe('LimitTransactionComponent', () => {
  let component: LimitTransactionComponent;
  let fixture: ComponentFixture<LimitTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LimitTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LimitTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
