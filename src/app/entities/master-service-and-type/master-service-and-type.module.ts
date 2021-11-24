import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterServiceAndTypeComponent } from './master-service-and-type.component';
import { MasterServiceModalComponent } from './master-service.modal.component';
import { MasterTypeModalComponent } from './master-type.modal.component';
import { MasterServiceService } from './master-service.service';
import { MasterTypeService } from './master-type.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MasterServiceAndTypeComponent,
    MasterServiceModalComponent,
    MasterTypeModalComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule
  ],
  entryComponents: [
    MasterServiceAndTypeComponent,
    MasterServiceModalComponent,
    MasterTypeModalComponent
  ],
  providers: [
    MasterServiceService,
    MasterTypeService
  ],
})
export class MasterServiceAndTypeModule { }
