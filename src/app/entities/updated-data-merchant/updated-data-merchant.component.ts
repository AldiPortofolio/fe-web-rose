import { Component, OnInit } from '@angular/core';
import { UpdatedDataMerchant } from './updated-data-merchant.model';
import { UpdatedDataMerchantService } from './updated-data-merchant.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { UpdatedDataMerchantModalComponent } from './updated-data-merchant.modal.component';

@Component({
  selector: 'op-updated-data-merchant',
  templateUrl: './updated-data-merchant.component.html',
  styleUrls: ['./updated-data-merchant.component.css']
})
export class UpdatedDataMerchantComponent implements OnInit {

    updatedDataMerchantList: UpdatedDataMerchant[];
    updatedDataMerchant: UpdatedDataMerchant;
    closeResult: string;
    currPage = 1;
    totalRecord = 10;
    totalData = 0;

    searchTerm = {
        status: '',
        mid: '',
        loanBankCode: '',
        storeName: '',
        page: 1,
        limit: 10,
    }

    listStatus = [
        { value: "PENDING", name: "Pending" },
        { value: "APPROVED", name: "Approved" },
        { value: "REJECTED", name: "Rejected" },
    ]

    constructor(
        private updatedDataMerchantService: UpdatedDataMerchantService,
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

        this.updatedDataMerchantService.filter({
            filter: this.searchTerm,
        })
            .subscribe(
                (res: HttpResponse<UpdatedDataMerchant[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    private onSuccess(data, headers) {
        console.log(data)
        this.ngxService.stop();
        if (data.contents.length < 0) {
            return;
        }
        console.log(data);
        this.updatedDataMerchantList = data.contents;
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
        this.currPage = 1;
        this.searchTerm = {
            status: '',
            mid: '',
            loanBankCode: '',
            storeName: '',
            page: 1,
            limit: 10,
        };
        this.loadAll(1);
    }

    open(status, message) {
        const modalRef = this.modalService.open(UpdatedDataMerchantModalComponent, { size: 'lg' });
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

}
