import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogUpgradeFdsModalComponent } from './log-upgrade-fds-modal.component';

describe('LogUpgradeFdsModalComponent', () => {
  let component: LogUpgradeFdsModalComponent;
  let fixture: ComponentFixture<LogUpgradeFdsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogUpgradeFdsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogUpgradeFdsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
