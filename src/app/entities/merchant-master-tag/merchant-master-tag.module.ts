import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MerchantMasterTagComponent } from './merchant-master-tag.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { MerchantMasterTagService } from './merchant-master-tag.service';

@NgModule({
  declarations: [
    MerchantMasterTagComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule
  ],
  entryComponents: [
    MerchantMasterTagComponent
  ],
  providers: [
    MerchantMasterTagService
  ],
})
export class MerchantMasterTagModule { }
