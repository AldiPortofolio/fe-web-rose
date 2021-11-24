import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoringAktivasiFdsComponent } from './monitoring-aktivasi-fds.component';

describe('MonitoringAktivasiFdsComponent', () => {
  let component: MonitoringAktivasiFdsComponent;
  let fixture: ComponentFixture<MonitoringAktivasiFdsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitoringAktivasiFdsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitoringAktivasiFdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
