import { Component, OnInit } from '@angular/core';
import { MerchantBankLoan } from './merchant-bank-loan.model';
import { MerchantBankLoanService } from './merchant-bank-loan.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { SubMerchantBankLoanComponent } from './sub-merchant-bank-loan.component';

@Component({
  selector: 'op-merchant-bank-loan',
  templateUrl: './merchant-bank-loan.component.html',
  styleUrls: ['./merchant-bank-loan.component.css']
})
export class MerchantBankLoanComponent implements OnInit {

    merchantBankLoanList: MerchantBankLoan[];
    merchantBankLoan: MerchantBankLoan;
    closeResult: string;
    currPage = 1;
    totalRecord = 10;
    totalData = 0;

    searchTerm = {
        mid:'',
        phoneNumber:'',
        storeName:'',
        page: 1,
        limit: 10,
    }

    constructor(
        private merchantBankLoanService: MerchantBankLoanService,
        private modalService: NgbModal,
        private ngxService: NgxUiLoaderService
    ) { }

    ngOnInit() {
        this.loadAll(this.currPage);
    }

    loadAll(page) {
        this.ngxService.start(); // start loader
        this.searchTerm.page = page
        this.searchTerm.limit = this.totalRecord

        this.merchantBankLoanService.filter({
            filter: this.searchTerm,
        })
            .subscribe(
                (res: HttpResponse<MerchantBankLoan[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    onFilter() {
        this.loadAll(this.currPage);
    }

    resetFilter() {
        this.currPage = 1;
        this.searchTerm = {
            mid: '',
            phoneNumber: '',
            storeName: '',
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
        this.merchantBankLoanList = data.contents;
        this.totalData = data.totalData;
    }

    private onError(error) {
        this.ngxService.stop();
        console.log('error..', error);
    }

    loadPage() {
        this.loadAll(this.currPage);
    }


    open(status, message) {
        console.log(message);
        const modalRef = this.modalService.open(SubMerchantBankLoanComponent, { size: 'lg' });
        modalRef.componentInstance.statusRec = status;
        modalRef.componentInstance.masterBankLoanId = message;
        modalRef.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
            console.log(this.closeResult);
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }
    private getDismissReason(reason: any): string {
        console.log(reason);
        return reason;
    }
}
