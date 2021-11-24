import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterTagModalComponent } from './master-tag.modal.component';

describe('MasterTagModalComponent', () => {
  let component: MasterTagModalComponent;
  let fixture: ComponentFixture<MasterTagModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterTagModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterTagModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
