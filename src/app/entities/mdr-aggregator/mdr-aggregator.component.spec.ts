import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MdrAggregatorComponent } from './mdr-aggregator.component';

describe('MdrAggregatorComponent', () => {
  let component: MdrAggregatorComponent;
  let fixture: ComponentFixture<MdrAggregatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MdrAggregatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MdrAggregatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
