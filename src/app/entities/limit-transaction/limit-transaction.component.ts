import { Component, OnInit } from '@angular/core';
import { LimitTransaction } from './limit-transaction-model';
import { ActivatedRoute } from '@angular/router';
import { LimitTransactionService } from './limit-transaction.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { LimitTransactionModalComponent } from './limit-transaction.modal.component';
import Swal from 'sweetalert2';
import { LimitTransactionApproval } from '../limit-transaction-approval/limit-transaction-approval.model';

@Component({
  selector: 'op-limit-transaction',
  templateUrl: './limit-transaction.component.html',
  styleUrls: ['./limit-transaction.component.css']
})
export class LimitTransactionComponent implements OnInit {

  limitTransactionList: LimitTransaction[];
  limitTransaction: LimitTransaction;
  limitTransactionTemp: LimitTransactionApproval
  currPage = 1;
  totalRecord = 10;
  totalData = 0;

  searchTerm = {
    productType: '',
    productName: '',
    byGroupFilter: '',
    byTime: '',
    page: 1,
    limit: 10,
  }

  closeResult: string;
  sub: any

  constructor(private route: ActivatedRoute,
    private limitTransactionService: LimitTransactionService,
    private modalService: NgbModal,
    private ngxService: NgxUiLoaderService) {
  }

  ngOnInit() {
    this.loadAll(this.currPage);
    this.limitTransactionTemp = {}
  }

  loadAll(page) {
    this.ngxService.start(); // start loader
    this.searchTerm.page = page
    this.searchTerm.limit = this.totalRecord
    this.limitTransactionService.filter({
      filter: this.searchTerm,
    })
      .subscribe(
        (res: HttpResponse<LimitTransaction[]>) => this.onSuccess(res.body, res.headers),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
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

  private onError(error) {
    this.ngxService.stop();
    console.log('error..', error);
  }

  loadPage() {
    this.loadAll(this.currPage);
  }
  onFilter() {
    this.loadAll(this.currPage);
  }

  resetFilter() {
    this.searchTerm = {
      productType: '',
      productName: '',
      byGroupFilter: '',
      byTime: '',
      page: 1,
      limit: 10,
    };
    this.loadAll(1);
  }

  open(status, message) {
    const modalRef = this.modalService.open(LimitTransactionModalComponent, { size: 'lg' });
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

  delete(limitTransaction): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this config?',
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Delete!'
    }).then((result) => {
      console.log("result ->", result);
      if (result.value) {
        this.ngxService.start();
        // this.limitTransaction = limitTransaction
        this.limitTransactionTemp.productType = limitTransaction.productType;
        this.limitTransactionTemp.productName = limitTransaction.productName;
        this.limitTransactionTemp.limitFreq = limitTransaction.limitFreq;
        this.limitTransactionTemp.limitAmt = limitTransaction.limitAmt;
        this.limitTransactionTemp.limitFreqMin = limitTransaction.limitFreqMin;
        this.limitTransactionTemp.limitAmtMin = limitTransaction.limitAmtMin;
        this.limitTransactionTemp.byTime = limitTransaction.byTime;
        this.limitTransactionTemp.byGroup = limitTransaction.byGroup;
        this.limitTransactionTemp.masterLimitationId = limitTransaction.id;
        this.limitTransactionTemp.actionType = 4;
        this.limitTransactionTemp.status = 0;
        this.limitTransactionService.save(this.limitTransactionTemp).subscribe(result => {
          if (result.body.errCode === '00') {
            Swal.fire('Success', "Need To Approval", 'success').then(
            );
          } else {
            console.log('error');
            Swal.fire('Failed', result.body.errDesc, 'error').then(
            );
          }
          this.ngxService.stop();
        });
      }
    });
  }

}
