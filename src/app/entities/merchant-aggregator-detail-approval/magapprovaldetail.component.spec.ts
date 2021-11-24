import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MagapprovaldetailComponent } from './magapprovaldetail.component';

describe('MagapprovaldetailComponent', () => {
  let component: MagapprovaldetailComponent;
  let fixture: ComponentFixture<MagapprovaldetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MagapprovaldetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MagapprovaldetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
