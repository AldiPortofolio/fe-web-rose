import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Lookup } from './lookup.model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { LookupModalComponent } from './lookup.modal.component';
import { Location } from '@angular/common';
import { LookupService } from './lookup.service';
import { TOTAL_RECORD_PER_PAGE } from 'src/app/shared/constants/base-constant';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { LookupGroupService } from '../lookup-group/lookup-group.service';
import { group } from '@angular/animations';
// import { Location } from '@angular/common';

@Component({
  selector: 'op-lookup',
  templateUrl: './lookup.component.html',
  styleUrls: ['./lookup.component.css']
})
export class LookupComponent implements OnInit {

  private sub: Subscription;
  groupName: string;
  lookupList: Lookup[];
  curPage = 1;
  totalData = 0;
  totalRecord = TOTAL_RECORD_PER_PAGE;
  searchTerm = {
    name: '',
    code:'',
    lookupGroup:'',
    page: 1,
    limit: 10,
  };
  closeResult: string;
  constructor(private route: ActivatedRoute,
              private modalService: NgbModal,
              private lookupService: LookupService,
              private lookupGroupService: LookupGroupService,
              private location: Location,
              private router: Router
              ) { }

  ngOnInit() {

    this.lookupGroupService.dataSharing.subscribe(
      data => this.groupName = data
    );

    if (!this.groupName) {
      // redirect to lookup-group where groupName is null or user do refresh page lookup
      this.router.navigate(['main/lookup-group']);
    }
    this.searchTerm.lookupGroup = this.groupName;
    this.loadAll(this.curPage);
  }

  onFilter() {
    this.loadAll(this.curPage);
  }

  loadAll(page) {
    this.searchTerm.page = page;
    this.lookupService.filter({
      filter: this.searchTerm,
    })
    .subscribe(
            (res: HttpResponse<Lookup[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message),
            () => {}
    );
    console.log(page);
    console.log(this.groupName);
  }

  open(status, obj) {
    console.log(status, obj);

    const modalRef = this.modalService.open(LookupModalComponent, { size: 'lg' });
    modalRef.componentInstance.statusRec = status;
    modalRef.componentInstance.objEdit = obj;

    modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(this.closeResult);
      this.curPage = 1 ;
      this.loadAll(this.curPage);
    }, (reason) => {
      console.log(reason);
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult);
      this.loadAll(this.curPage);
    });

  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  private onSuccess(data, headers) {
    if ( data.contents.length < 0 ) {
        return ;
    }
    this.lookupList = data.contents;
    this.totalData = data.totalData;
  }

  private onError(error) {
    console.log('error..');
  }

  resetFilter() {
    this.searchTerm = {
      lookupGroup:this.groupName,
      code:'',
      name: '', 
      page: 1,
      limit: 10,
    };
    this.loadAll(1);
  }

  loadPage() {
    this.loadAll(this.curPage);
  }

  goBack() {
    this.location.back();
  }

}
