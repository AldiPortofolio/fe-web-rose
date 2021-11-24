import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadMerchantMasterTagComponent } from './upload-merchant-master-tag.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UploadMerchantMasterTagService } from './upload-merchant-master-tag.service';

@NgModule({
  declarations: [UploadMerchantMasterTagComponent],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    UploadMerchantMasterTagComponent,
  ],
  providers: [
    UploadMerchantMasterTagService
  ],
})
export class UploadMerchantMasterTagModule { }
