import { Component, OnInit } from '@angular/core';
import { MerchantAggregatorDetailApprovalService } from './merchant-aggregator-detail-approval.service';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { TOTAL_RECORD_PER_PAGE } from 'src/app/shared/constants/base-constant';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { MerchantAggregatorDetail } from './merchant-aggregator-detail.model';
import { Merchant } from '../merchant/merchant.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'op-magapprovaldetail',
  templateUrl: './magapprovaldetail.component.html',
  styleUrls: ['./magapprovaldetail.component.css']
})
export class MagapprovaldetailComponent implements OnInit {

    dataAggregator: string[];
    midAggregator: string;
    nameAggregator: string;
    merchantAggregatorName: string;
    currPage = 1;
    totalRecord = TOTAL_RECORD_PER_PAGE;
    totalData = 0;
    merchantList: Merchant[];


    constructor(private service: MerchantAggregatorDetailApprovalService,
                private router: Router,
                private ngxService: NgxUiLoaderService) { }

    ngOnInit() {

        this.service.dataSharing.subscribe(
            data => this.dataAggregator = data
        );
        console.log('this.dataAggregator -->', this.dataAggregator);
        if (this.dataAggregator[0] == '') {
            console.log ('data kosong');
            this.router.navigate(['main/merchant-aggregator-detail-approval']);
        }
        this.midAggregator = this.dataAggregator[0]
        this.nameAggregator = this.dataAggregator[1]

        console.log('this.midAggregator --> ', this.midAggregator);

        this.loadAll(this.currPage);
    }

    loadAll(page) {
        this.ngxService.start(); // start loader
        this.service.findDetailByMidAggragtor({
            midAggregator: this.midAggregator,
            page: page,
            limit: this.totalRecord
        })
            .subscribe(
                (res: HttpResponse<Merchant[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    private onSuccess(data, headers) {
        this.ngxService.stop();
        console.log(data);
        this.merchantList = data.contents;
        this.totalData = data.totalData;
    }

    private onError(error) {
        this.ngxService.stop();
        console.log('error..', error);
    }

    approve() {
        console.log('Approve')
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to approve merchants?',
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Approve!'
        }).then((result) => {
            console.log("result ->", result);
            if (result.value) {
                this.ngxService.start();
                this.service.approve(this.midAggregator).subscribe((result) => {
                    const code = result.body.errCode.toString()
                    this.ngxService.stop();
                    if (code == '00') {
                        Swal.fire('Success', "Release user success", 'success').then(
                            () => this.onBack()
                        );
                    } else {
                        Swal.fire('Failed', result.body.errDesc, 'error').then(
                            
                        );

                    }
                });
            } else {
                // this.onBack()
            }
        });
    }

    loadPage() {
        this.loadAll(this.currPage);
    }

    onBack() {
        this.router.navigate(['/main/merchant-aggregator-detail-approval']);
    }

}
