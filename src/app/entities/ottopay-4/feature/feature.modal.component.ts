import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Feature } from './feature.model';
import { FeatureService } from './feature.service';
import Swal from 'sweetalert2';
import { FeatureImageModalComponent } from './feature-image.modal.component';
import { ProductService } from '../product/product.service';
import { Product } from '../product/product.model';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'op-feature-modal',
  templateUrl: './feature.modal.component.html',
  styleUrls: ['./feature.modal.component.css']
})
export class FeatureModalComponent implements OnInit {

  @Input() statusRec;
  @Input() objEdit: Feature;
  @Input() viewMsg;

  searchTermProduct = {
    id: 0,
    userCategoryId: 0,
    userCategoryName: '',
    levelMerchantId: 0,
    levelMerchantName: '',
    dashboardTopBackground: '',
    themeColor: '',
    dashboardLogo: '',
    dashboardText: '',
    profileBackgroundImage: '',
    status: '',
    page: 1,
    limit: 9999,
  }

  feature: Feature;
  listProduct: Product[] = [];

  isFormDirty: Boolean = false;
  closeResult: string;

  constructor(private modalService: NgbModal,
    private ngxService: NgxUiLoaderService,
    private featureService:  FeatureService,
    private productService: ProductService
    ) {
  }

  ngOnInit() {
    this.loadListProduct()

    if (this.statusRec === 'addnew') {
      this.feature = {};
      this.feature.id = 0;
      this.feature.productId = 0;
      this.feature.productName = '';
      this.feature.name = '';
      this.feature.notes = '';
      this.feature.icon = '';
      this.feature.code = '';
      this.feature.seq = 0
    } else {
      this.feature = this.objEdit;
    }
  }

  private loadListProduct() {
    this.productService.filter({
      filter: this.searchTermProduct,
      })
      .subscribe(
        (res: HttpResponse<Product[]>) => this.onSuccess(res.body, res.headers),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  private onSuccess(data, headers) {
    if (data.contents.length < 0) {
      return;
    }
    console.log(data);
    this.listProduct = data.contents;
  }

  private onError(error) {
    this.ngxService.stop();
    console.log('error..', error);
  }

  save(): void {
    this.ngxService.start();

    this.feature.productId = +this.feature.productId;

    this.featureService.save(this.feature).subscribe(result => {
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

  // upload icon
  // processFileImageIcon(imageInput: any) {
  //   const file: File = imageInput.files[0];
  //   const reader = new FileReader();

  //   reader.readAsDataURL(file);
  //   reader.onload = (_event) => {
  //     // console.log(reader.result);
  //     this.feature.icon = reader.result;
  //   };
  // }

  openGallery() {
    const modalRef = this.modalService.open(FeatureImageModalComponent, { size: 'lg' });
    modalRef.result.then((result) => {
      this.feature.icon = result;
    }, (reason) => {
      console.log("close")
    });
  }

}
