import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationCodeMasterTagComponent } from './validation-code-master-tag.component';

describe('ValidationCodeMasterTagComponent', () => {
  let component: ValidationCodeMasterTagComponent;
  let fixture: ComponentFixture<ValidationCodeMasterTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidationCodeMasterTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationCodeMasterTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
