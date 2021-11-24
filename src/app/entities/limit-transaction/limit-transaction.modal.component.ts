import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal from 'sweetalert2';
import { LimitTransaction } from './limit-transaction-model';
import { LimitTransactionService } from './limit-transaction.service';
import { Merchant } from '../merchant/merchant.model';
import { FormGroup, FormArray, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MerchantAggregatorDetailTemp } from '../merchant-aggregator/merchant-aggregator-detail/merchant-aggregator-detail.model';
import { MerchantService } from '../merchant/merchant.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { LimitTransactionApproval } from '../limit-transaction-approval/limit-transaction-approval.model';

@Component({
  selector: 'op-limit-transaction-modal',
  templateUrl: './limit-transaction.modal.component.html',
  styleUrls: ['./limit-transaction.modal.component.css']
})
export class LimitTransactionModalComponent implements OnInit {

  @Input() statusRec;
  @Input() objEdit: LimitTransaction;
  @Input() viewMsg;

  limitTransaction: LimitTransaction;
  limitTransactionTemp: LimitTransactionApproval;

  isFormDirty: Boolean = false;

  constructor(private modalService: NgbModal,
    private ngxService: NgxUiLoaderService,
    private limitTransactionService: LimitTransactionService,
    private fb: FormBuilder,
    private merchantService: MerchantService, ) {
  }

  ngOnInit() {
    if (this.statusRec === 'addnew') {
      this.limitTransaction = {};
      this.limitTransaction.productType = '';
      this.limitTransaction.productName = '';
      this.limitTransaction.limitFreq = 0;
      this.limitTransaction.limitFreqMin = 0;
      this.limitTransaction.limitAmt = 0;
      this.limitTransaction.limitAmtMin = 0;
      this.limitTransaction.byTime = '';
      this.limitTransaction.id = 0;
    } else {
      this.limitTransaction = this.objEdit;
    }
    this.limitTransactionTemp = {}
    console.log(this.limitTransaction);
  }

  save(): void {
    this.ngxService.start();
    console.log("limit-transaction->",this.limitTransaction)
    if (this.limitTransaction.id === 0) {
      this.limitTransactionTemp.actionType = 0;
      this.limitTransactionTemp.masterLimitationId = 0;
      this.limitTransactionTemp.status = 1
    } else {
      this.limitTransactionTemp.actionType = 1;
      this.limitTransactionTemp.masterLimitationId = this.limitTransaction.id
      this.limitTransactionTemp.status = 1;
    }
    this.limitTransactionTemp.productType = this.limitTransaction.productType
    this.limitTransactionTemp.productName = this.limitTransaction.productName
    this.limitTransactionTemp.limitFreq = this.limitTransaction.limitFreq
    this.limitTransactionTemp.limitAmt = this.limitTransaction.limitAmt
    this.limitTransactionTemp.limitFreqMin = this.limitTransaction.limitFreqMin
    this.limitTransactionTemp.limitAmtMin = this.limitTransaction.limitAmtMin
    this.limitTransactionTemp.byTime = this.limitTransaction.byTime
    this.limitTransactionTemp.byGroup = this.limitTransaction.byGroup
    this.limitTransactionService.save(this.limitTransactionTemp).subscribe(result => {
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
