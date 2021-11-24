import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MerchantAggregatorDetailApprovalComponent } from './merchant-aggregator-detail-approval.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { OnlyNumberModule } from '../app-directive/only-number.module';
import { MerchantAggregatorDetailApprovalService } from './merchant-aggregator-detail-approval.service';
import { MagapprovaldetailComponent } from './magapprovaldetail.component';

@NgModule({
  declarations: [
    MerchantAggregatorDetailApprovalComponent,
    MagapprovaldetailComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    OnlyNumberModule
  ],
  entryComponents: [
    MerchantAggregatorDetailApprovalComponent,
    MagapprovaldetailComponent
  ],
  providers: [
    MerchantAggregatorDetailApprovalService,
  ],
  exports: [
  ]
})
export class MerchantAggregatorDetailApprovalModule { }
