import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LimitTransactionDepositComponent } from './limit-transaction-deposit.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { LimitTransactionDepositService } from './limit-transaction-deposit.service';
import { LimitTransactionDepositModalComponent } from './limit-transaction-deposit.modal.component';

@NgModule({
  declarations: [
    LimitTransactionDepositComponent,
    LimitTransactionDepositModalComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
  ],
  entryComponents: [
    LimitTransactionDepositComponent,
    LimitTransactionDepositModalComponent
  ],
  providers: [
    LimitTransactionDepositService
  ],
  exports: [
    LimitTransactionDepositModalComponent
  ],
})
export class LimitTransactionDepositModule { }
