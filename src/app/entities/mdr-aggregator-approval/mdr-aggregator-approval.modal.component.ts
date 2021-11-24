import { Component, OnInit, Input } from '@angular/core';
import { MdrAggregatorApproval } from './mdr-aggregator-approval-model';
import { MdrAggregator } from '../mdr-aggregator/mdr-aggregator-model';
import { MdrAggregatorService } from '../mdr-aggregator/mdr-aggregator.service';
import { MdrAggregatorApprovalService } from './mdr-aggregator-approval.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'op-mdr-aggregator-approval-modal',
  templateUrl: './mdr-aggregator-approval.modal.component.html',
  styleUrls: ['./mdr-aggregator-approval.modal.component.css']
})
export class MdrAggregatorApprovalModalComponent implements OnInit {
    @Input() newData: MdrAggregatorApproval;

    oldData: MdrAggregator;

    constructor(private mdrAggregatorService: MdrAggregatorService,
                private mdrAggregatorApprovalService: MdrAggregatorApprovalService,
                private ngxService: NgxUiLoaderService,
                private modalService: NgbModal) { }

    ngOnInit() {
        this.oldData = new MdrAggregator;
        console.log(this.newData);

        if (this.newData.mdrAggregatorId != 0) {
            this.ngxService.start();
            this.mdrAggregatorService.find(this.newData.mdrAggregatorId)
                .subscribe(
                    (res: HttpResponse<MdrAggregator>) => this.onSuccess(res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            this.ngxService.stop();
        }
    }

    onSuccess(mdrAggregator) {
        this.ngxService.stop();
        console.log(mdrAggregator.contents);
        this.oldData = mdrAggregator.contents;
    }

    private onError(error) {
        this.ngxService.stop();
        console.log('error..');
    }

    onConfirm() {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to approve this MDR?',
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Approve!'
        }).then((result) => {
            console.log("result ->", result);
            if (result.value) {
                this.ngxService.start();
                this.mdrAggregatorApprovalService.approve(this.newData.id).subscribe((result) => {
                    const code = result.body.errCode.toString()
                    this.ngxService.stop();
                    if (code == '00') {
                        Swal.fire('Success', "Approve MDR success", 'success').then(
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
            text: 'Do you want to reject this MDR?',
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Reject!'
        }).then((result) => {
            console.log("result ->", result);
            if (result.value) {
                this.ngxService.start();
                this.mdrAggregatorApprovalService.reject(this.newData.id).subscribe((result) => {
                    const code = result.body.errCode.toString()
                    this.ngxService.stop();
                    if (code == '00') {
                        Swal.fire('Success', "Reject MDR success", 'success').then(
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
