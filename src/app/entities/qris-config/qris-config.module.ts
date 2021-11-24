import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QrisConfigComponent } from './qris-config.component';
import { QrisConfigModalComponent } from './qris-config.modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { OnlyNumberModule } from '../app-directive/only-number.module';
import { QrisConfigService } from './qris-config.service';

@NgModule({
  declarations: [
    QrisConfigComponent,
    QrisConfigModalComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    OnlyNumberModule
  ],
  entryComponents: [
    QrisConfigComponent,
    QrisConfigModalComponent
  ],
  providers: [
    QrisConfigService,
  ],
  exports: [
    QrisConfigModalComponent
  ]
})
export class QrisConfigModule { }
