import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankListModalComponent } from './bank-list.modal.component';

describe('BankListModalComponent', () => {
  let component: BankListModalComponent;
  let fixture: ComponentFixture<BankListModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankListModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
