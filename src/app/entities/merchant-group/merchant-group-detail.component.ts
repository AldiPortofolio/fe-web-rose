import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable, merge, Subject } from 'rxjs';
import { LOOKUP_JENIS_USAHA, LOOKUP_PROVINCE, LOOKUP_TIPE_MERCHANT, LOOKUP_CITY, PHOTO_KTP, TOTAL_RECORD_PER_PAGE} from 'src/app/shared/constants/base-constant';
import { LOOKUP_RPT_SETT_CFG, LOOKUP_SETT_EXEC_CFG, LOOKUP_SEND_RPT_VIA } from 'src/app/shared/constants/base-constant';
import { LOOKUP_MDR, LOOKUP_PROCESSING_FEE } from 'src/app/shared/constants/base-constant';
import { SERVER_LOAD_IMAGE, 
        BUCKET_NAME, 
        PHOTO_GROUP,
        PHOTO_SIUP,
        PHOTO_NPWP,
        PHOTO_PKS,
        PHOTO_KTP_DIREKSI,
        PHOTO_AKTA,
        PHOTO_KTP_PENTANGGUNGJAWAB,
        PHOTO_PERSETUJUAN_MENKUMHAM,
        PHOTO_TANDA_DAFTAR_PERUSAHAAN } from 'src/app/shared/constants/base-constant';
import { SERVER_PATH } from 'src/app/shared/constants/base-constant';
import { LookupDto } from '../lookup/lookup-dto.model';
import { MerchantGroup } from './merchant-group.model';
import { MerchantGroupService } from './merchant-group.service';
import { debounceTime, distinctUntilChanged, map, filter } from 'rxjs/operators';
import * as _ from 'lodash';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { LookupService } from '../lookup/lookup.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal from 'sweetalert2';
import { Provinsi } from '../provinsi/provinsi.model';
import { Dati2 } from '../dati2/dati2.model';
import { Kecamatan } from '../kecamatan/kecamatan.model';
import { Kelurahan } from '../kelurahan/kelurahan.model';
import { ProvinsiService } from '../provinsi/provinsi.service';
import { Dati2Service } from '../dati2/dati2.service';
import { KecamatanService } from '../kecamatan/kecamatan.service';
import { KelurahanService } from '../kelurahan/kelurahan.service';
import { UploadImageService } from 'src/app/shared/upload-image.service';
import { MerchantService } from '../merchant/merchant.service';
import { MerchantDto } from '../merchant/merchant.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MerchantGroupModalComponent } from './merchant-group-modal-component';
import { PortalAccessService } from '../merchant-portal/portal-access/portal-access.service';
import { MerchantGroupVaInfo } from './merchant-group-va-info.model';

class ImageSnippet {
    constructor(public src: string, public file: File) {}
}

// const HttpUploadOptions = {
//     headers: new HttpHeaders()
// };

@Component({
    selector: 'op-merchant-group',
    templateUrl: './merchant-group-detail.component.html',
    styles: [`
        .is-invalid {
            border: 1px solid #FF0000;
        }
    `]
})
export class MerchantGroupDetailComponent implements OnInit {
    @Input() statusRec: string;
    @Input() statusMDA: string;
    @Input() objEdit: MerchantGroup;
    @Input() objEditVa: MerchantGroupVaInfo;
    @Input() listTypeIds: string[];
    @Input() viewMsg;
    @Input() idMda = 0;
    @Input() recAction: string;
    
    listEnablePartnerCustomerId = [
        { code: true, name: "Yes" },
        { code: false, name: "No" },
    ]

    listHostType = [
        // { code: "0" , name: "-- Pilih Host Type --"},
        { code: "billing_system", name: "Billing System" },
        { code: "technical_integrator", name: "Technical Integrator" },
        { code: "ottopay_topup_deposit", name: "OttoPay Topup Deposit" },
    ];

    listAuthType = [
        // { code: "0" , name: "-- Pilih Auth Type --"},
        { code: "Signature", name: "Signature" },
        { code: "Token", name: "Token" },
    ]

    listStatus = [
        { code: "y", name: "active" },
        { code: "n", name: "inactive" },
    ]

    private sub: Subscription;
    private merchantGroup: MerchantGroup;
    private merchantGroupVaInfo: MerchantGroupVaInfo;

    idParams: number;
    // statusRec: string;

    lookupJenisUsaha: LookupDto [] = [];
    jenisUsahaSelected: String;

    lookupProvince: LookupDto [] = [];
    provinceSelected: String;

    lookupTipeMerchant: LookupDto [] = [];
    tipeMerchantSelected: string;

    lookupCity: LookupDto [] = [];
    citySelected: String;

    lookupMDR: LookupDto[] = [];
    mdrSelected: string;

    lookupProcessingFee: LookupDto[] = [];
    processingFeeSelected: string;

    lookupRptSetCfg: LookupDto[] = [];
    rptSetCfgSelected: string;

    lookupSettExecCfg: LookupDto[] = [];
    settExecCfgSelected: string;

    lookupSendRptVia: LookupDto[] = [];
    sendRptViaSelected: string;

    lookupTempl: LookupDto[];

    filterAction = [
        { code: '1', name: 'Active' },
        { code: '0', name: 'Inactive' },
    ];

    merchantList: MerchantDto[]
    
    curPage = 1;
    totalData = 0;
    searchTermMerchant = {
        merchantgroupId: 0,
        storeName: '',
        portalStatus: '',
        limit: TOTAL_RECORD_PER_PAGE,
        page: 0,
    };

    resetPassword = {
        email: '',
    }

    // imgURL;
    imgUrlSiup;
    imgUrlPks;
    imgUrlNpwp;
    imgUrlKtp;
    imgUrlGroupPhoto;
    imgUrlKtpPenanggungJawab;
    imgUrlAktaPendirian;
    imgUrlTandaDaftarPerusahaan;
    imgUrlPersetujuanMenkumham;
    selectedFileImgSiup: ImageSnippet;
    selectedFileImgNpwp: ImageSnippet;
    selectedFileImgPks: ImageSnippet;
    selectedFileImgKtp: ImageSnippet;
    selectedFileGroupPhoto: ImageSnippet;
    selectedFileImgKtpPenanggungJawab: ImageSnippet;
    selectedFileImgAktaPendirian: ImageSnippet;
    selectedFileImgTandaDaftarPerusahaan: ImageSnippet;
    selectedFileImgPersetujuanMenkumham: ImageSnippet;
    pathImgServer: String = SERVER_PATH + 'images/previewImage?data=';
    pathImgServerMDA: String = SERVER_PATH + 'images/previewImageMDA?data=';
    imageSiupChange: Boolean = false;
    imagePksChange: Boolean = false;
    imageNpwpChange: Boolean = false;
    imageKtpChange: Boolean = false;
    imageGroupPhotoChange: Boolean = false;

    imageKtpPenanggungJawabChange: Boolean = false;
    imageAktaPendirianChange: Boolean = false;
    imageTandaDaftarPerusahaanChange: Boolean = false;
    imagePersetujuanMenkumhamChange: Boolean = false;

    provinsiSelected = '0';
    dati2Selected = '0';
    kecamatanSelected = '0';
    kelurahanSelected = '0';

    listProvinsi: Provinsi[] = [];
    listDati2: Dati2[] = [];
    listKecamatan: Kecamatan[] = [];
    listKelurahan: Kelurahan[] = [];

    email = 'true';

    submitted = false;
    tempObj = new MerchantGroup();

