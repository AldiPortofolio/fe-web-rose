import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdatedDataMerchantComponent } from './updated-data-merchant.component';
import { UpdatedDataMerchantModalComponent } from './updated-data-merchant.modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { UpdatedDataMerchantService } from './updated-data-merchant.service';

@NgModule({
  declarations: [UpdatedDataMerchantComponent, UpdatedDataMerchantModalComponent],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule
  ],
  entryComponents: [
    UpdatedDataMerchantComponent, UpdatedDataMerchantModalComponent
  ],
  providers: [
    UpdatedDataMerchantService,
  ],
})
export class UpdatedDataMerchantModule { }
