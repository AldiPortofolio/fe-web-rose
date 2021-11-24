import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MerchantAggregatorComponent } from './merchant-aggregator.component';
import { MerchantAggregatorModalComponent } from './merchant-aggregator.modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MerchantAggregatorService } from './merchant-aggregator.service';
import { OnlyNumberDirective } from '../app-directive/only-number.directive';
import { OnlyNumberModule } from '../app-directive/only-number.module';
import { MerchantAggregatorDetailComponent } from './merchant-aggregator-detail/merchant-aggregator-detail.component';
import { AssignMerchantAggregatorComponent } from './assign-merchant-aggregator/assign-merchant-aggregator.component';
import { MerchantAggregatorDetailApprovalComponent } from '../merchant-aggregator-detail-approval/merchant-aggregator-detail-approval.component';

@NgModule({
  declarations: [
    MerchantAggregatorComponent,
    MerchantAggregatorModalComponent,
    MerchantAggregatorDetailComponent,
    AssignMerchantAggregatorComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    OnlyNumberModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    MerchantAggregatorComponent,
    MerchantAggregatorModalComponent
  ],
  providers: [
    MerchantAggregatorService,
  ],
  exports: [
    MerchantAggregatorModalComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class MerchantAggregatorModule { }