    constructor(private route: ActivatedRoute,
        private router: Router,
        private merchantGroupService: MerchantGroupService,
        private merchantService: MerchantService,
        private http: HttpClient,
        private lookupService: LookupService,
        private ngxService: NgxUiLoaderService,
        private provinsiService: ProvinsiService,
        private dati2Service: Dati2Service,
        private kecamatanService: KecamatanService,
        private kelurahanService: KelurahanService,
        private uploadImageService: UploadImageService,
        private modalService: NgbModal,
        private portalService: PortalAccessService, ) { }

    ngOnInit() {

        this.sub = this.route.params.subscribe(params => {
            this.idParams = +params['id'];

            this.loadListProvinsi();

            this.loadLookup();

            this.loadAllMerchant(this.curPage);

        });
    }

    onFilterDati2(id) {
        this.dati2Selected = '0';
        this.listKecamatan = null;
        this.kecamatanSelected = '0';
        this.listKelurahan = null;
        this.kelurahanSelected = '0';

        this.loadListDati2(id);
    }

    onFilterKecamatan(id) {
        this.listKelurahan = null;
        this.kelurahanSelected = '0';

        this.loadListKecamatan(id);
    }

    onFilterKelurahan(id) {
        this.loadListKelurahan(id);
    }

    loadListProvinsi() {
        this.ngxService.start();
        this.provinsiService.getAll()
            .subscribe(
                (res: HttpResponse<Provinsi[]>) => this.onSuccessProvince(res.body),
                (res: HttpErrorResponse) => this.onError(res.message),
                () => { console.log('finally'); }
            );
    }

    private onSuccessProvince(data) {
        this.listProvinsi = data;
        this.ngxService.stop();
    }

    loadListDati2(id) {

        this.ngxService.start();
        this.dati2Service.getByProvinsiId(id)
            .subscribe(
                (res: HttpResponse<Dati2[]>) => this.onSuccessDati2(res.body),
                (res: HttpErrorResponse) => this.onError(res.message),
                () => { console.log('finally'); }
            );
    }

    private onSuccessDati2(data) {
        this.listDati2 = data;
        this.ngxService.stop();
    }

    loadListKecamatan(id) {
        this.ngxService.start();
        this.kecamatanService.getByDati2Id(id)
            .subscribe(
                (res: HttpResponse<Kecamatan[]>) => this.onSuccessKecamatan(res.body),
                (res: HttpErrorResponse) => this.onError(res.message),
                () => { console.log('finally'); }
            );
    }

    private onSuccessKecamatan(data) {
        this.listKecamatan = data;
        this.ngxService.stop();
    }

    loadListKelurahan(id) {

        this.ngxService.start();
        this.kelurahanService.getByKecamatanId(id)
            .subscribe(
                (res: HttpResponse<Kecamatan[]>) => this.onSuccessKelurahan(res.body),
                (res: HttpErrorResponse) => this.onError(res.message),
                () => { console.log('finally'); }
            );
    }

    private onSuccessKelurahan(data) {
        this.listKelurahan = data;
        this.ngxService.stop();
    }

    loadImageMerchantGroup(merchantGroup) {
        console.log('load image merchantgroup ----');
        this.imgUrlGroupPhoto = merchantGroup.groupPhoto;
        this.imgUrlSiup = merchantGroup.siup;
        this.imgUrlNpwp = merchantGroup.npwp;
        this.imgUrlPks = merchantGroup.pks;
        this.imgUrlKtp = merchantGroup.ktpDireksi;
        this.imgUrlAktaPendirian = merchantGroup.aktaPendirian;
        this.imgUrlKtpPenanggungJawab = merchantGroup.ktpPenanggungJawab;
        this.imgUrlPersetujuanMenkumham = merchantGroup.ktpPenanggungJawab;
        this.imgUrlTandaDaftarPerusahaan = merchantGroup.tandaDaftarPerusahaan;
        console.log(this.imgUrlNpwp);
    }

    defaultConfig(): void {
        console.log('next proc after break lookup');
            if (this.idParams === 0) {
                console.log('params ==0');
                this.statusRec = 'addnew';
                this.jenisUsahaSelected = this.lookupJenisUsaha[0].id;
                // this.provinceSelected = this.lookupProvince[0].id;
                // this.citySelected = this.lookupCity[0].id;
                this.tipeMerchantSelected = this.lookupTipeMerchant[0].id;
                this.mdrSelected = this.lookupMDR[0].id;
                this.processingFeeSelected = this.lookupProcessingFee[0].id;
                this.rptSetCfgSelected = this.lookupRptSetCfg[0].id;
                this.settExecCfgSelected = this.lookupSettExecCfg[0].id;
                this.sendRptViaSelected = this.lookupSendRptVia[0].id;
                this.merchantGroup = new MerchantGroup();
                this.merchantGroup.id = 0;
                this.merchantGroup.enablePartnerCustomerId = false
                this.merchantGroup.merchantGroupFeeInfo.processingFeeValue = 0;
                this.merchantGroup.merchantGroupFeeInfo.rentalEdcFee = 0;
                this.merchantGroup.merchantGroupFeeInfo.mdrDebitOnUs = 0;
                this.merchantGroup.merchantGroupFeeInfo.mdrDebitOffUs = 0;
                this.merchantGroup.merchantGroupFeeInfo.mdrEmoneyOnUs = 0;
                this.merchantGroup.merchantGroupFeeInfo.mdrEmoneyOffUs = 0;
                this.merchantGroup.merchantGroupFeeInfo.mdrCreditOnUs = 0;
                this.merchantGroup.merchantGroupFeeInfo.mdrCreditOffUs = 0;
                this.merchantGroup.merchantGroupFeeInfo.otherFee = 0;
                this.merchantGroup.merchantGroupFeeInfo.fmsFee = 0;
                this.merchantGroupVaInfo = new MerchantGroupVaInfo();
                this.merchantGroupVaInfo.vaBca = "n";
                this.merchantGroupVaInfo.vaMandiri = "n";
                this.merchantGroupVaInfo.vaBri = "n";
                this.merchantGroupVaInfo.vaLain = "n";
                this.merchantGroupVaInfo.vaTransactionType = "op";
                this.merchantGroupVaInfo.vaAuthType = "0";
                this.merchantGroupVaInfo.hostType = "0";
                

                // const reader = new FileReader();

                // const file = reader.readAsDataURL('')
                // this.processFileImageSiup(file);

            } else {
                console.log('params ===> ', this.idParams);
                // cek apakah ini routing detil atau view dari MDA
                if (Number.isNaN(this.idParams)) {
                    // from routing
                    console.log('Not As Number');
                    this.merchantGroup = this.objEdit;
                    this.merchantGroupVaInfo = this.objEditVa;
                    this.setComboSelected(this.merchantGroup);
                    console.log('cek rec action ', this.recAction);
                    console.log('cek isi MG ', this.merchantGroup);

                    // load image
                    this.loadImageMerchantGroup(this.merchantGroup);
                    // tslint:disable-next-line:triple-equals
                    if ( this.recAction == '0') {
                        console.log('MDA add new ' );
                        if (this.merchantGroup.id === undefined) {
                            console.log('new record view');
                            this.loadImageNull();
                        } else {
                            console.log('old record view');
                            this.loadImageMerchantGroup(this.merchantGroup);
                        }
                    } else  {
                        console.log('MDA edit ' , this.merchantGroup.id);
                        if (this.viewMsg === 'New Record') {
                            console.log('new record view');
                            this.loadImageMerchantGroup(this.merchantGroup);
                        } else {
                            console.log('old record view');
                            this.loadImageMerchantGroup(this.merchantGroup);
                        }
                    }

                } else {
                    console.log('Number',  this.idParams);
                    // from MDA
                    this.merchantGroupService.find(this.idParams).subscribe(result => {
                        console.log('Result==>', result.body);
                        this.merchantGroup = result.body;
                        this.statusRec = 'edit';
                        console.log('merchant ', this.merchantGroup);
                        this.setComboSelected(this.merchantGroup);
                        this.loadImageMerchantGroup(this.merchantGroup);
                    });
                    this.merchantGroupService.findConfigVa(this.idParams).subscribe(result => {
                        console.log('Result findConfigVa==>', result.status ,result.body);
                        if ( result.body.errCode === "00" ) {
                            this.onSuccessConfigVa(result.body, result.headers)
                        } else {
                            this.merchantGroupVaInfo = new MerchantGroupVaInfo();
                            this.merchantGroupVaInfo.merchantGroupId = this.idParams;
                            this.merchantGroupVaInfo.vaBca = "n";
                            this.merchantGroupVaInfo.vaMandiri = "n";
                            this.merchantGroupVaInfo.vaBri = "n";
                            this.merchantGroupVaInfo.vaLain = "n";
                            this.merchantGroupVaInfo.vaTransactionType = "op";
                            this.merchantGroupVaInfo.vaAuthType = "0";
                            this.merchantGroupVaInfo.hostType = "0";
                        }
                        console.log('merchantVaInfo ', this.merchantGroupVaInfo);
                    });
                }
            }

            // stop loader
            this.ngxService.stop();
    }

