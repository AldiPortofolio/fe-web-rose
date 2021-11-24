import { Component, OnInit } from '@angular/core';
import { QrPreprinted } from './qr-preprinted.model';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { QrPreprintedService } from './qr-preprinted.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { QrPreprintedModalComponent } from './qr-preprinted.modal.component';
import { Provinsi } from '../provinsi/provinsi.model';
import { ProvinsiService } from '../provinsi/provinsi.service';
import { Mcc } from '../mcc/mcc.model';
import { MccService } from '../mcc/mcc.service';

@Component({
  selector: 'op-qr-preprinted',
  templateUrl: './qr-preprinted.component.html',
  styleUrls: ['./qr-preprinted.component.css']
})
export class QrPreprintedComponent implements OnInit {

    reportList: QrPreprinted[];
    curPage = 1;
    totalData = 0;
    totalRecord = 10;
    dateStartMdl: NgbDateStruct;
    dateEndMdl: NgbDateStruct;

    uploadNmidRes: QrPreprinted;

    closeResult: string;

    listProvince: Provinsi[] = [];
    listMcc: Mcc[] = [];

    constructor(
        private ngxService: NgxUiLoaderService,
        private qrPreprintedService: QrPreprintedService,
        private modalService: NgbModal,
        private provinceService: ProvinsiService,
        private mccService: MccService,
        private formBuilder: FormBuilder) { }

    ngOnInit() {

        this.loadAll(this.curPage);
        this.loadListProvince();
        this.loadListMcc();
    }

    loadAll(page) {
        this.ngxService.start();

        this.qrPreprintedService.filter({
            page: page,
            limit: this.totalRecord,
        })
            .subscribe(
                (res: HttpResponse<QrPreprinted[]>) => this.onSuccessGetData(res.body),
                (res: HttpErrorResponse) => this.onError(res.message),
                () => { console.log('finally'); }
            );
    }

    private loadListProvince() {
        this.ngxService.start();
        this.provinceService.getAll()
            .subscribe(
                (res: HttpResponse<Provinsi[]>) => this.onSuccessProvince(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message),
                () => { console.log('finally'); }
            );
    }

    private onSuccessProvince(data, headers) {
        this.listProvince = data;
        this.ngxService.stop();
    }

    private loadListMcc() {
        this.ngxService.start();
        this.mccService.getAll().subscribe(
            (res: HttpResponse<Mcc[]>) => this.onSuccessMcc(res.body),
            (res: HttpErrorResponse) => this.onError(res.message),
            () => { console.log('finally'); }
        )
    }

    private onSuccessMcc(data) {
        this.listMcc = data;

        console.log("MCC", this.listMcc);
        this.ngxService.stop();
    }

    loadPage(event) {
        this.loadAll(this.curPage);
        console.log(this.curPage);
    }

    onRefresh() {
        this.loadAll(this.curPage);
    }

    private onSuccessGetData(data) {
        this.reportList = data.contents;
        this.totalData = data.totalData;
        this.ngxService.stop();
    }

    private onError(error) {
        this.ngxService.stop();
        console.log('error..', error);
    }

    downloadFile(filePath) {
        console.log('File Path:', filePath);

        this.qrPreprintedService.downloadFile({
            filePath: filePath
        }).then(
            (resp) => {
                console.log('res-->', resp);

                const url = window.URL.createObjectURL(resp.body);
                const link = document.createElement('a');
                document.body.appendChild(link);
                link.setAttribute('style', 'display: none');
                link.href = url;
                link.download = filePath;
                link.click();
                link.remove();
                window.URL.revokeObjectURL(url);
            },
            (err) => {

                // console.log("TEST: ", err)
                if (err.status == 500) {
                    Swal.fire('Error', 'File not found!', 'error');
                }
            }
        );
    }

    open() {
        const modalRef = this.modalService.open(QrPreprintedModalComponent, { size: 'lg' });
        modalRef.componentInstance.listProvince = this.listProvince;
        modalRef.componentInstance.listMcc = this.listMcc;
        modalRef.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
            console.log(this.closeResult);
            this.curPage = 1;
            this.loadAll(this.curPage);
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            this.curPage = 1;
            this.loadAll(this.curPage);
        });
    }
    
    private getDismissReason(reason: any): string {
        console.log(reason);
        return reason;
    }

}
