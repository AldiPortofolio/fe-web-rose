import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadMerchantBankLoanComponent } from './upload-merchant-bank-loan.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UploadMerchantBankLoanService } from './upload-merchant-bank-loan.service';

@NgModule({
  declarations: [UploadMerchantBankLoanComponent],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    UploadMerchantBankLoanComponent,
  ],
  providers: [
    UploadMerchantBankLoanService
  ],
})
export class UploadMerchantBankLoanModule { }
