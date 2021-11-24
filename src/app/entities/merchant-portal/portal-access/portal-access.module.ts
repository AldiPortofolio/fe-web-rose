import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { PortalAccessComponent } from './portal-access.component';
import { PortalAccessModalComponent } from './portal-access.modal.component';

@NgModule({
  declarations: [
    PortalAccessComponent,
    PortalAccessModalComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule
  ],
   entryComponents: [
     PortalAccessComponent,
     PortalAccessModalComponent
  ],
  providers: [
  ],
})
export class PortalAccessModule { }
