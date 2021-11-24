import { Component, OnInit, Input } from '@angular/core';
import { LimitTransactionApproval } from './limit-transaction-approval.model';
import { LimitTransactionService } from '../limit-transaction/limit-transaction.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { LimitTransaction } from '../limit-transaction/limit-transaction-model';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LimitTransactionApprovalService } from './limit-transaction-approval.service';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'op-limit-transaction-approval-modal-component',
  templateUrl: './limit-transaction-approval.modal.component.html',
  styleUrls: ['./limit-transaction-approval.modal.component.css']
})
export class LimitTransactionApprovalModalComponent implements OnInit {
    @Input() newData: LimitTransactionApproval;

    oldData: LimitTransaction;

    constructor(private limitTransactionService: LimitTransactionService,
                private limitTransactionApprovalService: LimitTransactionApprovalService,
                private ngxService: NgxUiLoaderService,
                private modalService: NgbModal) { }

    ngOnInit() {
        this.oldData = new LimitTransaction;
        console.log(this.newData);

        if (this.newData.masterLimitationId != 0){
            this.ngxService.start();
            this.limitTransactionService.find(this.newData.masterLimitationId)
                .subscribe(
                    (res: HttpResponse<LimitTransaction>) => this.onSuccess(res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            this.ngxService.stop();
        }
       
    }

    onSuccess(limitTransaction) {
        this.ngxService.stop();
        console.log(limitTransaction.contents);
        this.oldData = limitTransaction.contents;
        // this.merchant = merchant;

    }

    private onError(error) {
        this.ngxService.stop();
        console.log('error..');
    }

    onConfirm() {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to approve this config?',
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Approve!'
        }).then((result) => {
            console.log("result ->", result);
            if (result.value) {
                this.ngxService.start();
                this.limitTransactionApprovalService.approve(this.newData.id).subscribe((result) => {
                    const code = result.body.errCode.toString()
                    this.ngxService.stop();
                    if (code == '00') {
                        Swal.fire('Success', "Approve config success", 'success').then(
                            () => this.modalService.dismissAll('tutup save')
                        );
                    } else {
                        Swal.fire('Failed', result.body.errDesc, 'error').then(

                        );

                    }
                });
            }
        });
    }

    onReject() {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to reject this config?',
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Reject!'
        }).then((result) => {
            console.log("result ->", result);
            if (result.value) {
                this.ngxService.start();
                this.limitTransactionApprovalService.reject(this.newData.id).subscribe((result) => {
                    const code = result.body.errCode.toString()
                    this.ngxService.stop();
                    if (code == '00') {
                        Swal.fire('Success', "Reject config success", 'success').then(
                            () => this.modalService.dismissAll('tutup save')
                        );
                    } else {
                        Swal.fire('Failed', result.body.errDesc, 'error').then(

                        );

                    }
                });
            }
        });
    }

    onBack() {
        this.modalService.dismissAll('tutup save');
    }

}
