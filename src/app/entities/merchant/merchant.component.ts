import { Component, OnInit } from '@angular/core';
import { MerchantService } from './merchant.service';
import { TOTAL_RECORD_PER_PAGE } from 'src/app/shared/constants/base-constant';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Merchant, MerchantDto, ResponseDto } from './merchant.model';
import { Router } from '@angular/router';
import { LookupService } from '../lookup/lookup.service';
import { LookupDto } from '../lookup/lookup-dto.model';
import { MerchantGroupService } from '../merchant-group/merchant-group.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MerchantGroup } from '../merchant-group/merchant-group.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MerchantModalComponent } from './merchant.modal.component';
import Swal from 'sweetalert2';
import { PortalAccessService } from '../merchant-portal/portal-access/portal-access.service';

@Component({
  selector: 'op-merchant',
  templateUrl: './merchant.component.html',
  styleUrls: ['./merchant.component.css']
})
export class MerchantComponent implements OnInit {

    filterAction = [
        { code: '1', name: 'Active' },
        { code: '0', name: 'Inactive' },
    ];

    filterTipeMerchant = [
        { code: 'UMKM', name: 'UMKM' },
        { code: 'Modern', name: 'Modern' },
        { code: 'eCommerce', name: 'eCommerce' },
    ];
    idMerchant = 0

    searchTerm = {
        name: '',
        portalStatus: '',
        tipeMerchant:'',
    };

    resetPassword = {
        email: '',
    }

    merchant: MerchantDto;

    constructor(private merchantService: MerchantService,
            private router: Router,
            private lookupService: LookupService,
            private merchantGroupService: MerchantGroupService,
            private ngxService: NgxUiLoaderService,
            private modalService: NgbModal,
            private portalService: PortalAccessService,) { }


    totalRecord = TOTAL_RECORD_PER_PAGE;
    curPage = 1;
    merchantList: MerchantDto[];
    totalData = 0;
    statusDisabled = false;


    ngOnInit() {
        // this.loadAll(this.curPage);
        this.dashboard();
    }

    loadAll(page) {
        // start loader
        this.ngxService.start();

        this.searchTerm.name = this.searchTerm.name.replace(/^0+/, '')

        console.log('search phone ==>', this.searchTerm.name)

        this.merchantService.filterDashboard({
            filter: this.searchTerm,
            page: page,
            count: this.totalRecord
        }).subscribe(
            (res: HttpResponse<MerchantDto[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
        );

    }

    // add new merchant and direct to merchant/detail
    addNew() {
        this.merchantService.sendData(0);
        this.router.navigate(['/main/merchant/detail']);
    }

    private onSuccess(data, headers) {
        // stop loader
        this.ngxService.stop();

        if (data.content.length < 0) {
            return;
        }
        console.log(data)
        this.merchantList = data.content;
        this.totalData = data.totalElements;
    }

    private onError(error) {
        // stop loader
        this.ngxService.stop();
        console.log('error..');
    }


    openDetail(idMerchant) {
        this.merchantService.sendData(idMerchant);
        this.router.navigate(['main/merchant/detail']);
    }

    onFilter() {
        this.loadAll(this.curPage);
    }

    loadPage() {
        // this.loadAll(this.curPage);
        this.dashboard()
        console.log(this.curPage);
    }

    openActivation(merchant) {

        // if (this.idMerchant !== 0) {
        //     // console.log(this.merchant);
        //     this.find(this.idMerchant);
        // }

        const modalRef = this.modalService.open(MerchantModalComponent, { size: 'lg' });
        modalRef.componentInstance.objData = merchant;

        modalRef.result.then((result) => {
            this.curPage = 1;
            // this.loadAll(this.curPage);
            this.dashboard()
        }, (reason) => {
            this.curPage = 1;
            // this.loadAll(this.curPage);
            this.dashboard()
        });
    }

    // find(id) {
    //     this.merchantService.find(id)
    //         .subscribe(
    //             (res: HttpResponse<Merchant>) => this.onSuccessFind(res.body),
    //             (res: HttpErrorResponse) => this.onError(res.message)
    //         );
    // }

    // // fill data merchant after load
    // onSuccessFind(merchant) {
    //     console.log(merchant);
    //     this.merchant = merchant;
    //     // this.loadImageMerchant(merchant);
    //     // this.loadMerchantOutlet(0);

    //     // convert all string date to date
    //     // this.convertToDate();
    // }

    deactivate(merchant) {
        this.ngxService.start();
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to deactivate this merchant?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Deactivate!'
        }).then((result) => {
            if (result.value) {
                this.portalService.deactivate({ value: merchant.id.toString() }).subscribe((result) => {
                    const code = result.body.code.toString()
                    this.ngxService.stop();
                    if (code == '00') {
                        Swal.fire('Success', "Deactivation merchant success", 'success').then(
                            () => this.onBack()
                        );
                    } else {
                        Swal.fire('Failed', result.body.msg, 'error').then(
                            () => this.onBack()
                        );

                    }
                });
            } else {
                this.onBack()
            }
        });

        this.ngxService.stop();
    }

