import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantQrisStatusComponent } from './merchant-qris-status.component';

describe('MerchantQrisStatusComponent', () => {
  let component: MerchantQrisStatusComponent;
  let fixture: ComponentFixture<MerchantQrisStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerchantQrisStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantQrisStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
