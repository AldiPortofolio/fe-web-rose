import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadMerchantNonWipComponent } from './upload-merchant-non-wip.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UploadMerchantNonWipService } from './upload-merchant-non-wip.service';

@NgModule({
  declarations: [
    UploadMerchantNonWipComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    UploadMerchantNonWipComponent,
  ],
  providers: [
    UploadMerchantNonWipService
  ],
})
export class UploadMerchantNonWipModule { }
