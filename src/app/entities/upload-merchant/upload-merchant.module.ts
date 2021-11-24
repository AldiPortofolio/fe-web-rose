import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadMerchantComponent } from './upload-merchant.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UploadMerchantService } from './upload-merchant.service';

@NgModule({
  declarations: [
    UploadMerchantComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    UploadMerchantComponent,
  ],
  providers: [
    UploadMerchantService
  ],
})
export class UploadMerchantModule { }
