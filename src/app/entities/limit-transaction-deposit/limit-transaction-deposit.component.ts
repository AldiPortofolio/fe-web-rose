import { Component, OnInit } from '@angular/core';
import { LimitTransactionDeposit } from './limit-transaction-deposit.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { LimitTransactionDepositService } from './limit-transaction-deposit.service';
import { LimitTransactionDepositModalComponent } from './limit-transaction-deposit.modal.component';

@Component({
  selector: 'op-limit-transaction-deposit',
  templateUrl: './limit-transaction-deposit.component.html',
  styleUrls: ['./limit-transaction-deposit.component.css']
})
export class LimitTransactionDepositComponent implements OnInit {

  searchTerm = {
    category: '',
    memberType: '',
    page: 1,
    limit: 10,
  }

  limitTransactionList: LimitTransactionDeposit[];
  limitTransaction: LimitTransactionDeposit;
  closeResult: string;
  currPage = 1;
  totalRecord = 10;
  totalData = 0;

  checked = false;

  constructor(
    private limitTransactionService: LimitTransactionDepositService,
    private modalService: NgbModal,
    private ngxService: NgxUiLoaderService) {
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
        (res: HttpResponse<LimitTransactionDeposit[]>) => this.onSuccess(res.body, res.headers),
        (res: HttpErrorResponse) => this.onError(res.message)
      );

  }

  onFilter() {
    if (this.searchTerm.memberType == '') {
      this.checked = true;
    } else if (this.searchTerm.category == '') {
      this.checked = true;
    } else {
      this.loadAll(this.currPage);
    }
  }

  resetFilter() {
    this.checked = false;
    this.searchTerm = {
      category: '',
      memberType: '',
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

  private onError(error) {
    this.ngxService.stop();
    console.log('error..', error);
  }

  open(status, message) {
    const modalRef = this.modalService.open(LimitTransactionDepositModalComponent, { size: 'lg' });
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