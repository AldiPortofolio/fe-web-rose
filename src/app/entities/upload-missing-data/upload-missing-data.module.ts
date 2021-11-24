import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadMissingDataComponent } from './upload-missing-data.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UploadMissingDataService } from './upload-missing-data.service';

@NgModule({
  declarations: [UploadMissingDataComponent],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    UploadMissingDataComponent,
  ],
  providers: [
    UploadMissingDataService
  ],
})
export class UploadMissingDataModule { }
