import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdrAggregatorComponent } from './mdr-aggregator.component';
import { MdrAggregatorModalComponent } from './mdr-aggregator.modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { OnlyNumberModule } from '../app-directive/only-number.module';
import { MdrAggregatorService } from './mdr-aggregator.service';

@NgModule({
  declarations: [
    MdrAggregatorComponent,
    MdrAggregatorModalComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    OnlyNumberModule
  ],
  entryComponents: [
    MdrAggregatorComponent,
    MdrAggregatorModalComponent,
  ],
  providers: [
    MdrAggregatorService
  ],
  exports: [
    MdrAggregatorModalComponent
  ]
})
export class MdrAggregatorModule { }
