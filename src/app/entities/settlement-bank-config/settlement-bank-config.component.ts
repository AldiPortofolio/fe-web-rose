import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BankList } from '../bank-list/bank-list.model';
import { BankListService } from '../bank-list/bank-list.service';
import { SettlementBankConfigService } from './settlement-bank-config.service';
import { SettlementBankModalComponent } from './settlement-bank-modal.component';
import { SettlementType } from './settlement-type.model';

@Component({
  selector: 'op-settlement-bank-config',
  templateUrl: './settlement-bank-config.component.html',
  styleUrls: ['./settlement-bank-config.component.css']
})
export class SettlementBankConfigComponent implements OnInit {

  settlementBankList: SettlementType[];
  settlementBank: SettlementType;
  closeResult: string;
  currPage = 1;
  totalRecord = 10;
  totalData = 0;

  searchTerm = {
    bankCode: '',
    status: 'Active',
    page: 1,
    limit: 10,
  }

  codeList: BankList[];

  statusList = [
    {
      status: "- Pilih Status -",
      val: ""
    },
    {
      status: "Active",
      val: "Active"
    },
    {
      status: "Non Active",
      val: "Non Active"
    },
  ]
  constructor(
    private settlementBankService: SettlementBankConfigService,
    private bankListService: BankListService,
    private modalService: NgbModal,
    private ngxService: NgxUiLoaderService
  ) { }

  ngOnInit() {
    this.loadAll()
    this.bankListService.filter({
      filter: {code: '',
      fullName: '',
      shortName: '',
      page: 1,
      limit: 999}
    })
      .subscribe(
        (res: HttpResponse<BankList[]>) => this.onSuccessBank(res.body, res.headers),
        (res: HttpErrorResponse) => this.onError(res.message)
      );

  }

  loadAll() {
    this.ngxService.start(); // start loader
    this.searchTerm.page = this.currPage
    this.searchTerm.limit = this.totalRecord

    this.settlementBankService.filter({
      filter: this.searchTerm
    })
      .subscribe(
        (res: HttpResponse<SettlementType[]>) => this.onSuccess(res.body, res.headers),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  private onSuccess(data, headers) {
    this.ngxService.stop();
    if (data.contents.length < 0) {
      return;
    }
    console.log(data);
    this.settlementBankList = data.contents;
    this.totalData = data.totalData;
    console.log(this.settlementBankList)
  }

  private onSuccessBank(data, headers) {
    this.ngxService.stop();
    if (data.contents.length < 0) {
      return;
    }
    console.log(data);
    this.codeList = data.contents;
    console.log(this.settlementBankList)
  }

  private onError(error) {
    this.ngxService.stop();
    console.log('error..', error);
  }

  loadPage() {
    this.loadAll();
  }

  onFilter() {
    this.loadAll();
  }

  resetFilter() {
    this.searchTerm = {
      bankCode: '',
      status: '',
      page: 1,
      limit: 10,
    };
    this.loadAll();
  }

  open() {
    const modalRef = this.modalService.open(SettlementBankModalComponent, { size: 'lg' });
    // modalRef.componentInstance.statusRec = status;
    // modalRef.componentInstance.objEdit = message;
    modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(this.closeResult);
      this.currPage = 1;
      this.loadAll();
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.currPage = 1;
      this.loadAll();
    });

  }

  private getDismissReason(reason: any): string {
    console.log(reason);
    return reason;
  }

}
