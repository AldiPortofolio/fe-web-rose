import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationCodeComponent } from './validation-code.component';

describe('ValidationCodeComponent', () => {
  let component: ValidationCodeComponent;
  let fixture: ComponentFixture<ValidationCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidationCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
