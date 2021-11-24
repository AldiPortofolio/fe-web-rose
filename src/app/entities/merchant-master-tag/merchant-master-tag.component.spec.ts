import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantMasterTagComponent } from './merchant-master-tag.component';

describe('MerchantMasterTagComponent', () => {
  let component: MerchantMasterTagComponent;
  let fixture: ComponentFixture<MerchantMasterTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerchantMasterTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantMasterTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
