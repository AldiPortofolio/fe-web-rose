import { Component, OnInit } from '@angular/core';
import { MerchantQrisStatus } from './merchant-qris-status.model';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MerchantQrisStatusService } from './merchant-qris-status.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'op-merchant-qris-status',
  templateUrl: './merchant-qris-status.component.html',
  styleUrls: ['./merchant-qris-status.component.css']
})
export class MerchantQrisStatusComponent implements OnInit {

    merchantQrisStatusList: MerchantQrisStatus[];
    merchantQrisStatus: MerchantQrisStatus;
    currPage = 1;
    totalRecord = 10;
    totalData = 0;
    requestDate: NgbDateStruct;
    installDate: NgbDateStruct;
    searchTerm = {
        mid: '',
        agentId: '',
        requestDate: '',
        installDate: '',
        status: "",
        page: 1,
        limit: 10,
    }


    listStatus = [
        {
            value: "1",
            name: "Merchant Request QRIS"
        },
        {
            value: "2",
            name: "Merchant Menolak QRIS"
        },
        {
            value: "3",
            name: "QRIS Terpasang"
        }
    ]

    constructor(private ngxService: NgxUiLoaderService,
                private merchantQrisStatusService: MerchantQrisStatusService) { }

    ngOnInit() {
        this.requestDate = null;
        this.installDate = null;
        this.loadAll(this.currPage);
    }

    loadAll(page) {
        this.ngxService.start(); // start loader
        this.searchTerm.page = page
        this.searchTerm.limit = this.totalRecord
        console.log('filter --> ', this.searchTerm);
        if (this.requestDate !== null){
            this.searchTerm.requestDate = ('0' + this.requestDate.day).slice(-2) + '-' +
                ('0' + this.requestDate.month).slice(-2) + '-' +
                this.requestDate.year;
        }
        if (this.installDate !== null) {
            this.searchTerm.installDate = ('0' + this.installDate.day).slice(-2) + '-' +
                ('0' + this.installDate.month).slice(-2) + '-' +
                this.installDate.year;
        }
        

        this.merchantQrisStatusService.filter({
            filter: this.searchTerm,
        })
            .subscribe(
                (res: HttpResponse<MerchantQrisStatus[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    private onSuccess(data, headers) {
        this.ngxService.stop();
        if (data.errCode != '00') {
            console.log('something err');
            
            return;
        }
        console.log(data);
        this.merchantQrisStatusList = data.contents;
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
        this.requestDate = null;
        this.installDate = null;
        this.searchTerm = {
            mid: '',
            agentId: '',
            requestDate: '',
            installDate: '',
            status: "",
            page: 1,
            limit: 10,
        };
        this.loadAll(1);
    }

}
