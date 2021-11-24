import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankListComponent } from './bank-list.component';
import { BankListModalComponent } from './bank-list.modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { BankListService } from './bank-list.service';
import { FeatureImageModalComponent } from '../ottopay-4/feature/feature-image.modal.component';

@NgModule({
  declarations: [
    BankListComponent,
    BankListModalComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule

  ],
  entryComponents: [
    BankListComponent,
    BankListModalComponent,
    FeatureImageModalComponent
  ],
  providers: [
    BankListService
  ],
  exports: [
    BankListComponent,
    BankListModalComponent,
  ]
})
export class BankListModule { }
