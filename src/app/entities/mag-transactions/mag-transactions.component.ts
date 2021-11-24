import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MagTransactions } from './mag-transactions.model';
import { MagTransactionsService } from './mag-transactions.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'op-mag-transactions',
  templateUrl: './mag-transactions.component.html',
  styleUrls: ['./mag-transactions.component.css']
})
export class MagTransactionsComponent implements OnInit {

  magTransactionsList: MagTransactions[];
  currPage = 1;
  totalRecord = 10;
  totalData = 0;
  pipe = new DatePipe('en-US');
  dateNow = new Date()
  searchTerm = {
    keyword: '',
    filter_by: '',
    page: 1,
    limit: 10,
  }
  filterBy = [
    { code: 'user', name: 'User' },
    { code: 'partner', name: 'Partner' },
    { code: 'merchant_id', name: 'Merchant ID' },
    { code: 'billing_id', name: 'Billing ID' },
    { code: 'channel', name: 'Channel' },
    { code: 'merchant_pay_status', name: 'Status' },
    { code: 'merchant_pay_ref', name: 'Pay Reference' },
  ]

  constructor(private magTransactionsService: MagTransactionsService,
    private ngxService: NgxUiLoaderService) { }

  ngOnInit() {
    this.loadAll(this.currPage);
  }

  loadAll(page) {
    this.ngxService.start(); // start loader
    this.searchTerm.page = page
    this.searchTerm.limit = this.totalRecord

    this.magTransactionsService.filter({
      filter: this.searchTerm
    }).subscribe(
      (res: HttpResponse<MagTransactions[]>) => this.onSuccess(res.body, res.headers),
      (res: HttpErrorResponse) => this.onError(res.message)
    )

  }

  private onSuccess(data, headers) {
    this.ngxService.stop();

    if (data.contents.length < 0) {
      return;
    }

    this.magTransactionsList = data.contents;
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
      keyword: "",
      filter_by: "",
      page: 1,
      limit: 10,
    };
    this.loadAll(1);
  }

  export() {
    this.ngxService.start();
    this.searchTerm.limit = 100000
    this.searchTerm.page = 1
    this.magTransactionsService.export({
      filter: this.searchTerm
    }).subscribe(
      (res: HttpResponse<MagTransactions[]>) => this.onSuccessExport(res.body),
      (res: HttpErrorResponse) => this.onError(res.message)
    )

  }

  private onSuccessExport(data) {
    this.ngxService.stop();

    const mySimpleFormat = this.pipe.transform(this.dateNow, 'yyyyMMdd');
    const bstr = atob(data.contents);
    const byteNumbers = new Array(bstr.length);
    for (let i = 0; i < bstr.length; i++) {
      byteNumbers[i] = bstr.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'file/csv' });

    let url = window.URL.createObjectURL(blob)
    let a = document.createElement('a');
    a.href = url;
    a.download = 'export_report_mag_transactions_' + mySimpleFormat + '.csv'
    a.click();

  }

}
