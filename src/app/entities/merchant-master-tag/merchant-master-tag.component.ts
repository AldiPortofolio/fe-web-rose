import { Component, OnInit } from '@angular/core';
import { MerchantMasterTag } from './merchant-master-tag.model';
import { MerchantMasterTagService } from './merchant-master-tag.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'op-merchant-master-tag',
  templateUrl: './merchant-master-tag.component.html',
  styleUrls: ['./merchant-master-tag.component.css']
})
export class MerchantMasterTagComponent implements OnInit {
    
    masterTagList: MerchantMasterTag[];
    masterTag: MerchantMasterTag;
    closeResult: string;
    currPage = 1;
    totalRecord = 10;
    totalData = 0;

    searchTerm = {
        page: 1,
        limit: 10,
    }


    constructor(
        private masterTagService: MerchantMasterTagService,
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
                (res: HttpResponse<MerchantMasterTag[]>) => this.onSuccess(res.body, res.headers),
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

    downloadAll() {

        this.masterTagService.downloadAll().then(
            (resp) => {
                console.log('res-->', resp);

                const url = window.URL.createObjectURL(resp.body);
                const link = document.createElement('a');
                document.body.appendChild(link);
                link.setAttribute('style', 'display: none');
                link.href = url;
                link.download = 'all.xlsx';
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

}
