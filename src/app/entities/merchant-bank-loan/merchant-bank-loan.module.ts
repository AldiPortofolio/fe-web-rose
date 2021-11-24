import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MerchantBankLoanComponent } from './merchant-bank-loan.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { MerchantBankLoanService } from './merchant-bank-loan.service';
import { SubMerchantBankLoanComponent } from './sub-merchant-bank-loan.component';

@NgModule({
  declarations: [MerchantBankLoanComponent, SubMerchantBankLoanComponent, ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule
  ],
  entryComponents: [
    MerchantBankLoanComponent,
    SubMerchantBankLoanComponent
  ],
  providers: [
    MerchantBankLoanService,
    
  ],
})
export class MerchantBankLoanModule { }
