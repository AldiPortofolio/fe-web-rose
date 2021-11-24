import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonitoringAktivasiFdsComponent } from './monitoring-aktivasi-fds.component';
import { MonitoringAktivasiFdsService } from './monitoring-aktivasi-fds.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MonitoringAktivasiFdsComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
  ],
  entryComponents: [
    MonitoringAktivasiFdsComponent,
  ],
  providers: [
    MonitoringAktivasiFdsService,
  ]
})
export class MonitoringAktivasiFdsModule { }
