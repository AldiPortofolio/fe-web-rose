import { Component, OnInit } from '@angular/core';
import { LookupService } from '../lookup/lookup.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { LookupDto } from '../lookup/lookup-dto.model';
import { LOOKUP_TIPE_MERCHANT } from 'src/app/shared/constants/base-constant';
import { Merchant } from '../merchant/merchant.model';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { WorkInProgressService } from './work-in-progress.service';
import { MerchantWipQueue } from './merchant-wip.model';
import { WipDetailConfirmModalComponent } from './wip-detail-confirm-modal';

import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal from 'sweetalert2';

@Component({
  selector: 'op-work-in-progress-detail',
  templateUrl: './work-in-progress-detail.component.html',
  styleUrls: ['./work-in-progress-detail.component.css']
})
export class WorkInProgressDetailEddComponent implements OnInit {

  // Stevian To Do
  // - Filter dihilangkan
  // - hit ke yg postman pak ded kirim, fill data to grid
  // - action d msg2 row, utk ubah status jd VVIP / VIP / Standar
  // - TIDAK BOLEH turun level / turun status, misal VVIP g blh jd VIP, VIP g blh jd standar
  // - yg bs diubah jd VVIP dan VIP itu yg REGISTERED, VIP_REGISTERED, APPROVE_BY_APPROVER, 
  //   VIP_APPROVE_BY_APPROVER, VVIP_REGISTERED, VVIP_APPROVE_BY_APPROVER, VERIFIED, VIP_VERIFIED, VVIP_VERIFIED
  // - EDD tdk bs diapa2in
  //
  lookupTipeMerchant: LookupDto[] = [];
  lookupTempl: LookupDto[];
  merchantWipQueues: MerchantWipQueue[];
  merchantWipQueue2: MerchantWipQueue[] = [];
  merchantWipQueue: MerchantWipQueue;
  totalData: number;
  totalRecord: 0;
  curPage: 1;

  merchantList: Merchant[];

  basicStatusList: String[];
  // eddStatusList: String[];
  vipStatusList: String[];
  vvipStatusList: String[];

  closeResult: string;

  IdMerchantFromKeyDb: String[];

  constructor(private lookupService: LookupService,
    private workInProgressService: WorkInProgressService,
    private ngxService: NgxUiLoaderService,
    private modalService: NgbModal,
    private router: Router) { }

  ngOnInit() {
    // this.loadLookup();
    this.loadMerchantList();

    this.basicStatusList = ['REGISTERED', 'APPROVE_BY_APPROVER', 'VERIFIED', 'EDD'];
    this.vipStatusList = ['VIP_REGISTERED', 'VIP_APPROVE_BY_APPROVER', 'VIP_VERIFIED', 'VIP_EDD'];
    this.vvipStatusList = ['VVIP_REGISTERED', 'VVIP_APPROVE_BY_APPROVER', 'VVIP_VERIFIED', 'VVIP_EDD'];
    // this.eddStatusList = ['VIP_EDD', 'VVIP_EDD'];
  }

  // load Merchant data list
  loadMerchantList() {
    this.ngxService.start();

    this.workInProgressService.getMerchantWIPEddQueue()
      .subscribe(
        (res: HttpResponse<MerchantWipQueue[]>) => this.onSuccessQueue(res.body, res.headers),
        (res: HttpErrorResponse) => this.onError(res.message),
        () => { console.log('finally'); }
      );
  }

  private onSuccessQueue(data, headers) {
    this.merchantWipQueue2 = [];

    // data.forEach(dataa => {
    //   if (dataa.stateName === 'VVIP_EDD_START_VIEW' || 
    //       dataa.stateName === 'EDD_START_VIEW' || 
    //       dataa.stateName === 'EDD' || 
    //       dataa.stateName === 'VIP_EDD_START_VIEW' || 
    //       dataa.stateName === 'VVIP_EDD' ||
    //       dataa.stateName === 'VIP_EDD') {
    //     this.merchantWipQueue2.push(dataa);
    //   }
    // });
    this.merchantWipQueues = data;
    this.totalData = this.merchantWipQueues.length;
    this.ngxService.stop();
  }

  private onError(error) {
    this.ngxService.start();
    console.log('error..');
  }

  onBack() {
    this.router.navigate(['/main/work-in-progress']);
  }

  onConfirm() {

  }

  onFilter() {

  }

  releaseUser(id: number) {
    console.log('Approve')
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want release this user from merchant?',
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'yess!'
    }).then((result) => {
      console.log("result ->", result);
      if (result.value) {
        this.ngxService.start();
        this.workInProgressService.releaseUser(id).subscribe(
          result => {
            console.log("resultbody", result);
            const code = result.toString()
            this.ngxService.stop();
            if (code == 'OK') {
              Swal.fire('Success', "Release user success", 'success').then(
                () => this.loadMerchantList()
              );
            } else {
              Swal.fire('Failed', result.body.errDesc, 'error').then(

              );

            }
            this.modalService.dismissAll('close');
          });
      } else {
        // this.onBack()
      }
    });
  }

  resetFilter() { }

  loadPage() { }

  availableSetVip(merchantWipQueueStatus, merchantWipQueuePriority) {

    console.log('availableSetVip -->', merchantWipQueueStatus, merchantWipQueuePriority);

    if (//this.eddStatusList.indexOf(merchantWipQueueStatus) !== -1 ||
      this.vipStatusList.indexOf(merchantWipQueueStatus) !== -1 ||
      this.vvipStatusList.indexOf(merchantWipQueueStatus) !== -1 ||
      this.basicStatusList.indexOf(merchantWipQueueStatus) == -1 ||
      merchantWipQueuePriority !== 'STANDAR') {
      return false;
    } else {
      return true;
    }

  }

  availableSetVvip(merchantWipQueueStatus, merchantWipQueuePriority) {
    if (//this.eddStatusList.indexOf(merchantWipQueueStatus) !== -1 ||
      this.vvipStatusList.indexOf(merchantWipQueueStatus) !== -1 ||
      (this.basicStatusList.indexOf(merchantWipQueueStatus) == -1 &&
        this.vipStatusList.indexOf(merchantWipQueueStatus) == -1) ||
      merchantWipQueuePriority == 'VVIP') {
      return false;
    } else {
      return true;
    }
  }

  getIdFromKeyMerchant(merchantWipQueue) {
    this.IdMerchantFromKeyDb = merchantWipQueue.split(':');
    return this.IdMerchantFromKeyDb[this.IdMerchantFromKeyDb.length - 1];
  }

  openDialog(action, id, stateName) {

    console.log('action--> ', action, id, stateName);

    const modalRef = this.modalService.open(WipDetailConfirmModalComponent, { size: 'sm' });
    modalRef.componentInstance.priority = action;
    modalRef.componentInstance.idWipQueue = id;

    modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(this.closeResult);
      this.loadMerchantList();
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.loadMerchantList();
    });
  }

  private getDismissReason(reason: any): string {
    console.log(reason);
    return reason;
  }
}
