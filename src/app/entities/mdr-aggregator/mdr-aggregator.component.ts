import { Component, OnInit } from '@angular/core';
import { MdrAggregator } from './mdr-aggregator-model';
import { MdrAggregatorApproval } from '../mdr-aggregator-approval/mdr-aggregator-approval-model';
import { ActivatedRoute } from '@angular/router';
import { MdrAggregatorService } from './mdr-aggregator.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { MdrAggregatorModalComponent } from './mdr-aggregator.modal.component';
import { MerchantAggregatorService } from '../merchant-aggregator/merchant-aggregator.service';
import { MerchantAggregator } from '../merchant-aggregator/merchant-aggregator.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'op-mdr-aggregator',
  templateUrl: './mdr-aggregator.component.html',
  styleUrls: ['./mdr-aggregator.component.css']
})
export class MdrAggregatorComponent implements OnInit {

    mdrAggregatorList: MdrAggregator[];
    mdrAggregator: MdrAggregator;
    mdrAggregatorTemp: MdrAggregatorApproval
    currPage = 1;
    totalRecord = 10;
    totalData = 0;

    searchTerm = {
        productType: '',
        productName: '',
        byGroupFilter: '',
        byTime: '',
        page: 1,
        limit: 10,
    }

    merchantAggregatorList: MerchantAggregator[];


    closeResult: string;
    sub: any
    constructor(private route: ActivatedRoute,
        private mdrAggregatorService: MdrAggregatorService,
        private modalService: NgbModal,
        private merchantAggregatorService: MerchantAggregatorService,
        private ngxService: NgxUiLoaderService) {
    }

    ngOnInit() {
        this.loadAll(this.currPage);
        this.mdrAggregatorTemp = {}
        this.findAllAggregator();
    }

    findAllAggregator() {
        this.merchantAggregatorService.findAll()
            .subscribe(
                (res: HttpResponse<MerchantAggregator[]>) => this.onSuccessFindAllAggregator(res.body)),
            (res: HttpErrorResponse) => (this.onError(res.message));
    }
    onSuccessFindAllAggregator(data) {
        this.merchantAggregatorList = data;
        // this.breakMag();
        // console.log(this.magSelected);
        console.log(data)
    }

    loadAll(page) {
        this.ngxService.start(); // start loader
        this.searchTerm.page = page
        this.searchTerm.limit = this.totalRecord
        this.mdrAggregatorService.filter({
            filter: this.searchTerm,
        })
            .subscribe(
                (res: HttpResponse<MdrAggregator[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    private onSuccess(data, headers) {
        this.ngxService.stop();
        if (data.contents.length < 0) {
            return;
        }
        console.log(data);
        this.mdrAggregatorList = data.contents;
        this.totalData = data.totalData;
    }

    open(status, message) {
        console.log(status, message);
        const modalRef = this.modalService.open(MdrAggregatorModalComponent, { size: 'lg' });
        modalRef.componentInstance.statusRec = status;
        modalRef.componentInstance.objEdit = message;
        modalRef.componentInstance.merchantAggregatorList = this.merchantAggregatorList;
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

    delete(mdrAggregator): void {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to delete this mdr?',
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Delete!'
        }).then((result) => {
            console.log("result ->", result);
            if (result.value) {
                this.ngxService.start();
                this.ngxService.start();
                // this.mdrAggregator = mdrAggregator
                this.mdrAggregatorTemp = mdrAggregator;
                this.mdrAggregatorTemp.mdrAggregatorId = mdrAggregator.id;
                this.mdrAggregatorTemp.actionType = 4;
                this.mdrAggregatorTemp.status = 0;
                this.mdrAggregatorService.save(this.mdrAggregatorTemp).subscribe(result => {
                    if (result.body.errCode === '00') {
                        Swal.fire('Success', "Need To Approval", 'success').then(
                        );
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
