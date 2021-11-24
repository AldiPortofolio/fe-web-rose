import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadFeeMdrSettingComponent } from './upload-fee-mdr-setting.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { UploadFeeMdrSettingService } from './upload-fee-mdr-setting.service';

@NgModule({
  declarations: [
    UploadFeeMdrSettingComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule
  ],
  entryComponents: [
    UploadFeeMdrSettingComponent,
  ],
  providers: [
    UploadFeeMdrSettingService
  ],
})
export class UploadFeeMdrSettingModule { }
