import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCategoryComponent } from './user-category.component';
import { UserCategoryModalComponent } from './user-category.modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { UserCategoryService } from './user-category.service';

@NgModule({
  declarations: [
    UserCategoryComponent,
    UserCategoryModalComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule
  ],
  entryComponents: [
    UserCategoryComponent,
    UserCategoryModalComponent
  ],
  providers: [
    UserCategoryService
  ],
  exports: [
    UserCategoryModalComponent
  ]

})
export class UserCategoryModule { }
