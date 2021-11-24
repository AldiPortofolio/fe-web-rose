import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeeCicilanSettingComponent } from './fee-cicilan-setting.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { OnlyNumberModule } from '../app-directive/only-number.module';
import { FeeCicilanSettingService } from './fee-cicilan-setting.service';

@NgModule({
  declarations: [
    FeeCicilanSettingComponent
  ],
  imports: [
      CommonModule,
      NgbModule,
      FormsModule,
      OnlyNumberModule,
  ],
  entryComponents: [
    FeeCicilanSettingComponent,
  ],
  providers: [
    FeeCicilanSettingService
  ],
  exports: [
    FeeCicilanSettingComponent
  ]
})
export class FeeCicilanSettingModule { }
