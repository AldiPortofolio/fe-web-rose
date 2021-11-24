import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QrisConfigModalComponent } from './qris-config.modal.component';

describe('QrisConfigModalComponent', () => {
  let component: QrisConfigModalComponent;
  let fixture: ComponentFixture<QrisConfigModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrisConfigModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QrisConfigModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
