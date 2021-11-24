import { Component, OnInit } from '@angular/core';
import { MerchantAggregator } from '../merchant-aggregator/merchant-aggregator.model';
import { TOTAL_RECORD_PER_PAGE } from 'src/app/shared/constants/base-constant';
import { MerchantAggregatorDetailApprovalService } from './merchant-aggregator-detail-approval.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'op-merchant-aggregator-detail-approval',
  templateUrl: './merchant-aggregator-detail-approval.component.html',
  styleUrls: ['./merchant-aggregator-detail-approval.component.css']
})
export class MerchantAggregatorDetailApprovalComponent implements OnInit {

    merchantAggregatorList: MerchantAggregator[];
    currPage = 1;
    totalRecord = TOTAL_RECORD_PER_PAGE;
    totalData = 0;

    searchTerm = {
        name: '',
    }

    closeResult: string;

    constructor(private service: MerchantAggregatorDetailApprovalService,
        private router: Router,
        private ngxService: NgxUiLoaderService) { }

    ngOnInit() {
        this.loadAll(this.currPage);
    }


    loadPage() {
        this.loadAll(this.currPage);
    }

    loadAll(page) {
        this.ngxService.start(); // start loader
        this.service.filter({
            filter: this.searchTerm,
            page: page,
            count: this.totalRecord
        })
            .subscribe(
                (res: HttpResponse<MerchantAggregator[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    onFilter() {
        this.loadAll(this.currPage);
    }

    resetFilter() {
        this.searchTerm = {
            name: '',
        };
        this.loadAll(1);
    }

    private onSuccess(data, headers) {
        this.ngxService.stop();
        console.log(data);
        this.merchantAggregatorList = data.contents;
        this.totalData = data.totalData;
    }

    private onError(error) {
        this.ngxService.stop();
        console.log('error..', error);
    }

    openDetail(mid, aggregatorName) {
        this.service.sendData(mid, aggregatorName);
        this.router.navigate(['main/merchant-aggregator-detail-approval/detail']);

        console.log(mid);
    }

}
