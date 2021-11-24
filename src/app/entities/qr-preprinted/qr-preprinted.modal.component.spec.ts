import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QrPreprintedModalComponent } from './qr-preprinted.modal.component';

describe('QrPreprintedModalComponent', () => {
  let component: QrPreprintedModalComponent;
  let fixture: ComponentFixture<QrPreprintedModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrPreprintedModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QrPreprintedModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
