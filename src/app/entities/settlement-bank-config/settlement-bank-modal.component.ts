import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BankList } from '../bank-list/bank-list.model';
import { BankListService } from '../bank-list/bank-list.service';
import { SettlementBankConfigService } from './settlement-bank-config.service';
import { SettlementType } from './settlement-type.model';
import Swal from 'sweetalert2';
import { LookupGroupService } from '../lookup-group/lookup-group.service';
import { Lookup } from '../lookup/lookup.model';


@Component({
  selector: 'op-settlement-bank-modal',
  templateUrl: './settlement-bank-modal.component.html',
  styleUrls: ['./settlement-bank-modal.component.css']
})
export class SettlementBankModalComponent implements OnInit {

  settlementType = {
    bankCode : "",
    settlementType : "",
    status : ""
  } ;
  bankList: BankList[] ;
  lookupType = [
    {
      val: 'AJ',
      descr: 'AJ'
    },
    {
      val: 'BCA',
      descr: 'BCA'
    },
    {
      val: 'MANDIRI',
      descr: 'MANDIRI'
    },
    {
      val: 'BINA_OC',
      descr: 'BINA_OC'
    }
  ] 
  statusList = [
    {
      status: "- Pilih Status -",
      val: ""
    },
    {
      status: "Active",
      val: "Active"
    },
    {
      status: "Non Active",
      val: "Non Active"
    },
  ]
  isFormDirty: Boolean = false;
  closeResult: string;
  constructor(private modalService: NgbModal,
    private ngxService: NgxUiLoaderService,
    private settlementBankConfigService: SettlementBankConfigService,
    private bankListService: BankListService,
    private lookupGroupService: LookupGroupService,) { }

  ngOnInit() {
    setTimeout(() => {
      this.loadAll();
      // this.lookup();
    });
  }

  loadAll() {
    this.ngxService.start(); // start loader

    this.bankListService.filter({
        filter: {code: '',
        fullName: '',
        shortName: '',
        page: 1,
        limit: 999}
      
    })
      .subscribe(
        (res: HttpResponse<BankList[]>) => this.onSuccess(res.body, res.headers),
        (res: HttpErrorResponse) => this.onError(res.message)
      );


    
  }

  lookup() {
    this.ngxService.start(); // start loader
    this.settlementBankConfigService.lookup({  
      lookupGroup: "SETTLEMENT_TYPE",
      limit: 999,
    	page: 1
    })
      .subscribe(
        (res: HttpResponse<Lookup[]>) => this.onSuccessLookup(res.body, res.headers),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  private onSuccess(data, headers) {
    this.ngxService.stop();
    if (data.contents.length < 0) {
      return;
    }
    console.log(data);
    this.bankList = data.contents;
  }

  private onSuccessLookup(data, headers) {
    this.ngxService.stop();
    if (data.contents.length < 0) {
      return;
    }
    console.log(data);
    this.lookup = data.contents;
  }

  private onError(error) {
    this.ngxService.stop();
    console.log('error..', error);
  }

  closeForm(): void {
    if (this.isFormDirty === true) {
      this.modalService.dismissAll('refresh');
    } else {
      this.modalService.dismissAll('close');
    }
  }

  save(): void {
    this.ngxService.start();

    this.settlementBankConfigService.save(this.settlementType).subscribe(result => {
      this.isFormDirty = true;
      if (result.body.errCode === '00') {
        Swal.fire('Success', result.body.errDesc, 'success').then(() => this.closeForm());
      } else {
        console.log('error');
        Swal.fire('Failed', result.body.errDesc, 'error').then(
        );
      }
      this.ngxService.stop();
    });
  }

}
