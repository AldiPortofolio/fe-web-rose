import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadMerchantActivatedComponent } from './upload-merchant-activated.component';
import { UploadMerchantActivatedService } from './upload-merchant-activated.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    UploadMerchantActivatedComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule
  ],
  entryComponents: [
    UploadMerchantActivatedComponent,
  ],
  providers: [
    UploadMerchantActivatedService
  ],
  exports: [
  ]
})
export class UploadMerchantActivatedModule { }
