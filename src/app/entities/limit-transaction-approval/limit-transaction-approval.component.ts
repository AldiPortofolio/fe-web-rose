import { Component, OnInit } from '@angular/core';
import { TOTAL_RECORD_PER_PAGE } from 'src/app/shared/constants/base-constant';
import { LimitTransactionApproval } from './limit-transaction-approval.model';
import { LimitTransactionApprovalService } from './limit-transaction-approval.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { LimitTransactionApprovalModalComponent } from './limit-transaction-approval.modal.component';

@Component({
  selector: 'op-limit-transaction-approval',
  templateUrl: './limit-transaction-approval.component.html',
  styleUrls: ['./limit-transaction-approval.component.css']
})
export class LimitTransactionApprovalComponent implements OnInit {

    currPage = 1;
    totalRecord = TOTAL_RECORD_PER_PAGE;
    totalData = 0;
    approvalList: LimitTransactionApproval[];

    closeResult: string;



    constructor(private service: LimitTransactionApprovalService,
                private ngxService: NgxUiLoaderService,
                private modalService: NgbModal) { }

    ngOnInit() {
        this.loadAll(this.currPage);
    }

    loadAll(page) {
        this.ngxService.start(); // start loader
        this.service.filter({
            page: page,
            limit: this.totalRecord
        })
            .subscribe(
                (res: HttpResponse<LimitTransactionApproval[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    private onSuccess(data, headers) {
        this.ngxService.stop();
        console.log(data);
        this.approvalList = data.contents;
        this.totalData = data.totalData;
    }

    private onError(error) {
        this.ngxService.stop();
        console.log('error..', error);
    }

    open(approval) {
        const modalRef = this.modalService.open(LimitTransactionApprovalModalComponent, { size: 'lg' });
        modalRef.componentInstance.newData = approval;
        modalRef.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
            console.log(this.closeResult);
            // if (this.closeResult === 'refresh') {
            //   this.curPage = 1 ;
            //   this.loadAll(this.curPage);
            // }
            this.currPage = 1;
            this.loadAll(this.currPage);
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            console.log(this.closeResult);
            this.currPage = 1;
            this.loadAll(this.currPage);
        });
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }
    loadPage() {
        this.loadAll(this.currPage);
    }

}
