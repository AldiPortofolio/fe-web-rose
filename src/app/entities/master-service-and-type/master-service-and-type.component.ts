import { Component, OnInit } from '@angular/core';
import { MasterService } from './master-service-and-type.model';
import { MasterType } from './master-service-and-type.model';
import { MasterServiceService } from './master-service.service';
import { MasterTypeService } from './master-type.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { MasterTypeModalComponent } from './master-type.modal.component';
import { MasterServiceModalComponent } from './master-service.modal.component';

@Component({
  selector: 'op-master-service-and-type',
  templateUrl: './master-service-and-type.component.html',
  styleUrls: ['./master-service-and-type.component.css']
})
export class MasterServiceAndTypeComponent implements OnInit {

  searchTerm = {
    id: 0,
    midMerchant: '',
    midBank: '',
    secretId: '',
    bank: '',
    tenor: '',
    bankMdr: 0,
    merchantMdr: 0,
    merchantFeeType: '',
    merchantFee: 0,
    customerFeeType: '',
    customerFee: 0,
    page: 1,
    limit: 10,
  }

  masterServiceList: MasterService[];
  masterTypeList: MasterType[];
  closeResult: string;
  currPage = 1;
  totalRecord = 10;
  totalData = 0;

  constructor(
    private masterServiceService: MasterServiceService,
    private masterTypeService: MasterTypeService,
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

    this.masterServiceService.getAll()
      .subscribe(
        (res: HttpResponse<MasterService[]>) => this.onSuccess(res.body, res.headers, 1),
        (res: HttpErrorResponse) => this.onError(res.message, ' [Get data master service]')
      );

    this.masterTypeService.getAll()
      .subscribe(
        (res: HttpResponse<MasterType[]>) => this.onSuccess(res.body, res.headers, 2),
        (res: HttpErrorResponse) => this.onError(res.message, ' [Get data master type]' )
      );

  }

  onFilter() {
    this.loadAll(this.currPage);
  }

  resetFilter() {
    this.searchTerm = {
      id: 0,
      midMerchant: '',
      midBank: '',
      secretId: '',
      bank: '',
      tenor: '',
      bankMdr: 0,
      merchantMdr: 0,
      merchantFeeType: '',
      merchantFee: 0,
      customerFeeType: '',
      customerFee: 0,
      page: 1,
      limit: 10,
    };
    this.loadAll(1);
  }


  private onSuccess(data, headers, code) {
    this.ngxService.stop();
    if (data.contents.length < 0) {
      return;
    }
    
    if (code == 1) {
      this.masterServiceList = data.contents
    } else {
      this.masterTypeList = data.contents
    }
    this.totalData = data.totalData;
  }

  private onError(error, msg) {
    this.ngxService.stop();
    console.log('error.. ', error, msg);
  }

  openService(status, message) {
    const modalRef = this.modalService.open(MasterServiceModalComponent, { size: 'lg' });
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

  openType(status, message) {
    const modalRef = this.modalService.open(MasterTypeModalComponent, { size: 'lg' });
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
