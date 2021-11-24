import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MerchantBankAccountService } from './merchant-bank-account.service';
import { MerchantBankAccountModalComponent } from './merchant-bank-account.modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { MerchantBankAccountComponent } from './merchant-bank-account.component';

@NgModule({
  declarations: [
    MerchantBankAccountComponent,
    MerchantBankAccountModalComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule
  ],
  entryComponents: [
    MerchantBankAccountComponent,
    MerchantBankAccountModalComponent
  ],
  providers: [
    MerchantBankAccountService,
  ],
})
export class MerchantBankAccountModule { }
