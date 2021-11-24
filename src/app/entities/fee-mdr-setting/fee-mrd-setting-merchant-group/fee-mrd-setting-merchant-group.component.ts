import { Component, OnInit } from '@angular/core';
import { FeeMdrSettingMerchantGroup } from './fee-mdr-setting-merchant-group.model';
import { FeeMrdSettingMerchantGroupService } from './fee-mrd-setting-merchant-group.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FeeMdrSettingMerchantGroupModalComponent } from './fee-mdr-setting-merchant-group.modal.component';

@Component({
  selector: 'op-fee-mrd-setting-merchant-group',
  templateUrl: './fee-mrd-setting-merchant-group.component.html',
  styleUrls: ['./fee-mrd-setting-merchant-group.component.css']
})
export class FeeMrdSettingMerchantGroupComponent implements OnInit {

  searchTerm = {
    id: 0,
    idMerchantGroup: 0,
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

  feeMdrList: FeeMdrSettingMerchantGroup[];
  feeMdr: FeeMdrSettingMerchantGroup;
  closeResult: string;
  currPage = 1;
  totalRecord = 10;
  totalData = 0;

  constructor(
    private feeMrdSettingService: FeeMrdSettingMerchantGroupService,
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

    this.feeMrdSettingService.filter({
      filter: this.searchTerm,
    })
      .subscribe(
        (res: HttpResponse<FeeMdrSettingMerchantGroup[]>) => this.onSuccess(res.body, res.headers),
        (res: HttpErrorResponse) => this.onError(res.message)
      );

  }

  onFilter() {
    this.loadAll(this.currPage);
  }

  resetFilter() {
    this.searchTerm = {
      id: 0,
      idMerchantGroup: 0,
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


  private onSuccess(data, headers) {
    this.ngxService.stop();
    if (data.contents.length < 0) {
      return;
    }
    console.log(data);
    this.feeMdrList = data.contents;
    this.totalData = data.totalData;
  }

  private onError(error) {
    this.ngxService.stop();
    console.log('error..', error);
  }

  open(status, message) {
    const modalRef = this.modalService.open(FeeMdrSettingMerchantGroupModalComponent, { size: 'lg' });
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

