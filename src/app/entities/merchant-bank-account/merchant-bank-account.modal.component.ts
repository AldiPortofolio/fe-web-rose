import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { MerchantBankAccount } from './merchant-bank-account.model';
import { BankList } from '../bank-list/bank-list.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BankListService } from '../bank-list/bank-list.service';
import { MerchantBankAccountService } from './merchant-bank-account.service';
import Swal from 'sweetalert2';
import { MerchantBankAccountValidation } from './merchant-bank-account-validation.model';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'op-merchant-bank-account-modal',
  templateUrl: './merchant-bank-account.modal.component.html',
  styleUrls: ['./merchant-bank-account.modal.component.css']
})
export class MerchantBankAccountModalComponent implements OnInit {

    // @Input() statusRec;
    @Input() data: MerchantBankAccount;
    // @Input() viewMsg;
    // @Input() midMerchant;
    // @Input() bankList: BankList[];

    merchantBankAccount: MerchantBankAccount;

    isFormDirty: Boolean = false;
    closeResult: string;

    searchTerm = {
        accountNo: '',
        bankCode: '',
        mid: '',
    }

    resValidation: MerchantBankAccountValidation;
    validationAccountNumber: boolean;
    validationAccountName: boolean;
    validationAccount: string;
    validationName: string;




    constructor(private modalService: NgbModal,
        private ngxService: NgxUiLoaderService,
        private bankListService: BankListService,
        private merchantBankAccountService: MerchantBankAccountService,
        private ref: ChangeDetectorRef) { }

    ngOnInit() {
        this.resValidation = {
            accountNo: "",
            accountName: "",
            accountBankName: "",
            errCode: "",
            errDesc: "",
        };
        this.merchantBankAccount = this.data
        // this.validationBankAccount();
        setTimeout(() => {
            this.validationBankAccount();
        });
        
        
    }

    validationBankAccount(){
        console.log(this.data);
        // this.merchantBankAccount = this.data;
        this.searchTerm.accountNo = this.merchantBankAccount.accountNumber;
        this.searchTerm.bankCode = this.merchantBankAccount.bankCode;
        this.searchTerm.mid = this.merchantBankAccount.mid;
        this.ngxService.start();

        this.merchantBankAccountService.validation({
            filter : this.searchTerm,
        }).subscribe(
            (res: HttpResponse<MerchantBankAccountValidation>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    approve() {
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
                console.log(this.merchantBankAccount);
                let req = {
                    id: this.merchantBankAccount.id,
                    notes: ''
                }
                this.ngxService.start();
                this.merchantBankAccountService.approve(req).subscribe((result) => {
                    const code = result.body.errCode.toString()
                    this.ngxService.stop();
                    if (code == '00') {
                        Swal.fire('Success', "Approve bank account success", 'success').then(
                            // () => this.loadAll(1),
                            () => this.modalService.dismissAll('tutup save')
                        );
                    } else {
                        Swal.fire('Failed', result.body.errDesc, 'error').then(
                            // () => this.loadAll(1)
                        );

                    }
                });
            } else {
                // this.loadAll(1);
            }
        });
    }

    reject() {
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
                console.log(this.merchantBankAccount);
                let req = {
                    id: this.merchantBankAccount.id,
                    notes: result.value
                }
                this.ngxService.start();
                this.merchantBankAccountService.reject(req).subscribe((result) => {
                    const code = result.body.errCode.toString()
                    this.ngxService.stop();
                    if (code == '00') {
                        Swal.fire('Success', "Reject bank account success", 'success').then(
                            () => this.modalService.dismissAll('tutup save')
                        );
                    } else {
                        Swal.fire('Failed', result.body.errDesc, 'error').then(
                        );

                    }
                });
            }
        })

    }

    private onSuccess(data, headers) {
        console.log(data);
        this.ngxService.stop();
        // if (data.contents.length < 0) {
        //     return;
        // }
        // console.log(data);
        
        this.resValidation = data.contents;
        console.log(this.resValidation)
        if ( this.resValidation.accountNo == this.merchantBankAccount.accountNumber) {
            this.validationAccountNumber = true
            this.validationAccount = 'Account Number Valid';
        } else {
            this.validationAccountNumber = false
            this.validationAccount = 'Account Number Invalid'
        }
        if (this.resValidation.accountName == this.resValidation.ownerFirstName + " " + this.resValidation.ownerLastName) {
            this.validationAccountName = true
        } else {
            this.validationAccountName = false
        }

       
    }

    private onError(error) {
        this.ngxService.stop();
        console.log('error..', error);
    }
   

    // save(): void {
    //     this.ngxService.start();
    //     this.merchantBankAccount.bankCode = this.bankCodeSelected;

    //     console.log(this.merchantBankAccount);

    //     this.merchantBankAccountService.save(this.merchantBankAccount).subscribe(result => {
    //         this.isFormDirty = true;
    //         if (result.body.errCode === '00') {
    //             this.closeForm();
    //         } else {
    //             console.log('error');
    //             Swal.fire('Failed', result.body.errDesc, 'error').then(
    //             );
    //         }
    //         this.ngxService.stop();
    //     });
    // }

    closeForm(): void {
        if (this.isFormDirty === true) {
            this.modalService.dismissAll('refresh');
        } else {
            this.modalService.dismissAll('close');
        }
    }

    
}
