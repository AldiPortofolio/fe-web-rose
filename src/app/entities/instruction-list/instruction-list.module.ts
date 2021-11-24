import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { InstructionListComponent } from './instruction-list.component';
import { InstructionListModalComponent } from './instruction-list.modal.component';
import { InstructionListService } from './instruction-list.service';

@NgModule({
  declarations: [
    InstructionListComponent,
    InstructionListModalComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule
  ],
  entryComponents: [
    InstructionListComponent,
    InstructionListModalComponent
  ],
  providers: [
    InstructionListService
  ],
  exports: [
    InstructionListComponent,
    InstructionListModalComponent
  ]
})
export class InstructionListModule { }
