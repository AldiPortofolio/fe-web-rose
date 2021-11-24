import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadMerchantWipComponent } from './upload-merchant-wip.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UploadMerchantWipService } from './upload-merchant-wip.service';

@NgModule({
  declarations: [
    UploadMerchantWipComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    UploadMerchantWipComponent,
  ],
  providers: [
    UploadMerchantWipService
  ],
})
export class UploadMerchantWipModule { }
