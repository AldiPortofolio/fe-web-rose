import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MdrAggregatorModalComponent } from './mdr-aggregator.modal.component';

describe('MdrAggregatorModalComponent', () => {
  let component: MdrAggregatorModalComponent;
  let fixture: ComponentFixture<MdrAggregatorModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MdrAggregatorModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MdrAggregatorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
