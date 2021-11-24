import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationCodeModalComponent } from './validation-code.modal.component';
import { ValidationCodeComponent } from './validation-code.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ValidationCodeService } from './validation-code.service';

@NgModule({
  declarations: [
    ValidationCodeComponent,
    ValidationCodeModalComponent 
    ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule

  ],
  entryComponents: [
    ValidationCodeComponent,
    ValidationCodeModalComponent 
  ],
  providers: [
    ValidationCodeService
  ],
  exports: [
    ValidationCodeComponent,
    ValidationCodeModalComponent 
  ]
})
export class ValidationCodeModule { }
