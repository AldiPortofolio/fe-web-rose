import { Component, OnInit, Input } from '@angular/core';
import { BankList } from './bank-list.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BankListService } from './bank-list.service';
import { FeatureImageModalComponent } from '../ottopay-4/feature/feature-image.modal.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'op-bank-list-modal',
  templateUrl: './bank-list.modal.component.html',
  styleUrls: ['./bank-list.modal.component.css']
})
export class BankListModalComponent implements OnInit {

    @Input() statusRec;
    @Input() objEdit: BankList;
    @Input() viewMsg;

    bankList: BankList;

    isFormDirty: Boolean = false;
    closeResult: string;

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

    constructor(private modalService: NgbModal,
        private ngxService: NgxUiLoaderService,
        private bankListService: BankListService
    ) {
    }

    ngOnInit() {
        if (this.statusRec === 'addnew') {
            this.bankList = {};
            this.bankList.id = 0;
            this.bankList.shortName = '';
            this.bankList.fullName = '';
            this.bankList.code = '';
            this.bankList.urlImage = '';
            this.bankList.status = 'y';
            this.bankList.seq = 0
        } else {
            this.bankList = this.objEdit;
        }

        console.log(this.bankList);
    }

    openGallery() {
        const modalRef = this.modalService.open(FeatureImageModalComponent, { size: 'lg' });
        modalRef.result.then((result) => {
            this.bankList.urlImage = result;
        }, (reason) => {
            console.log("close")
        });
    }

    save(): void {
        this.ngxService.start();

        this.bankListService.save(this.bankList).subscribe(result => {
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
