import { Component, OnInit, Input } from '@angular/core';
import { UpdatedDataMerchant } from './updated-data-merchant.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UpdatedDataMerchantService } from './updated-data-merchant.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'op-updated-data-merchant-modal',
  templateUrl: './updated-data-merchant.modal.component.html',
  styleUrls: ['./updated-data-merchant.modal.component.css']
})
export class UpdatedDataMerchantModalComponent implements OnInit {

    @Input() statusRec;
    @Input() objEdit: UpdatedDataMerchant;
    @Input() viewMsg;

    
    updatedDataMerchant: UpdatedDataMerchant;

    isFormDirty: Boolean = false;
    closeResult: string;

    constructor(private modalService: NgbModal,
        private ngxService: NgxUiLoaderService,
        private updatedDataMerchantService: UpdatedDataMerchantService
    ) {
    }

    ngOnInit() {
        this.updatedDataMerchant = this.objEdit;
        console.log(this.updatedDataMerchant);
    }

    closeForm(): void {
        if (this.isFormDirty === true) {
            this.modalService.dismissAll('refresh');
        } else {
            this.modalService.dismissAll('close');
        }
    }

    save():void{
        console.log(this.updatedDataMerchant.id);
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to approve this merchant?',
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Approve   !'
        }).then((result) => {
            console.log("result ->", result);
            if (result.value) {
                this.ngxService.start();
                this.updatedDataMerchantService.approve(this.updatedDataMerchant).subscribe((result) => {
                    const code = result.body.errCode.toString()
                    this.ngxService.stop();
                    if (code == '00') {
                        Swal.fire('Success', "Data has been approved", 'success').then(
                            () => this.closeForm()
                            // () => this.modalService.dismissAll('tutup save')
                        );
                    } else {
                        Swal.fire('Failed', result.body.errDesc, 'error').then(
                            // () => this.loadAll()
                        );

                    }
                });
            } else {
                // this.loadAll();
            }
        });
    }

    reject(): void {
        console.log(this.updatedDataMerchant.id);
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to reject this merchant?',
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Reject   !'
        }).then((result) => {
            console.log("result ->", result);
            if (result.value) {
                this.ngxService.start();
                this.updatedDataMerchantService.reject(this.updatedDataMerchant).subscribe((result) => {
                    const code = result.body.errCode.toString()
                    this.ngxService.stop();
                    if (code == '00') {
                        Swal.fire('Success', "Data has been rejected", 'success').then(
                            () => this.closeForm()
                            // () => this.modalService.dismissAll('tutup save')
                        );
                    } else {
                        Swal.fire('Failed', result.body.errDesc, 'error').then(
                            // () => this.loadAll()
                        );

                    }
                });
            } else {
                // this.loadAll();
            }
        });
    }

}
