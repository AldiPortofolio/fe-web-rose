import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LimitTransactionComponent } from './limit-transaction.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { LimitTransactionService } from './limit-transaction.service';
import { LimitTransactionModalComponent } from './limit-transaction.modal.component';
import { OnlyNumberModule } from '../app-directive/only-number.module';

@NgModule({
  declarations: [
    LimitTransactionComponent,
    LimitTransactionModalComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    OnlyNumberModule
  ],
  entryComponents: [
    LimitTransactionComponent,
    LimitTransactionModalComponent,
  ],
  providers: [
    LimitTransactionService,
  ],
  exports: [
    LimitTransactionModalComponent
  ]
})
export class LimitTransactionModule { }
