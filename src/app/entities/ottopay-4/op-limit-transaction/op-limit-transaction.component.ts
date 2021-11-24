import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { OpLimitTransaction } from './op-limit-transaction.model';
import { OpLimitTransactionService } from './op-limit-transaction.service';
import { OpLimitTransactionModalComponent } from './op-limit-transaction.modal.component';
import { UserCategory } from '../user-category/user-category.model';
import { UserCategoryService } from '../user-category/user-category.service';
import { Feature } from '../feature/feature.model';
import { FeatureService } from '../feature/feature.service';

@Component({
  selector: 'op-limit-transaction',
  templateUrl: './op-limit-transaction.component.html',
  styleUrls: ['./op-limit-transaction.component.css']
})
export class OpLimitTransactionComponent implements OnInit {

  listTimeFrame = [
    { code: "", name: "- Pilih Time Frame -" },
    { code: "daily", name: "Daily" },
    { code: "weekly", name: "Weekly" },
    { code: "monthly", name: "Monthly" },
    { code: "yearly", name: "Yearly" },
  ]

  levelMerchantList = [
    { code: "", name: "- Pilih Level Merchant -" },
    { code: "silver", name: "Silver" },
    { code: "gold", name: "Gold" },
    { code: "platinum", name: "Platinum" },
    
  ]

  searchTerm = {
    id: 0,
    userCategoryId: '',
    levelMerchant: '',
    limitFreq: 0,
    limitAmount: 0,
    featureProduct: '',
    timeFrame: '',
    // limitQrAmount: 0,
    // limitQrFreq: 0,
    // limitPpobAmount: 0,
    // limitPpobFreq: 0,
    // category: '',
    page: 1,
    limit: 10,
  }

  searchTermUserCategory = {
    id: 0,
    code: '',
    name: '',
    notes: '',
    seq: 0,
    page: 1,
    limit: 999,
  }

  searchTermFeature = {
    id: 0,
    productId: 0,
    productName: '',
    code: '',
    name: '',
    icon: '',
    notes: '',
    seq: 0,
    page: 1,
    limit: 999,
  }

  limitTransactionList: OpLimitTransaction[];
  limitTransaction: OpLimitTransaction;
  closeResult: string;
  currPage = 1;
  totalRecord = 10;
  totalData = 0;
  userCategoryList: UserCategory[];
  featureList: Feature[];

  constructor(
    private limitTransactionService: OpLimitTransactionService,
    private modalService: NgbModal,
    private ngxService: NgxUiLoaderService,
    private userCategoryService: UserCategoryService,
    private featureService: FeatureService) {
    
  }

  ngOnInit() {
    this.loadAll(this.currPage);
    
  }

  loadAll(page) {
    this.ngxService.start(); // start loader
    this.searchTerm.page = page
    this.searchTerm.limit = this.totalRecord

    this.limitTransactionService.filter({
      filter: this.searchTerm,
    })
      .subscribe(
        (res: HttpResponse<OpLimitTransaction[]>) => this.onSuccess(res.body, res.headers),
        (res: HttpErrorResponse) => this.onError(res.message)
      );

    this.userCategoryService.filter({
      filter: this.searchTermUserCategory,
    })
      .subscribe(
        (res: HttpResponse<UserCategory[]>) => this.onSuccessUserCategory(res.body, res.headers),
        (res: HttpErrorResponse) => this.onError(res.message)
      );

    this.featureService.filter({
      filter: this.searchTermFeature,
    })
      .subscribe(
        (res: HttpResponse<Feature[]>) => this.onSuccessFeature(res.body, res.headers),
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
      levelMerchant: '',
      limitAmount: 0,
      limitFreq: 0,
      featureProduct: '',
      timeFrame: '',
      page: 1,
      limit: 10,
    };
    this.loadAll(1);
  }


  private onSuccess(data, headers) {
    this.ngxService.stop();
    if (data.contents.length < 0) {
      return;
    }
    console.log(data);
    this.limitTransactionList = data.contents;
    this.totalData = data.totalData;
  }

  private onSuccessUserCategory(data, headers) {
    this.ngxService.stop();
    if (data.contents.length < 0) {
      return;
    }
    console.log(data);
    this.userCategoryList = data.contents;
    this.totalData = data.totalData;
  }

  private onSuccessFeature(data, headers) {
    this.ngxService.stop();
    if (data.contents.length < 0) {
      return;
    }
    console.log(data);
    this.featureList = data.contents;
    this.totalData = data.totalData;
  }

  private onError(error) {
    this.ngxService.stop();
    console.log('error..', error);
  }

  open(status, message) {
    const modalRef = this.modalService.open(OpLimitTransactionModalComponent, { size: 'lg' });
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

}
