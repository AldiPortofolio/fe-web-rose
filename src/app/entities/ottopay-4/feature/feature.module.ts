import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureComponent } from './feature.component';
import { FeatureModalComponent } from './feature.modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { FeatureService } from './feature.service';
import { FeatureImageModalComponent } from './feature-image.modal.component';

@NgModule({
  declarations: [
    FeatureComponent,
    FeatureModalComponent,
    FeatureImageModalComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
  ],
  entryComponents: [
    FeatureComponent,
    FeatureModalComponent,
    FeatureImageModalComponent
  ],
  providers: [
    FeatureService,
  ],
  exports: [
    FeatureModalComponent,
    FeatureImageModalComponent
  ]
})
export class FeatureModule { }
