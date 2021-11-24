import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadMerchantNonActivatedComponent } from './upload-merchant-non-activated.component';
import { UploadMerchantNonActivatedService } from './upload-merchant-non-activated.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    UploadMerchantNonActivatedComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule
  ],
  entryComponents: [
    UploadMerchantNonActivatedComponent,
  ],
  providers: [
    UploadMerchantNonActivatedService
  ],
  exports: [
  ]
})
export class UploadMerchantNonActivatedModule { }
