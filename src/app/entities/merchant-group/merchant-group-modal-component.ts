import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as _ from 'lodash';
import { PortalAccessService } from '../merchant-portal/portal-access/portal-access.service';
import { BusinessPortal } from '../merchant-portal/portal-access/portal-access.model'
import { MerchantGroup } from './merchant-group.model';
import { MerchantService } from '../merchant/merchant.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { MerchantDto } from '../merchant/merchant.model';

@Component({
    selector: 'op-merchant-group-modal-componenet',
    styles: [],
    templateUrl: './merchant-group-modal-component.html',
})

export class MerchantGroupModalComponent implements OnInit {
    @Input() objData: MerchantGroup;

    @ViewChild('instance') instance: NgbTypeahead;
    merchantGroup: MerchantGroup;
    // businessPortal: BusinessPortal
    submitted = false;
    businessPortal = {
        id: 0,
        category: 0,
        email: '',
        action: '',
    };

    merchantList: MerchantDto[]

    totalData = 0;

    merchantListId = []
    constructor(public activeModal: NgbActiveModal,
        private ngxService: NgxUiLoaderService,
        private router: Router,
        public  portalAccessService: PortalAccessService,
        private merchantService: MerchantService) { }

    ngOnInit(): void {
        this.merchantGroup = this.objData;
        console.log('Start call function all header');
        console.log("ini id group on init",this.objData)
        this.merchantService.listMerchantByGroup({
            filter: {
                merchantgroupId: this.objData.id,
                storeName: '',
                portalStatus: '',
                limit: 999,
                page: 0
            }
        })
            .subscribe(
                (res: HttpResponse<MerchantDto[]>) => this.onSuccessLoadMerchant(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message),
                () => { console.log('finally'); }
            );
    }

    private onError(error) {
        // stop loader
        this.ngxService.stop();

        console.log('error load Lookup..');
    }

    private onSuccessLoadMerchant(data, headers) {
        // stop loader
        this.ngxService.stop();

        if (data.contents.length < 0) {
            return;
        }
        this.merchantList = data.contents;
        for ( let i = 0 ; i < this.merchantList.length; i++ ) {
            this.merchantListId.push(this.merchantList[i].id)
        }
        console.log("ini list merchant group id",this.merchantListId)
        this.totalData = data.totalData;

    }

    

    closeForm(): void {
        this.activeModal.close('close');
    }

    email(): void {
        this.ngxService.start();
        this.submitted = true;

        let iter = true;
        this.businessPortal.id = this.merchantGroup.id
        this.businessPortal.category = 0
        this.businessPortal.email = this.merchantGroup.emailPortal
        this.businessPortal.action = 'activation'
        if (this.merchantGroup.emailPortal === '' || this.merchantGroup.emailPortal === '-') {
            iter = false;
            this.ngxService.stop();
            return;
        }

        if (iter = true) {
            this.send();
        }
    }

    send(): void {
        this.portalAccessService.activation(this.businessPortal).subscribe(result => {
            console.log('Result==>', result);
            if (result.body.errCode === '00') {
                this.merchantService.activasiMerchantByGroup({id:this.merchantListId})
        .subscribe(result => {
            console.log("ini result aktivasi",result)
        })
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
        this.router.navigate(['/main/merchantGroup/', this.merchantGroup.id]);
    }

}
