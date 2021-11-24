import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageManagementComponent } from './image-management.component';
import { ImageManagementModalComponent } from './image-management.modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ImageManagementService } from './image-management.service';

@NgModule({
  declarations: [
    ImageManagementComponent,
    ImageManagementModalComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule
  ],
  entryComponents: [
    ImageManagementComponent,
    ImageManagementModalComponent
  ],
  providers: [
    ImageManagementService
  ],
  exports: [
    ImageManagementModalComponent
  ]
})
export class ImageManagementModule { }
