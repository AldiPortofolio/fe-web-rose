import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MerchantCustomerComponent } from './merchant-customer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { MerchantCustomerService } from './merchant-customer.service';
import { MerchantCustomerModalComponent } from './merchant-customer.modal.component';

@NgModule({
  declarations: [
    MerchantCustomerComponent,
    MerchantCustomerModalComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule
  ],
  entryComponents: [
    MerchantCustomerComponent,
    MerchantCustomerModalComponent
  ],
  providers: [
    MerchantCustomerService
  ]
})
export class MerchantCustomerModule { }
