import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationCodeMasterTagComponent } from './validation-code-master-tag.component';
import { ValidationCodeMasterTagModalComponent } from './validation-code-master-tag.modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ValidationCodeMasterTagService } from './validation-code-master-tag.service';


@NgModule({
  declarations: [ValidationCodeMasterTagComponent, ValidationCodeMasterTagModalComponent],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule
  ],
  entryComponents: [
    ValidationCodeMasterTagComponent, ValidationCodeMasterTagModalComponent
  ],
  providers: [
    ValidationCodeMasterTagService
  ],
  exports: [
    ValidationCodeMasterTagComponent, ValidationCodeMasterTagModalComponent
  ]
})
export class ValidationCodeMasterTagModule { }
