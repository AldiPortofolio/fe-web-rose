import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileThemeComponent } from './profile-theme.component';
import { ProfileThemeModalComponent } from './profile-theme.modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ProfileThemeService } from './profile-theme.service';
import { ColorPickerModule } from 'ngx-color-picker';
import { ProfileThemeImageModalComponent } from './profile-theme-image.modal.component';

@NgModule({
  declarations: [
    ProfileThemeComponent,
    ProfileThemeModalComponent,
    ProfileThemeImageModalComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ColorPickerModule
  ],
  entryComponents: [
    ProfileThemeComponent,
    ProfileThemeModalComponent,
    ProfileThemeImageModalComponent
  ],
  providers: [
    ProfileThemeService
  ],
  exports: [
    ProfileThemeModalComponent,
    ProfileThemeImageModalComponent
  ]
})
export class ProfileThemeModule { }
