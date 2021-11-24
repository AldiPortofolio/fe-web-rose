import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MerchantComponent } from './merchant.component';
import { MerchantService } from './merchant.service';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MerchantDetailComponent } from './merchant-detail.component';
import { MerchantDetailOutletModalComponent } from './merchant-detail-outlet-modal.component';
import { UploadImageService } from 'src/app/shared/upload-image.service';
import { MerchantModalComponent } from './merchant.modal.component';
import { GenerateQrService } from './generate-qr.service';

@NgModule({
  declarations: [
    MerchantComponent,
    MerchantDetailComponent,
    MerchantDetailOutletModalComponent,
    MerchantModalComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule
  ],
  entryComponents: [
    MerchantComponent,
    MerchantDetailComponent,
    MerchantDetailOutletModalComponent,
    MerchantModalComponent,
  ],
  providers: [
    MerchantService,
    UploadImageService,
    GenerateQrService,
  ],
  exports: [
    MerchantComponent
  ]
})
export class MerchantModule { }
