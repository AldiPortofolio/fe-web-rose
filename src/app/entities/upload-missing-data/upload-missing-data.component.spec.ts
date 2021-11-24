import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadMissingDataComponent } from './upload-missing-data.component';

describe('UploadMissingDataComponent', () => {
  let component: UploadMissingDataComponent;
  let fixture: ComponentFixture<UploadMissingDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadMissingDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadMissingDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
