import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FeeMdrSettingMerchantGroup } from './fee-mdr-setting-merchant-group.model';
import { FeeMrdSettingMerchantGroupService } from './fee-mrd-setting-merchant-group.service';
import { MdrBank } from '../../mdr-bank/mdr-bank.model';
import { MdrBankService } from '../../mdr-bank/mdr-bank.service';
import { MdrTenor } from '../../mdr-tenor/mdr-tenor.model';
import { MdrTenorService } from '../../mdr-tenor/mdr-tenor.service';
import Swal from 'sweetalert2';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'op-fee-mdr-setting-merchant-group-modal',
  templateUrl: './fee-mdr-setting-merchant-group.modal.component.html',
  styleUrls: ['./fee-mdr-setting-merchant-group.modal.component.css']
})
export class FeeMdrSettingMerchantGroupModalComponent implements OnInit {

  @Input() statusRec;
  @Input() objEdit: FeeMdrSettingMerchantGroup;
  @Input() viewMsg;

  feeMdr: FeeMdrSettingMerchantGroup;
  listBank: MdrBank[] = [];
  listTenor: MdrTenor[] = [];

  isFormDirty: Boolean = false;

  searchTermB = {
    bankName: '',
    bankCode: '',
    page: 1,
    limit: 100000,
  }

  searchTermT = {
    tenorCode: '',
    tenorName: '',
    page: 1,
    limit: 100000,
  }

  feeType = [
    { code: "Amount", name: "Amount" },
    { code: "Percentage", name: "Percentage" },
  ]

  constructor(private modalService: NgbModal,
    private ngxService: NgxUiLoaderService,
    private feeMdrService: FeeMrdSettingMerchantGroupService,
    private bankService: MdrBankService,
    private tonerService: MdrTenorService) {
  }

  ngOnInit() {
    this.loadListBank()
    this.loadListToner()

    if (this.statusRec === 'addnew') {
      this.feeMdr = {};
      this.feeMdr.id = 0;
      this.feeMdr.idMerchantGroup = 0;
      this.feeMdr.midBank = '';
      this.feeMdr.secretId = '';
      this.feeMdr.bank = '';
      this.feeMdr.tenor = '';
      this.feeMdr.bankMdr = 0;
      this.feeMdr.merchantMdr = 0;
      this.feeMdr.merchantFeeType = '';
      this.feeMdr.merchantFee = 0;
      this.feeMdr.customerFeeType = '';
      this.feeMdr.customerFee = 0;
    } else {
      this.feeMdr = this.objEdit;
    }
  }

  private loadListBank() {
    // this.ngxService.start(); // start loader
    this.bankService.filter({
      filter: this.searchTermB,
    })
      .subscribe(
        (res: HttpResponse<MdrBank[]>) => this.onSuccess(res.body, res.headers, 1),
        (res: HttpErrorResponse) => this.onError(res.message, 'Get List MDR Bank')
      );
  }

  private loadListToner() {
    // this.ngxService.start(); // start loader
    this.tonerService.filter({
      filter: this.searchTermT,
    })
      .subscribe(
        (res: HttpResponse<MdrTenor[]>) => this.onSuccess(res.body, res.headers, 2),
        (res: HttpErrorResponse) => this.onError(res.message, 'Get LIst Toner')
      );
  }

  private onSuccess(data, headers, code) {
    // this.ngxService.stop(); // start loader
    if (data.contents.length < 0) {
      return;
    }

    if (code == 1) {
      this.listBank = data.contents;
    } else {
      this.listTenor = data.contents;
    }
  }

  private onError(error, listName) {
    // this.ngxService.stop();
    console.log('error..', error, listName);
  }

  save(): void {
    this.ngxService.start();

    this.feeMdrService.save(this.feeMdr).subscribe(result => {
      this.isFormDirty = true;
      if (result.body.errCode === '00') {
        this.closeForm();
      } else {
        console.log('error');
        Swal.fire('Failed', result.body.errDesc, 'error').then(
        );
      }
      this.ngxService.stop();
    });
  }

  closeForm(): void {
    if (this.isFormDirty === true) {
      this.modalService.dismissAll('refresh');
    } else {
      this.modalService.dismissAll('close');
    }
  }

}
