import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ReportFinishedService } from './report-finished.service';
import { TOTAL_RECORD_PER_PAGE } from 'src/app/shared/constants/base-constant';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ReportFinished } from './report-finished.model';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Merchant } from '../../merchant/merchant.model';

@Component({
    selector: 'op-report-finished',
    templateUrl: './report-finished.component.html',
    styleUrls: ['./report-finished.component.css']
})
export class ReportFinishedComponent implements OnInit {

    reportList: ReportFinished[];
    curPage = 1;
    totalData = 0;
    // totalRecord = TOTAL_RECORD_PER_PAGE;
    totalRecord = 10;
    dateStartMdl: NgbDateStruct;
    dateEndMdl: NgbDateStruct;
    searchTerm = {
        name: '',
        startDate: '',
        endDate: '',
    };

    constructor(private ngxService: NgxUiLoaderService,
                private reportFinishedService: ReportFinishedService) {}

    ngOnInit() {
        // this.loadAll(this.curPage);
    }

    loadAll(page) {
        this.ngxService.start();
        console.log('Start load all');
        
        this.reportFinishedService.filter({
            filter: this.searchTerm,
            page: page,
            count: this.totalRecord,
        })
        .subscribe(
            (res: HttpResponse<Merchant[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message),
            () => { console.log('finally'); }
        );


    }

    private onSuccess(data, headers) {
        if (data.content.length < 0) {
            return;
        }
        this.reportList = data.content;
        this.totalData = data.totalElements;
        this.ngxService.stop();
    }

    private onError(error) {
        console.log('error..');
        this.ngxService.stop();
    }

    loadPage() {
        this.loadAll(this.curPage);
        console.log(this.curPage);
    }

    onFilter() {
        this.searchTerm.startDate = this.dateFormatter(this.dateStartMdl);
        this.searchTerm.endDate = this.dateFormatter(this.dateEndMdl);
        
        if (!this.searchTerm.startDate  || !this.searchTerm.endDate ) {
            return;
        }
        console.log(this.searchTerm);
        this.loadAll(this.curPage);
    }

    

    public async btnExport(): Promise<void> {
        this.ngxService.start();
        this.searchTerm.startDate = this.dateFormatter(this.dateStartMdl);
        this.searchTerm.endDate = this.dateFormatter(this.dateEndMdl);

        const blob = await this.reportFinishedService.download({
            filter: this.searchTerm
        }).then(
            (resp) => {
                console.log('res-->', resp);
                // console.log('file name : ', resp.headers.get('File-Name'));
                const url = window.URL.createObjectURL(resp.body);
                const link = document.createElement('a');
                document.body.appendChild(link);
                link.setAttribute('style', 'display: none');
                link.href = url;
                // link.download = resp.headers.get('File-Name');
                link.download = 'result.csv';
                link.click();
                link.remove();
                window.URL.revokeObjectURL(url);
                this.ngxService.stop();
            });

    }

    dateFormatter(params: NgbDateStruct): string {
        console.log(params);
        if (!params) {
            this.ngxService.stop();
            Swal.fire('Failed', 'silahkan pilih tanggal', 'error');
            return;
        }
        const year = params.year;
        const mth = params.month;
        const day = params.day;
        // return dt.toLocaleString(['id']);
        // return year + '-' + mth + '-' + day;
        return year + '-' + (mth < 10 ? '0' + mth : mth) + '-' + (day < 10 ? '0' + day : day);
    }


}
