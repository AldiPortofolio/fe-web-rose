import { Component, OnInit, Input } from '@angular/core';
import { LoanProductMaintenance } from './loan-product-maintenance.model';
import { BankList } from '../bank-list/bank-list.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LoanProductMaintenanceService } from './loan-product-maintenance.service';
import { BankListService } from '../bank-list/bank-list.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'op-loan-product-maintenance-modal',
  templateUrl: './loan-product-maintenance.modal.component.html',
  styleUrls: ['./loan-product-maintenance.modal.component.css']
})
export class LoanProductMaintenanceModalComponent implements OnInit {

  @Input() statusRec;
  @Input() objEdit: LoanProductMaintenance;
  @Input() viewMsg;
  @Input() bankData;

  loanProduct: LoanProductMaintenance;
  listBank: BankList[] = [];

  isFormDirty: Boolean = false;

  statuses = [
    { code: "y", name: "active" },
    { code: "n", name: "inactive" },
  ];

  feeTypeList = [
    { code: "percentage", name: "Percentage" },
    { code: "amount", name: "Amount" },
  ];

  searchTermB = {
    page: 1,
    limit: 100000,
  }

  constructor(private modalService: NgbModal,
    private ngxService: NgxUiLoaderService,
    private loanProductMaintenanceService: LoanProductMaintenanceService,
    private bankService: BankListService) {
  }


  ngOnInit() {
    this.listBank = this.bankData;

    if (this.statusRec === 'addnew') {
      this.loanProduct = {};
      this.loanProduct.id = 0;
      this.loanProduct.bankCode = '';
      this.loanProduct.bankName = '';
      this.loanProduct.loanProductCode = '';
      this.loanProduct.loanProductName = '';
      this.loanProduct.status = 'y';
      this.loanProduct.adminFeeType='';
      this.loanProduct.adminFeeValue = 0;

    } else {
      this.loanProduct = this.objEdit;
    }
  }

  save(): void {
    this.ngxService.start();

    this.loanProductMaintenanceService.save(this.loanProduct).subscribe(result => {
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
