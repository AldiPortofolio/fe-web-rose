import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpLimitTransactionComponent } from './op-limit-transaction.component';
import { OpLimitTransactionModalComponent } from './op-limit-transaction.modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { OpLimitTransactionService } from './op-limit-transaction.service';
import { OnlyNumberModule } from '../../app-directive/only-number.module';

@NgModule({
  declarations: [
    OpLimitTransactionComponent,
    OpLimitTransactionModalComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    OnlyNumberModule,
    
  ],
  entryComponents: [
    OpLimitTransactionComponent,
    OpLimitTransactionModalComponent
  ],
  providers: [
    OpLimitTransactionService
  ],
  exports: [
    OpLimitTransactionModalComponent
  ],
})
export class OpLimitTransactionModule { }