    private onSuccessConfigVa(data, headers) {
        this.ngxService.stop();
        console.log("ini responconfigva", data)
        this.merchantGroupVaInfo = data.data;
    }

    setComboSelected(merchantGroup: MerchantGroup): void {

        this.provinsiSelected = this.merchantGroup.provinsiLookup;
        this.dati2Selected = this.merchantGroup.kabupatenKota;
        this.kecamatanSelected = this.merchantGroup.kecamatan;
        this.kelurahanSelected = this.merchantGroup.kelurahan;

        this.loadListDati2(this.provinsiSelected);
        this.loadListKecamatan(this.dati2Selected);
        this.loadListKelurahan(this.kecamatanSelected);

        // this.setComboSelectedProvince(merchantGroup.provinsiLookup);
        this.setComboSelectedJenisUsaha(merchantGroup.jenisUsahaLookup);
        this.setComboSelectedTipeMerchant(merchantGroup.tipeMerchantLookup);
        // this.setComboSelectedCity(merchantGroup.kabupatenKota);
        this.setComboSelectedProccFee(merchantGroup.merchantGroupFeeInfo.processingFeeLookup);
        this.setComboSelectedMdr(merchantGroup.merchantGroupFeeInfo.mdrLookup);
        this.setComboSelectedRptSetCfg(merchantGroup.merchantGroupSettlementInfo.reportSettlementConfigLookup);
        // tslint:disable-next-line:max-line-length
        this.setComboSelectedSettExecCfg(merchantGroup.merchantGroupSettlementInfo.settlementExecutionConfigLookup);
        this.setComboSelectedSendRptVia(merchantGroup.merchantGroupSettlementInfo.sendReportViaLookup);
    }

    loadImageNull(): void {
        this.imgUrlSiup = null;
        this.imgUrlPks = null;
        this.imgUrlNpwp = null;
        this.imgUrlKtp = null;
        this.imgUrlGroupPhoto = null;
        this.imgUrlKtpPenanggungJawab = null;
        this.imgUrlAktaPendirian = null;
        this.imgUrlTandaDaftarPerusahaan = null;
        this.imgUrlPersetujuanMenkumham = null;
    }

    /*
    loadImageMG(merchantGroup: MerchantGroup) {
        this.imgUrlSiup = this.pathImgServer + merchantGroup.siup;
        this.imgUrlPks = this.pathImgServer + merchantGroup.pks;
        this.imgUrlNpwp = this.pathImgServer + merchantGroup.npwp;
        this.imgUrlKtp = this.pathImgServer + merchantGroup.ktpDireksi;
        this.imgUrlGroupPhoto = this.pathImgServer + merchantGroup.groupPhoto;
        this.imgUrlKtpPenanggungJawab = this.pathImgServer + merchantGroup.ktpPenanggungJawab;
        this.imgUrlAktaPendirian = this.pathImgServer + merchantGroup.aktaPendirian;
        this.imgUrlTandaDaftarPerusahaan = this.pathImgServer + merchantGroup.tandaDaftarPerusahaan;
        this.imgUrlPersetujuanMenkumham = this.pathImgServer + merchantGroup.persetujuanMenkumham;
        // this.selectedFileGroupPhoto.file  = this.imgUrlGroupPhoto;
        // console.log('selected file group photo <><><>', this.imgUrlGroupPhoto );
    }
    */

    /*
    loadImageMDA(idMda: number) {

        const resImgSiup = this.pathImgServerMDA + idMda.toString() + '&imgData=mgsiup';
        this.imgUrlSiup = resImgSiup;
        console.log('resImgSiup ==>', resImgSiup);

        const resImgPks: any = this.pathImgServerMDA + idMda.toString() + '&imgData=mgpks';
        this.imgUrlPks = resImgPks;
        console.log('resImgPks ==>', resImgPks);

        this.imgUrlNpwp = this.pathImgServerMDA + idMda.toString() + '&imgData=mgnpwp';
        this.imgUrlKtp = this.pathImgServerMDA + idMda.toString() + '&imgData=mgktp';
        this.imgUrlGroupPhoto = this.pathImgServerMDA + idMda.toString() + '&imgData=mgPhoto';
        this.imgUrlKtpPenanggungJawab = this.pathImgServerMDA + idMda.toString() + '&imgData=mgktppenanggungjawab';
        this.imgUrlAktaPendirian = this.pathImgServerMDA + idMda.toString() + '&imgData=mgaktapendirian';
        this.imgUrlTandaDaftarPerusahaan = this.pathImgServerMDA + idMda.toString() + '&imgData=mgtandadaftarperusahaan';
        this.imgUrlPersetujuanMenkumham = this.pathImgServerMDA + idMda.toString() + '&imgData=mgpersetujuanmenkumham';

    }
    */

    onBack() {
        // this.route.
        this.ngxService.stop();
        this.router.navigate(['/main/merchantGroup']);
    }

    loadLookup() {
        // start loader
        this.ngxService.start();

        console.log('Start call lookup');
        this.lookupService.findForMerchantGroup()
            .subscribe(
                (res: HttpResponse<LookupDto[]>) => this.onSuccessLookup(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message),
                () => {
                    this.ngxService.stop();
                    console.log('finally'); }
            );
    }

    private onSuccessLookup(data, headers) {
        console.log('isi lookup from SVR', data);
        this.lookupTempl = data;

        if (this.lookupTempl.length < 1 ) {
            return ;
        }
        console.log('start call breaklookup');
        this.breakLookup();
    }

    private onError(error) {
        // stop loader
        this.ngxService.stop();

        console.log('error load Lookup..');
    }

