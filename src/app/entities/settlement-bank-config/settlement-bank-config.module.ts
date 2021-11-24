import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettlementBankModalComponent } from './settlement-bank-modal.component';
import { SettlementBankConfigComponent } from './settlement-bank-config.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SettlementBankConfigService } from './settlement-bank-config.service';

@NgModule({
  declarations: [
    SettlementBankConfigComponent ,
    SettlementBankModalComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule
  ],
  entryComponents: [
    SettlementBankConfigComponent,
    SettlementBankModalComponent
  ],
  providers: [
    SettlementBankConfigService
  ],
  exports: [
    SettlementBankConfigComponent,
    SettlementBankModalComponent
  ]
})
export class SettlementBankConfigModule { }
