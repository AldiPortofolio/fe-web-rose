import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcquititionsComponent } from './acquititions.component';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AcquititionsService } from './acquititions.service';
import { MerchantGroupService } from '../merchant-group/merchant-group.service';
import { LookupService } from '../lookup/lookup.service';
import { UserCategoryService } from '../ottopay-4/user-category/user-category.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AcquititionsModalComponent } from './acquititions.modal.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [
    AcquititionsComponent,
    AcquititionsModalComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    NgMultiSelectDropDownModule
  ],
  entryComponents: [
    AcquititionsComponent,
    AcquititionsModalComponent
  ],
  providers: [
    AcquititionsService,
    MerchantGroupService,
    LookupService,
    UserCategoryService,
  ],
  exports: [
    AcquititionsComponent,
    AcquititionsModalComponent
  ]
})
export class AcquititionsModule { }