    breakLookup() {
        console.log('start break lookup');
        // this.lookupJenisUsaha = _.find(this.lookupTempl, (lookup) => lookup.lookupGroupString === 'JENIS_USAHA');
        if (this.lookupTempl.length < 1 ) {
            console.log('lookup empty, start load lookup');
            return ;
        }

        this.lookupTempl.forEach(lookupdt  => {
            if (lookupdt.lookupGroupString === LOOKUP_JENIS_USAHA) {
                // console.log(lookupdt);
                this.lookupJenisUsaha.push(lookupdt);
            }
            // if (lookupdt.lookupGroupString === LOOKUP_PROVINCE) {
            //     // console.log(lookupdt);
            //     this.lookupProvince.push(lookupdt);
            // }
            if (lookupdt.lookupGroupString === LOOKUP_TIPE_MERCHANT) {
                // console.log(lookupdt);
                this.lookupTipeMerchant.push(lookupdt);
            }
            // if (lookupdt.lookupGroupString === LOOKUP_CITY) {
            //     // console.log(lookupdt);
            //     this.lookupCity.push(lookupdt);
            // }
            if (lookupdt.lookupGroupString === LOOKUP_MDR) {
                // console.log(lookupdt);
                this.lookupMDR.push(lookupdt);
            }
            if (lookupdt.lookupGroupString === LOOKUP_PROCESSING_FEE) {
                // console.log(lookupdt);
                this.lookupProcessingFee.push(lookupdt);
            }
            if (lookupdt.lookupGroupString === LOOKUP_RPT_SETT_CFG) {
                // console.log(lookupdt);
                this.lookupRptSetCfg.push(lookupdt);
            }
            if (lookupdt.lookupGroupString === LOOKUP_SETT_EXEC_CFG) {
                // console.log(lookupdt);
                this.lookupSettExecCfg.push(lookupdt);
            }
            if (lookupdt.lookupGroupString === LOOKUP_SEND_RPT_VIA) {
                // console.log(lookupdt);
                this.lookupSendRptVia.push(lookupdt);
            }
        });
        console.log('finish breakLookup ');
        this.defaultConfig();
    }

    setComboSelectedJenisUsaha(id: string) {
        console.log('start iterate lookup jenis usaha [search]==>', id);
        // this.lookupTempl.forEach(lookupdt  => {
        //     console.log('iteratew id =>[', lookupdt.id, '] search =>[', id, '] ');
        //     if (lookupdt.id.valueOf  === id.valueOf ) {
        //         this.jenisUsahaSelected = lookupdt;
        //         console.log('found ');
        //         return;
        //     }
        // });
        // console.log('not found');

        // tslint:disable-next-line:triple-equals
        const result = _.find(this.lookupTempl, (lookup) => lookup.id == id);
        console.log('hasil lodash -> ', result);
        if (result) {
            this.jenisUsahaSelected = result.id;
        }

    }

