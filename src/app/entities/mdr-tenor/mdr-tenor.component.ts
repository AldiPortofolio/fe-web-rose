import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { MdrTenor } from './mdr-tenor.model';
import { MdrTenorService } from './mdr-tenor.service';
import { MdrTenorModalComponent } from './mdr-tenor.modal.component';

@Component({
    selector: 'mdr-tenor',
    templateUrl: './mdr-tenor.component.html',
    styleUrls: ['./mdr-tenor.component.css']
})
export class MdrTenorComponent implements OnInit {

    mdrTenorList: MdrTenor[];
    mdrTenor: MdrTenor;
    currPage = 1;
    totalRecord = 10;
    totalData = 0;

    searchTerm = {
        tenorCode: '',
        tenorName: '',
        page: 1,
        limit: 10,
    }

    closeResult: string;
    sub: any

    constructor(private route: ActivatedRoute,
        private mdrTenorService: MdrTenorService,
        private modalService: NgbModal,
        private ngxService: NgxUiLoaderService) {
    }

    ngOnInit() {
        this.loadAll(this.currPage);
        this.mdrTenor = {}
    }

    loadAll(page) {
        this.ngxService.start(); // start loader
        this.searchTerm.page = page
        this.searchTerm.limit = this.totalRecord
        this.mdrTenorService.filter({
            filter: this.searchTerm,
        })
            .subscribe(
                (res: HttpResponse<MdrTenor[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    private onSuccess(data, headers) {
        this.ngxService.stop();
        if (data.contents.length < 0) {
            return;
        }
        console.log(data);
        this.mdrTenorList = data.contents;
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
        this.searchTerm = {
            tenorName: '',
            tenorCode: '',
            page: 1,
            limit: 10,
        };
        this.loadAll(1);
    }

    open(status, message) {
        const modalRef = this.modalService.open(MdrTenorModalComponent, { size: 'lg' });
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

    delete(mdrTenor): void {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to delete this config?',
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Delete!'
        }).then((result) => {
            console.log("result ->", result);
            if (result.value) {
                this.ngxService.start();
                // this.limitTransaction = limitTransaction
                this.mdrTenor.id = mdrTenor.id;
                this.mdrTenor.tenorName = mdrTenor.tenorName;
                this.mdrTenor.tenorCode = mdrTenor.tenorCode;
                this.mdrTenor.status = 'n';
                this.mdrTenor.seq = mdrTenor.seq;
                this.mdrTenorService.save(this.mdrTenor).subscribe(result => {
                    if (result.body.errCode === '00') {
                        Swal.fire('Success', "Successfully Deleted Data", 'success').then(
                        );
                        this.loadAll(this.currPage);
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
