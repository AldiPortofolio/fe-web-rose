import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeeMrdSettingMerchantGroupComponent } from './fee-mrd-setting-merchant-group.component';
import { FeeMrdSettingMerchantGroupService } from './fee-mrd-setting-merchant-group.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { FeeMdrSettingMerchantGroupModalComponent } from './fee-mdr-setting-merchant-group.modal.component';

@NgModule({
  declarations: [
    FeeMrdSettingMerchantGroupComponent,
    FeeMdrSettingMerchantGroupModalComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule
  ],
  entryComponents: [
    FeeMrdSettingMerchantGroupComponent,
    FeeMdrSettingMerchantGroupModalComponent
  ],
  providers: [
    FeeMrdSettingMerchantGroupService,
  ],
})
export class FeeMrdSettingMerchantGroupModule { }
