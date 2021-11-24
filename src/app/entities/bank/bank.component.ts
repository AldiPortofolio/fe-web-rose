import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { TOTAL_RECORD_PER_PAGE } from 'src/app/shared/constants/base-constant';
import { ListAccountBank } from './bank.model';
import { listAccountBankService } from './bank.service'

@Component({
  selector: 'op-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css']
})
export class BankComponent implements OnInit {

  constructor(
    private ngxService: NgxUiLoaderService,
    private listAccountBankService: listAccountBankService,
    ) { }

  request = {
    account_name: '',
    page: 1,
    limit: 10,
  };
  totalRecord = TOTAL_RECORD_PER_PAGE;
  curPage = 1;
  listAccount: ListAccountBank[];
  totalData = 0;

  ngOnInit() {
    this.loadLisAccounts(this.curPage);
  }

  loadLisAccounts(page) {
    this.ngxService.start();

    this.request.account_name = this.request.account_name.replace(/^0+/, '')
    this.request.page = page
    this.request.limit = this.totalRecord

    this.listAccountBankService.getAll({
      account_name: this.request.account_name,
      page: this.request.page,
      limit: this.request.limit,
    }).subscribe(
      (res: HttpResponse<ListAccountBank[]>) => this.onSuccess(res.body, res.headers),
      (res: HttpErrorResponse) => this.onError(res.message)
    );

  }

  private onSuccess(data, headers) {
    this.ngxService.stop();

    if (data.contents.length < 0) {
      return;
    }
    this.listAccount = data.contents;
    this.totalData = data.totalData;
  }

  private onError(error) {
    this.ngxService.stop();
    console.log('error..', error);
  }

  onFilter() {
    this.loadLisAccounts(this.curPage);
  }

  clearSelected() {
    this.request = {
      account_name: "",
      page: 1,
      limit: 10,
    };

    this.curPage = 1;
    this.loadLisAccounts(this.curPage);
  }

  loadPage() {
    this.loadLisAccounts(this.curPage);
  }

}
