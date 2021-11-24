import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QrPreprintedModalComponent } from './qr-preprinted.modal.component';
import { QrPreprintedComponent } from './qr-preprinted.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { QrPreprintedService } from './qr-preprinted.service';
import { OnlyNumberModule } from '../app-directive/only-number.module';


@NgModule({
  declarations: [
    QrPreprintedComponent,
    QrPreprintedModalComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    OnlyNumberModule
  ],
  entryComponents: [
    QrPreprintedComponent,
    QrPreprintedModalComponent
  ],
  providers: [
    QrPreprintedService,
  ],
})
export class QrPreprintedModule { }
