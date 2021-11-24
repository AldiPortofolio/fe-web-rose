import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as _ from 'lodash';
import { PortalAccessService } from '../merchant-portal/portal-access/portal-access.service';
import { BusinessPortal } from '../merchant-portal/portal-access/portal-access.model'
import { Merchant, MerchantDto } from './merchant.model';
import { MerchantOwner } from './merchant-owner.model';

@Component({
    selector: 'op-merchant-modal-componenet',
    styles: [],
    templateUrl: './merchant.modal.component.html',
})

export class MerchantModalComponent implements OnInit {
    @Input() objData: MerchantDto;

    @ViewChild('instance') instance: NgbTypeahead;
    merchant: MerchantDto;
    // businessPortal: BusinessPortal
    submitted = false;
    businessPortal = {
        id: 0,
        category: 0,
        email: '',
        action: '',
    };

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
        this.businessPortal.id = +this.merchant.id
        this.businessPortal.category = 1
        this.businessPortal.email = this.merchant.email
        this.businessPortal.action = 'activation'
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
        // this.portalAccessService.activation({id: +this.merchant.id, category:1, email: this.merchant.email, action:'activation'}).subscribe(result => {
        this.portalAccessService.activation(this.businessPortal).subscribe(result => {
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
        this.ngxService.stop();
        this.router.navigate(['/main/merchant']);
    }

}
