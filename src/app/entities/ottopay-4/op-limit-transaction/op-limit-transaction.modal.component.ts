import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { OpLimitTransaction } from './op-limit-transaction.model';
import { OpLimitTransactionService } from './op-limit-transaction.service';
import Swal from 'sweetalert2';
import { UserCategory } from '../user-category/user-category.model';
import { UserCategoryService } from '../user-category/user-category.service';
import { LevelMerchantService } from '../../level-merchant/level-merchant.service';
import { LevelMerchant } from '../../level-merchant/level-merchant.model';
import { FeatureService } from '../feature/feature.service';
import { Feature } from '../feature/feature.model';

@Component({
  selector: 'op-limit-transaction-modal',
  templateUrl: './op-limit-transaction.modal.component.html',
  styleUrls: ['./op-limit-transaction.modal.component.css']
})
export class OpLimitTransactionModalComponent implements OnInit {

  @Input() statusRec;
  @Input() objEdit: OpLimitTransaction;
  @Input() viewMsg;

  limitTransaction: OpLimitTransaction;
  listUserCategory: UserCategory[] = [];
  listLevelMerchant: LevelMerchant[] = [];
  listFeatureProduct: Feature[] = [];

  isFormDirty: Boolean = false;

  listTimeFrame = [
    { code: "daily", name: "Daily" },
    { code: "weekly", name: "Weekly" },
    { code: "monthly", name: "Monthly" },
    { code: "yearly", name: "Yearly" },
  ]

  constructor(private modalService: NgbModal,
    private ngxService: NgxUiLoaderService,
    private limitTransactionService: OpLimitTransactionService,
    private userCategoryService: UserCategoryService,
    private levelMerchantService: LevelMerchantService,
    private featureProductService: FeatureService,
    ) {
  }

  searchTerm = {
    id: 0,
    code: '',
    name: '',
    notes: '',
    seq: 0,
    page: 1,
    limit: 100,
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
    limit: 100,
  }

  ngOnInit() {
    this.loadListUserCategory()
    this.loadListLevelMerchant()
    this.loadListFeatureProduct()

    if (this.statusRec === 'addnew') {
      this.limitTransaction = {};
      this.limitTransaction.id = 0;
      this.limitTransaction.userCategoryId = '';
      this.limitTransaction.levelMerchant = '';
      this.limitTransaction.minLimitAmount = 0
      this.limitTransaction.limitAmount = 0
      this.limitTransaction.limitFreq = 0
      this.limitTransaction.featureProduct = '';
      this.limitTransaction.timeFrame = '';
    } else {
      this.limitTransaction = this.objEdit;
    }
  }

  private loadListUserCategory() {
    // this.ngxService.start();
    this.userCategoryService.filter({
      filter: this.searchTerm,
    })
      .subscribe(
        (res: HttpResponse<UserCategory[]>) => this.onSuccess(res.body, res.headers, 0),
        (res: HttpErrorResponse) => this.onError(res.message, 'Get List User Category')
      );
  }

  private loadListLevelMerchant() {
    this.levelMerchantService.getAllLevelMerchant(100)
      .subscribe(
        (res: HttpResponse<LevelMerchant[]>) => this.onSuccess(res.body, res.headers, 1),
        (res: HttpErrorResponse) => this.onError(res.message, 'Get List Level Merchant')
      );
  }

  private loadListFeatureProduct() {
    // this.ngxService.start();
    this.featureProductService.filter({
      filter: this.searchTermFeature,
    })
      .subscribe(
        (res: HttpResponse<UserCategory[]>) => this.onSuccess(res.body, res.headers, 2),
        (res: HttpErrorResponse) => this.onError(res.message, 'Get List Feature Product')
      );
  }

  private onSuccess(data, headers, code) {
    if (data.contents.length < 0) {
      return;
    }
    console.log(data);

    if (code == 0) {
      this.listUserCategory = data.contents;
    } else if (code == 1) {
      this.listLevelMerchant = data.contents;
    } else {
      this.listFeatureProduct = data.contents;
    }
  }

  private onError(error, name) {
    this.ngxService.stop();
    console.log('error..', error, name);
  }

  save(): void {
    this.ngxService.start();
    this.limitTransaction.minLimitAmount = +this.limitTransaction.minLimitAmount
    this.limitTransaction.limitAmount = +this.limitTransaction.limitAmount
    this.limitTransaction.limitFreq = +this.limitTransaction.limitFreq

    this.limitTransactionService.save(this.limitTransaction).subscribe(result => {
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
