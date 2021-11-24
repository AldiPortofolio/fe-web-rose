import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Product } from './product.model';
import { ProductService } from './product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'op-product-modal',
  templateUrl: './product.modal.component.html',
  styleUrls: ['./product.modal.component.css']
})
export class ProductModalComponent implements OnInit {

  @Input() statusRec;
  @Input() objEdit: Product;
  @Input() viewMsg;

  product: Product;

  isFormDirty: Boolean = false;

  constructor(private modalService: NgbModal,
    private ngxService: NgxUiLoaderService,
    private productService: ProductService) {
  }

  ngOnInit() {
    if (this.statusRec === 'addnew') {
      this.product = {};
      this.product.id = 0;
      this.product.code = '';
      this.product.name = '';
      this.product.title = '';
      this.product.desc = '';
      this.product.notes = '';
      this.product.seq = 0
    } else {
      this.product = this.objEdit;
    }
  }

  save(): void {
    this.ngxService.start();

    this.productService.save(this.product).subscribe(result => {
      this.isFormDirty = true;
      if (result.body.errCode === '00') {
        this.closeForm();
      } else {
        console.log('error');
        Swal.fire('Failed', result.body.errDesc, 'error').then(
        );
      }
      this.ngxService.stop();
    });
  }

  closeForm(): void {
    if (this.isFormDirty === true) {
      this.modalService.dismissAll('refresh');
    } else {
      this.modalService.dismissAll('close');
    }
  }

}
