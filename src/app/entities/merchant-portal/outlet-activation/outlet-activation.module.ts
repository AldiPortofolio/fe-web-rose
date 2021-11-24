import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutletActivationComponent } from './outlet-activation.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { OutletActivationModalComponent } from './outlet-activation.modal.component';

@NgModule({
  declarations: [
    OutletActivationComponent,
    OutletActivationModalComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule
  ],
  entryComponents: [
    OutletActivationComponent,
    OutletActivationModalComponent,
  ],
  providers: [
  ],
})
export class OutletActivationModule { }
