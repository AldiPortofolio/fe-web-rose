import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadFeeMdrSettingComponent } from './upload-fee-mdr-setting.component';

describe('UploadFeeMdrSettingComponent', () => {
  let component: UploadFeeMdrSettingComponent;
  let fixture: ComponentFixture<UploadFeeMdrSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadFeeMdrSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadFeeMdrSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
