import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VersionAppComponent } from './version-app.component';

describe('VersionAppComponent', () => {
  let component: VersionAppComponent;
  let fixture: ComponentFixture<VersionAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VersionAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VersionAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
