import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { LimitTransactionDeposit } from './limit-transaction-deposit.model';
import { LimitTransactionDepositService } from './limit-transaction-deposit.service';
import Swal from 'sweetalert2';
import { UserCategory } from '../ottopay-4/user-category/user-category.model';
import { UserCategoryService } from '../ottopay-4/user-category/user-category.service';
import { LevelMerchantService } from '../level-merchant/level-merchant.service';
import { LevelMerchant } from '../level-merchant/level-merchant.model';

@Component({
  selector: 'op-limit-transaction-deposit-modal',
  templateUrl: './limit-transaction-deposit.modal.component.html',
  styleUrls: ['./limit-transaction-deposit.modal.component.css']
})
export class LimitTransactionDepositModalComponent implements OnInit {

  @Input() statusRec;
  @Input() objEdit: LimitTransactionDeposit;
  @Input() viewMsg;

  limitTransaction: LimitTransactionDeposit;
  id = 0;
  listUserCategory: UserCategory[] = [];
  listLevelMerchant: LevelMerchant[] = [];

  isFormDirty: Boolean = false;

  constructor(private modalService: NgbModal,
    private ngxService: NgxUiLoaderService,
    private limitTransactionService: LimitTransactionDepositService,
    private userCategoryService: UserCategoryService,
    private levelMerchantService: LevelMerchantService,
  ) {
  }

  searchTerm = {
    id: 0,
    code: '',
    name: '',
    notes: '',
    seq: 0,
    page: 1,
    limit: 10,
  }

  ngOnInit() {
    this.loadListUserCategory()
    this.loadListLevelMerchant()

    if (this.statusRec === 'addnew') {
      this.limitTransaction = {};
      this.limitTransaction.memberType = '';
      this.limitTransaction.minLimit = 0;
      this.limitTransaction.maxLimit = 0;
      this.limitTransaction.category = '';
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
        (res: HttpErrorResponse) => this.onError(res.message, 'Get List Member Type')
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
    this.ngxService.stop();
    console.log('error..', error, name);
  }

  save(): void {
    this.ngxService.start();

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