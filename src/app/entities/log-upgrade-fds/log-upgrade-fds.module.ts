import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogUpgradeFdsComponent } from './log-upgrade-fds.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { LogUpgradeFdsService } from './log-upgrade-fds.service';
import { LogUpgradeFdsModalComponent } from './log-upgrade-fds-modal.component';

@NgModule({
  declarations: [
    LogUpgradeFdsComponent,
    LogUpgradeFdsModalComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule
  ],
  entryComponents: [
    LogUpgradeFdsComponent,
    LogUpgradeFdsModalComponent
  ],
  providers: [
    LogUpgradeFdsService
  ],
  exports: [
    LogUpgradeFdsComponent,
    LogUpgradeFdsModalComponent
  ]
})
export class LogUpgradeFdsModule { }
