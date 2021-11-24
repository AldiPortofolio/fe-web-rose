import { Component, OnInit, Input } from '@angular/core';
import { SubMerchantBankLoan } from './sub-merchant-bank-loan.model';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MerchantBankLoanService } from './merchant-bank-loan.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'op-sub-merchant-bank-loan',
  templateUrl: './sub-merchant-bank-loan.component.html',
  styleUrls: ['./sub-merchant-bank-loan.component.css']
})
export class SubMerchantBankLoanComponent implements OnInit {

  @Input() statusRec;
  @Input() masterBankLoanId;

  listSubLoan: SubMerchantBankLoan[] = [];

  searchTerm = {
    masterBankLoanId: '',
  }

  isFormDirty: Boolean = false;

  constructor(
    private ngxService: NgxUiLoaderService,
    private modalService: NgbModal,
    private merchantBankLoanService: MerchantBankLoanService,
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData(){
    // this.ngxService.start(); // start loader
    this.searchTerm.masterBankLoanId = this.masterBankLoanId;

    this.merchantBankLoanService.findSub({
      filter : this.searchTerm,
    })
      .subscribe(
        (res: HttpResponse<SubMerchantBankLoan[]>) => this.onSuccess(res.body, res.headers),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    
  }

  private onSuccess(data, headers) {
    // this.ngxService.stop();
    if (data.contents.length < 0) {
      return;
    }
    console.log(data);
    this.listSubLoan = data.contents;
    console.log(this.listSubLoan)
  }

  private onError(error) {
    // this.ngxService.stop();
    console.log('error..', error);
  }

  closeForm(): void {
    if (this.isFormDirty === true) {
      this.modalService.dismissAll('refresh');
    } else {
      this.modalService.dismissAll('close');
    }
  }
}
