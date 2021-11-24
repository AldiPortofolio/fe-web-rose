import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UserCategory } from './user-category.model';
import { UserCategoryService } from './user-category.service';
import { UserCategoryModalComponent } from './user-category.modal.component';
import { LookupService } from '../../lookup/lookup.service';
import { Lookup } from '../../lookup/lookup.model';

@Component({
  selector: 'op-user-category',
  templateUrl: './user-category.component.html',
  styleUrls: ['./user-category.component.css']
})
export class UserCategoryComponent implements OnInit {

  searchTerm = {
    id: 0,
    code: '',
    name: '',
    notes: '',
    seq: 0,
    page: 1,
    limit: 10,
  }

  userCategoryList: UserCategory[];
  userCategory: UserCategory;
  closeResult: string;
  currPage = 1;
  totalRecord = 10;
  totalData = 0;

  


  constructor(
    private userCategoryService: UserCategoryService,
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

    this.userCategoryService.filter({
      filter: this.searchTerm,
    })
      .subscribe(
        (res: HttpResponse<UserCategory[]>) => this.onSuccess(res.body, res.headers),
        (res: HttpErrorResponse) => this.onError(res.message)
      );

  }

  onFilter() {
    this.loadAll(this.currPage);
  }

  resetFilter() {
    this.searchTerm = {
      id: 0,
      code: '',
      name: '',
      notes: '',
      seq: 0,
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
    this.userCategoryList = data.contents;
    this.totalData = data.totalData;
  }

  private onError(error) {
    this.ngxService.stop();
    console.log('error..', error);
  }

  open(status, message) {
    const modalRef = this.modalService.open(UserCategoryModalComponent, { size: 'lg' });
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
