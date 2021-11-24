import { Component, OnInit } from '@angular/core';
import { LogUpgradeFds } from './log-upgrade-fds.model';
import { LogUpgradeFdsService } from './log-upgrade-fds.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { WorkInProgressService } from '../work-in-progress/work-in-progress.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LogUpgradeFdsModalComponent } from './log-upgrade-fds-modal.component';

@Component({
  selector: 'op-log-upgrade-fds',
  templateUrl: './log-upgrade-fds.component.html',
  styleUrls: ['./log-upgrade-fds.component.css']
})
export class LogUpgradeFdsComponent implements OnInit {

    logUpgradeFdsList: LogUpgradeFds[];
    logUpgradeFds: LogUpgradeFds;
    closeResult: string;


    currPage = 1;
    totalRecord = 10;
    totalData = 0;

    listStatus = [
        { code: "failed", name: "Failed" },
        { code: "success", name: "Success" },
        { code: "retry", name: "Retry" },
    ]

    searchTerm = {
        status: '',
        phoneNumber: '',
        page: 1,
        limit: 10,
    }

    constructor(
        private logUpgradeFdsService: LogUpgradeFdsService,
        private ngxService: NgxUiLoaderService,
        private modalService: NgbModal,
        private workInProgressService: WorkInProgressService,
    ) { }

    ngOnInit() {
        this.loadAll(this.currPage);
    }

    loadAll(page) {
        this.ngxService.start(); // start loader
        this.searchTerm.page = page
        this.searchTerm.limit = this.totalRecord

        this.logUpgradeFdsService.filter({
            filter: this.searchTerm,
        })
            .subscribe(
                (res: HttpResponse<LogUpgradeFds[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    private onSuccess(data, headers) {
        this.ngxService.stop();
        if (data.contents.length < 0) {
            return;
        }
        console.log(data);
        this.logUpgradeFdsList = data.contents;
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
            status: '',
            phoneNumber: '',
            page: 1,
            limit: 10,
        };
        this.loadAll(1);
    }

    open(status, message) {
        const modalRef = this.modalService.open(LogUpgradeFdsModalComponent, { size: 'lg' });
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
