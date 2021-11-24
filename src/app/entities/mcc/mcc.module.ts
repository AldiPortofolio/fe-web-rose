import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MccComponent } from './mcc.component';
import { MccService } from './mcc.service';

@NgModule({
  declarations: [
    MccComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule
  ],
  entryComponents: [
    MccComponent
  ],
  providers: [
    MccService
  ],
})
export class MccModule { }
