import { Component, OnInit, Input } from '@angular/core';
import { MdrAggregator } from './mdr-aggregator-model';
import { MdrAggregatorApproval } from '../mdr-aggregator-approval/mdr-aggregator-approval-model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MdrAggregatorService } from './mdr-aggregator.service';
import { FormBuilder } from '@angular/forms';
import { MerchantService } from '../merchant/merchant.service';
import { MerchantAggregatorService } from '../merchant-aggregator/merchant-aggregator.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { MerchantAggregator } from '../merchant-aggregator/merchant-aggregator.model';
import { LookupDto } from '../lookup/lookup-dto.model';
import { LookupService } from '../lookup/lookup.service';
import { LOOKUP_MERCHANT_CATEGORY_CODE } from 'src/app/shared/constants/base-constant';
import { MerchantAggregatorDetail } from '../merchant-aggregator/merchant-aggregator-detail/merchant-aggregator-detail.model';
import { MerchantAggregatorDetailService } from '../merchant-aggregator/merchant-aggregator-detail/merchant-aggregator-detail.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'op-mdr-aggregator-modal',
  templateUrl: './mdr-aggregator.modal.component.html',
  styleUrls: ['./mdr-aggregator.modal.component.css']
})
export class MdrAggregatorModalComponent implements OnInit {

    @Input() statusRec;
    @Input() objEdit: MdrAggregator;
    @Input() viewMsg;
    @Input() merchantAggregatorList: MerchantAggregator[];

    mdrAggregator: MdrAggregator;
    mdrAggregatorTemp: MdrAggregatorApproval;
    lookupMerchantCriteria: LookupDto[] = [];
    lookupTempl: LookupDto[];

    merchantAggregatorDetailList: MerchantAggregatorDetail[];

    midPartnerSelected: string;
    // magSelected: MerchantAggregator;

    searchTerm = {
        midAggregator: '',
        page: 1,
        limit: 99999999,
    }

    listTransType = ['on_us', 'off_us'];


    isFormDirty: Boolean = false;

    constructor(private modalService: NgbModal,
        private ngxService: NgxUiLoaderService,
        private lookupService: LookupService,
        private merchantAggregatorService: MerchantAggregatorService,
        private merchantAggregatorDetailService: MerchantAggregatorDetailService,
        private mdrAggregatorService: MdrAggregatorService) {
    }

    ngOnInit() {
        if (this.statusRec === 'addnew') {
            this.mdrAggregator = {};
            this.mdrAggregator.id = 0;
            this.mdrAggregator.groupPartner = '';
            this.mdrAggregator.merchantCategory = '';
            this.mdrAggregator.transactionType = '';
            this.mdrAggregator.mdrType = '0';
            this.mdrAggregator.mdr = 0;
            this.mdrAggregator.notes = '';
            this.mdrAggregator.midPartner = '';
            this.mdrAggregator.midMerchant = '';
            // this.magSelected = new MerchantAggregator;
        } else {
            this.mdrAggregator = this.objEdit;
        }
        this.mdrAggregatorTemp = {}
        console.log(this.mdrAggregator);
        this.breakMag();
        this.loadLookup();

    }

    findMagDetail() {
        this.merchantAggregatorDetailService.filter({
            filter: this.searchTerm,
        })
            .subscribe(
                (res: HttpResponse<MerchantAggregatorDetail[]>) => this.onSuccessListMerchant(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    private onSuccessListMerchant(data, headers) {
        if (data.contents.length < 0) {
            return;
        }
        console.log(data);
        this.merchantAggregatorDetailList = data.contents;
    }

    loadLookup() {
        console.log('Start call lookup');
        this.lookupService.findForMerchantGroup()
            .subscribe(
                (res: HttpResponse<LookupDto[]>) => this.onSuccessLookup({ data: res.body, headers: res.headers }),
                (res: HttpErrorResponse) => this.onError(res.message),
                () => { this.ngxService.stop(); console.log('finally'); }
            );
    }

    private onSuccessLookup({ data, headers }) {
        this.lookupTempl = data;

        this.breakLookup();
    }

    breakLookup() {
        this.lookupTempl.forEach(lookupdt => {
            if (lookupdt.lookupGroupString === LOOKUP_MERCHANT_CATEGORY_CODE) {
                this.lookupMerchantCriteria.push(lookupdt);
            }
        });
        console.log('finish breakLookup ');
        console.log('merchant lookupMerchantCriteria list--> ', this.lookupMerchantCriteria);
    }

    onChangeGroupPartner(ev){
        this.mdrAggregator.midMerchant = '';
        this.breakMag();
        
    }

    breakMag(){
        this.merchantAggregatorList.forEach(e => {
            if (e.name === this.mdrAggregator.groupPartner) {
                // this.magSelected = e;
                this.midPartnerSelected = e.mid;
                this.searchTerm.midAggregator = e.mid;
                this.findMagDetail();
            }
        });
    }

    onError(msg){
        console.log(msg);
    }

    closeForm(): void {
        if (this.isFormDirty === true) {
            this.modalService.dismissAll('refresh');

        } else {
            this.modalService.dismissAll('close');

        }
    }

    save(): void {
        this.ngxService.start();
        this.mdrAggregatorTemp = this.mdrAggregator;
        if (this.mdrAggregator.id === 0) {
            this.mdrAggregatorTemp.actionType = 0;
            this.mdrAggregatorTemp.mdrAggregatorId = 0;
            this.mdrAggregatorTemp.status = 1
        } else {
            this.mdrAggregatorTemp.actionType = 1;
            this.mdrAggregatorTemp.mdrAggregatorId = this.mdrAggregator.id
            this.mdrAggregatorTemp.status = 1;
        }
        console.log('data temp: ', this.mdrAggregatorTemp);
        this.mdrAggregatorService.save(this.mdrAggregatorTemp).subscribe(result => {
            this.isFormDirty = true;
            if (result.body.errCode === '00') {
                Swal.fire('Success', "Create mdr success", 'success').then(
                    () => this.closeForm()
                );
                this.closeForm();

            } else {
                console.log('error');
                Swal.fire('Failed', result.body.errDesc, 'error').then(
                );
            }
            this.ngxService.stop();
        });
    }

}
