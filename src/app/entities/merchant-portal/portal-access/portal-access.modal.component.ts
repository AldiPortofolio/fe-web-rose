import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as _ from 'lodash';
import { PortalAccessService } from './portal-access.service';
import { PortalAccess } from './portal-access.model'

@Component({
    selector: 'op-portal-access-modal-component',
    styles: [],
    templateUrl: './portal-access.modal.component.html',
})

export class PortalAccessModalComponent implements OnInit {
    @Input() objData: PortalAccess;

    @ViewChild('instance') instance: NgbTypeahead;
    merchant: PortalAccess;
    submitted = false;

    listCategory = [
        {
            value: "MERCHANT",
            name: "Merchant"
        },
        {
            value: "GROUP",
            name: "Group"
        }
    ]


    constructor(public activeModal: NgbActiveModal,
        private ngxService: NgxUiLoaderService,
        private router: Router,
        public portalAccessService: PortalAccessService) { }

    ngOnInit(): void {
        this.merchant = this.objData;
        this.merchant.category = this.objData.portal_category;
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
        // this.merchant.category = "MERCHANT"
        // this.merchant.category = "GROUP"
        this.portalAccessService.sendEmail(this.merchant).subscribe(result => {
            console.log('Result==>', result);
            if (result.body.errCode === '00') {
                Swal.fire('Success', result.body.errDesc, 'success').then(
                    () => this.closeForm()
                );
            } else {
                Swal.fire('Failed', result.body.errDesc, 'error');
            }
        });

        this.ngxService.stop();

    }

    onBack() {
        this.router.navigate(['/main/portal-access']);
    }

}
