import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { MdrBank } from './mdr-bank.model';
import { MdrBankService } from './mdr-bank.service';
import { MdrBankModalComponent } from './mdr-bank.modal.component';

@Component({
    selector: 'mdr-bank',
    templateUrl: './mdr-bank.component.html',
    styleUrls: ['./mdr-bank.component.css']
})
export class MdrBankComponent implements OnInit {

    mdrBankList: MdrBank[];
    mdrBank: MdrBank;
    currPage = 1;
    totalRecord = 10;
    totalData = 0;

    searchTerm = {
        bankName: '',
        bankCode: '',
        page: 1,
        limit: 10,
    }

    

    closeResult: string;
    sub: any

    constructor(private route: ActivatedRoute,
        private mdrBankService: MdrBankService,
        private modalService: NgbModal,
        private ngxService: NgxUiLoaderService) {
    }

    ngOnInit() {
        this.loadAll(this.currPage);
        this.mdrBank = {}
    }

    loadAll(page) {
        this.ngxService.start(); // start loader
        this.searchTerm.page = page
        this.searchTerm.limit = this.totalRecord
        this.mdrBankService.filter({
            filter: this.searchTerm,
        })
            .subscribe(
                (res: HttpResponse<MdrBank[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    private onSuccess(data, headers) {
        this.ngxService.stop();
        if (data.contents.length < 0) {
            return;
        }
        console.log(data);
        this.mdrBankList = data.contents;
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
            bankCode: '',
            bankName: '',
            page: 1,
            limit: 10,
        };
        this.loadAll(1);
    }

    open(status, message) {
        const modalRef = this.modalService.open(MdrBankModalComponent, { size: 'lg' });
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

    delete(mdrBank): void {
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
                this.mdrBank.id = mdrBank.id;
                this.mdrBank.bankName = mdrBank.bankName;
                this.mdrBank.bankCode = mdrBank.bankCode;
                this.mdrBank.status = 'n';
                this.mdrBank.seq = mdrBank.seq;
                this.mdrBankService.save(this.mdrBank).subscribe(result => {
                    if (result.body.errCode === '00') {
                        Swal.fire('Success', "Successfully Deleted Data", 'success').then(
                        );
                        this.loadAll(this.currPage);
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
