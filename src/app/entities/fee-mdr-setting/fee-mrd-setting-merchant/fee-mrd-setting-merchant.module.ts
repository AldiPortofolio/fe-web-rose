import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeeMrdSettingMerchantComponent } from './fee-mrd-setting-merchant.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { FeeMrdSettingMerchantService } from './fee-mrd-setting-merchant.service';
import { FeeMdrSettingMerchantModalComponent } from './fee-mdr-setting-merchant.modal.component';

@NgModule({
  declarations: [
    FeeMrdSettingMerchantComponent,
    FeeMdrSettingMerchantModalComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule
  ],
  entryComponents: [
    FeeMrdSettingMerchantComponent,
    FeeMdrSettingMerchantModalComponent
  ],
  providers: [
    FeeMrdSettingMerchantService,
  ],
})
export class FeeMrdSettingMerchantModule { }
