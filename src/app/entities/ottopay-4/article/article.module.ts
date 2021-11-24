import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from './article.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ArticleService } from './article.service';
import { ArticleModalComponent } from './article.modal.component'; 
import { CKEditorModule } from 'ckeditor4-angular';

@NgModule({
  declarations: [
    ArticleComponent,
    ArticleModalComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    CKEditorModule
  ],
  entryComponents: [
    ArticleComponent,
    ArticleModalComponent
  ],
  providers: [
    ArticleService
  ],
  exports: [
    ArticleComponent,
    ArticleModalComponent
  ]
})
export class ArticleModule { }
