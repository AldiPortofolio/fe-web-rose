import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MerchantQrisStatusComponent } from './merchant-qris-status.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { OnlyNumberModule } from '../app-directive/only-number.module';
import { MerchantQrisStatusService } from './merchant-qris-status.service';

@NgModule({
  declarations: [
    MerchantQrisStatusComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    OnlyNumberModule
  ],
  entryComponents: [
    MerchantQrisStatusComponent,
  ],
  providers: [
    MerchantQrisStatusService,
  ]
})
export class MerchantQrisStatusModule { }
