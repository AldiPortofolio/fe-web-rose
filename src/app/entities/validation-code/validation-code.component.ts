import { Component, OnInit } from '@angular/core';
import { ValidationCode } from './validation-code.model';
import { ValidationCodeService } from './validation-code.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ValidationCodeModalComponent } from './validation-code.modal.component';
import { UserCategoryService } from '../ottopay-4/user-category/user-category.service';
import { UserCategory } from '../ottopay-4/user-category/user-category.model';
import { Router } from '@angular/router';

@Component({
  selector: 'op-validation-code',
  templateUrl: './validation-code.component.html',
  styleUrls: ['./validation-code.component.css']
})
export class ValidationCodeComponent implements OnInit {

    validationCodeList: ValidationCode[];
    userCategoryList: UserCategory[];
    validationCode: ValidationCode;
    closeResult: string;
    currPage = 1;
    totalRecord = 10;
    totalData = 0;

    listAppID = [
        { code: "1", name: "Ottopay" },
        { code: "2", name: "Indomarco" },
        { code: "3", name: "SFA" },
    ]

    searchTerm = {
        validationCode: '',
        appId: '',
        userCategoryCode: '',
        page: 1,
        limit: 10,
    }

    constructor(
        private validationCodeService: ValidationCodeService,
        private modalService: NgbModal,
        private ngxService: NgxUiLoaderService,
        private userCategoryService: UserCategoryService,
        private router: Router,

    ) { }

    ngOnInit() {
        this.loadAllUserCategory();
        this.loadAll(this.currPage);
    }

    loadAll(page) {
        this.ngxService.start(); // start loader
        this.searchTerm.page = page
        this.searchTerm.limit = this.totalRecord

        this.validationCodeService.filter({
            filter: this.searchTerm,
        })
            .subscribe(
                (res: HttpResponse<ValidationCode[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    loadAllUserCategory(){
        this.userCategoryService.filter({
            filter:{
                page: 1,
                limit: 999,
            }
        }).subscribe(
            (res: HttpResponse<UserCategory[]>) => this.onSuccessUserCategory(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
        )
    }

    private onSuccessUserCategory(data, headers) {
        this.ngxService.stop();
        if (data.contents.length < 0) {
            return;
        }
        console.log(data);
        this.userCategoryList = data.contents;
        this.totalData = data.totalData;
    }

    private onSuccess(data, headers) {
        this.ngxService.stop();
        if (data.contents.length < 0) {
            return;
        }
        console.log(data);
        this.validationCodeList = data.contents;
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
            validationCode: '',
            appId: '',
            userCategoryCode: '',
            page: 1,
            limit: 10,
        };
        this.loadAll(1);
    }

    open(status, message) {
        const modalRef = this.modalService.open(ValidationCodeModalComponent, { size: 'lg' });
        modalRef.componentInstance.statusRec = status;
        modalRef.componentInstance.objEdit = message;
        modalRef.componentInstance.userCategoryList = this.userCategoryList;
        modalRef.componentInstance.listAppID = this.listAppID;
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

    openDetail(obj) {
        this.validationCodeService.sendData(obj.id);
        this.router.navigate(['main/validation-code-master-tag']);
    }

}
