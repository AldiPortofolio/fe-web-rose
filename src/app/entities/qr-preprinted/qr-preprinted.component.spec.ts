import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QrPreprintedComponent } from './qr-preprinted.component';

describe('QrPreprintedComponent', () => {
  let component: QrPreprintedComponent;
  let fixture: ComponentFixture<QrPreprintedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrPreprintedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QrPreprintedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
