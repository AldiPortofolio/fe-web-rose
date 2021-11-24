import { Component, OnInit, Input } from '@angular/core';
import { OutletActivation } from './outlet-activation.model';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { PortalAccessService } from '../portal-access/portal-access.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PortalAccessModalComponent } from '../portal-access/portal-access.modal.component';
import { OutletActivationModalComponent } from './outlet-activation.modal.component';

@Component({
  selector: 'op-outlet-activation',
  templateUrl: './outlet-activation.component.html',
  styleUrls: ['./outlet-activation.component.css']
})
export class OutletActivationComponent implements OnInit {

  merchantList: OutletActivation[];
  currPage = 1;
  totalRecord = 10;
  totalData = 0;
  totalDataMerchant = 0;

  searchTerm = {
    outlet_name: '',
    group_name: '',
    page: 1,
    limit: 10,
  }

  constructor(
    private portalService: PortalAccessService,
    private ngxService: NgxUiLoaderService,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.loadAllMerchant(this.currPage);
  }

  loadAllMerchant(page) {
    // start loader
    this.ngxService.start();

    console.log('search outlet_name ==>', this.searchTerm.outlet_name)

    this.portalService.filterOutlet({
      // filter: this.searchTerm,
      outlet_name: this.searchTerm.outlet_name,
      group_name: this.searchTerm.group_name,
      page: page,
      limit: this.totalRecord
    }).subscribe(
      (res: HttpResponse<OutletActivation[]>) => this.onSuccessMerchant(res.body, res.headers),
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  private onSuccessMerchant(data, headers) {
    // stop loader
    this.ngxService.stop();

    if (data.contents.length < 0) {
      return;
    }
    this.merchantList = data.contents;
    this.totalDataMerchant = data.totalData;
  }

  private onError(error) {
    this.ngxService.stop();
    console.log('error..', error);
  }

  loadPageMerchant() {
    this.loadAllMerchant(this.currPage);
  }

  onFilterMerchant() {
    this.loadAllMerchant(this.currPage);
  }

  resetFilterMerchant() {
    this.searchTerm = {
      outlet_name: '',
      group_name: '',
      page: 1,
      limit: 10,
    };
    this.loadAllMerchant(1);
  }

  openActivation(merchant_data) {
    const modalRef = this.modalService.open(OutletActivationModalComponent, { size: 'lg' });
    modalRef.componentInstance.objData = merchant_data;
    modalRef.result.then((result) => {
      this.currPage = 1;
      this.loadAllMerchant(this.currPage);
    }, (reason) => {
      this.currPage = 1;
        this.loadAllMerchant(this.currPage);
    });
  }

}
