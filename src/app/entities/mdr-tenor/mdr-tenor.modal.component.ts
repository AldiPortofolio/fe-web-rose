import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal from 'sweetalert2';
import { FormBuilder } from '@angular/forms';
import { MdrTenor } from './mdr-tenor.model';
import { MdrTenorService } from './mdr-tenor.service';

@Component({
    selector: 'mdr-tenor-modal',
    templateUrl: './mdr-tenor.modal.component.html',
    styleUrls: ['./mdr-tenor.component.css']
})
export class MdrTenorModalComponent implements OnInit {

    @Input() statusRec;
    @Input() objEdit: MdrTenor;
    @Input() viewMsg;

    mdrTenor: MdrTenor;

    isFormDirty: Boolean = false;

    constructor(
        private modalService: NgbModal,
        private ngxService: NgxUiLoaderService,
        private mdrTenorService: MdrTenorService,
        private fb: FormBuilder,
    ) { }

    ngOnInit() {
        if (this.statusRec === 'addnew') {
            this.mdrTenor = {};
            this.mdrTenor.tenorName = '';
            this.mdrTenor.tenorCode = '';
            this.mdrTenor.dokuTenorCode = '';
            this.mdrTenor.seq = 0;
        } else {
            this.mdrTenor = this.objEdit;
        }
        console.log(this.mdrTenor);
    }

    save(): void {
        this.ngxService.start();
        this.mdrTenor.status = 'y';
        console.log("mdr-tenor->", this.mdrTenor)
        this.mdrTenorService.save(this.mdrTenor).subscribe(result => {
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
