import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlastNotifComponent } from './blast-notif.component';

describe('BlastNotifComponent', () => {
  let component: BlastNotifComponent;
  let fixture: ComponentFixture<BlastNotifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlastNotifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlastNotifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
