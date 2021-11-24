import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogUpgradeFdsComponent } from './log-upgrade-fds.component';

describe('LogUpgradeFdsComponent', () => {
  let component: LogUpgradeFdsComponent;
  let fixture: ComponentFixture<LogUpgradeFdsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogUpgradeFdsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogUpgradeFdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
