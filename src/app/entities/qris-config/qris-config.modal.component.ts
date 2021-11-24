import { Component, OnInit, Input } from '@angular/core';
import { QrisConfig } from './qris-config.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { QrisConfigService } from './qris-config.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'op-qris-config-modal',
  templateUrl: './qris-config.modal.component.html',
  styleUrls: ['./qris-config.modal.component.css']
})
export class QrisConfigModalComponent implements OnInit {

    @Input() statusRec;
    @Input() objEdit: QrisConfig;
    @Input() viewMsg;

    qrisConfig: QrisConfig;

    isFormDirty: Boolean = false;

    transactionTypeList = [
        {
            name: 'On Us',
            val: 'on_us'
        },
        {
            name: 'Off Us',
            val: 'off_us'
        },
    ]

    statusList = [
        {
            name: 'Aktif',
            val: '1'
        },
        {
            name: 'Tidak Aktif',
            val: '0'
        },
    ]

    statusSelected = '1';


    constructor(private modalService: NgbModal,
        private ngxService: NgxUiLoaderService,
        private qrisConfigService: QrisConfigService) {
    }

    ngOnInit() {
        if (this.statusRec === 'addnew') {
            this.qrisConfig = {};
            this.qrisConfig.issuerName = '';
            this.qrisConfig.institutionId = '';
            this.qrisConfig.transactionType = '';
            this.qrisConfig.status = 1;
            this.qrisConfig.id = 0;
        } else {
            this.qrisConfig = this.objEdit;
        }
    }

    save(): void {
        this.ngxService.start();
        console.log(this.statusSelected);
        console.log(this.qrisConfig);
        this.qrisConfig.status = parseInt(this.statusSelected);
        this.qrisConfigService.save(this.qrisConfig).subscribe(result => {
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
