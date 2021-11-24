import { Component, OnInit } from '@angular/core';
import { AkuisisiSfa, AkuisisiSfaFailed } from './akuisisi-sfa.model';
import { AkuisisiSfaService } from './akuisisi-sfa.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'op-akuisisi-sfa',
  templateUrl: './akuisisi-sfa.component.html',
  styleUrls: ['./akuisisi-sfa.component.css']
})
export class AkuisisiSfaComponent implements OnInit {
    dateStartMdl: NgbDateStruct;
    dateEndMdl: NgbDateStruct;
    searchTerm = {
        key: '',
        startDate: '',
        endDate: '',
        page: 1,
        limit: 10,
    }

    dateStartMdlFailed: NgbDateStruct;
    dateEndMdlFailed: NgbDateStruct;
    searchTermFailed = {
        key: '',
        startDate: '',
        endDate: '',
        page: 1,
        limit: 10,
    }

    akuisisiSfaList: AkuisisiSfa[];
    akuisisiSfaFailedList: AkuisisiSfaFailed[];

    currPage = 1;
    totalRecord = 10;
    totalData = 0;
    
    currPageFailed = 1;
    totalRecordFailed = 5;
    totalDataFailed = 0;


    constructor(
        private router: Router,
        private akuisisiSfaService: AkuisisiSfaService,
        private ngxService: NgxUiLoaderService,

    ) { }

    ngOnInit() {
        this.loadAll(this.currPage);
        this.loadAllFailed(this.currPageFailed)
    }

    // loadAll(page) {
    //     this.ngxService.start(); // start loader
    //     this.searchTerm.page = page;
    //     this.searchTerm.limit = this.totalRecord;

    //     this.akuisisiSfaService.filter({
    //         filter: this.searchTerm,
    //     }).subscribe(
    //             (res: HttpResponse<AkuisisiSfa[]>) => this.onSuccess(res.body, res.headers),
    //             (res: HttpErrorResponse) => this.onError(res.message)
    //         );

    // }

    loadAll(page) {
        this.ngxService.start(); // start loader
        this.searchTerm.page = page
        this.searchTerm.limit = this.totalRecord
        console.log("ini tanggal --->",this.dateStartMdl, this.dateEndMdl)
        if (this.dateStartMdl == null) {
            this.searchTerm.startDate = ""
        } else {
            this.searchTerm.startDate = this.dateFormatter(this.dateStartMdl)
        }

        if (this.dateEndMdl == null) {
            this.searchTerm.endDate = ""
        } else {
            this.searchTerm.endDate = this.dateFormatterEnd(this.dateEndMdl)
        }

        this.akuisisiSfaService.filter({
            filter: this.searchTerm,
        })
            .subscribe(
                (res: HttpResponse<AkuisisiSfa[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    
    }

    loadAllFailed(page) {
        this.ngxService.start(); // start loader
        this.searchTermFailed.page = page
        this.searchTermFailed.limit = this.totalRecord
        console.log("ini tanggal --->",this.dateStartMdlFailed, this.dateEndMdlFailed)
        if (this.dateStartMdlFailed == null) {
            this.searchTermFailed.startDate = ""
        } else {
            this.searchTermFailed.startDate = this.dateFormatter(this.dateStartMdlFailed)
        }

        if (this.dateEndMdlFailed == null) {
            this.searchTermFailed.endDate = ""
        } else {
            this.searchTermFailed.endDate = this.dateFormatterEnd(this.dateEndMdlFailed)
        }
        this.akuisisiSfaService.filterFailed({
            filter: this.searchTermFailed,
        })
            .subscribe(
                (res: HttpResponse<AkuisisiSfaFailed[]>) => this.onSuccessFailed(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );

    }

    private onSuccess(data, headers) {
        this.ngxService.stop();
        if (data.contents.length < 0) {
            return;
        }
        console.log(data);
        this.akuisisiSfaList = data.contents;
        this.totalData = data.totalData;
    }

    private onSuccessFailed(data, headers) {
        this.ngxService.stop();
        if (data.contents.length < 0) {
            return;
        }
        console.log(data);
        this.akuisisiSfaFailedList = data.contents;
        this.totalDataFailed = data.totalData;
    }

    private onError(error) {
        this.ngxService.stop();
        console.log('error..', error);
    }

    onFilter() {
        this.loadAll(this.currPage);
    }

    onFilterFailed() {
        this.loadAllFailed(this.currPage);
    }

    loadPage() {
        this.loadAll(this.currPage);
    }

    loadPageFailed() {
        this.loadAllFailed(this.currPageFailed);
    }

    dateFormatter(params: NgbDateStruct): string {
        console.log(params);
    
        const year = params.year;
        const mth = params.month;
        const day = params.day;
        // return dt.toLocaleString(['id']);
        // return year + '-' + mth + '-' + day;
        return year + '-' + (mth < 10 ? '0' + mth : mth) + '-' + (day < 10 ? '0' + day : day) + ' 00:00:00';
    }

    dateFormatterEnd(params: NgbDateStruct): string {
        console.log(params);
    
        const year = params.year;
        const mth = params.month;
        const day = params.day;
        // return dt.toLocaleString(['id']);
        // return year + '-' + mth + '-' + day;
        return year + '-' + (mth < 10 ? '0' + mth : mth) + '-' + (day < 10 ? '0' + day : day) + ' 23:59:59';
    }

    export() {
        if (this.dateStartMdl == null) {
            this.searchTerm.startDate = ""
        } else {
            this.searchTerm.startDate = this.dateFormatter(this.dateStartMdl)
        }

        if (this.dateEndMdl == null) {
            this.searchTerm.endDate = ""
        } else {
            this.searchTerm.endDate = this.dateFormatterEnd(this.dateEndMdl)
        }

        if ( this.searchTerm.key == '' && this.searchTerm.startDate == '' && this.searchTerm.endDate == '' ) {
            Swal.fire('Warning', "Please select filter", "warning").then(
                () => this.router.navigate(['/main/akuisisi-sfa'])
            );
        } else {
        
            this.akuisisiSfaService.export(this.searchTerm).subscribe( result => {
                console.log("ini result body", result)

                if ( result.body.errCode == "00") {
                    this.ngxService.stop();
                    Swal.fire('Success', 'Successfully export data akuisisi sfa', 'success').then(
                        () => this.router.navigate(['/main/report-export-akuisisi-sfa'])
                    );
                } else {
                    this.ngxService.stop();
                    Swal.fire('Failed', result.body.errDesc, 'error').then(
                        () => this.onBack()
                    );
                }
            })
        }
    }

    onBack() {
        // this.route.
        this.ngxService.stop();
        this.router.navigate(['/main/akuisisi-sfa']);
    }

}
