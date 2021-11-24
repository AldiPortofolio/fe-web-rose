import { Component, OnInit } from '@angular/core';
import { MerchantCustomer } from './merchant-customer.model';
import { MerchantCustomerService } from './merchant-customer.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { MerchantCustomerModalComponent } from './merchant-customer.modal.component';

@Component({
  selector: 'op-merchant-customer',
  templateUrl: './merchant-customer.component.html',
  styleUrls: ['./merchant-customer.component.css']
})
export class MerchantCustomerComponent implements OnInit {

  searchTerm = {
    serviceId: 0,
    name: "",
    phone: "",
    typeId: 0,
    citizenIdNo: "",
    merchant: "",
    provinceId: 0,
    cityId: 0,
    districtId: 0,
    villageId: 0,
    page: 1,
    limit: 10,
  }

  customerList: MerchantCustomer[];
  custumer: MerchantCustomer;
  closeResult: string;
  currPage = 1;
  totalRecord = 10;
  totalData = 0;

  constructor(
    private customerService: MerchantCustomerService,
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

    this.customerService.filter({
      filter: this.searchTerm,
    })
      .subscribe(
        (res: HttpResponse<MerchantCustomer[]>) => this.onSuccess(res.body, res.headers),
        (res: HttpErrorResponse) => this.onError(res.message)
      );

  }

  onFilter() {
    this.loadAll(this.currPage);
  }

  resetFilter() {
    this.searchTerm = {
      serviceId: 0,
      name: "",
      phone: "",
      typeId: 0,
      citizenIdNo: "",
      merchant: "",
      provinceId: 0,
      cityId: 0,
      districtId: 0,
      villageId: 0,
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
    this.customerList = data.contents;
    this.totalData = data.totalData;
  }

  private onError(error) {
    this.ngxService.stop();
    console.log('error..', error);
  }

  open(status, message) {
    const modalRef = this.modalService.open(MerchantCustomerModalComponent, { size: 'lg' });
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