    onBack() {
        // this.route.
        this.ngxService.stop();
        this.router.navigate(['/main/merchant']);
    }

    reset(merchant) {
        this.ngxService.start();
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to reset password ?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Reset!'
        }).then((result) => {
            if (result.value) {
                // merchant_data.action = "reset password"
                this.resetPassword.email = this.merchant.email
                this.portalService.resetPasswordBp(this.resetPassword).subscribe((result) => {
                    this.ngxService.stop();
                    if (result.body.errCode == '00') {
                        Swal.fire('Success', 'Your password has been reset. Check your email for new password!', 'success').then(
                            () => this.onBack()
                        );
                    } else if (result.body.errCode == '05') {
                        Swal.fire('Failed', 'Invalid email address' + ' "' + this.merchant.email + '"', 'error').then(
                            () => this.onBack()
                        );
                    } else {
                        Swal.fire('Failed', result.body.errDesc, 'error').then(
                            () => this.onBack()
                        );
                    }
                });
            } else {
                // this.onBack()
            }
        });

        this.ngxService.stop();

    }

    export() {

        if ( this.searchTerm.name == '' && this.searchTerm.portalStatus == '' && this.searchTerm.tipeMerchant== '' ) {
            Swal.fire('Warning', "Please select filter", "warning").then(
                () => this.router.navigate(['/main/merchant'])
            );
        } else {
            this.merchantService.export(this.searchTerm).subscribe( result => {
                console.log("ini result body", result)

                if ( result.body.errCode == "00") {
                    this.ngxService.stop();
                    Swal.fire('Success', 'Successfully export data merchant', 'success').then(
                        () => this.router.navigate(['/main/report-export-merchant'])
                    );
                } else {
                    this.ngxService.stop();
                    Swal.fire('Failed', result.body.errDesc, 'error').then(
                        () => this.onBack()
                    );
                }
            })

        }

    }

    dashboard() {
        this.ngxService.start();

        this.searchTerm.name = this.searchTerm.name.replace(/^0+/, '')

        console.log('search phone ==>', this.searchTerm.name)

        this.merchantService.dataDashboard({
            name: this.searchTerm.name,
            portalStatus: this.searchTerm.portalStatus,
            tipeMerchant: this.searchTerm.tipeMerchant,
            page: this.curPage,
            limit: this.totalRecord
        }).subscribe(
            (result) => {
                this.ngxService.stop()
                this.merchantList = result.body.contents
                console.log("total data :", result.body.totalData)
                if (result.body.totalData > 150) {
                    console.log("masuk sini")
                    this.totalData = 150
                    console.log("total data adjust :", this.totalData )
                } else {
                    this.totalData = result.body.totalData
                }
            }

        );
    }


}
