import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LookupDto } from '../lookup/lookup-dto.model';
import * as _ from 'lodash';
import { MerchantOutlet } from './merchant-outlet.model';
import { GenerateQrService } from './generate-qr.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
// import { runInThisContext } from 'vm';

@Component({
  selector: 'op-merchant-detail-outlet-modal',
  templateUrl: './merchant-detail-outlet-modal.component.html',
  styleUrls: ['./merchant-detail-outlet-modal.component.css']
})
export class MerchantDetailOutletModalComponent implements OnInit {
    @Input() outlet: MerchantOutlet;
    @Input() lookupDeviceType: LookupDto[];
    @Input() lookupDeviceGroup;
    @Input() lookupDeviceBrand;
    @Input() lookupHostType;
    @Input() statusRec;
    @Input() enableSave: Boolean = true;
    @Input() merchantId;
    @Input() approvalStatus;
    @Input() mid;

    metodePembayaran = {
        QR: false,
        EMV: false,
        NFC: false,
    };

    qrData: string;

    deviceTypeSelected: LookupDto;
    hostTypeSelected: LookupDto;
    readOnly: string;

    // customSwitch = true;

    submitted = false;
    validate1 = false;

    searchTerm = {
        mid: '',
        tid: '',
    }

    constructor(
        private modalService: NgbModal,
        private activeModal: NgbActiveModal,
        private ngxService: NgxUiLoaderService,
        private generateQrService:GenerateQrService,
    ) { }

    ngOnInit() {
        // this.customSwitch = false;
        // this.metodePembayaran = JSON.parse(this.outlet.metodePembayaran);
        console.log(this.metodePembayaran);
        console.log('host type ----> ', this.lookupHostType);
        console.log('approvalStatus ----> ', this.approvalStatus);
        // if (this.outlet.id === 0 ) {
            // this.outlet.metodePembayaran = '0000';
            // this.defaultTypePembayaran(true);
            // return ;
        // }
        // this.setJenisUsahaSelected(this.outlet.deviceType);

        if (this.approvalStatus == 1) {

            this.readOnly = 'true';
        }
        
        this.defaultTypePembayaran();

    }

    generateQr(tid) {
        this.ngxService.start(); // start loader

        this.searchTerm.mid = this.mid;
        this.searchTerm.tid = tid;
        this.generateQrService.generate({
            filter: this.searchTerm,
        })
        .subscribe(
            (res: HttpResponse<any[]>) => this.onSuccessGenerateQr(res.body, res.headers),
            (res: HttpErrorResponse) => this.onErrorGenerateQr(res.message, 'Get qr') 
        )
    }

    private onSuccessGenerateQr(data, headers) {
        this.ngxService.stop(); // start loader
        if (data.errCode != "00") {
            Swal.fire('Failed', data.errDesc, 'error');
            return;
        }
        this.outlet.qrData = data.contents;
        Swal.fire('Success', data.contents, 'success');
        return
        
    }

    private onErrorGenerateQr(error, listName) {
        this.ngxService.stop();
        console.log('error..', error, listName);
    }

    defaultTypePembayaran() {

        this.metodePembayaran.QR = false;
        this.metodePembayaran.EMV = false;
        this.metodePembayaran.NFC = false;

        console.log('method pembayaran =>', this.outlet.metodePembayaran);
        console.log('Outlet =>', this.outlet);
        if (this.outlet.metodePembayaran.length >= 1) {
            console.log('qr =>', this.outlet.metodePembayaran.substr(0, 1));
            if (this.outlet.metodePembayaran.substr(0, 1) === '1') {
                this.metodePembayaran.QR = true;
            }
        }

        if (this.outlet.metodePembayaran.length >= 2) {
            console.log('emv =>', this.outlet.metodePembayaran.substr(1, 1));
            if (this.outlet.metodePembayaran.substr(1, 1) === '1') {
                this.metodePembayaran.EMV = true;
            }
        }

        if (this.outlet.metodePembayaran.length >= 3) {
            console.log('nfc =>', this.outlet.metodePembayaran.substr(2, 1));
            if (this.outlet.metodePembayaran.substr(2, 1) === '1') {
                this.metodePembayaran.NFC = true;
            }
        }

    }

    validate(): void {
        this.submitted = true;
        // this.validate1 = this.metodePembayaran.EMV;
        // this.outlet.merchantOutletSign = '-';
        let iter = 0;
        _.forOwn(this.outlet, function (value, key) {
            console.log("KEY===>>",key);
            if (key === 'merchantName'  ||
                key === 'terminalPhoneNumber' || key === 'terminalProvider' ||
                key === 'terminalSerialNo'
            ) {
                // console.log('test 1 ', value);
                if (value === '' || value === null || value === undefined) {
                    iter++;
                }
            }
        });

        if (this.metodePembayaran.EMV == true) {
            _.forOwn(this.outlet, function (value, key) {
                if ( key === 'mid' || key === 'tid') {
                    if (value === '' || value === null || value === undefined) {
                        iter++;
                    }
                }
            });
        }

        console.log('iter : ', iter);
        if (iter > 0) {
            return;
        }

        this.onConfirm();
    }

    onConfirm() {
        let paymentMethod ;
        if (this.metodePembayaran.QR === true) {
            paymentMethod = '1';
        } else {
            paymentMethod = '0';
        }
        if (this.metodePembayaran.EMV === true) {
            paymentMethod = paymentMethod  + '1';
        } else {
            paymentMethod = paymentMethod  + '0';
        }
        if (this.metodePembayaran.NFC === true) {
            paymentMethod = paymentMethod  + '1';
        } else {
            paymentMethod = paymentMethod  + '0';
        }
        this.outlet.metodePembayaran = paymentMethod;
        console.log('on confirm =>', this.outlet);
        this.activeModal.close(this.outlet);
    }

    closeForm() {
        this.modalService.dismissAll('refresh');
    }

    onNFCchecked(nfc) {
        if (nfc == true) {
            this.metodePembayaran.QR = false;
            this.metodePembayaran.EMV = false;
        }
    }

    onNFCchecked1(qremv) {
        this.outlet.terminalLabel = this.merchantId + this.outlet.terminalId;
        if (qremv == true) {
            this.metodePembayaran.NFC = false;
        }
    }

    onChangeTerminalId(terminalId) {
        this.outlet.terminalLabel = this.merchantId + terminalId;
    }

    // setJenisUsahaSelected(name) {
    //     // tslint:disable-next-line:triple-equals
    //     const result = _.find(this.lookupDeviceType, (lookup) => lookup.name == name);
    //     console.log('hasil lodash jenis usaha -> ', result);
    //     this.deviceTypeSelected = result;
    // }
}
