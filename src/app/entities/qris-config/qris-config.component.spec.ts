import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QrisConfigComponent } from './qris-config.component';

describe('QrisConfigComponent', () => {
  let component: QrisConfigComponent;
  let fixture: ComponentFixture<QrisConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrisConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QrisConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
