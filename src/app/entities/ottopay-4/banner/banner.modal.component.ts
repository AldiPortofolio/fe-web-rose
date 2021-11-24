import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Banner } from './banner.model';
import { BannerService } from './banner.service';
import { OpLimitTransactionService } from '../op-limit-transaction/op-limit-transaction.service';
import { UserCategory } from '../user-category/user-category.model';
import { UserCategoryService } from '../user-category/user-category.service';
import { BannerImageModalComponent } from './banner-image.modal.component';
import { LevelMerchant } from '../../level-merchant/level-merchant.model';
import { LevelMerchantService } from '../../level-merchant/level-merchant.service';

@Component({
  selector: 'banner-modal',
  templateUrl: './banner.modal.component.html',
  styleUrls: ['./banner.modal.component.css']
})
export class BannerModalComponent implements OnInit {

  @Input() statusRec;
  @Input() objEdit: Banner;
  @Input() viewMsg;

  banner: Banner;
  listUserCategory: UserCategory[] = [];
  listLevelMerchant: LevelMerchant[] = [];

  isFormDirty: Boolean = false;

  searchTerm = {
    id: 0,
    code: '',
    name: '',
    notes: '',
    seq: 0,
    page: 1,
    limit: 10,
  }

  constructor(private modalService: NgbModal,
    private bannerService: BannerService,
    private userCategoryService: UserCategoryService,
    private ngxService: NgxUiLoaderService,
    private levelMerchantService: LevelMerchantService,
    ) {
  }

  ngOnInit() {
    this.loadDropdownUserCategory()
    this.loadListLevelMerchant()

    if (this.statusRec === 'addnew') {
      this.banner = {};
      this.banner.id = 0;
      this.banner.userCategoryId = 0;
      this.banner.levelMerchantId = 0;
      this.banner.name = '';
      this.banner.adsImage = '';
      this.banner.adsLink = '';
      this.banner.seq = '';
      this.banner.status = '';
    } else {
      this.banner = this.objEdit;
    }
  }

  // private loadListUserCategory() {
  //   this.userCategoryService.filter({
  //     filter: this.searchTerm,
  //   })
  //     .subscribe(
  //       (res: HttpResponse<UserCategory[]>) => this.onSuccess(res.body, res.headers, 0),
  //       (res: HttpErrorResponse) => this.onError(res.message, 'Get List User Category')
  //     );
  // }

  private loadListLevelMerchant() {
    this.levelMerchantService.getAllLevelMerchant(100)
      .subscribe(
        (res: HttpResponse<LevelMerchant[]>) => this.onSuccess(res.body, res.headers, 1),
        (res: HttpErrorResponse) => this.onError(res.message, 'Error Get List Level Merchant'),
        () => { this.ngxService.stop(); console.log('finally')}
      );
  }

  private onSuccess(data, headers, code) {
    if (data.contents.length < 0) {
      return;
    }
    console.log(data);
    if (code == 0) {
      this.listUserCategory = data.contents;
    } else {
      this.listLevelMerchant = data.contents
    }
  }

  private onError(error, name) {
    console.log('error..', error, name);
  }

  save(): void {
    this.ngxService.start();

    this.banner.userCategoryId = +this.banner.userCategoryId
    this.banner.levelMerchantId = +this.banner.levelMerchantId

    this.bannerService.save(this.banner).subscribe(result => {
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

  openGallery() {
    const modalRef = this.modalService.open(BannerImageModalComponent, { size: 'lg' });
    modalRef.result.then((result) => {
      this.banner.name = result.name;
      this.banner.adsImage = result.url;
    }, (reason) => {
      console.log("close")
    });
  }

  loadDropdownUserCategory() {
    this.ngxService.start(); // start loader

    this.userCategoryService.dropdown()
      .subscribe(
        (res: HttpResponse<UserCategory[]>) => this.onSuccessDropdown(res.body, res.headers),
        (res: HttpErrorResponse) => this.onErrorDropdown(res.message)
      );

  }

  private onSuccessDropdown(data, headers) {
    this.ngxService.stop();
    if (data.contents.length < 0) {
      return;
    }

    this.listUserCategory = data.contents;
  }

  private onErrorDropdown(error) {
    this.ngxService.stop();
    console.log('error..', error);
  }

}
