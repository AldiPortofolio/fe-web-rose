import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationCodeMasterTagModalComponent } from './validation-code-master-tag.modal.component';

describe('ValidationCodeMasterTagModalComponent', () => {
  let component: ValidationCodeMasterTagModalComponent;
  let fixture: ComponentFixture<ValidationCodeMasterTagModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidationCodeMasterTagModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationCodeMasterTagModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
