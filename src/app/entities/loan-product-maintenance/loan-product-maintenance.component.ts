import { Component, OnInit } from '@angular/core';
import { LoanProductMaintenance } from './loan-product-maintenance.model';
import { LoanProductMaintenanceService } from './loan-product-maintenance.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { LoanProductMaintenanceModalComponent } from './loan-product-maintenance.modal.component';
import { BankList } from '../bank-list/bank-list.model';
import { BankListService } from '../bank-list/bank-list.service';

@Component({
  selector: 'op-loan-product-maintenance',
  templateUrl: './loan-product-maintenance.component.html',
  styleUrls: ['./loan-product-maintenance.component.css']
})
export class LoanProductMaintenanceComponent implements OnInit {

  searchTerm = {
    id: 0,
    bankCode: '',
    loanProductCode: '',
    loanProductName: '',
    status: '',
    page: 1,
    limit: 10,
  }

  loanProductList: LoanProductMaintenance[];
  loanProduct: LoanProductMaintenance;
  closeResult: string;
  currPage = 1;
  totalRecord = 10;
  totalData = 0;
  listBank: BankList[] = [];

  searchTermB = {
    page: 1,
    limit: 100000,
  }

  statuses = [
    { code: "y", name: "active" },
    { code: "n", name: "inactive" },
  ]

  constructor(
    private loanProductMaintenanceService: LoanProductMaintenanceService,
    private modalService: NgbModal,
    private ngxService: NgxUiLoaderService,
    private bankService: BankListService) {
  }

  ngOnInit() {
    this.loadListBank()

    this.loadAll(this.currPage);
  }

  private loadListBank() {
    // this.ngxService.start(); // start loader
    this.bankService.filter({
      filter: this.searchTermB,
    })
      .subscribe(
        (res: HttpResponse<BankList[]>) => this.onSuccessBank(res.body, res.headers),
        (res: HttpErrorResponse) => this.onErrorBank(res.message, 'Get List Bank')
      );
  }

  private onSuccessBank(data, headers) {
    // this.ngxService.stop(); // start loader
    if (data.contents.length < 0) {
      return;
    }

    this.listBank = data.contents;
  }

  private onErrorBank(error, listName) {
    // this.ngxService.stop();
    console.log('error..', error, listName);
  }

  loadAll(page) {
    this.ngxService.start(); // start loader
    this.searchTerm.page = page
    this.searchTerm.limit = this.totalRecord

    this.loanProductMaintenanceService.filter({
      filter: this.searchTerm,
    })
      .subscribe(
        (res: HttpResponse<LoanProductMaintenance[]>) => this.onSuccess(res.body, res.headers),
        (res: HttpErrorResponse) => this.onError(res.message)
      );

  }

  onFilter() {
    this.loadAll(this.currPage);
  }

  resetFilter() {
    this.searchTerm = {
      id: 0,
      bankCode: '',
      loanProductCode: '',
      loanProductName: '',
      status: '',
      page: 1,
      limit: 10,
    };
    this.currPage = 1;
    this.loadAll(1);
  }

  private onSuccess(data, headers) {
    this.ngxService.stop();
    if (data.contents.length < 0) {
      return;
    }
    console.log(data);
    this.loanProductList = data.contents;
    this.totalData = data.totalData;
  }

  private onError(error) {
    this.ngxService.stop();
    console.log('error..', error);
  }

  open(status, message) {
    const modalRef = this.modalService.open(LoanProductMaintenanceModalComponent, { size: 'lg' });
    modalRef.componentInstance.statusRec = status;
    modalRef.componentInstance.objEdit = message;
    modalRef.componentInstance.bankData = this.listBank;
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
