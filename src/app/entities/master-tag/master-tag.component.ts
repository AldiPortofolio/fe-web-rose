import { Component, OnInit } from '@angular/core';
import { MasterTagModalComponent } from './master-tag.modal.component';
import { MasterTag } from './master-tag.model';
import { MasterTagService } from './master-tag.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'op-master-tag',
  templateUrl: './master-tag.component.html',
  styleUrls: ['./master-tag.component.css']
})
export class MasterTagComponent implements OnInit {

    masterTagList: MasterTag[];
    masterTag: MasterTag;
    closeResult: string;
    currPage = 1;
    totalRecord = 10;
    totalData = 0;

    searchTerm = {
        code: '',
        name: '',
        status: '',
        page: 1,
        limit: 10,
    }

    listStatus = [
        { code: "active", name: "Active" },
        { code: "inactive", name: "Inactive" },
    ]

    constructor(
        private masterTagService: MasterTagService,
        private modalService: NgbModal,
        private ngxService: NgxUiLoaderService
    ) { }

    ngOnInit() {
        this.loadAll(this.currPage);
    }

    loadAll(page) {
        this.ngxService.start(); // start loader
        this.searchTerm.page = page
        this.searchTerm.limit = this.totalRecord

        this.masterTagService.filter({
            filter: this.searchTerm,
        })
            .subscribe(
                (res: HttpResponse<MasterTag[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    private onSuccess(data, headers) {
        this.ngxService.stop();
        if (data.contents.length < 0) {
            return;
        }
        console.log(data);
        this.masterTagList = data.contents;
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
            code: '',
            name: '',
            status: '',
            page: 1,
            limit: 10,
        };
        this.loadAll(1);
    }

    open(status, message) {
        const modalRef = this.modalService.open(MasterTagModalComponent, { size: 'lg' });
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

}
