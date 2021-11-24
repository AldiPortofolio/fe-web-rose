import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './banner.component';
import { BannerModalComponent } from './banner.modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { BannerService } from './banner.service';
import { BannerImageModalComponent } from './banner-image.modal.component';

@NgModule({
  declarations: [
    BannerComponent,
    BannerModalComponent,
    BannerImageModalComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule
  ],
  entryComponents: [
    BannerComponent,
    BannerModalComponent,
    BannerImageModalComponent
  ],
  providers: [
    BannerService
  ],
  exports: [
    BannerModalComponent,
    BannerImageModalComponent
  ]
})
export class BannerModule { }
