import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as _ from 'lodash';
import { OutletActivation } from './outlet-activation.model';
import { PortalAccessService } from '../portal-access/portal-access.service';

@Component({
    selector: 'op-outlet-activation-modal-component',
    styles: [],
    templateUrl: './outlet-activation.modal.component.html',
})

export class OutletActivationModalComponent implements OnInit {
    @Input() objData: OutletActivation;

    @ViewChild('instance') instance: NgbTypeahead;
    merchant: OutletActivation;
    submitted = false;

    constructor(public activeModal: NgbActiveModal,
        private ngxService: NgxUiLoaderService,
        private router: Router,
        public portalAccessService: PortalAccessService) { }

    ngOnInit(): void {
        this.merchant = this.objData;
    }

    closeForm(): void {
        this.activeModal.close('close');
    }

    email(): void {
        this.ngxService.start();
        this.submitted = true;

        let iter = true;
        this.merchant.action = 'activation'
        if (this.merchant.email === '' || this.merchant.email === '-') {
            iter = false;
            this.ngxService.stop();
            return;
        }

        if (iter = true) {
            this.send();
        }
    }

    send(): void {
        this.merchant.category = "OUTLET";
        this.portalAccessService.sendEmail(this.merchant).subscribe(result => {
            console.log('Result==>', result);
            if (result.body.errCode === '00') {
                Swal.fire('Success', result.body.errDesc, 'success').then(
                    result => this.onBack()
                );
            } else {
                Swal.fire('Failed', result.body.errDesc, 'error');
            }
        });

        this.ngxService.stop();

    }

    onBack() {
        this.router.navigate(['/main/outlet-activation']);
    }

}
