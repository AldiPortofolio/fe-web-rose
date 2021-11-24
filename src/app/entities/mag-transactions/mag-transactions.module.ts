import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagTransactionsComponent } from './mag-transactions.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MagTransactionsComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule
  ],
  entryComponents: [
    MagTransactionsComponent,
  ],
  providers: [
  ]
})
export class MagTransactionsModule { }
