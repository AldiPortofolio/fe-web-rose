import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Banner } from './banner.model';
import { BannerService } from './banner.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BannerModalComponent } from './banner.modal.component';
import Swal from 'sweetalert2';
import { UserCategory } from '../user-category/user-category.model';
import { UserCategoryService } from '../user-category/user-category.service';
import { LevelMerchant } from '../../level-merchant/level-merchant.model';
import { LevelMerchantService } from '../../level-merchant/level-merchant.service';

@Component({
  selector: 'op-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  searchTerm = {
    id: 0,
    userCategoryId: '',
    levelMerchantId: 0,
    adsImage: '',
    adsLink: '',
    status: '',
    seq: '',
    page: 1,
    limit: 10,
    bannerName: '',
    detailBanner: ''
  }

  userCategoryList: UserCategory[]
  listLevelMerchant: LevelMerchant[] = [];
  bannerList: Banner[];
  banner: Banner;
  closeResult: string;
  currPage = 1;
  totalRecord = 10;
  totalData = 0;

  constructor(
    private bannerService: BannerService,
    private modalService: NgbModal,
    private ngxService: NgxUiLoaderService,
    private userCategoryService: UserCategoryService,
    private levelMerchantService: LevelMerchantService,
  ) {}

  ngOnInit() {
    this.loadAll(this.currPage);
    this.loadDropdownUserCategory();
    this.loadListLevelMerchant();
  }

  loadDropdownUserCategory() {
    this.ngxService.start(); // start loader

    this.userCategoryService.dropdown()
      .subscribe(
        (res: HttpResponse<UserCategory[]>) => this.onSuccessDropdown(res.body, res.headers),
        (res: HttpErrorResponse) => this.onError(res.message)
      );

  }

  private onSuccessDropdown(data, headers) {
    this.ngxService.stop();
    if (data.contents.length < 0) {
      return;
    }

    this.userCategoryList = data.contents;
  }

  private loadListLevelMerchant() {
    this.levelMerchantService.getAllLevelMerchant(100)
      .subscribe(
        (res: HttpResponse<LevelMerchant[]>) => this.onSuccessLevel(res.body, res.headers),
        (res: HttpErrorResponse) => this.onErrorLevel(res.message, 'Error Get List Level Merchant'),
        () => { this.ngxService.stop(); console.log('finally')}
      );
  }

  private onSuccessLevel(data, headers) {
    if (data.contents.length < 0) {
      return;
    }
    console.log(data);
    this.listLevelMerchant = data.contents
    
  }

  private onErrorLevel(error, name) {
    console.log('error..', error, name);
  }

  loadAll(page) {
    this.ngxService.start(); // start loader
    this.searchTerm.page = page
    this.searchTerm.limit = this.totalRecord
    // this.searchTerm.userCategoryId.toFixed()



    let searchTermNew = {
      id: 0,
      userCategoryId: parseInt(this.searchTerm.userCategoryId),
      levelMerchantId: +this.searchTerm.levelMerchantId,
      adsImage: '',
      adsLink: '',
      status: '',
      seq: '',
      page: page,
      limit: this.totalRecord,
      bannerName: this.searchTerm.bannerName,
      detailBanner: ''
    }

    console.log('this.searchTerm', searchTermNew)
    this.bannerService.filter({
      filter: searchTermNew,
    })
      .subscribe(
        (res: HttpResponse<Banner[]>) => this.onSuccess(res.body, res.headers),
        (res: HttpErrorResponse) => this.onError(res.message)
      );

  }

  onFilter() {
    this.loadAll(this.currPage);
  }

  resetFilter() {
    this.searchTerm = {
      id: 0,
      userCategoryId: '',
      levelMerchantId: 0,
      adsImage: '',
      adsLink: '',
      status: '',
      seq: '',
      page: 1,
      limit: 10,
      bannerName: '',
      detailBanner: ''
    };
    this.loadAll(1);
  }


  private onSuccess(data, headers) {
    this.ngxService.stop();
    if (data.contents.length < 0) {
      return;
    }
    console.log(data);
    this.bannerList = data.contents;
    this.totalData = data.totalData;
  }

  private onError(error) {
    this.ngxService.stop();
    console.log('error..', error);
  }

  open(status, message) {
    const modalRef = this.modalService.open(BannerModalComponent, { size: 'lg' });
    modalRef.componentInstance.statusRec = status;
    modalRef.componentInstance.objEdit = message;
    modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(this.closeResult);
      this.currPage = 1;
      this.loadAll(this.currPage);
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.currPage = 1;
      this.loadAll(this.currPage);
    });
  }

  private getDismissReason(reason: any): string {
    console.log(reason);
    return reason;
  }

  loadPage() {
    this.loadAll(this.currPage);
  }

  remove(banner: Banner) {
    console.log(banner)
    this.bannerService.delete(banner.id).subscribe(result => {
        console.log('Result==>' + result.body);
        if (result.body.errCode === '00') {
            console.log('Toast success');
            Swal.fire('Success', 'Success delete banner', 'success');
            this.currPage = 1;
            this.loadAll(this.currPage);
        } else {
            Swal.fire('Failed', result.body.errDesc, 'error');
        }
    });

  }

}
