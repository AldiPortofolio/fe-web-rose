import { Component, OnInit } from '@angular/core';
import { MerchantBankAccount } from './merchant-bank-account.model';
import { MerchantBankAccountService } from './merchant-bank-account.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { MerchantBankAccountModalComponent } from './merchant-bank-account.modal.component';

@Component({
  selector: 'op-merchant-bank-account',
  templateUrl: './merchant-bank-account.component.html',
  styleUrls: ['./merchant-bank-account.component.css']
})
export class MerchantBankAccountComponent implements OnInit {

    listAccount: MerchantBankAccount[];
    account: MerchantBankAccount;
    closeResult: string;
    currPage = 1;
    totalRecord = 10;
    totalData = 0;

    searchTerm = {
        status: '',
        mid: '',
        bankCode: '',
        accountNumber: '',
        accountName: '',
        page: 1,
        limit: 10,
    }

    listStatus = [
        { value: "PENDING", name: "Pending" },
        { value: "APPROVED", name: "Approved" },
        { value: "REJECTED", name: "Rejected" },
    ]


    constructor(
        private merchantBankAccountService: MerchantBankAccountService,
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

        this.merchantBankAccountService.filter({
            filter: this.searchTerm,
        })
            .subscribe(
                (res: HttpResponse<MerchantBankAccount[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    private onSuccess(data, headers) {
        this.ngxService.stop();
        if (data.contents.length < 0) {
            return;
        }
        console.log(data);
        this.listAccount = data.contents;
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
            bankCode: '',
            accountNumber: '',
            accountName: '',
            page: 1,
            limit: 10,
        };
        this.loadAll(1);
    }

    private getDismissReason(reason: any): string {
        console.log(reason);
        this.loadAll(1);
        return reason;
    }

    open(message) {
        const modalRef = this.modalService.open(MerchantBankAccountModalComponent, { size: 'lg' });
        modalRef.componentInstance.data = message;
        modalRef.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
            console.log(this.closeResult);
            this.loadAll(1);
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    approve(message) {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to approve this account?',
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Approve'
        }).then((result) => {
            console.log("result ->", result);
            if (result.value) {
                console.log(message);
            let req = {
                id: message.id,
                notes: ''
            }
                this.ngxService.start();
                this.merchantBankAccountService.approve(req).subscribe((result) => {
                    const code = result.body.errCode.toString()
                    this.ngxService.stop();
                    if (code == '00') {
                        Swal.fire('Success', "Approve bank account success", 'success').then(
                            () => this.loadAll(1),
                            () => this.modalService.dismissAll('tutup save')
                        );
                    } else {
                        Swal.fire('Failed', result.body.errDesc, 'error').then(
                            () => this.loadAll(1)
                        );

                    }
                });
            } else {
                this.loadAll(1);
            }
        });
    }

    resend(message) {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to resend push notification?',
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Send'
        }).then((result) => {
            console.log("result ->", result);
            if (result.value) {
                console.log(message);
                let req = {
                    id: message.id,
                    notes: ''
                }
                this.ngxService.start();
                this.merchantBankAccountService.resendPushNotif(req).subscribe((result) => {
                    const code = result.body.errCode.toString()
                    this.ngxService.stop();
                    if (code == '00') {
                        Swal.fire('Success', "Resend push notif success", 'success').then(
                            () => this.loadAll(1),
                            () => this.modalService.dismissAll('tutup save')
                        );
                    } else {
                        Swal.fire('Failed', result.body.errDesc, 'error').then(
                            () => this.loadAll(1)
                        );

                    }
                });
            } else {
                this.loadAll(1);
            }
        });
    }



    reject(message) {
        Swal.fire({
            title: 'Are you sure reject this account?',
            input: 'text',
            inputPlaceholder: 'reason reject',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Reject',
            showLoaderOnConfirm: true,
            preConfirm: (login) => {
                
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            console.log("result ->", result);
            if (result.value) {
                console.log(message);
                let req = {
                    id: message.id,
                    notes: result.value
                }
                this.ngxService.start();
                this.merchantBankAccountService.reject(req).subscribe((result) => {
                    const code = result.body.errCode.toString()
                    this.ngxService.stop();
                    if (code == '00') {
                        Swal.fire('Success', "Reject bank account success", 'success').then(
                            () => this.loadAll(1),
                            () => this.modalService.dismissAll('tutup save')
                        );
                    } else {
                        Swal.fire('Failed', result.body.errDesc, 'error').then(
                            () => this.loadAll(1)
                        );

                    }
                });
            } else {
                this.loadAll(1);
            }
        })

    }

}
