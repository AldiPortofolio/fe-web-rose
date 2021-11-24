import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterTagModalComponent } from './master-tag.modal.component';
import { MasterTagComponent } from './master-tag.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { MasterTagService } from './master-tag.service';

@NgModule({
  declarations: [
    MasterTagComponent,
    MasterTagModalComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule
  ],
  entryComponents: [
    MasterTagComponent,
    MasterTagModalComponent
  ],
  providers: [
    MasterTagService
  ],
  exports: [
    MasterTagComponent,
    MasterTagModalComponent
  ]
})
export class MasterTagModule { }
