import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlastNotifComponent } from './blast-notif.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { BlastNotifService } from './blast-notif.service';

@NgModule({
  declarations: [BlastNotifComponent],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule
  ],
  entryComponents: [
    BlastNotifComponent
  ],
  providers: [
    BlastNotifService
  ]
})
export class BlastNotifModule { }
