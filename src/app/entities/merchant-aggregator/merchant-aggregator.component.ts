import { Component, OnInit } from '@angular/core';
import { MerchantAggregator } from './merchant-aggregator.model';
import { TOTAL_RECORD_PER_PAGE } from 'src/app/shared/constants/base-constant';
import { MerchantAggregatorService } from './merchant-aggregator.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { MerchantAggregatorModalComponent } from './merchant-aggregator.modal.component';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'op-merchant-aggregator',
  templateUrl: './merchant-aggregator.component.html',
  styleUrls: ['./merchant-aggregator.component.css']
})
export class MerchantAggregatorComponent implements OnInit {

    merchantAggregatorList: MerchantAggregator[];
    currPage = 1;
    totalRecord = TOTAL_RECORD_PER_PAGE;
    totalData = 0;

    searchTerm = {
        name: '',
    }

    closeResult: string;

    constructor(private router: Router,
                private merchantAggregatorService: MerchantAggregatorService,
                private modalService: NgbModal,
                private ngxService: NgxUiLoaderService) { }

    ngOnInit() {
        this.loadAll(this.currPage);
    }

    loadAll(page) {
        this.ngxService.start(); // start loader
        this.merchantAggregatorService.filter({
            filter: this.searchTerm,
            page: page,
            count: this.totalRecord
        })
            .subscribe(
                (res: HttpResponse<MerchantAggregator[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    open(status, message) {
        const modalRef = this.modalService.open(MerchantAggregatorModalComponent, { size: 'lg' });
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

    private onSuccess(data, headers) {
        this.ngxService.stop();
        if (data.content.length < 0) {
            return;
        }
        console.log(data);
        this.merchantAggregatorList = data.content;
        this.totalData = data.totalElements;
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
            name: '',
        };
        this.loadAll(1);
    }

    redirect(mid) {
        console.log("mid->", mid)
        if (mid === "" || mid === 0 || mid === null) {
            Swal.fire('Failed', "Mid Aggregator is Blank", 'error').then(
                () => this.onBack()
            );
        } else {
            this.router.navigate(['/main/merchant-aggregator-detail/', mid]);
        } 
    }

    delete(id:number) {
        console.log('id ==> ', id)
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to delete this partner?',
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Yes!'
        }).then((result) => {
            console.log("result ->", result);
            if (result.value) {
                this.ngxService.start();
                this.merchantAggregatorService.delete(id).subscribe((result) => {
                    const code = result.errCode.toString()
                    this.ngxService.stop();
                    if (code == '00') {
                        Swal.fire('Success', "Delete partner success send to master data approval", 'success').then(
                            () => this.onBack()
                        );
                    } else {
                        Swal.fire('Failed', result.errDesc, 'error').then(

                        );

                    }
                });
            } else {
                // this.onBack()
            }
        });
    }

    onBack() {
        this.loadAll(this.currPage);
    }

}
