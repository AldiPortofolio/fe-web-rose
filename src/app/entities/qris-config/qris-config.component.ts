import { Component, OnInit } from '@angular/core';
import { QrisConfig } from './qris-config.model';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ActivatedRoute } from '@angular/router';
import { QrisConfigService } from './qris-config.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { QrisConfigModalComponent } from './qris-config.modal.component';

@Component({
  selector: 'op-qris-config',
  templateUrl: './qris-config.component.html',
  styleUrls: ['./qris-config.component.css']
})
export class QrisConfigComponent implements OnInit {

    qrisConfigList: QrisConfig[];
    qrisConfig: QrisConfig;
    currPage = 1;
    totalRecord = 10;
    totalData = 0;

    searchTerm = {
        issuerName: '',
        institutionId: '',
        transactionType: '',
        page: 1,
        limit: 10,
    }

    transactionTypeList = [
        {
            name: 'On Us',
            val: 'on_us'
        },
        {
            name: 'Off Us',
            val: 'off_us'
        },
    ]

    closeResult: string;
    sub: any

    constructor(private route: ActivatedRoute,
        private qrisConfigService: QrisConfigService,
        private modalService: NgbModal,
        private ngxService: NgxUiLoaderService) {
    }

    ngOnInit() {
        this.loadAll(this.currPage);
    }

    loadAll(page) {
        this.ngxService.start(); // start loader
        this.searchTerm.page = page
        this.searchTerm.limit = this.totalRecord
        this.qrisConfigService.filter({
            filter: this.searchTerm,
        })
            .subscribe(
                (res: HttpResponse<QrisConfig[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    onFilter() {
        this.loadAll(this.currPage);
    }

    resetFilter() {
        this.searchTerm = {
            issuerName: '',
            institutionId: '',
            transactionType: '',
            page: 1,
            limit: 10,
        };
        this.loadAll(1);
    }
    

    private onSuccess(data, headers) {
        this.ngxService.stop();
        if (data.contents.length < 0) {
            return;
        }
        console.log(data);
        this.qrisConfigList = data.contents;
        this.totalData = data.totalData;
    }

    private onError(error) {
        this.ngxService.stop();
        console.log('error..', error);
    }

    open(status, message) {
        const modalRef = this.modalService.open(QrisConfigModalComponent, { size: 'lg' });
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

    loadPage() {
        this.loadAll(this.currPage);
    }
}