    searchJenisUsaha = (text$: Observable<string>) =>
    text$.pipe(
        debounceTime(200),
        map(term => term === '' ? []
        : this.lookupJenisUsaha.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

    formatter = (x: {name: string}) => x.name;

    setComboSelectedProvince(id: string) {
        // tslint:disable-next-line:triple-equals
        const result = _.find(this.lookupTempl, (lookup) => lookup.id == id);
        console.log('hasil lodash -> ', result);
        // this.provinceSelected = result.id;
        console.log(this.provinceSelected);
    }

    searchProvince = (text$: Observable<string>) =>
    text$.pipe(
        debounceTime(200),
        map(term => term === '' ? []
        : this.lookupProvince.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

    setComboSelectedTipeMerchant(id: string) {
        // tslint:disable-next-line:triple-equals
        const result = _.find(this.lookupTipeMerchant, (lookup) => lookup.id == id);
        console.log('hasil lodash tipe merchant -> ', result);
        this.tipeMerchantSelected = result.id;
    }

    searchTipeMerchant = (text$: Observable<string>) =>
    text$.pipe(
        debounceTime(200),
        map(term => term === '' ? []
        : this.lookupTipeMerchant.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

    setComboSelectedCity(id: string) {
        // tslint:disable-next-line:triple-equals
        const result = _.find(this.lookupCity, (lookup) => lookup.id == id);
        console.log('hasil lodash -> ', result);
        // this.citySelected = result.id;
    }

    setComboSelectedMdr(id: string) {
        // tslint:disable-next-line:triple-equals
        const result = _.find(this.lookupMDR, (lookup) => lookup.id == id);
        console.log('hasil lodash MDR -> ', result);
        this.mdrSelected = result.id;
    }

    setComboSelectedProccFee(id: string) {
        // tslint:disable-next-line:triple-equals
        const result = _.find(this.lookupProcessingFee, (lookup) => lookup.id == id);
        console.log('hasil lodash Proc Fee -> ', result);
        this.processingFeeSelected = result.id;
    }

    setComboSelectedRptSetCfg(id: string) {
        // tslint:disable-next-line:triple-equals
        const result = _.find(this.lookupRptSetCfg, (lookup) => lookup.id == id);
        console.log('hasil lodash Rpt settCfg -> ', result);
        this.rptSetCfgSelected = result.id;
    }

    setComboSelectedSettExecCfg(id: string) {
        // tslint:disable-next-line:triple-equals
        const result = _.find(this.lookupSettExecCfg, (lookup) => lookup.id == id);
        console.log('hasil lodash Sett exec Cfg -> ', result);
        this.settExecCfgSelected = result.id;
    }

    setComboSelectedSendRptVia(id: string) {
        // tslint:disable-next-line:triple-equals
        const result = _.find(this.lookupSendRptVia, (lookup) => lookup.id == id);
        console.log('hasil lodash Send rpt via -> ', result);
        this.sendRptViaSelected = result.id;
    }

    searchCity = (text$: Observable<string>) =>
    text$.pipe(
        debounceTime(200),
        map(term => term === '' ? []
        : this.lookupCity.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

    // fileChange(event): void {

    //     const file = event.target.files;
    //     // this.fileToUpload.push(file);
    //     const reader = new FileReader();
    //     // this.imagePath = file;
    //     reader.readAsDataURL(file);
    //     reader.onload = (_event) => {
    //         this.imgUrlSiup = reader.result;
    //     };
    // }
        // const formData = new FormData();
        // formData.append('file', file, file.name);
        // this.fileList2.push(file);
        // console.log('upload', this.fileList2);
        // this.http.post('http://localhost:8080/api/uploadfile', formData, HttpUploadOptions)
        //         .subscribe(
        //             data => console.log('success'),
        //             error => console.log(error)
        //         );


    // func for chekc image size
    checkSizeImage(file: File) {
        if (file.size > (1.5 * 1025 * 1024)) {
            Swal.fire('Error', 'Ukuran gambar maksimum 1.5 MB');
            return false;
        }
        return true;
    }

    generateUrlImage(tipe: string) {
        return SERVER_LOAD_IMAGE + '/' + BUCKET_NAME + '/' + this.merchantGroup.noTelpPic + '_' + tipe + '.jpeg';
    }

    processFileImageSiup(imageInput: any) {
        const file: File = imageInput.files[0];
        const reader = new FileReader();

        /* CHECK IMAGE SIZE */
        if (!this.checkSizeImage(file)) {
            return;
        }

        // reader.addEventListener('load', (event: any) => {
        //     this.selectedFileImgSiup = new ImageSnippet(event.target.result, file);
        // });
        reader.readAsDataURL(file);
        reader.onload = (_event) => {
            this.imgUrlSiup = reader.result;
            this.imageSiupChange = true;
        };
    }

    processFileImageNpwp(imageInput: any) {
        const file: File = imageInput.files[0];
        const reader = new FileReader();

        /* CHECK IMAGE SIZE */
        if (!this.checkSizeImage(file)) {
            return;
        }

        // reader.addEventListener('load', (event: any) => {
        //     this.selectedFileImgNpwp = new ImageSnippet(event.target.result, file);
        // });
        reader.readAsDataURL(file);
        reader.onload = (_event) => {
            this.imgUrlNpwp = reader.result;
            this.imageNpwpChange = true;
        };
    }

    processFileImagePks(imageInput: any) {
        const file: File = imageInput.files[0];
        const reader = new FileReader();

        // reader.addEventListener('load', (event: any) => {
        //     this.selectedFileImgPks = new ImageSnippet(event.target.result, file);
        // });
        reader.readAsDataURL(file);
        reader.onload = (_event) => {
            this.imgUrlPks = reader.result;
            this.imagePksChange = true;
        };
    }

    processFileImageKtp(imageInput: any) {
        const file: File = imageInput.files[0];
        const reader = new FileReader();

        /* CHECK IMAGE SIZE */
        if (!this.checkSizeImage(file)) {
            return;
        }

        // reader.addEventListener('load', (event: any) => {
        //     this.selectedFileImgKtp = new ImageSnippet(event.target.result, file);
        // });
        reader.readAsDataURL(file);
        reader.onload = (_event) => {
            this.imgUrlKtp = reader.result;
            this.imageKtpChange = true;;
        };
    }

    processFileImageGroupPhoto(imageInput: any) {
        const file: File = imageInput.files[0];
        const reader = new FileReader();

        /* CHECK IMAGE SIZE */
        if (!this.checkSizeImage(file)) {
            return;
        }

        // reader.addEventListener('load', (event: any) => {
        //     this.selectedFileGroupPhoto = new ImageSnippet(event.target.result, file);
        //     console.log('snippet result =>' , event.target.result);
        //     console.log('snippet file =>', file);
        // });
        reader.readAsDataURL(file);
        reader.onload = (_event) => {
            this.imgUrlGroupPhoto = reader.result;
            this.imageGroupPhotoChange = true;
        };
    }

    processFileImageKtpPenanggungJawab(imageInput: any) {
        const file: File = imageInput.files[0];
        const reader = new FileReader();

        /* CHECK IMAGE SIZE */
        if (!this.checkSizeImage(file)) {
            return;
        }

        // reader.addEventListener('load', (event: any) => {
        //     this.selectedFileImgKtpPenanggungJawab = new ImageSnippet(event.target.result, file);
        // });
        reader.readAsDataURL(file);
        reader.onload = (_event) => {
            this.imgUrlKtpPenanggungJawab = reader.result;
            this.imageKtpPenanggungJawabChange = true;
        };
    }

    processFileImageAktaPendirian(imageInput: any) {
        const file: File = imageInput.files[0];
        const reader = new FileReader();

        /* CHECK IMAGE SIZE */
        if (!this.checkSizeImage(file)) {
            return;
        }

        // reader.addEventListener('load', (event: any) => {
        //     this.selectedFileImgAktaPendirian = new ImageSnippet(event.target.result, file);
        // });
        reader.readAsDataURL(file);
        reader.onload = (_event) => {
            this.imgUrlAktaPendirian = reader.result;
            this.imageAktaPendirianChange = true;
        };
    }

    processFileImageTandaDaftarPerusahaan(imageInput: any) {
        const file: File = imageInput.files[0];
        const reader = new FileReader();

        /* CHECK IMAGE SIZE */
        if (!this.checkSizeImage(file)) {
            return;
        }

        // reader.addEventListener('load', (event: any) => {
        //     this.selectedFileImgTandaDaftarPerusahaan = new ImageSnippet(event.target.result, file);
        // });
        reader.readAsDataURL(file);
        reader.onload = (_event) => {
            this.imgUrlTandaDaftarPerusahaan = reader.result;
            this.imageTandaDaftarPerusahaanChange = true;
        };
    }

    processFileImagePersetujuanMenkumham(imageInput: any) {
        const file: File = imageInput.files[0];
        const reader = new FileReader();

        /* CHECK IMAGE SIZE */
        if (!this.checkSizeImage(file)) {
            return;
        }

        // reader.addEventListener('load', (event: any) => {
        //     this.selectedFileImgPersetujuanMenkumham = new ImageSnippet(event.target.result, file);
        // });
        reader.readAsDataURL(file);
        reader.onload = (_event) => {
            this.imgUrlPersetujuanMenkumham = reader.result;
            this.imagePersetujuanMenkumhamChange = true;
        };
    }

    // invalidNumber(angka: any): boolean {
    //     console.log('cek valid number ', angka);
    //     return Number(angka) === NaN;
    // }

    isNull(angka: any): boolean {
        console.log('cek invalid numb', angka);
        return angka === null;
    }

    invalidRangeMoney(angka: number): boolean {
        if ((angka > 9999999) || (angka < 0)) {
            return true;
        }
        return false;
    }

    validateNumberPass(): boolean {

        // cek invalid
        if ( this.isNull(this.merchantGroup.merchantGroupFeeInfo.processingFeeValue) === true ) {
            this.ngxService.stop();
            Swal.fire('Information', 'processing Fee is invalid !', 'error');
            return false;
        }

        if (this.isNull(this.merchantGroup.merchantGroupFeeInfo.rentalEdcFee) === true) {
            this.ngxService.stop();
            Swal.fire('Information', 'Edc Fee is invalid !', 'error');
            return false;
        }

        if (this.isNull(this.merchantGroup.merchantGroupFeeInfo.mdrEmoneyOnUs) === true) {
            this.ngxService.stop();
            Swal.fire('Information', 'Emoney on us Fee is invalid !', 'error');
            return false;
        }

        if (this.isNull(this.merchantGroup.merchantGroupFeeInfo.mdrEmoneyOffUs) === true) {
            this.ngxService.stop();
            Swal.fire('Information', 'Emoney off us Fee is invalid !', 'error');
            return false;
        }

        if (this.isNull(this.merchantGroup.merchantGroupFeeInfo.mdrDebitOffUs) === true) {
            this.ngxService.stop();
            Swal.fire('Information', 'Debit off us Fee is invalid !', 'error');
            return false;
        }

        if (this.isNull(this.merchantGroup.merchantGroupFeeInfo.mdrDebitOnUs) === true) {
            this.ngxService.stop();
            Swal.fire('Information', 'Debit on us Fee is invalid !', 'error');
            return false;
        }

        if (this.isNull(this.merchantGroup.merchantGroupFeeInfo.mdrCreditOnUs) === true) {
            this.ngxService.stop();
            Swal.fire('Information', 'Credit on us Fee is invalid !', 'error');
            return false;
        }

        if (this.isNull(this.merchantGroup.merchantGroupFeeInfo.mdrCreditOffUs) === true) {
            this.ngxService.stop();
            Swal.fire('Information', 'Credit off us Fee is invalid !', 'error');
            return false;
        }

        if (this.isNull(this.merchantGroup.merchantGroupFeeInfo.otherFee) === true) {
            this.ngxService.stop();
            Swal.fire('Information', 'Other Fee is invalid !', 'error');
            return false;
        }

        if (this.isNull(this.merchantGroup.merchantGroupFeeInfo.fmsFee) === true) {
            this.ngxService.stop();
            Swal.fire('Information', 'FMS Fee is invalid !', 'error');
            return false;
        }

        if (this.invalidRangeMoney(this.merchantGroup.merchantGroupFeeInfo.rentalEdcFee) === true) {
            this.ngxService.stop();
            Swal.fire('Information ', 'EDC fee must between 0 and 9,999,999 ', 'error');
            return false;
        }

        // FEE SELECTED
        if (this.processingFeeSelected === '8085') {
            // tslint:disable-next-line:max-line-length
            if ((this.merchantGroup.merchantGroupFeeInfo.processingFeeValue > 99)
                || (this.merchantGroup.merchantGroupFeeInfo.processingFeeValue < 0)) {
                this.ngxService.stop();
                Swal.fire('Information ', 'Processing fee must between 0 and 99 ', 'error');
                return false;
            }
        } else {
            if (this.invalidRangeMoney(this.merchantGroup.merchantGroupFeeInfo.processingFeeValue) === true) {
                this.ngxService.stop();
                Swal.fire('Information ', 'Processing fee must between 0 and 9,999,999 ', 'error');
                return false;
            }
        }

        // EMONEY ON US
        if (this.mdrSelected === '8083') {
            // tslint:disable-next-line:max-line-length
            if ((this.merchantGroup.merchantGroupFeeInfo.mdrEmoneyOnUs > 99)
                || (this.merchantGroup.merchantGroupFeeInfo.mdrEmoneyOnUs < 0)) {
                this.ngxService.stop();
                Swal.fire('Information ', 'Emoney on us must between 0 and 99 ', 'error');
                return false;
            }
        } else {
            if (this.invalidRangeMoney(this.merchantGroup.merchantGroupFeeInfo.mdrEmoneyOnUs) === true) {
                this.ngxService.stop();
                Swal.fire('Information ', 'Emoney on us must between 0 and 9,999,999 ', 'error');
                return false;
            }
        }

        // EMONEY OFF US
        if (this.mdrSelected === '8083') {
            // tslint:disable-next-line:max-line-length
            if ((this.merchantGroup.merchantGroupFeeInfo.mdrEmoneyOffUs > 99)
                || (this.merchantGroup.merchantGroupFeeInfo.mdrEmoneyOffUs < 0)) {
                this.ngxService.stop();
                Swal.fire('Information ', 'Emoney off us must between 0 and 99 ', 'error');
                return false;
            }
        } else {
            if (this.invalidRangeMoney(this.merchantGroup.merchantGroupFeeInfo.mdrEmoneyOffUs) === true) {
                this.ngxService.stop();
                Swal.fire('Information ', 'Emoney off us must between 0 and 9,999,999 ', 'error');
                return false;
            }
        }

        // DEBIT ON US
        if (this.mdrSelected === '8083') {
            // tslint:disable-next-line:max-line-length
            if ((this.merchantGroup.merchantGroupFeeInfo.mdrDebitOnUs > 99)
                || (this.merchantGroup.merchantGroupFeeInfo.mdrDebitOnUs < 0)) {
                this.ngxService.stop();
                Swal.fire('Information ', 'Debit on us must between 0 and 99 ', 'error');
                return false;
            }
        } else {
            if (this.invalidRangeMoney(this.merchantGroup.merchantGroupFeeInfo.mdrDebitOnUs) === true) {
                this.ngxService.stop();
                Swal.fire('Information ', 'Debit on us must between 0 and 9,999,999 ', 'error');
                return false;
            }
        }

        // DEBIT OFF US
        if (this.mdrSelected === '8083') {
            // tslint:disable-next-line:max-line-length
            if ((this.merchantGroup.merchantGroupFeeInfo.mdrDebitOffUs > 99)
                || (this.merchantGroup.merchantGroupFeeInfo.mdrDebitOffUs < 0)) {
                this.ngxService.stop();
                Swal.fire('Information ', 'Debit off us must between 0 and 99 ', 'error');
                return false;
            }
        } else {
            if (this.invalidRangeMoney(this.merchantGroup.merchantGroupFeeInfo.mdrDebitOffUs) === true) {
                this.ngxService.stop();
                Swal.fire('Information ', 'Debit off us must between 0 and 9,999,999 ', 'error');
                return false;
            }
        }

        // CREDIT ON US
        if (this.mdrSelected === '8083') {
            // tslint:disable-next-line:max-line-length
            if ((this.merchantGroup.merchantGroupFeeInfo.mdrCreditOnUs > 99)
                || (this.merchantGroup.merchantGroupFeeInfo.mdrCreditOnUs < 0)) {
                this.ngxService.stop();
                Swal.fire('Information ', 'Credit on us must between 0 and 99 ', 'error');
                return false;
            }
        } else {
            if (this.invalidRangeMoney(this.merchantGroup.merchantGroupFeeInfo.mdrCreditOnUs) === true) {
                this.ngxService.stop();
                Swal.fire('Information ', 'Credit on us must between 0 and 9,999,999 ', 'error');
                return false;
            }
        }

        // CREDIT OFF US
        if (this.mdrSelected === '8083') {
            // tslint:disable-next-line:max-line-length
            if ((this.merchantGroup.merchantGroupFeeInfo.mdrCreditOffUs > 99)
                || (this.merchantGroup.merchantGroupFeeInfo.mdrCreditOffUs < 0)) {
                this.ngxService.stop();
                Swal.fire('Information ', 'Credit off us must between 0 and 99 ', 'error');
                return false;
            }
        } else {
            if (this.invalidRangeMoney(this.merchantGroup.merchantGroupFeeInfo.mdrCreditOffUs) === true) {
                this.ngxService.stop();
                Swal.fire('Information ', 'mdrCreditOffUs off us must between 0 and 9,999,999 ', 'error');
                return false;
            }
        }

        if (this.invalidRangeMoney(this.merchantGroup.merchantGroupFeeInfo.otherFee) === true) {
            this.ngxService.stop();
            Swal.fire('Information ', 'Other fee must between 0 and 9,999,999 ', 'error');
            return false;
        }

        if (this.invalidRangeMoney(this.merchantGroup.merchantGroupFeeInfo.fmsFee) === true) {
            this.ngxService.stop();
            Swal.fire('Information ', 'FMS fee must between 0 and 9,999,999 ', 'error');
            return false;
        }

        return true;
    }

    suspense(): void {
        this.merchantGroupService.suspense(this.idParams).subscribe(result => {
            console.log('Result==>', result.body);
            this.merchantGroup = result.body;
            this.statusRec = 'edit';
            console.log('merchant ', this.merchantGroup);
            this.setComboSelected(this.merchantGroup);
            // this.loadImageMG(this.merchantGroup);
            this.loadImageMerchantGroup(this.merchantGroup);
        });
    }

    validate(): void {
        this.ngxService.start();

        // Swal.fire('a', 'success', 'info');

        // if (this.processingFeeSelected === '8085') {
        //     if (this.merchantGroup.merchantGroupFeeInfo.processingFeeValue > 99) {
        //         Swal.fire('Information ', 'Processing fee value cannot more than 99% ', 'error');
        //         return;
        //     }
        // }
        // return ;

        this.submitted = true;
        if (this.validateNumberPass() === false) {
            this.ngxService.stop();
            return;
        }
        
        console.log(_.keys(this.tempObj));

        // const newCity = _.find(this.lookupCity, (city) =>
        //     // tslint:disable-next-line:triple-equals
        //     city.id == this.citySelected);
        // console.log('new city selected -> ', newCity);

        // const newProvince = _.find(this.lookupProvince, (province) =>
        //     // tslint:disable-next-line:triple-equals
        //     province.id == this.provinceSelected);
        // console.log('new jenis province selected -> ', newProvince);

        const newMerchantType = _.find(this.lookupTipeMerchant, (tipeMerchant) =>
            // tslint:disable-next-line:triple-equals
            tipeMerchant.id == this.tipeMerchantSelected);

        const newJenisUsaha = _.find(this.lookupJenisUsaha, (jenisUsaha) =>
            // tslint:disable-next-line:triple-equals
            jenisUsaha.id == this.jenisUsahaSelected);

        // this.merchantGroup.kabupatenKota = newCity.id;
        this.merchantGroup.provinsiLookup = this.provinsiSelected;
        this.merchantGroup.kabupatenKota = this.dati2Selected;
        this.merchantGroup.kecamatan = this.kecamatanSelected;
        this.merchantGroup.kelurahan = this.kelurahanSelected;
        this.merchantGroup.tipeMerchantLookup = newMerchantType.id;
        this.merchantGroup.jenisUsahaLookup = newJenisUsaha.id;
        // this.merchantGroup.provinsiLookup = newProvince.id;
        this.merchantGroup.merchantGroupFeeInfo.processingFeeLookup = Number(this.processingFeeSelected);
        this.merchantGroup.merchantGroupFeeInfo.mdrLookup = Number(this.mdrSelected);
        this.merchantGroup.merchantGroupSettlementInfo.reportSettlementConfigLookup = this.rptSetCfgSelected;
        this.merchantGroup.merchantGroupSettlementInfo.settlementExecutionConfigLookup = this.settExecCfgSelected;
        this.merchantGroup.merchantGroupSettlementInfo.sendReportViaLookup = this.sendRptViaSelected;

        let iter = 0;
        _.forOwn(this.merchantGroup, function (value, key) {
            console.log("Key:",key);
            if (key === 'tipeMerchantLookup' || key === 'merchantGroupName' || key === 'namaPT' ||
                key === 'jenisUsahaLookup' || key === 'alamat' || key === 'kelurahan' ||
                key === 'kecamatan' || key === 'provinsiLookup' || key === 'kabupatenKota' ||
                key === 'negara'
            ) {
                // console.log('test 1 ', value);
                if (value === '0' || value === '' || value === null || value === undefined) {
                    console.log('iter++1', key);
                    iter++;
                }
            }

            if (key === 'merchantGroupSettlementInfo') {
                // console.log('test 2 ', value);
                if (_.keys(value).length > 0) {
                    _.forOwn(value, function (avalue, akey) {
                        if (akey === 'nomorRekening' || akey === 'namaBankTujuanSettlement' ||
                            akey === 'namaPemilikRekening' || akey === 'tipeRekening' ||
                            akey === 'reportSettlementConfigLookup' || akey === 'settlementExecutionConfigLookup' ||
                            akey === 'sendReportViaLookup' || akey === 'sendReportUrl') {
                            if (avalue === '' || avalue === null || avalue === undefined) {
                                console.log('iter++2', akey);
                                iter++;
                            }
                        }
                    });
                } else {
                    iter++;
                }
            }

            if (key === 'merchantGroupFeeInfo') {
                // console.log('test 3 ', value);
                if (_.keys(value).length > 0) {
                    _.forOwn(value, function (bvalue, bkey) {
                        if (bkey === 'processingFeeLookup' || bkey === 'processingFeeValue' || bkey === 'mdrLookup' ||
                            bkey === 'mdrEmoneyOnUs' || bkey === 'mdrEmoneyOffUs' || bkey === 'mdrDebitOnUs' ||
                            bkey === 'mdrDebitOffUs' || bkey === 'mdrCreditOnUs' || bkey === 'mdrCreditOffUs') {
                            if (bvalue === '' || bvalue === null || bvalue === undefined ) {
                                console.log('iter++3', bkey);
                                iter++;
                            }
                        }
                    });
                } else {
                    iter++;
                }
            }

            if (key === 'internalContactPerson') {
                // console.log('test 4 ', value);
                if (_.keys(value).length > 0) {
                    _.forOwn(value, function (cvalue, ckey) {
                        if (ckey === 'businessPic' || ckey === 'technicalPic' || ckey === 'settleOperationPic') {
                            if (cvalue === '' || cvalue === null || cvalue === undefined) {
                                console.log('iter++4', ckey);
                                iter++;
                            }
                        }
                    });
                } else {
                    iter++;
                }
            }
        });

        console.log('iter : ', iter);
        if (iter > 0) {
            this.ngxService.stop();
            Swal.fire('Error', 'Silahkan periksa semua field sudah terisi [' + iter + ' fields]  !', 'error');
            return;
        }

        this.onConfirm();
    }

    onConfirm(): void {
        console.log('onConfirm..');
        // const formData = new FormData();
        // formData.append('file', this.selectedFile.file);
        // this.http.post('http://localhost:8080/api/images/uploadFile/mgktp/apaaja.jpg', formData, HttpUploadOptions )
        //      .subscribe(
        //          data => console.log('success'),
        //          error => console.log(error)
        //      );

        // const newCity = _.find(this.lookupCity, (city) =>
        // // tslint:disable-next-line:triple-equals
        // city.id ==  this.citySelected.id);
        // console.log('new city selected -> ', newCity);

        // const newMerchantType = _.find(this.lookupTipeMerchant, (tipeMerchant) =>
        // // tslint:disable-next-line:triple-equals
        // tipeMerchant.id ==  this.tipeMerchantSelected.id);
        // console.log('new merchant selected -> ', newMerchantType);

        // const newJenisUsaha = _.find(this.lookupJenisUsaha, (jenisUsaha) =>
        // // tslint:disable-next-line:triple-equals
        // jenisUsaha.id ==  this.jenisUsahaSelected.id);
        // console.log('new jenis usaha selected -> ', newJenisUsaha);

        // const newProvince = _.find(this.lookupProvince, (province) =>
        // // tslint:disable-next-line:triple-equals
        // province.id ==  this.provinceSelected.id);
        // console.log('new jenis province selected -> ', newProvince);

        // console.log('masuk saving');
        // this.merchantGroup.kabupatenKota = newCity.id;
        // this.merchantGroup.tipeMerchantLookup = newMerchantType.id;
        // this.merchantGroup.jenisUsahaLookup = newJenisUsaha.id;
        // this.merchantGroup.provinsiLookup = newProvince.id;
        // this.merchantGroup.merchantGroupFeeInfo.processingFeeLookup = this.processingFeeSelected.id;
        // this.merchantGroup.merchantGroupFeeInfo.mdrLookup = this.mdrSelected.id;
        // this.merchantGroup.merchantGroupSettlementInfo.reportSettlementConfigLookup = this.rptSetCfgSelected.id;
        // this.merchantGroup.merchantGroupSettlementInfo.settlementExecutionConfigLookup = this.settExecCfgSelected.id;
        // this.merchantGroup.merchantGroupSettlementInfo.sendReportViaLookup = this.sendRptViaSelected.id;

        // Image
        if (this.imageGroupPhotoChange === true ) {
            this.merchantGroup.groupPhoto = this.generateUrlImage(PHOTO_GROUP);
            console.log('URL PHOTO ===> ', this.merchantGroup.groupPhoto);
        }
        if (this.imageSiupChange === true) {
            this.merchantGroup.siup = this.generateUrlImage(PHOTO_SIUP);
        }
        if (this.imageNpwpChange === true) {
            this.merchantGroup.npwp = this.generateUrlImage(PHOTO_NPWP);
        }
        if (this.imageKtpChange === true) {
            this.merchantGroup.ktpDireksi = this.generateUrlImage(PHOTO_KTP);
        }
        if (this.imagePksChange === true) {
            this.merchantGroup.pks = this.generateUrlImage(PHOTO_PKS);
        }

        if (this.imageKtpPenanggungJawabChange === true) {
            this.merchantGroup.ktpPenanggungJawab = this.generateUrlImage(PHOTO_KTP_PENTANGGUNGJAWAB);
        }
        if (this.imageAktaPendirianChange === true) {
            this.merchantGroup.aktaPendirian = this.generateUrlImage(PHOTO_AKTA);
        }
        if (this.imageTandaDaftarPerusahaanChange === true) {
            this.merchantGroup.tandaDaftarPerusahaan = this.generateUrlImage(PHOTO_TANDA_DAFTAR_PERUSAHAAN);
        }
        if (this.imagePersetujuanMenkumhamChange === true) {
            this.merchantGroup.persetujuanMenkumham = this.generateUrlImage(PHOTO_PERSETUJUAN_MENKUMHAM);
        }

        // else {
        //     this.merchantGroup.groupPhoto = this.selectedFileGroupPhoto.file.name;
        //     this.merchantGroup.siup = this.selectedFileImgSiup.file.name;
        //     this.merchantGroup.npwp = this.selectedFileImgNpwp.file.name;
        //     this.merchantGroup.ktpDireksi = this.selectedFileImgKtp.file.name;
        //     this.merchantGroup.pks = this.selectedFileImgPks.file.name;
        // }

        // convert enablePartnerCustomerId
        if (this.merchantGroup.enablePartnerCustomerId == "true") {
            this.merchantGroup.enablePartnerCustomerId = JSON.parse(this.merchantGroup.enablePartnerCustomerId)
        } else {
            this.merchantGroup.enablePartnerCustomerId = JSON.parse(this.merchantGroup.enablePartnerCustomerId)
        }

        this.save();

    }

    save() {

        console.log('DATA MERCHANTGROUP ===>', this.merchantGroup);
        console.log("DATA CONFIG VA", this.merchantGroupVaInfo)
        this.merchantGroupService.save(this.merchantGroup)
            .subscribe(
                (res: HttpResponse<MerchantGroup>) => this.onSuccessSave(res.body),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.merchantGroupService.saveConfigVaRedis(this.merchantGroupVaInfo)
            .subscribe(
                (res: HttpResponse<MerchantGroupVaInfo>) => this.onSuccessSaveConfigVaRedis(res.body),
                (res: HttpErrorResponse) => this.onError(res.message)
            )
        console.log('keluar');
    }

    onSuccessSaveConfigVaRedis(result) {
        console.log("Result Save ConfigVaRedis =>", result)
    }

    onSuccessSave(result) {
        console.log('Result==>', result);

        if (result.errCode === '00') {
            // SIUP
            if (this.imageSiupChange === true) {
                this.uploadImageService.uploadImage(this.imgUrlSiup, PHOTO_SIUP, this.merchantGroup.noTelpPic);
            } 
            // NPWP
            if (this.imageNpwpChange === true) {
                this.uploadImageService.uploadImage(this.imgUrlNpwp, PHOTO_NPWP, this.merchantGroup.noTelpPic);
            }

            // PKS
            if (this.imagePksChange === true) {
                this.uploadImageService.uploadImage(this.imgUrlPks, PHOTO_PKS, this.merchantGroup.noTelpPic);
            }

            // KTP
            if (this.imageKtpChange === true) {
                this.uploadImageService.uploadImage(this.imgUrlKtp, PHOTO_KTP, this.merchantGroup.noTelpPic);
            }

            // GROUP PHOTO
            if (this.imageGroupPhotoChange === true) {
                this.uploadImageService.uploadImage(this.imgUrlGroupPhoto, PHOTO_GROUP, this.merchantGroup.noTelpPic);
            }

            // KTP PenanggungJawab
            if (this.imageKtpPenanggungJawabChange === true) {
                this.uploadImageService.uploadImage(
                    this.imgUrlKtpPenanggungJawab, PHOTO_KTP_PENTANGGUNGJAWAB, this.merchantGroup.noTelpPic);
            }

            // Akta Pendirian
            if (this.imageAktaPendirianChange === true) {
                this.uploadImageService.uploadImage(
                    this.imgUrlAktaPendirian, PHOTO_AKTA, this.merchantGroup.noTelpPic);
            } 

            // Tanda Daftar Perusahaan
            if (this.imageTandaDaftarPerusahaanChange === true) {
                this.uploadImageService.uploadImage(
                    this.imgUrlTandaDaftarPerusahaan, PHOTO_TANDA_DAFTAR_PERUSAHAAN, this.merchantGroup.noTelpPic);
            } 

            // Persetujuan MENKUMHAM
            if (this.imagePersetujuanMenkumhamChange === true) {
                this.uploadImageService.uploadImage(
                    this.imgUrlPersetujuanMenkumham, PHOTO_PERSETUJUAN_MENKUMHAM, this.merchantGroup.noTelpPic);
            } 

            this.ngxService.stop();
            Swal.fire('Success', 'Success add/edit Merchant Group', 'success').then(
                result => this.onBack()
            );

            // this.onBack();
        } else {
            this.ngxService.stop();
            console.log('Toast err', result.errDesc);
            Swal.fire('Error', result.errDesc, 'error');
            
        }

        
    }

    loadAllMerchant(page) {
        // start loader
        this.ngxService.start();

        console.log('Start call function all header');
        this.searchTermMerchant.page = page
        this.searchTermMerchant.merchantgroupId = this.idParams
        this.merchantService.listMerchantByGroup({
            filter: this.searchTermMerchant,
        })
            .subscribe(
                (res: HttpResponse<MerchantDto[]>) => this.onSuccessLoadMerchant(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message),
                () => { console.log('finally'); }
            );
    }

    private onSuccessLoadMerchant(data, headers) {
        // stop loader
        this.ngxService.stop();

        if (data.contents.length < 0) {
            return;
        }
        this.merchantList = data.contents;
        // for ( let i = 0 ; i < this.merchantList.length; i++ ) {
        //     this.merchantListId.push(this.merchantList[i].id)
        // }

        this.totalData = data.totalData;
        
    }

    onFilterMerchantList() {
        this.loadAllMerchant(this.curPage);
    }
    loadPageMerchantList() {
        this.loadAllMerchant(this.curPage);
        console.log(this.curPage);
    }

    openActivation(merchantGroup) {

        const modalRef = this.modalService.open(MerchantGroupModalComponent, { size: 'lg' });
        modalRef.componentInstance.objData = merchantGroup;

        modalRef.result.then((result) => {
            // this.curPage = 1;
            // this.loadListMerchant(this.curPage);
        }, (reason) => {
            // this.curPage = 1;
            // this.loadListMerchant(this.curPage);
        });
    }

    deactivate(merchantGroup) {
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
                this.portalService.deactivate({ value: merchantGroup.id.toString() }).subscribe((result) => {
                    const code = result.body.code.toString()
                    this.ngxService.stop();
                    if (code == '00') {
                        Swal.fire('Success', "Deactivation merchant Group success", 'success').then(
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

    reset(merchantGroup) {
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
                this.resetPassword.email = merchantGroup.emailPortal
                this.portalService.resetPasswordBp(this.resetPassword).subscribe((result) => {
                    this.ngxService.stop();
                    if (result.body.errCode == '00') {
                        Swal.fire('Success', 'Your password has been reset. Check your email for new password!', 'success').then(
                            () => this.onBack()
                        );
                    } else if (result.body.errCode == '05') {
                        Swal.fire('Failed', 'Invalid email address' + ' "' + merchantGroup.emailPortal + '"', 'error').then(
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

    activatedBpMerchant(id) {
        
        this.ngxService.start();
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to activate this merchant?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#00BFFF',
            confirmButtonText: 'Activate!'
        }).then((result) => {
            if (result.value) {
                this.merchantService.activasiMerchantByGroup({id:[id]}).subscribe((result) => {
                    const code = result.body.errCode.toString()
                    this.ngxService.stop();
                    if (code == '00') {
                        Swal.fire('Success', "Activation merchant success", 'success').then(
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

    deactivatedBpMerchant(id) {
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
                this.portalService.deactivate({ value: id.toString() }).subscribe((result) => {
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
}
