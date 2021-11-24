import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterTagComponent } from './master-tag.component';

describe('MasterTagComponent', () => {
  let component: MasterTagComponent;
  let fixture: ComponentFixture<MasterTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
