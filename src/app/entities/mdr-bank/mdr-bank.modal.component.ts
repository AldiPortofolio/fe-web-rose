import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal from 'sweetalert2';
import { FormBuilder } from '@angular/forms';
import { MdrBank } from './mdr-bank.model';
import { MdrBankService } from './mdr-bank.service';

@Component({
    selector: 'mdr-bank-modal',
    templateUrl: './mdr-bank.modal.component.html',
    styleUrls: ['./mdr-bank.component.css']
})
export class MdrBankModalComponent implements OnInit {

    @Input() statusRec;
    @Input() objEdit: MdrBank;
    @Input() viewMsg;

    mdrBank: MdrBank;

    isFormDirty: Boolean = false;

    listAcquiringStatus = [
        { code: "onus", name: "On Us" },
        { code: "offus", name: "Off Us" },
    ]

    constructor(
        private modalService: NgbModal,
        private ngxService: NgxUiLoaderService,
        private mdrBankService: MdrBankService,
        private fb: FormBuilder, 
    ) {}

    ngOnInit() {
        if (this.statusRec === 'addnew') {
            this.mdrBank = {};
            this.mdrBank.bankName = '';
            this.mdrBank.bankCode = '';
            this.mdrBank.dokuBankCode = '';
            this.mdrBank.seq = 0;
        } else {
            this.mdrBank = this.objEdit;
        }
        console.log(this.mdrBank);
    }

    save(): void {
        this.ngxService.start();
        this.mdrBank.status = 'y';
        console.log("mdr-bank->", this.mdrBank)
        this.mdrBankService.save(this.mdrBank).subscribe(result => {
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
