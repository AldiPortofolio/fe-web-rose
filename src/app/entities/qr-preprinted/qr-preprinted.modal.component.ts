import { Component, OnInit, Input } from '@angular/core';
import { QrPreprintedReq, QrPreprinted } from './qr-preprinted.model';
import { Provinsi } from '../provinsi/provinsi.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { QrPreprintedService } from './qr-preprinted.service';
import { Dati2 } from '../dati2/dati2.model';
import { Dati2Service } from '../dati2/dati2.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Mcc } from '../mcc/mcc.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'op-qr-preprinted-modal',
  templateUrl: './qr-preprinted.modal.component.html',
  styleUrls: ['./qr-preprinted.modal.component.css']
})
export class QrPreprintedModalComponent implements OnInit {

    @Input() listProvince: Provinsi[];
    @Input() listMcc: Mcc[];


    listCity: Dati2[] = [];

    provinceSelected: number = 0;
    citySelected = '-';
    mccSeletected ='-';

    submitted = false;



    constructor(private modalService: NgbModal,
        private ngxService: NgxUiLoaderService,
        private dati2Service: Dati2Service,
        private qrPreprintedService: QrPreprintedService) {
    }

    qrPreprinted: QrPreprintedReq;

    isFormDirty: Boolean = false;

    ngOnInit() {
        console.log('masukkk');
        this.qrPreprinted = new QrPreprintedReq;
        console.log(this.listProvince);
        console.log(this.listMcc);
    }

    onFilterCity(id) {
        this.citySelected = '-';

        this.loadListCity(id);
    }

    private loadListCity(id) {
        this.ngxService.start();
        this.dati2Service.getByProvinsiId(id)
            .subscribe(
                (res: HttpResponse<Dati2[]>) => this.onSuccessFilterCity(res.body),
                (res: HttpErrorResponse) => this.onErrCity(res.message),
                () => { this.ngxService.stop(); console.log('Finally Dati2'); }
            );
    }

    private onSuccessFilterCity(data) {
        this.listCity = data;
        this.ngxService.stop();
    }

    private onErrCity(error) {
        console.log('Error load City ', error);
        this.ngxService.stop();
    }

    validate() {
        this.submitted = true;
        console.log('validate');
        this.ngxService.start();
        this.qrPreprinted.city = this.citySelected;
        // this.qrPreprinted.mcc = this.mccSeletected;
        console.log(this.qrPreprinted);
        if (!this.provinceSelected || this.provinceSelected == 0) {
            this.ngxService.stop();
            Swal.fire('Error', 'Province cannot be null', 'error');
            return;
        }
        if(!this.qrPreprinted.city || this.qrPreprinted.city == '-') {
            this.ngxService.stop();
            Swal.fire('Error', 'City cannot be null', 'error');
            return;
        }
        if (!this.qrPreprinted.postalCode || this.qrPreprinted.mcc == '') {
            this.ngxService.stop();
            Swal.fire('Error', 'Postal Code cannot be null', 'error');
            return;
        }
        if (!this.qrPreprinted.mcc || this.qrPreprinted.mcc == '-') {
            this.ngxService.stop();
            Swal.fire('Error', 'Mcc cannot be null', 'error');
            return;
        }
        if (!this.qrPreprinted.totalReq || this.qrPreprinted.totalReq == 0) {
            this.ngxService.stop();
            Swal.fire('Error', 'Total Req cannot be null', 'error');
            return;
        }
       
        this.onConfirm();

    }

    closeForm(): void {
        if (this.isFormDirty === true) {
            this.modalService.dismissAll('refresh');

        } else {
            this.modalService.dismissAll('close');
        }
    }

    onConfirm() {

        this.qrPreprintedService.send(this.qrPreprinted).subscribe(
            (res: HttpResponse<QrPreprinted>) => this.onSuccessConfirm(res.body),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    onSuccessConfirm(res) {
        console.log(res)
        if (res.errCode === '00') {
            this.ngxService.stop();
            Swal.fire('Success', 'Success add/edit Merchant', 'success').then(
                result => this.closeForm()
            );
            return
        }
        Swal.fire('Failed', res.errDesc, 'error').then(
            // result => this.onBack()
        );
        this.ngxService.stop();
    }

    private onError(error) {
        console.log('error save..', error);
        this.ngxService.stop();
    }
}
