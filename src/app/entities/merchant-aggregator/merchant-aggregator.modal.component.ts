import { Component, OnInit, Input } from '@angular/core';
import { MerchantAggregator } from './merchant-aggregator.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MerchantAggregatorService } from './merchant-aggregator.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LookupService } from '../lookup/lookup.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { LookupDto } from '../lookup/lookup-dto.model';
import { LOOKUP_TIPE_MERCHANT, LOOKUP_MERCHANT_CATEGORY_CODE } from 'src/app/shared/constants/base-constant';
import { Mcc } from '../mcc/mcc.model';
import { MccService } from '../mcc/mcc.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'op-merchant-aggregator-modal',
  templateUrl: './merchant-aggregator.modal.component.html',
  styleUrls: ['./merchant-aggregator.modal.component.css']
})
export class MerchantAggregatorModalComponent implements OnInit {

    @Input() statusRec;
    @Input() objEdit: MerchantAggregator;
    @Input() viewMsg;

    merchantAggregator: MerchantAggregator;
    lookupTempl: LookupDto[];
    lookupTipeMerchant: LookupDto[] = [];
    lookupMerchantCriteria: LookupDto[] = [];
    listMcc: Mcc[] = [];



    isFormDirty: Boolean = false;


    constructor(private modalService: NgbModal,
                private ngxService: NgxUiLoaderService,
                private lookupService: LookupService,
                private mccService: MccService,
                private merchantAggregatorService: MerchantAggregatorService) { }

    ngOnInit() {
        if (this.statusRec === 'addnew') {
            this.merchantAggregator = {};
            this.merchantAggregator.merchantType = '';
            this.merchantAggregator.mcc = '';
            this.merchantAggregator.merchantCriteria = '';
            this.merchantAggregator.id = 0;
        } else {
            this.merchantAggregator = this.objEdit;
        }
        console.log(this.merchantAggregator);
        this.loadLookup();
        this.loadListMcc();

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
    private loadListMcc() {
        this.mccService.getAll().subscribe(
            (res: HttpResponse<Mcc[]>) => this.onSuccessMcc(res.body),
            (res: HttpErrorResponse) => this.onError(res.message),
            () => { console.log('finally'); }
        )
    }

    private onSuccessLookup({ data, headers }) {
        this.lookupTempl = data;

        this.breakLookup();
    }

    breakLookup() {
        this.lookupTempl.forEach(lookupdt => {
            if (lookupdt.lookupGroupString === LOOKUP_TIPE_MERCHANT) {
                this.lookupTipeMerchant.push(lookupdt);

            }
            if (lookupdt.lookupGroupString === LOOKUP_MERCHANT_CATEGORY_CODE) {
                this.lookupMerchantCriteria.push(lookupdt);
            }
        });
        console.log('finish breakLookup ');
        console.log('merchant type list--> ', this.lookupTipeMerchant);
        console.log('merchant lookupMerchantCriteria list--> ', this.lookupMerchantCriteria);
    }

    private onSuccessMcc(data) {
        this.listMcc = data;

        console.log("MCC", this.listMcc);
    }

    private onError(error) {
        console.log('error lookup..', error);
        this.ngxService.stop();
    }

    save(): void {
        this.ngxService.start();
        this.merchantAggregatorService.save(this.merchantAggregator).subscribe(result => {
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
