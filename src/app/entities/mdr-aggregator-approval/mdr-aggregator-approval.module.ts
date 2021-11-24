import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdrAggregatorApprovalComponent } from './mdr-aggregator-approval.component';
import { MdrAggregatorApprovalModalComponent } from './mdr-aggregator-approval.modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OnlyNumberModule } from '../app-directive/only-number.module';
import { FormsModule } from '@angular/forms';
import { MdrAggregatorApprovalService } from './mdr-aggregator-approval.service';

@NgModule({
  declarations: [
    MdrAggregatorApprovalComponent,
    MdrAggregatorApprovalModalComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    OnlyNumberModule
  ],
  entryComponents: [
    MdrAggregatorApprovalComponent,
    MdrAggregatorApprovalModalComponent,
  ],
  providers: [
    MdrAggregatorApprovalService
  ],
  exports: [
    MdrAggregatorApprovalModalComponent
  ]
})
export class MdrAggregatorApprovalModule { }
