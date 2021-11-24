import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { ProductModalComponent } from './product.modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { OnlyNumberModule } from '../../app-directive/only-number.module';
import { ProductService } from './product.service';

@NgModule({
  declarations: [
    ProductComponent,
    ProductModalComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    OnlyNumberModule
  ],
  entryComponents: [
    ProductComponent,
    ProductModalComponent
  ],
  providers: [
    ProductService,
  ],
  exports: [
    ProductModalComponent
  ]
})
export class ProductModule { }
