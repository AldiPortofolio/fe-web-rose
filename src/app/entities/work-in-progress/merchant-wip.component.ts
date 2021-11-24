import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Router } from '@angular/router';
import { MerchantGroupService } from '../merchant-group/merchant-group.service';
import { LookupDto } from '../lookup/lookup-dto.model';
import { LOOKUP_JENIS_USAHA, LOOKUP_PROVINCE, ID_TYPE, GENDER, PEKERJAAN, HOST_TYPE,
         LOOKUP_MERCHANT_CATEGORY_CODE,
         LOOKUP_DISTRICT,
         PHOTO_KTP,
         PHOTO_SELFIE,
         PHOTO_LOCATION,
         PHOTO_LOCATION_2,
         PHOTO_SIGN,
         PHOTO_LOGO,
         SERVER_LOAD_IMAGE,
         BUCKET_NAME,
         TOTAL_RECORD_PER_PAGE,
         PHOTO_LOCATION_LEFT,
         PHOTO_LOCATION_RIGHT,
         PHOTO_PREPRINTED_QR,
         PHOTO_PROFILE_PICTURE} from 'src/app/shared/constants/base-constant';
import { SETTLEMENT_CONFIG, LOOKUP_SEND_RPT_VIA, LOOKUP_RPT_SETT_CFG2, LOOKUP_SR_ID, LOOKUP_SETT_EXEC_CFG} from 'src/app/shared/constants/base-constant';
import { LOOKUP_PROCESSING_FEE, LOOKUP_MDR, LOOKUP_DEVICE_TYPE, LOOKUP_DEVICE_GROUP } from 'src/app/shared/constants/base-constant';
import { LOOKUP_DEVICE_BRAND, LOOKUP_PROCESSING_CONFIG  } from 'src/app/shared/constants/base-constant';
import { SERVER_PATH, TO_REGISTERED, TO_REGISTERED_MSG } from 'src/app/shared/constants/base-constant';
import { LOOKUP_TIPE_MERCHANT, OWNER_TITLE } from 'src/app/shared/constants/base-constant';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LookupService } from '../lookup/lookup.service';
import { MerchantService } from '../merchant/merchant.service';
import { Merchant } from '../merchant/merchant.model';
import { MerchantDetailOutletModalComponent } from '../merchant/merchant-detail-outlet-modal.component';
import { MerchantOutlet } from '../merchant/merchant-outlet.model';
import { MerchantPartner, MerchantTag, MerchantWip } from './merchant-wip.model';
import { WorkInProgressService } from './work-in-progress.service';
import { MerchantDetailOutletService } from '../merchant/merchant-detail-outlet.service';
import Swal from 'sweetalert2';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MerchantGroup } from '../merchant-group/merchant-group.model';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { Lookup } from '../lookup/lookup.model';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { Dati2Service } from '../dati2/dati2.service';
import { Provinsi } from '../provinsi/provinsi.model';
import { ProvinsiService } from '../provinsi/provinsi.service';
import { Dati2 } from '../dati2/dati2.model';
import { KecamatanService } from '../kecamatan/kecamatan.service';
import { Kecamatan } from '../kecamatan/kecamatan.model';
import { Kelurahan } from '../kelurahan/kelurahan.model';
import { KelurahanService } from '../kelurahan/kelurahan.service';
import { UploadImageService } from 'src/app/shared/upload-image.service';
import { MccService } from '../mcc/mcc.service';
import { Mcc } from '../mcc/mcc.model';

import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';
import { Subject, merge  } from 'rxjs';
import { text } from '@angular/core/src/render3';
import { Key } from 'protractor';
import { KategoriBisnis } from '../kategori-bisnis/ketegori-bisnis.model';
import { KategoriBisnisService } from '../kategori-bisnis/kategori-bisnis.service';
import { MerchantAggregatorDetailService } from '../merchant-aggregator/merchant-aggregator-detail/merchant-aggregator-detail.service';
import { MerchantAggregatorDetail } from '../merchant-aggregator-detail-approval/merchant-aggregator-detail.model';
import { UserCategoryService } from '../ottopay-4/user-category/user-category.service';
import { UserCategory } from '../ottopay-4/user-category/user-category.model';
import { SettlementConfig } from '../merchant/merchant-settlement-config.model';
import { AcquititionsService } from '../acquititions/acquititions.service';
import { Acquisition } from '../acquititions/acquititions.model';
import { MerchantGroupVaInfo } from '../merchant-group/merchant-group-va-info.model';

class ImageSnippet {
  constructor(public src: string, public file: File) { }
}

@Component({
  selector: 'op-merchant-wip',
  templateUrl: './merchant-wip.component.html',
  styleUrls: ['./merchant-wip.component.css'],
  providers: [NgbTypeahead] // add NgbTypeaheadConfig to the component providers
})
export class MerchantWipComponent implements OnInit {

    listStatus = [
        { code: "y", name: "active" },
        { code: "n", name: "inactive" },
    ]

    settlementConfigList = [
        { code: "8075", name: "Follow Group" },
        { code: "8076", name: "Individual" },
    ]

    processingConfigList = [
        { code: "7993", name: "Follow Group" },
        { code: "7994", name: "Individual" },
    ]

    listAuthType = [
        // { code: "0" , name: "-- Pilih Auth Type --"},
        { code: "Signature", name: "Signature" },
        { code: "Token", name: "Token" },
    ]

    disable = false;
    acquisition : Acquisition ;
    warning = [];
    srBefore = '';
    srAfter = '';
    mgBefore = '';
    mgAfter = '';
    categoryBefore = '';

    listStatusCallback = [
        { code: "y", name: "Enable" },
        { code: "n", name: "Disable" },
    ]

    listHostType = [
        // { code: "0" , name: "-- Pilih Host Type --"},
        { code: "billing_system", name: "Billing System" },
        { code: "technical_integrator", name: "Technical Integrator" },
        { code: "ottopay_topup_deposit", name: "OttoPay Topup Deposit" },
    ];

    listNotificationChannel = [
        { code: null, name: "- Pilih Notification Channel -" },
        { code: "None", name: "None" },
        { code: "Email", name: "Email" },
        { code: "WhatsApp", name: "WhatsApp" },
    ]

    channelPembayaran = {
        Bank: false,
        OttoAG: false,
        OttoPay: false,
    };

    provinsiSelected = '0';
    citySelected2 = '0';
    kecamatanSelected2 = '0';
    kelurahanSelected2 = '0';
    provinceOwnerSelected2 = '0';
    kabupatenOwnerSelected2 = '0';
    kecamatanOwnerSelected2 = '0';
    kelurahanOwnerSelected2 = '0';
    notificationchannelSelected : string = null;

    userCategorySelected = 'op'; //default category merchant is "op" (Ottopay)

    userCategoryList: UserCategory[] = [];
    listProvince: Provinsi[] = [];
    listCity: Dati2[] = [];
    listKecamatan: Kecamatan[] = [];
    listKelurahan: Kelurahan[] = [];
    listOwnerProvince: Provinsi[] = [];
    listOwnerCity: Dati2[] = [];
    listOwnerKecamatan: Kecamatan[] = [];
    listOwnerKelurahan: Kelurahan[] = [];

    listMcc: Mcc[] = [];

    listKategoriBisnis: KategoriBisnis[] = [];

    // ==========================================

    // Fill Default Data
    fillDefaultData = false;

    moduleName = '';
    statusView = 'Registered';
    nMid: string;
    searchTerm = {
        midFilter: '',
    }
    currPage = 1;
    totalRecord = 10;
    totalData = 0;
    linkCode = '';
    linkPartnerId = '';
    searchTermPartnerLink = {
        merchant_id: 0,
        code: '',
        partner_id: '',
        page: 1,
        limit: 10
    }
    totalDataAgg = 0

    showHideIcon = "eye-slash" ; 
    inputType = "password" ; 
    showHideIcon1 = "eye-slash" ; 
    inputType1 = "password" ; 
    imgKtpPath = 'mr_ktp';
    imgLocationPath = 'mr_image_location';
    imgLocation2Path = 'mr_image_location2';
    imgOutletPath = 'mr_outlet_path';
    imgSelfie = 'mr_selfie';
    imgSignPath = 'mr_sign_path';

    addMerchantOutlet = true;
    idMerchant: number;
    buttonSuspense = false;
    statusSuspense = true;
    merchant: Merchant;
    merchantOutlet: MerchantOutlet;
    merchantOutletList: MerchantOutlet[];
    merchantTag = ''
    merchantWip: MerchantWip;
    settlementConfig: SettlementConfig = {};
    statusRec: string  ;
    merchantGroup: MerchantGroup;
    partnerLinkList: Lookup[];
    partnerList: MerchantPartner[];

    // model for metodePembayaran
    metodePembayaran = {};

    // metodePembayaran = {
    //     'QR': false,
    //     'CHIP_BASED_E_MONEY': false,
    //     'DEBIT_CARD': false,
    //     'CREDIT_CARD': false
    // }

    // images config
    pathImgServer: String = SERVER_PATH + 'images/previewImage?data=';
    pathImgMerchantServer: String = SERVER_PATH + 'images/previewImageMerchant?data=';


    // imgUrl
    imgUrlMerchantKtpPath;
    imgUrlMerchantSelfiePath;
    imgUrlMerchantPhotoLocPath;
    imgUrlMerchantPhotoLoc2Path;
    imgUrlMerchantPhotoLocRight;
    imgUrlMerchantPhotoLocLeft;
    imgUrlMerchantSignaturePath;
    imgUrlMerchantLogoPath;
    imgUrlPreprintedQRPath;
    imgUrlProfilePicturePath;


    imageMerchantKtpPathChange: Boolean = false;
    imageMerchantSelfiePathChange: Boolean = false;
    imageMerchantPhotoLocPathChange: Boolean = false;
    imageMerchantPhotoLoc2PathChange: Boolean = false;
    imageMerchantPhotoLocLeftPathChange: Boolean = false;
    imageMerchantPhotoLocRightPathChange: Boolean = false;
    imageMerchantSignaturePathChange: Boolean = false;
    imageMerchantLogoPathChange: Boolean = false;
    imagePreprintedQRPathChange: Boolean = false;
    imageProfilePicturePathChange: Boolean = false;

    // initial for check button
    storeDataChecked = true;
    ownerDataChecked = false;
    settlementChecked = false;
    otherInfoChecked = false;
    outletChecked = false;
    otherChecked = false;
    editVaConfig = false;
    lookupTempl: LookupDto[];

    lookupTipeMerchant: LookupDto[] = [];
    // lookupProvince: LookupDto[] = [];
    lookupJenisUsaha: LookupDto[] = [];
    // lookupCity: LookupDto[] = [];
    // lookupKecamatan: LookupDto[] = [];
    lookupOwnerTitle: LookupDto[] = [];
    lookupIdType: LookupDto[] = [];
    lookupGender: LookupDto[] = [];
    lookupPekerjaan: LookupDto[] = [];
    lookupSettlementConfig: LookupDto[] = [];
    lookupReportSettlementConfig: LookupDto[] = [];
    lookupSettlementExecutionConfig: LookupDto[] = [];
    lookupSendRptVia: LookupDto[] = [];
    lookupMerchantCategoryCode: LookupDto[] = [];
    // lookupCity2: LookupDto[] = [];

    lookupProcessingConfig: LookupDto[] = [];
    lookupProcessingFee: LookupDto[] = [];
    lookupMDR: LookupDto[] = [];
    lookupDeviceType: LookupDto[] = [];
    lookupDeviceGroup: LookupDto[] = [];
    lookupDeviceBrand: LookupDto[] = [];
    lookupHostType: LookupDto[] = [];
    lookupSrId: LookupDto[] = [];

    lookupMerchantGroup: MerchantGroup[] = [];

    merchantAggregatorDetailList: MerchantAggregatorDetail[]
    merchantGroupVaInfo: MerchantGroupVaInfo;
    tipeMerchantUmkm: string;
    tipeMerchantModern: string;
    tipeMerchantECommerce: string;

    tipeMerchantSelected: string;
    jenisUsahaSelected = '0';
    kategoriBisnisSelected = '0'
    mccSelected = '5821';
    ownerTitleSelected = '0';
    idTypeSelected = '0';
    genderSelected = '0';
    pekerjaanselected = '0';
    settlementConfigSelected= "8076";
    reportSettlementConfigSelected= "17036";
    settlementExecutionConfigSelected= "8070";
    sendRptViaSelected: string;
    processingConfigSelected = '7993';
    processingFeeSelected= '8084';
    merchantCategoryCodeSelected: string;
    merchantCriteria: string;
    businessType: string;

    mdrSelected= '8082';
    deviceTypeSelected: string;
    deviceGroupSelected: string;
    deviceBrandSelected: string;
    // email: string;
    // sftpHost: string;
    // sftpUser: string;
    // sftpPassword: string;
    
    reportSettlementConfigName: string;
    settlementExecutionConfigName: string;

    merchantGroupSelected: number;
    merchantID: string;

    ownerTanggalExpiredID: NgbDateStruct; // temp var for this.merchant.owner.ownerTangalExpiredID
    ownerTanggalLahir: NgbDateStruct; // temp var for this.merchant.owner.ownerTanggalLahir
    seumurHidupChecked = false;

    closeResult: string;
    merchantId: string;

    totalDataOutlets = 0;
    totalRecordOutlets = TOTAL_RECORD_PER_PAGE;
    curPageOutlets = 1;
    readOnly: string;

    // defaultBelumDipilih: LookupDto = {
    //     name: "-- BELUM DI PILIH --",
    //     id: null
    // }

    submitted = false;
    
    // ===>> kategoriBisnis SEMENTARA DI HAPUS / DI HIDE <<===
    // mdtArrMWip = ['storeName', 'merchantType', 'jenisUsaha', 'kategoriBisnis', 'mcc', 'alamat', 'provinsi', 'kabupatenKota', 'kecamatan', 'kelurahan',
    // 'postalCode', 'longitude', 'latitude', 'storePhoneNumber', 'jamOperasional', 'merchantPan', 'referralCode', 
    // 'merchantCategoryCode', 'apiKey', 'secretID', 'notes', 'merchantGroupId'];

    mdtArrMWip = ['storeName', 'merchantType', 'jenisUsaha', 'kategoriBisnis', 'mcc', 'alamat', 'provinsi', 'kabupatenKota', 'kecamatan', 'kelurahan',
        'postalCode', 'longitude', 'latitude', 'storePhoneNumber', 'jamOperasional', 'merchantPan',
        'merchantCategoryCode', 'merchantGroupId'];

    mdtArrMWipLokasiBisnis = ['lokasiBisnis', 'jenisLokasiBisnis'];

    mdtArrOwnWip = ['ownerFirstName', 'ownerLastName', 'ownerAddress', 'ownerProvinsi', 'ownerKabupaten', 
    'ownerKecamatan', 'ownerKelurahan', 'ownerKodePos', 'ownerTipeID', 'ownerNoID', 'ownerTanggalExpiredID' , 'ownerJenisKelamin', 
        'ownerNoTelp', 'ownerTempatLahir', 'ownerTanggalLahir'];

    // mdtArrSetConfWIP = ['processingFeeValue', 'rentalEdcFee', 'mdrEmoneyOnUs', 'mdrEmoneyOffUs',
    //                     'mdrDebitOnUs', 'mdrDebitOffUs', 'mdrCreditOnUs', 'mdrCreditOffUs', 'otherFee', 'fmsFee',
    //                     'settlementConfig'];

    merchantLevelSelected;
    levels = [
        { code: '0', name: 'Merchant Silver' },
        { code: '10', name: 'Merchant Gold' },
        { code: '20', name: 'Merchant Platinum' },
        { code: '30', name: 'Merchant Diamond' },
        { code: '40', name: 'Sales Basic' },
        { code: '50', name: 'Sales Premium' },
        { code: '60', name: 'Agent Basic' },
        { code: '70', name: 'Agent Premium' },
    ];

    @ViewChild('instance') instance: NgbTypeahead;
    focus = new Subject<string>();
    click = new Subject<string>();

    formatter: any;
    search: any;

    apapun: any;

    constructor(
        private merchantService: MerchantService,
        private merchantWipService: WorkInProgressService,
        private router: Router,
        private merchantGroupService: MerchantGroupService,
        private modalService: NgbModal,
        private lookupService: LookupService,
        private ngxService: NgxUiLoaderService,
        private merchantDetailOutletService: MerchantDetailOutletService,
        private toastrService: ToastrService,
        private dati2Service: Dati2Service,
        private provinceService: ProvinsiService,
        private kecamatanService: KecamatanService,
        private kelurahanService: KelurahanService,
        private uploadImageService: UploadImageService,
        private mccService: MccService,
        private kategoriBisnisService: KategoriBisnisService,
        private merchantAggregatorDetailService: MerchantAggregatorDetailService,
        private userCategoryService: UserCategoryService,
        private acquisitionService: AcquititionsService,
        private configVaMerchantGroupService: MerchantGroupService,
        config: NgbTypeahead
    ) {
        config.showHint = true;
     }

    ngOnInit() {

        this.tipeMerchantSelected = '8079';
        this.merchantLevelSelected = this.levels[0].code;
        this.merchantGroupSelected = null;
        this.ownerTanggalLahir = null;

        // load all data provinces
        this.loadListProvince();
        this.lookupPartnerLink("on init");

        // this.mccSelected = '';
        this.loadListMcc();
        this.loadUserCategory();
        this.loadAllKategoriBisnis()
        this.moduleName = 'Merchant View';
        this.merchantOutlet = new MerchantOutlet();
        this.merchantOutletList = [];
        this.merchantService.dataSharing.subscribe(
            data => this.idMerchant = data
        );

        this.settlementConfig.reportSettlementConfigName = "Disable"

        // ====================================

        if (this.idMerchant !== 0) { // EDIT
            console.log("masuk edit")
            this.buttonSuspense = true;
            this.searchTermPartnerLink.merchant_id = this.idMerchant
            this.loadPartnerLink(1);
            this.find(this.idMerchant);
        } else { // ADD NEW
            console.log("masuk add new")
            this.loadLookup();
            this.loadLookupMerchantGroup();
            this.merchantWip = {};
            this.merchantWip.qris = 'y';
            this.merchantWip.debitPayment = 'n';
            this.merchantWip.creditPayment = 'n';
            this.merchantWip.vaTransactionType = 'op';
            this.merchantWip.vaBca = 'n';
            this.merchantWip.vaMandiri = 'n';
            this.merchantWip.vaBri = 'n';
            this.merchantWip.vaLain = 'n';
            this.merchantWip.vaOttoCash = 'n';
            this.merchantWip.vaShopeePay = 'n';
            this.merchantWip.vaLinkAja = 'n';
            this.merchantWip.ownerWIP = {};
            this.merchantWip.merchantGroupId = 0;
            this.merchantWip.callbackMerchant = 'n';
            this.merchantWip.vaAuthType = '0';
            this.merchantWip.hostType = '0';
            this.merchantWip.notificationChannel = null;
            this.merchantWip.settlementConfigWIP = {};
            this.disable = true
            this.mgBefore = null
            this.srBefore = null
            this.categoryBefore = null

            this.defaultTglExpiredId();
            this.defaultTglLahir();

            if (this.fillDefaultData) {
                this.loadDefaultData();
            } else {
                this.loadDefaultSettlemenConfig();
            }

        }

        console.log('hasil find --------->', this.merchantWip);
        this.statusRec = '';

        this.formatter = (result: Mcc) => result.code + ' - ' + result.name.toUpperCase();

        this.search = (text: Observable<string>) =>
            text.pipe(
                debounceTime(200),
                distinctUntilChanged(),
                map(term => term === '' ? this.listMcc
                    : this.listMcc.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1 || v.code.indexOf(term.toLowerCase()) > -1).splice(0, 10))
            );
       
    }

    cekTipeMerchant () {
       let tipeMerchant = '';
        console.log("list tipe merchant -------> ", this.lookupTipeMerchant)
        this.lookupTipeMerchant.forEach( tm => {
            // console.log(tm, this.merchant)
            // console.log(tm.id == this.merchantWip.merchantType)
            if ( tm.id.toString() == this.merchantWip.merchantType ) {
                tipeMerchant = tm.name
                // console.log(" nama tipe merchant ----------> ", tipeMerchant)
            }
        })
        
        if (tipeMerchant === 'UMKM') {
            this.disable = true
            if ( this.jenisUsahaSelected != '') {
                // let businessType 
                this.lookupJenisUsaha.forEach( el => {
                    if ( el.id.toString() == this.jenisUsahaSelected ) {
                        this.businessType = el.name
                    }
                })   
            
                let filter = {
                    page: 1,
                    limit: 999,
                    businessType: this.businessType
                }
                this.ngxService.start();
                this.acquisitionService.filter({filter: filter})
                    .subscribe(
                        (res: HttpResponse<Acquisition[]>) => this.onSuccessAcquisition(res.body, res.headers),
                        (res: HttpErrorResponse) => this.onError(res.message),
                        () => { 
                            this.ngxService.stop();
                            console.log('finally'); 
                        }
                    );
            }
            // console.log(this.disable)
        } 
    }

    reload(id) {
        console.log("masuk reload")
        this.idMerchant = id
        this.tipeMerchantSelected = 'null';
        this.merchantLevelSelected = this.levels[0].code;
        this.merchantGroupSelected = null;
        this.ownerTanggalLahir = null;

        // load all data provinces
        this.loadListProvince();
        this.lookupPartnerLink("reload");

        // this.mccSelected = '';
        this.loadListMcc();
        this.loadUserCategory();
        this.loadAllKategoriBisnis()
        this.moduleName = 'Merchant View';
        this.merchantOutlet = new MerchantOutlet();
        this.merchantOutletList = [];
        this.merchantService.dataSharing.subscribe(
            data => this.idMerchant = data
        );

        // ====================================

        if (this.idMerchant !== 0) { // EDIT
            // console.log("start id merchant not 0")
            this.buttonSuspense = true;
            this.searchTermPartnerLink.merchant_id = this.idMerchant
            this.loadPartnerLink(1);
            this.find(this.idMerchant);

        } else { // ADD NEW
            this.loadLookup();
            this.loadLookupMerchantGroup();
            this.merchantWip = {};
            this.merchantWip.ownerWIP = {};
            this.merchantWip.merchantGroupId = 0;

            this.merchantWip.settlementConfigWIP = {};

            this.defaultTglExpiredId();
            this.defaultTglLahir();

            if (this.fillDefaultData) {
                this.loadDefaultData();
            } else {
                this.loadDefaultSettlemenConfig();
            }

        }

        console.log('hasil find --------->', this.merchantWip);
        this.statusRec = '';

        this.formatter = (result: Mcc) => result.code + ' - ' + result.name.toUpperCase();

        this.search = (text: Observable<string>) =>
            text.pipe(
                debounceTime(200),
                distinctUntilChanged(),
                map(term => term === '' ? this.listMcc
                    : this.listMcc.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1 || v.code.indexOf(term.toLowerCase()) > -1).splice(0, 10))
            );

    }

    loadDefaultSettlemenConfig() {
        this.merchantWip.settlementConfigWIP = {
            processingFeeValue: 0,
            rentalEdcFee: 0,
            mdrCreditOffUs: 0,
            mdrCreditOnUs: 0,
            mdrDebitOffUs: 0,
            mdrDebitOnUs: 0,
            mdrEmoneyOffUs: 0,
            mdrEmoneyOnUs: 0,
            otherFee: 0,
            fmsFee: 0,
            email: '',
            sftpHost: '',
            sftpUser: '',
            sftpPassword: '',
        };
    }

    private loadListMcc() {
        this.ngxService.start();
        this.mccService.getAll().subscribe(
            (res: HttpResponse<Mcc[]>) => this.onSuccessMcc(res.body),
            (res: HttpErrorResponse) => this.onError(res.message),
            () => { console.log('finally'); }
        )
    }

    private loadUserCategory() {
        this.ngxService.start();
        this.userCategoryService.filter({
            filter: {
                page:1,
                limit: 99
            }
        }).subscribe(
            (res: HttpResponse<UserCategory[]>) => this.onSuccessUserCategory(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
        )
    }

    private loadListProvince() {
        this.ngxService.start();
        this.provinceService.getAll()
            .subscribe(
                (res: HttpResponse<Provinsi[]>) => this.onSuccessProvince(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message),
                () => { console.log('finally'); }
            );
    }
    

    private loadListCity(id) {
        this.ngxService.start();
        this.dati2Service.getByProvinsiId(id)
            .subscribe(
                (res: HttpResponse<MerchantGroup[]>) => this.onSuccessFilterCity(res.body),
                (res: HttpErrorResponse) => this.onErrorMG(res.message),
                () => { this.ngxService.stop(); console.log('Finally Dati2'); }
            );
    }

    private loadListKecamatan(id) {
        this.ngxService.start();
        this.kecamatanService.getByDati2Id(id).subscribe(
            (res: HttpResponse<MerchantGroup[]>) => this.onSuccessFilterKecamatan(res.body),
            (res: HttpErrorResponse) => this.onErrorMG(res.message),
            () => { this.ngxService.stop(); console.log('Finally Kecamatan'); }
        );
    }

    private loadListKelurahan(id) {
        this.ngxService.start();
        this.kelurahanService.getByKecamatanId(id).subscribe(
            (res: HttpResponse<MerchantGroup[]>) => this.onSuccessFilterKelurahan(res.body),
            (res: HttpErrorResponse) => this.onErrorMG(res.message),
            () => { this.ngxService.stop(); console.log('Finally Kelurahan'); }
        );
    }

    private loadListOwnerCity(id) {
        this.ngxService.start();
        this.dati2Service.getByProvinsiId(id)
            .subscribe(
                (res: HttpResponse<MerchantGroup[]>) => this.onSuccessFilterCity2(res.body),
                (res: HttpErrorResponse) => this.onErrorMG(res.message),
                () => { this.ngxService.stop(); console.log('Finally Dati2'); }
            );
    }


    private loadListOwnerKecamatan(id) {
        this.ngxService.start();
        this.kecamatanService.getByDati2Id(id).subscribe(
            (res: HttpResponse<MerchantGroup[]>) => this.onSuccessFilterKecamatan2(res.body),
            (res: HttpErrorResponse) => this.onErrorMG(res.message),
            () => { this.ngxService.stop(); console.log('Finally Kecamatan'); }
        );
    }

    private loadListOwnerKelurahan(id) {
        this.ngxService.start();
        this.kelurahanService.getByKecamatanId(id).subscribe(
            (res: HttpResponse<MerchantGroup[]>) => this.onSuccessFilterKelurahan2(res.body),
            (res: HttpErrorResponse) => this.onErrorMG(res.message),
            () => { this.ngxService.stop(); console.log('Finally Kelurahan'); }
        );
    }

    private loadKategoriBisnis(id) {
        this.ngxService.start();
        this.kategoriBisnisService.getByJenisUsahaId(id)
            .subscribe(
                (res: HttpResponse<KategoriBisnis[]>) => this.onSuccessFilterKategoriBisnis(res.body),
                (res: HttpErrorResponse) => this.onErrorMG(res.message),
                () => { this.ngxService.stop(); console.log('Finally Kategori Bisnis'); }
            );
    }

    private loadAllKategoriBisnis() {
        this.ngxService.start();
        this.kategoriBisnisService.getAllKategoriBisnis()
            .subscribe(
                (res: HttpResponse<KategoriBisnis[]>) => this.onSuccessFilterKategoriBisnis(res.body),
                (res: HttpErrorResponse) => this.onErrorMG(res.message),
                () => { this.ngxService.stop(); console.log('Finally Kategori Bisnis'); }
            );
    }

    loadAggregator(mid) {
        this.ngxService.start(); // start loader
        this.searchTerm.midFilter = mid
        this.merchantAggregatorDetailService.partnerName({
            filter: this.searchTerm,
        })
            .subscribe(
                (res: HttpResponse<MerchantAggregatorDetail[]>) => this.onSuccessAgg(res.body, res.headers),
                (res: HttpErrorResponse) => this.onErrorAgg(res.message)
            );
    }

    getMerchantTag(mid) {
        this.ngxService.start(); // start loader
        
        this.merchantWipService.getDataTag(mid)
            .subscribe(
                (res: HttpResponse<MerchantTag[]>) => {
                    console.log(" ini response get merchant tag ----->", res.body)
                    this.onSuccessMerchantTag(res.body, res.headers)
                },
                (res: HttpErrorResponse) => this.onErrorAgg(res.message)
            );
    }

    private onSuccessMerchantTag(data, headers) {
        this.ngxService.stop();
        
        if (data.contents.length < 0) {
            return;
        }
        
        for ( let i = 0 ; i < data.contents.length ; i++ ) {
        
            if (i == data.contents.length -1 ) {
                this.merchantTag += data.contents[i].name
            } else {
                this.merchantTag += data.contents[i].name + ", "
            }
        }

    }
    private onSuccessAgg(data, headers) {
        this.ngxService.stop();
        if (data.contents.length < 0) {
            return;
        }
        console.log(data);
        this.merchantAggregatorDetailList = data.contents;
        this.totalDataAgg = data.totalData;
    }

    private onErrorAgg(error) {
        this.ngxService.stop();
        console.log('error..', error);
    }

    private onSuccessUserCategory(data, headers) {
        this.ngxService.stop();
        if (data.contents.length < 0) {
            return;
        }
        console.log(data);
        this.userCategoryList = data.contents;
    }

    private onSuccessMcc(data) {
        this.listMcc = data;

        console.log("MCC", this.listMcc);
        this.ngxService.stop();
    }

    private onSuccessProvince(data, headers) {
        this.listProvince = data;
        this.listOwnerProvince = data;
        this.ngxService.stop();
    }

    private onSuccessFilterCity(data) {
        this.listCity = data;
        this.ngxService.stop();
    }

    private onSuccessFilterKecamatan(data) {
        this.listKecamatan = data;
        this.ngxService.stop();
    }

    private onSuccessFilterKelurahan(data) {
        this.listKelurahan = data;
        this.ngxService.stop();
    }

    private onSuccessFilterCity2(data) {
        this.listOwnerCity = data;
        this.ngxService.stop();
    }

    private onSuccessFilterKecamatan2(data) {
        this.listOwnerKecamatan = data;
        this.ngxService.stop();
    }

    private onSuccessFilterKelurahan2(data) {
        this.listOwnerKelurahan = data;
        this.ngxService.stop();
    }

    private onSuccessFilterKategoriBisnis(data) {
        console.log('listKategoriBisnis --> ', data)
        // this.listKategoriBisnis = data;
        this.listKategoriBisnis = data.contents;
        this.ngxService.stop();
    }
    

    loadDefaultData() {
        this.merchantWip = {
            agentID: 'DEFAULT',
            agentName: 'DEFAULT',
            alamat: 'jl. jalanan',
            apiKey: 'http://18.138.15.214:8080/rose/#/main/merchant/det',
            hostStatus: null,
            idMerchant: 354,
            institutionID: null,
            jamOperasional: '08.00-22.00',
            jenisLokasiBisnis: 'Toko bebas',
            jenisUsaha: 'AC dan Jasa Perbaikan Rumah',
            jenisUsahaName: null,
            kabupatenKota: 'KOTA BEKASI',
            kabupatenKotaName: null,
            kecamatan: 'jalanan',
            kelurahan: 'jalan',
            ktpPath: 'merchant/ktp',
            latitude: 'tunggu',
            logoPath: 'zjajhaha',
            lokasiBisnis: 'Planet bekasi',
            longitude: 'belum',
            merchantCategoryCode: '019010101',
            merchantGroupId: 7,
            merchantOutletID: '123123',
            merchantPhoto2Path: 'ansnam',
            merchantPhotoPath: 'janjanzjanz',
            merchantType: 'Modern',
            notes: 'notes',
            ownerWIP: {
                ownerAddress: 'jl. jalanan',
                ownerEmail: 'direktu@gmail.com',
                ownerFirstName: 'Echo',
                ownerJenisKelamin: 'Perempuan',
                ownerKabupaten: 'KOTA BEKASI',
                ownerKabupatenName: null,
                ownerKecamatan: 'suka suka',
                ownerKelurahan: 'jl. jalanan',
                ownerKodePos: '17131',
                ownerLastName: 'Echo',
                ownerNamaIbuKandung: 'Aisyha',
                ownerNoID: '123444',
                ownerNoTelp: '085342920295',
                ownerPekerjaan: 'Direktur',
                ownerProvinsi: 'Jawa Barat',
                ownerProvinsiName: null,
                ownerRt: '4',
                ownerRw: '3',
                ownerTanggalExpiredID: '2999-12-01T00:00:00.000Z',
                ownerTanggalLahir: '2019-06-15T00:00:00.000Z',
                ownerTelpLain: '1244',
                ownerTempatLahir: 'planet',
                ownerTipeID: 'Others',
                ownerTitle: 'Ibu'
            },
            postalCode: '17131',
            provinsi: 'Jawa Barat',
            provinsiName: null,
            reason: null,
            referralCode: '8989989898',
            secretID: '1233ww',
            secretQuestion: null,
            secretQuestionAnswer: null,
            selfiePath: 'qghsqhjs',
            settlementConfigWIP: {
                mdr: 'Percentage',
                mdrCreditOffUs: -10,
                mdrCreditOnUs: 5,
                mdrDebitOffUs: -10,
                mdrDebitOnUs: -10,
                mdrEmoneyOffUs: 10,
                mdrEmoneyOnUs: 10,
                namaBankTujuanSettlement: 'Mandisendiri',
                namaPemilikRekening: 'Echo',
                noRekeningToko: '12345678910',
                otherFee: 5,
                fmsFee: 3,
                processingConfiguration: 'Follow Group',
                processingConfigurationName: null,
                processingFee: 'Percentage',
                processingFeeValue: 6,
                rentalEdcFee: 20000,
                reportSettlementConfig2: '17059',
                reportSettlementConfigName: 'Disable',
                sendReportUrl: 'Doc',
                sendReportVia: 'FTP',
                settlementConfig: 'Individual',
                settlementConfigName: null,
                settlementExecutionConfig: 'H+2',
                settlementExecutionConfigName: null,
                status: 1,
                tipeRekening: 'Apaaja',
                email: '',
                sftpHost: '',
                sftpUser:'',
                sftpPassword:''
            },
            signPath: 'anbahghs',
            statusRegistration: 'REGISTERED',
            storeName: 'toko default',
            storePhoneNumber: '085342920295',
            partnerCustomerId: '0'
        };
    }

  // load all lookup data for merchant
    loadLookup() {
        this.ngxService.start();
        console.log('Start call lookup');
        this.lookupService.findForMerchantGroup()
        .subscribe(
            (res: HttpResponse<LookupDto[]>) => this.onSuccessLookup({ data: res.body, headers: res.headers }),
            (res: HttpErrorResponse) => this.onError(res.message),
            () => { 
                this.ngxService.stop(); 
                this.cekTipeMerchant()
                console.log('finally'); 
            }
        );
    }

    loadLookupMerchantGroup() {
        this.ngxService.start();
        this.merchantGroupService.query({
            page: 1,
            count: 1000,
        }).subscribe(
                (res: HttpResponse<MerchantGroup[]>) => this.onSuccessMG(res.body, res.headers),
                (res: HttpErrorResponse ) => this.onErrorMG(res.message),
                () => { 
                    this.ngxService.stop();
                    console.log("------------ processisng config",this.processingConfigSelected)
                    if (this.processingConfigSelected == '7993') {
                        if (this.merchantWip.id !== 0) {
                            // this.editVaConfig = true;
                            this.processingConfigChanged()
                        }
                    } 
                    console.log('Finally MG');
                }
        );
    }

    private onSuccessMG(data, headers) {
        this.lookupMerchantGroup = data.content;
        console.log("CEK MERCHANTWIP", this.merchantWip);
        if (this.idMerchant === 0) {
            this.merchantGroupSelected = null;
            this.mgBefore = null
        } else {
            this.merchantGroupSelected = this.merchantWip.merchantGroup.id;
            
            this.lookupMerchantGroup.forEach( mg => {
                if (this.merchantGroupSelected == mg.id) {
                    this.mgBefore = mg.merchantGroupName
                }
            })
        }
    }

  // fill data on merchant group service if success
    private onSuccessLookup({ data, headers }) {
        this.lookupTempl = data;
        console.log(this.lookupTempl , "---------------------------->")
        this.breakLookup();
    }

  // start break lookup
    breakLookup() {
        this.lookupTempl.forEach(lookupdt => {
        if (lookupdt.lookupGroupString === LOOKUP_JENIS_USAHA) {
            this.lookupJenisUsaha.push(lookupdt);
        }
        // if (lookupdt.lookupGroupString === LOOKUP_PROVINCE) {
        //     this.lookupProvince.push(lookupdt);
        // }
        if (lookupdt.lookupGroupString === LOOKUP_TIPE_MERCHANT) {
            // tslint:disable-next-line:triple-equals
            if (lookupdt.name == 'UMKM') {
                this.tipeMerchantUmkm = lookupdt.id;
                console.log('Tipemerchant umkm', this.tipeMerchantUmkm);
            }
            // tslint:disable-next-line:triple-equals
            if (lookupdt.name == 'Modern') {
                this.tipeMerchantModern = lookupdt.id;
            }
            // tslint:disable-next-line:triple-equals
            if (lookupdt.name == 'eCommerce') {
                this.tipeMerchantECommerce = lookupdt.id;
            }
            this.lookupTipeMerchant.push(lookupdt);
        }
        // if (lookupdt.lookupGroupString === LOOKUP_CITY) {
        //     this.lookupCity.push(lookupdt);
        // }
        if (lookupdt.lookupGroupString === OWNER_TITLE) {
            this.lookupOwnerTitle.push(lookupdt);
        }
        if (lookupdt.lookupGroupString === ID_TYPE) {
            this.lookupIdType.push(lookupdt);
        }
        if (lookupdt.lookupGroupString === GENDER) {
            this.lookupGender.push(lookupdt);
        }
        if (lookupdt.lookupGroupString === PEKERJAAN) {
            this.lookupPekerjaan.push(lookupdt);
        }
        if (lookupdt.lookupGroupString === SETTLEMENT_CONFIG) {
            // console.log('settlement configgg ', lookupdt);
            this.lookupSettlementConfig.push(lookupdt);
        }
        if (lookupdt.lookupGroupString === LOOKUP_RPT_SETT_CFG2) {
            console.log('report settlement configgg ', lookupdt);
            this.lookupReportSettlementConfig.push(lookupdt);
        }
        if (lookupdt.lookupGroupString === LOOKUP_SETT_EXEC_CFG) {
            this.lookupSettlementExecutionConfig.push(lookupdt);
        }
        if (lookupdt.lookupGroupString === LOOKUP_SEND_RPT_VIA) {
            this.lookupSendRptVia.push(lookupdt);
        }
        if (lookupdt.lookupGroupString === LOOKUP_PROCESSING_CONFIG) {
            this.lookupProcessingConfig.push(lookupdt);
        }
        if (lookupdt.lookupGroupString === LOOKUP_PROCESSING_FEE) {
            this.lookupProcessingFee.push(lookupdt);
        }
        if (lookupdt.lookupGroupString === LOOKUP_MDR) {
            this.lookupMDR.push(lookupdt);
        }
        if (lookupdt.lookupGroupString === LOOKUP_DEVICE_TYPE) {
            this.lookupDeviceType.push(lookupdt);
        }
        if (lookupdt.lookupGroupString === LOOKUP_DEVICE_GROUP) {
            this.lookupDeviceGroup.push(lookupdt);
        }
        if (lookupdt.lookupGroupString === LOOKUP_DEVICE_BRAND) {
            this.lookupDeviceBrand.push(lookupdt);
        }
        if (lookupdt.lookupGroupString === HOST_TYPE) {
            this.lookupHostType.push(lookupdt);
        }
        if (lookupdt.lookupGroupString === LOOKUP_MERCHANT_CATEGORY_CODE) {
            this.lookupMerchantCategoryCode.push(lookupdt);
        }
        if (lookupdt.lookupGroupString === LOOKUP_SR_ID) {
            this.lookupSrId.push(lookupdt);
        }


        // if (lookupdt.lookupGroupString === LOOKUP_RPT_SETT_CFG) {
        //     // console.log(lookupdt);
        //     this.lookupRptSetCfg.push(lookupdt);
        // }
        // if (lookupdt.lookupGroupString === LOOKUP_SETT_EXEC_CFG) {
        //     // console.log(lookupdt);
        //     this.lookupSettExecCfg.push(lookupdt);
        // }
        // if (lookupdt.lookupGroupString === LOOKUP_SEND_RPT_VIA) {
        //     // console.log(lookupdt);
        //     this.lookupSendRptVia.push(lookupdt);
        // }
        });
        console.log('finish breakLookup ');
        // if (this.lookupJenisUsaha.length < 1) {
        //     console.log('Lookup kosong ');
        // }
        // this.toastrService.success('Finish', 'Breaklookup finish');
        this.checkLookupValid();
        this.defaultConfig();

    }

    checkLookupValid(): void {
        if ( this.lookupTipeMerchant.length < 1 ) {
            this.toastrService.error('Error', 'Lookup Type Merchant EMPTY');
        }

        // if (this.lookupProvince.length < 1 ) {
        //     this.toastrService.error('Error', 'Lookup Province EMPTY');
        // }

        if (this.lookupJenisUsaha.length < 1 ) {
            this.toastrService.error('Error', 'Lookup Jenis Usaha EMPTY');
        }
        // if (this.lookupCity.length < 1 ) {
        //     this.toastrService.error('Error', 'Lookup City EMPTY');
        // }
        
        if (this.lookupOwnerTitle.length < 1 ) {
            this.toastrService.error('Error', 'Lookup Owner Title EMPTY');
        }
        if (this.lookupIdType.length < 1 ) {
            this.toastrService.error('Error', 'Lookup Id Type EMPTY');
        }
        if (this.lookupGender.length < 1 ) {
            this.toastrService.error('Error', 'Lookup Gender EMPTY');
        }
        if (this.lookupPekerjaan.length < 1 ) {
            this.toastrService.error('Error', 'Lookup Pekerjaan EMPTY');
        }
        if (this.lookupSettlementConfig.length < 1 ) {
            this.toastrService.error('Error', 'Lookup Settlement Confg EMPTY');
        }
        if (this.lookupReportSettlementConfig.length < 1 ) {
            this.toastrService.error('Error', 'Lookup Report Settlement EMPTY');
        }
        if (this.lookupSettlementExecutionConfig.length < 1 ) {
            this.toastrService.error('Error', 'Lookup Settlement Exec Config EMPTY');
        }
        if (this.lookupSendRptVia.length < 1 ) {
            this.toastrService.error('Error', 'Lookup Send Rpt Via EMPTY');
        }
        if (this.lookupMerchantCategoryCode.length < 1 ) {
            this.toastrService.error('Error', 'Lookup Merchant Category EMPTY');
        }

        if (this.lookupProcessingConfig.length < 1 ) {
            this.toastrService.error('Error', 'Lookup Processing Cfg EMPTY');
        }
        if (this.lookupProcessingFee.length < 1 ) {
            this.toastrService.error('Error', 'Lookup Proccesing Fee EMPTY');
        }
        if (this.lookupMDR.length < 1 ) {
            this.toastrService.error('Error', 'Lookup MDR EMPTY');
        }
        if (this.lookupDeviceType.length < 1 ) {
            this.toastrService.error('Error', 'Lookup Device Type EMPTY');
        }
        if (this.lookupDeviceGroup.length < 1 ) {
            this.toastrService.error('Error', 'Lookup Device Group EMPTY');
        }
        if (this.lookupDeviceBrand.length < 1 ) {
            this.toastrService.error('Error', 'Lookup Device Brand EMPTY');
        }
        if (this.lookupHostType.length < 1 ) {
            this.toastrService.success('Error', 'Lookup Host Type EMPTY');
        }
    }

    defaultConfig(): void {
        console.log('next proc after break lookup ===> ', this.merchantWip);
        console.log('idMerchant', this.idMerchant);
        if (this.idMerchant === 0) {
            console.log('params == 0');
            // this.tipeMerchantSelected = this.lookupTipeMerchant[0].id;
            // this.jenisUsahaSelected = this.lookupJenisUsaha[0].id;
            // this.ownerTitleSelected = this.lookupOwnerTitle[0].id;
            console.log('owner title selected-->', this.lookupOwnerTitle[0].id);
            this.mdrSelected = this.lookupMDR[0].id;
            this.processingConfigSelected = this.lookupProcessingConfig[0].id;
            // this.processingConfigSelected = "7993";
            this.processingFeeSelected = this.lookupProcessingFee[0].id;
            this.settlementConfigSelected = this.lookupSettlementConfig[1].id;
            // this.settlementConfigSelected = "8075";
            this.reportSettlementConfigSelected = this.lookupReportSettlementConfig[0].id;
            this.settlementExecutionConfigSelected = this.lookupSettlementExecutionConfig[0].id;
            this.sendRptViaSelected = this.lookupSendRptVia[0].id;
            this.merchantCriteria = this.lookupMerchantCategoryCode[0].id;
            console.log(this.merchantCriteria)

            // this.idTypeSelected = this.lookupIdType[0].id;
            // this.genderSelected = this.lookupGender[0].id;
            // this.pekerjaanselected = this.lookupPekerjaan[0].id;

            // this.merchantGroup = new MerchantGroup();
            // this.merchantGroup.id = 0;
            console.log('finish selected');
        } else {
            
            if (this.merchantWip !== undefined) {
                
                this.setComboSelected(this.merchantWip);

                // DONE this.setTipeMerchantSelected(this.merchantWip.merchantType);
                // this.setProvinceSelected(this.merchantWip.provinsi);
                // this.setCitySelected(this.merchantWip.kabupatenKota);
                // this.setOwnerTitleSelectedSelected(this.merchantWip.ownerWIP.ownerTitle);
                // this.setProvinceOwnerSelected(this.merchantWip.ownerWIP.ownerProvinsi);
                // this.setKabupatenSelected(this.merchantWip.ownerWIP.ownerKabupaten);
                // this.setIdTypeSelected(this.merchantWip.ownerWIP.ownerTipeID);
                // this.setGenderSelected(this.merchantWip.ownerWIP.ownerJenisKelamin);
                // this.setPekerjaanselected(this.merchantWip.ownerWIP.ownerPekerjaan);

                // this.setProccessingFeeSelected(this.merchantWip.settlementConfigWIP.processingFee);
                // this.setMdrSelected(this.merchantWip.settlementConfigWIP.mdr);
                // this.setProcessingConfigSelected(this.merchantWip.settlementConfigWIP.processingConfiguration);
                // this.setReportSettlementConfigSelected(this.merchantWip.settlementConfigWIP.reportSettlementConfig);
                // this.setSettlementExecutionConfigSelected(this.merchantWip.settlementConfigWIP.settlementExecutionConfig);
                // this.setSendRptViaSelected(this.merchantWip.settlementConfigWIP.sendReportVia);
                // this.setSettlementConfigSelected(this.merchantWip.settlementConfigWIP.settlementConfig);
                console.log('finish set selected ');
            }

        }
    }

    setComboSelected(merchantWip: MerchantWip): void {
        console.log("COBA",merchantWip);
        // this.setComboSelectedTipeMerchant(merchantWip.merchantType);
        // this.setComboSelectedJenisUsaha(merchantWip.jenisUsaha);
        // this.setComboSelectedProvince(merchantWip.provinsi);
        // this.setComboSeletedCity(merchantWip.kabupatenKota);

        this.tipeMerchantSelected = this.setComboSelectedLookup(this.lookupTipeMerchant, merchantWip.merchantType);
        this.jenisUsahaSelected = this.setComboSelectedLookup(this.lookupJenisUsaha, merchantWip.jenisUsaha);
        // this.loadKategoriBisnis(this.jenisUsahaSelected);

        console.log('jenisUsahaSelected -->', this.jenisUsahaSelected);
        // this.provinceSelected = this.setComboSelectedLookup(this.lookupProvince, merchantWip.provinsi);
        // this.citySelected = this.setComboSelectedLookup(this.lookupCity, merchantWip.kabupatenKota);
        // this.kecamatanSelected = this.setComboSelectedLookup(this.lookupKecamatan, merchantWip.merchantType);
        this.ownerTitleSelected = this.setComboSelectedLookup(this.lookupOwnerTitle, merchantWip.ownerWIP.ownerTitle);
        // this.provinceOwnerSelected = this.setComboSelectedLookup(this.lookupProvince, merchantWip.ownerWIP.ownerProvinsi);
        // this.kabupatenOwnerSelected = this.setComboSelectedLookup(this.lookupCity, merchantWip.ownerWIP.ownerKabupaten);
        this.idTypeSelected = this.setComboSelectedLookup(this.lookupIdType, merchantWip.ownerWIP.ownerTipeID);
        this.genderSelected = this.setComboSelectedLookup(this.lookupGender, merchantWip.ownerWIP.ownerJenisKelamin);
        this.pekerjaanselected = this.setComboSelectedLookup(this.lookupPekerjaan, merchantWip.ownerWIP.ownerPekerjaan);
        // this.settlementConfigSelected =
        //         this.setComboSelectedLookup(this.lookupSettlementConfig, merchantWip.settlementConfigWIP.settlementConfig);
        // this.reportSettlementConfigSelected =
        //         this.setComboSelectedLookup(this.lookupReportSettlementConfig, merchantWip.settlementConfigWIP.reportSettlementConfig2);
        // this.settlementExecutionConfigSelected =
        //             this.setComboSelectedLookup(this.lookupSettlementExecutionConfig,
        //                  merchantWip.settlementConfigWIP.settlementExecutionConfig);
        this.sendRptViaSelected = this.setComboSelectedLookup(this.lookupSendRptVia, merchantWip.settlementConfigWIP.sendReportVia);
        // this.processingFeeSelected = this.setComboSelectedLookup(this.lookupProcessingFee, merchantWip.settlementConfigWIP.processingFee);
        // this.mdrSelected = this.setComboSelectedLookup(this.lookupMDR, merchantWip.settlementConfigWIP.mdr);
        // this.processingConfigSelected =
        //             this.setComboSelectedLookup(this.lookupProcessingConfig, merchantWip.settlementConfigWIP.processingConfiguration);
        // if (merchantWip.settlementConfigWIP.processingConfiguration === "" || merchantWip.settlementConfigWIP.processingConfiguration === null ) {
        //     console.log(this.processingConfigSelected)
        // } else {
        //     this.processingConfigSelected =
        //             this.setComboSelectedLookup(this.lookupProcessingConfig, merchantWip.settlementConfigWIP.processingConfiguration);
        // }

        if (merchantWip.settlementConfigWIP.reportSettlementConfig2 === "" || merchantWip.settlementConfigWIP.reportSettlementConfig2 === null ) {
            console.log(this.reportSettlementConfigSelected)
        } else {
            this.reportSettlementConfigSelected =
                this.setComboSelectedLookup(this.lookupReportSettlementConfig, merchantWip.settlementConfigWIP.reportSettlementConfig2);
        }

        if (merchantWip.settlementConfigWIP.settlementExecutionConfig === "" || merchantWip.settlementConfigWIP.settlementExecutionConfig === null ) {
            console.log(this.settlementExecutionConfigSelected)
        } else {
            this.settlementExecutionConfigSelected =
                    this.setComboSelectedLookup(this.lookupSettlementExecutionConfig,
                         merchantWip.settlementConfigWIP.settlementExecutionConfig);
        }

        if (merchantWip.settlementConfigWIP.processingFee === "" || merchantWip.settlementConfigWIP.processingFee == null ) {
            console.log(this.processingFeeSelected)
        } else {
            this.processingFeeSelected = this.setComboSelectedLookup(this.lookupProcessingFee, merchantWip.settlementConfigWIP.processingFee);
        }
        
        if (merchantWip.settlementConfigWIP.mdr === "" || merchantWip.settlementConfigWIP.mdr == null ) {
            console.log(this.mdrSelected)
        } else {
            this.mdrSelected = this.setComboSelectedLookup(this.lookupMDR, merchantWip.settlementConfigWIP.mdr);
        }

        // if (merchantWip.settlementConfigWIP.settlementConfig === "" || merchantWip.settlementConfigWIP.settlementConfig == null ) {
        //     console.log("INI SETTLEMENT CONFIG",this.settlementConfigSelected)
        // } else {
        //     this.settlementConfigSelected = this.setComboSelectedLookup(this.lookupMDR, merchantWip.settlementConfigWIP.settlementConfig);
        // }

        console.log('merch cat code ', this.merchantWip.merchantCategoryCode);
        console.log('merch lookup cat code ', this.lookupMerchantCategoryCode);

        this.merchantCriteria = this.setComboSelectedLookup(this.lookupMerchantCategoryCode, merchantWip.merchantCategoryCode);
        this.kategoriBisnisSelected = this.merchantWip.kategoriBisnis;

    }

    setComboSelectedLookup(lookupData: LookupDto[], name: string) {
        console.log('rescombo222--->', lookupData, name);
        const result = _.find(lookupData, (lookup) => String(lookup.id) === name);
        // console.log('Finishhhh .... =====??', result);
        if (result === undefined) {
            // this.toastrService.error('Error', 'Set combo ERROR, data-ID [' + name + '] not Found in Lookup ' + lookupData[0].lookupGroupString);
            // return lookupData[0].id;
            return '0';
        }
        if (lookupData.length < 1) {
            const data = new LookupDto();
            // ('0', '999', 'A', 'A');

            data.id = '0';
            data.code = '999';
            data.lookupGroupString = 'DATA NOT FOUND !!!!';
            data.name = 'DATA NOT FOUND IN DATABASE !!!';
            lookupData.push(data);
        }
        // if (result === undefined) {
        //     this.toastrService.error('Error', 'Set combo ERROR, data-ID [' + name + '] not Found in Lookup ' +
        //         lookupData[0].lookupGroupString);
        //     return lookupData[0].id;
        // }
        return result.id;
    }

    // setComboSelectedTipeMerchant(name: string) {
    //     // tslint:disable-next-line:triple-equals
    //     const result = _.find(this.lookupTipeMerchant, (lookup) => lookup.name === name);
    //     this.tipeMerchantSelected = result.id;
    // }

    // setComboSelectedJenisUsaha(name: string): void {
    //     const result = _.find(this.lookupJenisUsaha, (lookup) => lookup.name === name);
    //     this.jenisUsahaSelected = result.id;

    // }

    // setComboSelectedProvince(name) {
    //     // tslint:disable-next-line:triple-equals
    //     const result = _.find(this.lookupProvince, (lookup) => lookup.name === name);
    //     console.log('hasil lodash province -> ', result);
    //     this.provinceSelected = result.id;
    // }

    // setComboSeletedCity(name) {
    //     // tslint:disable-next-line:triple-equals
    //     const result = _.find(this.lookupCity, (lookup) => lookup.name === name);
    //     this.citySelected = result.id;
    // }


    // setSendRptViaSelected(name) {
    //     // tslint:disable-next-line:triple-equals
    //     const result = _.find(this.lookupSendRptVia, (lookup) => lookup.name == name);
    //     this.sendRptViaSelected = _.clone(result);
    // }

    // setSettlementConfigSelected(name) {
    //     // tslint:disable-next-line:triple-equals
    //     const result = _.find(this.lookupSettlementConfig, (lookup) => lookup.name == name);
    //     this.settlementConfigSelected = _.clone(result);
    // }

    // setSettlementExecutionConfigSelected(name) {
    //     // tslint:disable-next-line:triple-equals
    //     const result = _.find(this.lookupSettlementExecutionConfig, (lookup) => lookup.name == name);
    //     this.settlementExecutionConfigSelected = _.clone(result);
    // }

    // setReportSettlementConfigSelected(name) {
    //     // tslint:disable-next-line:triple-equals
    //     const result = _.find(this.lookupReportSettlementConfig, (lookup) => lookup.name == name);
    //     this.reportSettlementConfigSelected = _.clone(result);
    // }

    // setProcessingConfigSelected(name) {
    //     // tslint:disable-next-line:triple-equals
    //     const result = _.find(this.lookupProcessingConfig, (lookup) => lookup.name == name);
    //     this.processingConfigSelected = _.clone(result);
    // }

    // setMdrSelected(name) {
    //     // tslint:disable-next-line:triple-equals
    //     const result = _.find(this.lookupMDR, (lookup) => lookup.name == name);
    //     this.mdrSelected = _.clone(result);
    // }

    // setProccessingFeeSelected(name) {
    //     // tslint:disable-next-line:triple-equals
    //     const result = _.find(this.lookupProcessingFee, (lookup) => lookup.name == name);
    //     this.processingFeeSelected = _.clone(result);
    // }


    // setPekerjaanselected(name) {
    //     // tslint:disable-next-line:triple-equals
    //     const result = _.find(this.lookupPekerjaan, (lookup) => lookup.name == name);
    //     this.pekerjaanselected = _.clone(result);
    // }

    // setGenderSelected(name) {
    //     // tslint:disable-next-line:triple-equals
    //     const result = _.find(this.lookupGender, (lookup) => lookup.name == name);
    //     this.genderSelected = _.clone(result);
    // }

    // setIdTypeSelected(name) {
    //     // tslint:disable-next-line:triple-equals
    //     const result = _.find(this.lookupIdType, (lookup) => lookup.name == name);
    //     this.idTypeSelected = _.clone(result);
    // }

    // setKabupatenSelected(name) {
    //     // tslint:disable-next-line:triple-equals
    //     const result = _.find(this.lookupCity, (lookup) => lookup.name == name);
    //     this.kabupatenOwnerSelected = _.clone(result);
    // }

    // setProvinceOwnerSelected(name) {
    //     // tslint:disable-next-line:triple-equals
    //     const result = _.find(this.lookupProvince, (lookup) => lookup.name == name);
    //     this.provinceOwnerSelected = _.clone(result);
    // }

    // setOwnerTitleSelectedSelected(name) {
    //     // tslint:disable-next-line:triple-equals
    //     const result = _.find(this.lookupOwnerTitle, (lookup) => lookup.name == name);
    //     this.ownerTitleSelected = _.clone(result);
    // }

    // setCitySelected(name) {
    //     // tslint:disable-next-line:triple-equals
    //     const result = _.find(this.lookupCity, (lookup) => lookup.name == name);
    //     this.citySelected = _.clone(result);
    // }

    // setProvinceSelected(name) {
    //     // tslint:disable-next-line:triple-equals
    //     const result = _.find(this.lookupProvince, (lookup) => lookup.name == name);
    //     this.provinceSelected = _.clone(result);
    // }

    // setJenisUsahaSelected(name) {
    //     // tslint:disable-next-line:triple-equals
    //     const result = _.find(this.lookupJenisUsaha, (lookup) => lookup.name == name);
    //     console.log('hasil lodash jenis usaha -> ', result);
    //     this.jenisUsahaSelected = _.clone(result);
    // }

    // setTipeMerchantSelected(name) {
    //     // tslint:disable-next-line:triple-equals
    //     const result = _.find(this.lookupTipeMerchant, (lookup) => lookup.name == name);
    //     this.tipeMerchantSelected = _.clone(result);
    // }

    find(id) {
        // start loader
        this.ngxService.start();
        console.log("masuk find merchant")
        this.merchantService.find(id)
        .subscribe(
            (res: HttpResponse<Merchant>) => this.onSuccess(res.body),
            (res: HttpErrorResponse) => { this.ngxService.stop(); this.onError(res.message); } ,
        );
    }

    // fill data merchant after load
    onSuccess(merchant) {
        
        console.log('merchant di onSuccess:', merchant);
        console.log('MPAN di onSuccess:', merchant.merchantPan);
        this.loadLookup();
        this.statusSuspense = merchant.statusSuspense;
        this.merchantWip = merchant;
        this.loadLookupMerchantGroup();
        this.loadImageMerchant(merchant);
        this.merchantWip.ownerWIP = merchant.owner;
        this.merchantWip.settlementConfigWIP = merchant.settlementConfig;
        this.merchantGroupSelected = merchant.merchantGroup.id;
        this.ownerTitleSelected = merchant.owner.title;
         // convert all string date to date
        console.log("sampai sini")
        this.convertToDate();
        this.userCategorySelected = merchant.category;

        this.provinsiSelected = merchant.provinsi;
        this.citySelected2 = merchant.kabupatenKota;
        this.kecamatanSelected2 = merchant.kecamatan;
        this.kelurahanSelected2 = merchant.kelurahan;
        this.provinceOwnerSelected2 = merchant.owner.ownerProvinsi;
        this.kabupatenOwnerSelected2 = merchant.owner.ownerKabupaten;
        this.kecamatanOwnerSelected2 = merchant.owner.ownerKecamatan;
        this.kelurahanOwnerSelected2 = merchant.owner.ownerKelurahan;
        this.mccSelected = merchant.mcc;
        this.notificationchannelSelected = merchant.notificationChannel;
        this.merchantGroup = merchant.merchantGroup;
        this.kategoriBisnisSelected = merchant.kategoriBisnis;
        this.jenisUsahaSelected = merchant.jenisUsaha;
        this.getMerchantTag(merchant.merchantOutletID)
        this.loadListCity(this.provinsiSelected);
        this.loadListKecamatan(this.citySelected2);
        this.loadListKelurahan(this.kecamatanSelected2);
        this.loadListOwnerCity(this.provinceOwnerSelected2);
        this.loadListOwnerKecamatan(this.kabupatenOwnerSelected2);
        this.loadListOwnerKelurahan(this.kecamatanOwnerSelected2);
        this.loadAggregator(this.merchantWip.merchantOutletID)
        this.loadMerchantOutletByMerchant(this.merchantWip.id);
        
        if (merchant.approvalStatus == 1) {
            console.log("cek approval status")
            this.readOnly = 'true';
            this.addMerchantOutlet = false;
        }
            
        if (merchant.settlementConfigWIP.processingConfiguration === "" || merchant.settlementConfigWIP.processingConfiguration === null ) {
            this.processingConfigSelected = '7993'
            // this.setFeeFollowGroup(this.merchantGroup)
            // // this.processingConfigChanged()
        } else {
            this.processingConfigSelected = merchant.settlementConfigWIP.processingConfiguration
            // console.log("masuk siniiiiiiiiiiiiii", this.processingConfigSelected)
        }

        if (merchant.settlementConfigWIP.settlementConfig === "" || merchant.settlementConfigWIP.settlementConfig === null ) {
            this.settlementConfigSelected = '8076'
            // this.setFeeFollowGroup(this.merchantGroup)
            // // this.processingConfigChanged()
        } else {
            this.settlementConfigSelected = merchant.settlementConfigWIP.settlementConfig
        }
        
        // if (merchant.settlementConfigWIP.processingFee === "" || merchant.settlementConfigWIP.processingFee === null ) {
        //     this.processingFeeSelected = "8084"
        // } else {
        //     this.processingFeeSelected = merchant.settlementConfigWIP.processingFee
        // }
        // if (merchant.settlementConfigWIP.reportSettlementConfig2 === "" || merchant.settlementConfigWIP.reportSettlementConfig2 === null ) {
        //     this.reportSettlementConfigSelected = "17036";
        //     console.log("ini report settlement config" , this.reportSettlementConfigSelected)
        // } else {
        //     this.reportSettlementConfigSelected = merchant.settlementConfigWIP.reportSettlementConfig2
        // }

        // if (merchant.settlementConfigWIP.settlementExecutionConfig === "" || merchant.settlementConfigWIP.settlementExecutionConfig === null ) {
        //     this.settlementExecutionConfigSelected = "8070";
        //     console.log("ini settlement execution config" , this.settlementExecutionConfigSelected)
        // } else {
        //     this.settlementExecutionConfigSelected = merchant.settlementConfigWIP.settlementExecutionConfig
        // }
    
        if (merchant.vaOttoCash == null) {
            this.merchantWip.vaOttoCash = "n"
        }

        if (merchant.vaShopeePay == null) {
            this.merchantWip.vaShopeePay = "n"
        }

        if (merchant.vaLinkAja == null) {
            this.merchantWip.vaLinkAja = "n"
        }

        if (merchant.vaTransactionType == null) {
            this.merchantWip.vaTransactionType = "op"
        }

        if (merchant.callbackMerchant == null) {
            this.merchantWip.callbackMerchant = 'n'
        }

        if (merchant.vaBca == null) {
            this.merchantWip.vaBca = 'n'
        }

        if (merchant.vaBri == null) {
            this.merchantWip.vaBri = 'n'
        }

        if (merchant.vaMandiri == null) {
            this.merchantWip.vaMandiri = 'n'
        }

        if (merchant.vaLain == null) {
            this.merchantWip.vaLain = 'n'
        }

        if (merchant.hostType == null) {
            this.merchantWip.hostType = '0'
        }

        if (merchant.vaAuthType == null) {
            this.merchantWip.vaAuthType = '0'
        }
        console.log("hampir selesai")
        // this.defaultConfig();
        this.merchantLevelSelected = merchant.level;
        console.log("ini merchantWip dr get db",this.merchantWip);
        // if WIP

        // else
        
        // this.loadMerchantOutlet(0);
        this.channelPembayaranMap(merchant.channelPembayaran)
        
        console.log("selesai")
        // stop loader
        this.ngxService.stop();
    }

    private channelPembayaranMap(channelPembayaran: string) {
        console.log("masuk channel pembayaran")
        if (channelPembayaran.length >= 2) {
            if (channelPembayaran.substr(0, 1) === '1') {
                this.channelPembayaran.Bank = true;
            }
            if (channelPembayaran.substr(1, 1) === '1') {
                this.channelPembayaran.OttoAG = true;
            }
            if (channelPembayaran.substr(2, 1) === '1') {
                this.channelPembayaran.OttoPay = true;
            }
        } else {
            this.channelPembayaran.Bank = false;
            this.channelPembayaran.OttoAG = false;
            this.channelPembayaran.OttoPay = false;
        }
    }

    loadMerchantOutletByMerchant(id) {
        this.ngxService.start();
        console.log('loading merchant outlet');
        this.merchantDetailOutletService.findByMerchantPage({
            page: this.curPageOutlets ,
            count: 999,
            merchantId: id,
        }).subscribe(
            (res: HttpResponse<MerchantOutlet[]>) => this.onSuccessMerchantOutlet(res.body),
            (res: HttpErrorResponse) => { this.onError(res.message); } ,
            () => { this.ngxService.stop(); console.log('Finally MO'); }
        );
    }

    onSuccessMerchantOutlet(data) {
        this.merchantOutletList = data.content;
        this.totalDataOutlets = data.totalElements;
        console.log('loading merchant outlet list finish ', this.merchantOutlet);

    }

    // convert string to date
    private convertToDate() {
        
        if (this.merchantWip.ownerWIP.ownerTanggalExpiredID !== null) {
            if (this.merchantWip.ownerWIP.ownerTanggalExpiredID.substr(0, 2) == '00') {
                this.merchantWip.ownerWIP.ownerTanggalExpiredID = null;
                // return;
            }
            if (this.merchantWip.ownerWIP.ownerTanggalExpiredID != null) {
                this.ownerTanggalExpiredID = {
                    year: Number(this.merchantWip.ownerWIP.ownerTanggalExpiredID.substr(0, 4)),
                    month: Number(this.merchantWip.ownerWIP.ownerTanggalExpiredID.substr(5, 2)),
                    day: Number(this.merchantWip.ownerWIP.ownerTanggalExpiredID.substr(8, 2))
                };
            
                // set checked if expire seumur hidup
                if (this.merchantWip.ownerWIP.ownerTanggalExpiredID.substr(0, 4) === '2999') {
                    this.seumurHidupChecked = true;
                }
            }
        }
        
        if (this.merchantWip.ownerWIP.ownerTanggalLahir !== null) {
            if (this.merchantWip.ownerWIP.ownerTanggalLahir.substr(0, 2) == '00') {
                this.merchantWip.ownerWIP.ownerTanggalLahir = null;
                // return;
            }

            if (this.merchantWip.ownerWIP.ownerTanggalLahir != null) {
                this.ownerTanggalLahir = {
                    year: Number(this.merchantWip.ownerWIP.ownerTanggalLahir.substr(0, 4)),
                    month: Number(this.merchantWip.ownerWIP.ownerTanggalLahir.substr(5, 2)),
                    day: Number(this.merchantWip.ownerWIP.ownerTanggalLahir.substr(8, 2))
                };
            }
        }
        console.log("-------------->", this.ownerTanggalExpiredID,"<-----------------")
        console.log("-------------->", this.ownerTanggalLahir,"<-----------------")

    }


    private onError(error) {
        console.log('error lookup..', error);
        this.ngxService.stop();
    }

    private onErrorMG(error) {
        console.log('Error load MG ', error);
    }

    // open modal merchant oulet
    loadMerchantOutlet(i, mid) {

        console.log('load edit merchant, host type ====> ', this.lookupHostType);
        const modalRef = this.modalService.open(MerchantDetailOutletModalComponent, { size: 'lg' });
        modalRef.componentInstance.outlet = this.merchantOutletList[i];
        modalRef.componentInstance.approvalStatus = this.merchantWip.approvalStatus;
        modalRef.componentInstance.lookupDeviceType = this.lookupDeviceType;
        modalRef.componentInstance.lookupDeviceGroup = this.lookupDeviceGroup;
        modalRef.componentInstance.lookupDeviceBrand = this.lookupDeviceBrand;
        modalRef.componentInstance.lookupHostType = this.lookupHostType;
        modalRef.componentInstance.mid = mid;
        modalRef.result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    // function for load merchant outlet
    // loadMerchantOutlet(i) {
    //     if (this.merchant.merchantOutlets[0]) {
    //         this.merchantOutlet = this.merchant.merchantOutlets[i];
    //         console.log(this.merchant);
    //         this.metodePembayaran = JSON.parse(this.merchantOutlet.metodePembayaran);
    //         console.log(this.metodePembayaran);
    //     }
    // }

    // checked data after click tab
    ownerDataCheck() {
        this.ownerDataChecked = true;
    }

    // checked settlement after click tab
    settlementCheck() {
        this.settlementChecked = true;
    }

    // checked otherInfoCheck after click tab
    otherInfoCheck() {
        this.otherInfoChecked = true;
    }

    // checked otherInfoCheck after click tab
    outletCheck() {
        this.outletChecked = true;
    }

    // checked otherInfoCheck after click tab
    otherCheck() {
        this.otherChecked = true;
    }

    // enable / disable checked input
    seumurHidupCheckSelected() {
        this.ownerTanggalExpiredID = {
        year: Number('2999'),
        month: Number('12'),
        day: Number('30')
        };
        this.seumurHidupChecked = !this.seumurHidupChecked;
        // console.log(data);
    }

    longitudeChecker(data: any) {
        console.log('longitude change', data);
    }

    defaultTglExpiredId() {

        const currentTime = new Date();
        const curMonth = currentTime.getMonth() + 1;
        const curDay = currentTime.getDate();
        const curYear = currentTime.getFullYear();

        this.ownerTanggalExpiredID = {
            year: curYear,
            month: curMonth,
            day: curDay,
        };
    }

    defaultTglLahir() {

        this.ownerTanggalLahir = {
            year: 2000,
            month: 1,
            day: 1,
        };
    }

    private getDismissReason(reason: any): string {
        console.log(reason);
        return reason;
    }

    onBack() {
        this.router.navigate(['/main/merchant']);
    }

    suspense(): void {
        this.merchantService.suspense(this.idMerchant)
            .subscribe(
                (res: HttpResponse<Merchant>) => this.onSuccess(res.body),
                (res: HttpErrorResponse) => { this.ngxService.stop(); this.onError(res.message); } ,
            );
    }

    validate() {
        if (this.readOnly == 'true') {
            Swal.fire('Failed', 'Merchant Edited', 'error').then(
                // result => this.onBack()
            );
        } else {
            if ( this.warning.length > 0) {
                Swal.fire('Warning', 
                    `${this.warning.join(',')}  Tidak sesuai dengan Tipe Bisnis yang dipilih`
                    , "warning")
                    
            } else {
                this.validate2();
            }
        }
    }

    validate2() {
        this.ngxService.start();

        this.merchantWip.level = this.merchantLevelSelected;

        console.log(this.merchantWip);
        

        this.submitted = true;
        if (this.ownerTanggalExpiredID === null || this.ownerTanggalExpiredID === undefined) {
            // this.ngxService.stop();
            console.log(this.ownerTanggalExpiredID);
            // Swal.fire('Error', 'Silahkan periksa owner expired ID ', 'error');
            this.merchantWip.ownerWIP.ownerTanggalExpiredID = null;
            // return;
        } else {
            this.merchantWip.ownerWIP.ownerTanggalExpiredID = this.ownerTanggalExpiredID.year + '-' +
                ('0' + this.ownerTanggalExpiredID.month).slice(-2) + '-' +
                ('0' + this.ownerTanggalExpiredID.day).slice(-2) + 'T00:00:00.000Z';
        }
        if (this.ownerTanggalLahir === null || this.ownerTanggalLahir === undefined) {
            // this.ngxService.stop();
            // Swal.fire('Error', 'Silahkan periksa owner tanggal lahir', 'error');
            // return;
            this.merchantWip.ownerWIP.ownerTanggalLahir = null;

        } else {
            this.merchantWip.ownerWIP.ownerTanggalLahir = this.ownerTanggalLahir.year + '-' +
                ('0' + this.ownerTanggalLahir.month).slice(-2) + '-' +
                ('0' + this.ownerTanggalLahir.day).slice(-2) + 'T00:00:00.000Z';
        }

        for (let i = 0 ; i < this.lookupReportSettlementConfig.length ; i ++ ) {
            console.log(this.lookupReportSettlementConfig[i].id, " === ",this.merchantWip.settlementConfigWIP.reportSettlementConfig2)
            if (this.lookupReportSettlementConfig[i].id == this.merchantWip.settlementConfigWIP.reportSettlementConfig2) {
                this.settlementConfig.reportSettlementConfigName = this.lookupReportSettlementConfig[i].name;
                console.log("masuk assign report settlement config", this.settlementConfig.reportSettlementConfigName)
            }
        }
        for (let i = 0 ; i < this.lookupSettlementExecutionConfig.length ; i ++ ) {
            console.log(this.lookupSettlementExecutionConfig[i].id, " === ",this.merchantWip.settlementConfigWIP.settlementExecutionConfig)
            if (this.lookupSettlementExecutionConfig[i].id == this.merchantWip.settlementConfigWIP.settlementExecutionConfig) {   
                this.settlementConfig.settlementExecutionConfigName = this.lookupSettlementExecutionConfig[i].name;
                console.log("masuk assign settlement execution", this.settlementConfig.settlementExecutionConfigName)
            }
        }
        
        this.settlementConfig.namaBankTujuanSettlement = this.merchantWip.settlementConfigWIP.namaBankTujuanSettlement
        this.settlementConfig.mid = `${this.merchantWip.idMerchant}`
        console.log("ini mid, idmerchant,id",this.settlementConfig.mid , `${this.merchantWip.idMerchant}`, this.merchantWip.id)
        this.settlementConfig.namaPemilikRekening = this.merchantWip.settlementConfigWIP.namaPemilikRekening
        this.settlementConfig.noRekeningToko = this.merchantWip.settlementConfigWIP.noRekeningToko
        this.settlementConfig.tipeRekening = this.merchantWip.settlementConfigWIP.tipeRekening
        // this.settlementConfig.reportSettlementConfigName = this.merchantWip.settlementConfigWIP.reportSettlementConfigName
        // this.settlementConfig.settlementExecutionConfigName = this.merchantWip.settlementConfigWIP.settlementExecutionConfigName
        this.settlementConfig.sftpHost = this.merchantWip.settlementConfigWIP.sftpHost
        this.settlementConfig.sftpUser = this.merchantWip.settlementConfigWIP.sftpUser
        this.settlementConfig.sftpPassword = this.merchantWip.settlementConfigWIP.sftpPassword
        this.settlementConfig.email = this.merchantWip.settlementConfigWIP.email
        console.log("ini settlement config : ",this.settlementConfig)
        // console.log('---');

        this.merchantWip.category = this.userCategorySelected;


        this.merchantWip.merchantType = this.tipeMerchantSelected;
        this.merchantWip.jenisUsaha = this.jenisUsahaSelected;
        this.merchantWip.kategoriBisnis = this.kategoriBisnisSelected;
        this.merchantWip.provinsi = this.provinsiSelected;
        this.merchantWip.kabupatenKota = this.citySelected2;
        this.merchantWip.kecamatan = this.kecamatanSelected2;
        this.merchantWip.kelurahan = this.kelurahanSelected2;
        this.merchantWip.ownerWIP.ownerTitle = this.ownerTitleSelected;
        this.merchantWip.ownerWIP.ownerProvinsi = this.provinceOwnerSelected2;
        this.merchantWip.ownerWIP.ownerKabupaten = this.kabupatenOwnerSelected2;
        this.merchantWip.ownerWIP.ownerKecamatan = this.kecamatanOwnerSelected2;
        this.merchantWip.ownerWIP.ownerKelurahan = this.kelurahanOwnerSelected2;
        this.merchantWip.ownerWIP.ownerTipeID = this.idTypeSelected;
        this.merchantWip.ownerWIP.ownerJenisKelamin = this.genderSelected;
        this.merchantWip.ownerWIP.ownerPekerjaan = this.pekerjaanselected;
        this.merchantWip.settlementConfigWIP.settlementConfig = this.settlementConfigSelected;
        this.merchantWip.settlementConfigWIP.reportSettlementConfig2 = this.reportSettlementConfigSelected;
        this.merchantWip.settlementConfigWIP.settlementExecutionConfig = this.settlementExecutionConfigSelected;
        this.merchantWip.settlementConfigWIP.sendReportVia = this.sendRptViaSelected;
        this.merchantWip.settlementConfigWIP.processingConfiguration = this.processingConfigSelected;
        this.merchantWip.settlementConfigWIP.processingFee = this.processingFeeSelected;
        this.merchantWip.settlementConfigWIP.mdr = this.mdrSelected;
        // this.merchantWip.notificationChannel = this.notificationchannelSelected;
        console.log("notification channel : ", this.merchantWip.notificationChannel)
        // this.merchantWip.settlementConfigWIP.email = this.email;
        // this.merchantWip.settlementConfigWIP.sftpHost = this.sftpHost;
        // this.merchantWip.settlementConfigWIP.sftpUser = this.sftpUser;
        // this.merchantWip.settlementConfigWIP.sftpPassword = this.sftpPassword;
        this.merchantWip.merchantPan = 'Generate by system';
        this.merchantWip.merchantOutletID = 'Generate by system';
        this.merchantWip.merchantCategoryCode = this.merchantCriteria;
        this.merchantWip.merchantGroupId = this.merchantGroupSelected;
        
        this.merchantWip.mcc = this.mccSelected;

        var paymentChannel: string;
        paymentChannel = this.channelPembayaran.Bank === true ? '1' : '0';
        paymentChannel = this.channelPembayaran.OttoAG === true ? paymentChannel + '1' : paymentChannel + '0';
        paymentChannel = this.channelPembayaran.OttoPay === true ? paymentChannel + '1' : paymentChannel + '0';
        this.merchantWip.channelPembayaran = paymentChannel;

        console.log("Settlement Config ==>",this.settlementConfig)
        console.log("DATA VALIDATE", this.merchantWip);
        this.merchantWip.statusRegistration = TO_REGISTERED_MSG;

        console.log('id merchant ==>', this.idMerchant, ' wip id ', this.merchantWip.id);
        if (this.idMerchant === 0 ) {
            this.merchantWip.idMerchant = 0;
        } else {
            this.merchantWip.idMerchant = this.idMerchant;
        }

        let iter = 0;
        this.mdtArrMWip.forEach(el => {
            if (this.merchantWip[el] === 'null' || this.merchantWip[el] === '0' || this.merchantWip[el] === null || this.merchantWip[el] === undefined) {
                console.log('mdtArrMWip iter++', el);
                iter++;
            }
        });

        // tslint:disable-next-line:triple-equals
        if (this.tipeMerchantSelected == this.tipeMerchantUmkm) {
            this.mdtArrMWipLokasiBisnis.forEach(el => {
                if (this.merchantWip[el] === '' || this.merchantWip[el] === null || this.merchantWip[el] === undefined) {
                    console.log('mdtArrMWipLokasiBisnis iter++', el);
                    iter++;
                }
            });
        }

        this.mdtArrOwnWip.forEach(el => {
            if (this.merchantWip.ownerWIP[el] === '0' || this.merchantWip.ownerWIP[el] === '' || this.merchantWip.ownerWIP[el] === null ||
            this.merchantWip.ownerWIP[el] === undefined) {
                console.log('mdtArrOwnWip iter++', el);
                iter++;
            }
        });

        // this.mdtArrSetConfWIP.forEach(el => { 
        //     if (this.merchantWip.settlementConfigWIP[el] === '' || this.merchantWip.settlementConfigWIP[el] === null || this.merchantWip.settlementConfigWIP[el] === undefined) {
        //         console.log('mdtArrSetConfWIP iter++', el);
        //         iter++;
        //     }
        // });

        // tslint:disable-next-line:triple-equals
        if (this.tipeMerchantUmkm == this.tipeMerchantSelected) {
            console.log('start umkm');
            console.log(this.imgUrlMerchantKtpPath);
            console.log(this.imgUrlMerchantSelfiePath);
            console.log(this.imgUrlMerchantPhotoLocPath);
            console.log(this.imgUrlMerchantPhotoLoc2Path);
            console.log(this.imgUrlMerchantSignaturePath);
            console.log(this.imgUrlMerchantLogoPath);
            // console.log(this.imgUrlPreprintedQRPath);
            // if (this.imgUrlPreprintedQRPath === '' || this.imgUrlPreprintedQRPath === null ||
            // this.imgUrlPreprintedQRPath === undefined) {
            //     console.log('imgUrlPreprintedQRPath iter++');
            //     iter++;
            // }
            if (this.imgUrlMerchantKtpPath === '' || this.imgUrlMerchantKtpPath === null ||
                this.imgUrlMerchantKtpPath === undefined) {
                console.log('imgUrlMerchantKtpPath iter++');
                iter++;
            }
            if (this.imgUrlMerchantSelfiePath === '' || this.imgUrlMerchantSelfiePath === null ||
                this.imgUrlMerchantSelfiePath === undefined) {
                console.log('imgUrlMerchantSelfiePath iter++');
                iter++;
            }
            if (this.imgUrlMerchantPhotoLocPath === '' || this.imgUrlMerchantPhotoLocPath === null ||
                this.imgUrlMerchantPhotoLocPath === undefined) {
                console.log('imgUrlMerchantPhotoLocPath iter++');
                iter++;
            }
            if (this.imgUrlMerchantPhotoLoc2Path === '' || this.imgUrlMerchantPhotoLoc2Path === null ||
                this.imgUrlMerchantPhotoLoc2Path === undefined) {
                console.log('imgUrlMerchantPhotoLoc2Path iter++');
                iter++;
            }
            if (this.imgUrlMerchantSignaturePath === '' || this.imgUrlMerchantSignaturePath === null ||
                this.imgUrlMerchantSignaturePath === undefined) {
                console.log('imgUrlMerchantSignaturePath iter++');
                iter++;
            }
        }

        console.log('iter : ', iter);
        if (iter > 0) {
            this.ngxService.stop();
            Swal.fire('Error', 'Silahkan periksa ' + iter + ' fields yang belum diisi  !', 'error');
            return;
        }

        this.onConfirm();
    }

    onConfirm() {
        // this.ngxService.start();
        console.log(this.merchantWip);

        // if ( this.settlementConfig.reportSettlementConfigName != "Disable") {
        //     this.merchantWipService.saveSettlementConfig(this.settlementConfig).subscribe(
        //         (res: HttpResponse<SettlementConfig>) => console.log(res.body),
        //         (res: HttpErrorResponse) => console.log(res.message)
        //     )
        // }

        this.merchantWipService.saveWip(this.merchantWip, TO_REGISTERED).subscribe(
            (res: HttpResponse<MerchantWip>) => {
                this.onSuccessConfirm(res.body)
                // if ( this.settlementConfig.reportSettlementConfigName != "Disable") {
                //     this.merchantWipService.saveSettlementConfig(this.settlementConfig).subscribe(
                //         (res: HttpResponse<SettlementConfig>) => console.log(res.body),
                //         (res: HttpErrorResponse) => console.log(res.message)
                //     )
                // }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        )
    }


    // load image
    loadImageMerchant(merchant: Merchant) {
        // this.imgUrlMerchantKtpPath = this.pathImgServer + merchant.ktpPath;
        // this.imgUrlMerchantSelfiePath = this.pathImgServer + merchant.selfiePath;
        // this.imgUrlMerchantPhotoLocPath = this.pathImgServer + merchant.merchantPhotoPath;
        // this.imgUrlMerchantPhotoLoc2Path = this.pathImgServer + merchant.merchantPhoto2Path;
        // this.imgUrlMerchantSignaturePath = this.pathImgServer + merchant.signPath;
        // this.imgUrlMerchantLogoPath = this.pathImgServer + merchant.logoPath;
        this.imgUrlMerchantKtpPath = merchant.ktpPath;
        this.imgUrlMerchantSelfiePath = merchant.selfiePath;
        this.imgUrlMerchantPhotoLocPath = merchant.merchantPhotoPath;
        this.imgUrlMerchantPhotoLoc2Path = merchant.merchantPhoto2Path;
        this.imgUrlMerchantPhotoLocRight = merchant.photoLocationRight;
        this.imgUrlMerchantPhotoLocLeft = merchant.photoLocationLeft;
        this.imgUrlMerchantSignaturePath = merchant.signPath;
        this.imgUrlMerchantLogoPath = merchant.logoPath;
        this.imgUrlPreprintedQRPath = merchant.fotoPreprinted;
        this.imgUrlProfilePicturePath = merchant.profilePictureUrl;
    }

    // func for chekc image size
    checkSizeImage(file: File) {
        if (file.size > (1.5 * 1025 * 1024)) {
            Swal.fire('Error', 'Ukuran gambar maksimum 1.5 MB');
            return false;
        }
        return true;
    }

    generateUrlImage (tipe: string) {
        return SERVER_LOAD_IMAGE + '/' + BUCKET_NAME + '/' + this.merchantWip.storePhoneNumber + '_' + tipe + '.jpeg';
    }

    // upload file
    processFileImageMerchantKtp(imageInput: any) {
        console.log(imageInput);
        const file: File = imageInput.files[0];
        const reader = new FileReader();

        /* CHECK IMAGE SIZE */
        if (!this.checkSizeImage(file)) {
            return;
        }

        console.log('file.size', (file.size / 1024 / 1024).toFixed(4));

        reader.readAsDataURL(file);
        reader.onload = (_event) => {
            console.log(reader.result);
            this.imgUrlMerchantKtpPath = reader.result;
            this.imageMerchantKtpPathChange = true;
            this.merchantWip.ktpPath = this.generateUrlImage(PHOTO_KTP);
        };
    }

    // upload file
    processFileImageMerchantSelfie(imageInput: any) {
        console.log(imageInput);
        const file: File = imageInput.files[0];
        const reader = new FileReader();

        /* CHECK IMAGE SIZE */
        if (!this.checkSizeImage(file)) {
            return;
        }

        reader.readAsDataURL(file);
        reader.onload = (_event) => {
            console.log(reader.result);
            this.imgUrlMerchantSelfiePath = reader.result;
            this.imageMerchantSelfiePathChange = true;
            this.merchantWip.selfiePath = this.generateUrlImage(PHOTO_SELFIE);
        };
    }

    processFileImagePathLoc(imageInput: any) {
        console.log(imageInput);
        const file: File = imageInput.files[0];
        const reader = new FileReader();

        /* CHECK IMAGE SIZE */
        if (!this.checkSizeImage(file)) {
            return;
        }

        reader.readAsDataURL(file);
        reader.onload = (_event) => {
            console.log(reader.result);
            this.imgUrlMerchantPhotoLocPath = reader.result;
            this.imageMerchantPhotoLocPathChange = true;
            this.merchantWip.merchantPhotoPath = this.generateUrlImage(PHOTO_LOCATION);
        };
    }

    processFileImagePathLocLeft(imageInput: any) {
        console.log(imageInput);
        const file: File = imageInput.files[0];
        const reader = new FileReader();

        /* CHECK IMAGE SIZE */
        if (!this.checkSizeImage(file)) {
            return;
        }

        reader.readAsDataURL(file);
        reader.onload = (_event) => {
            console.log(reader.result);
            this.imgUrlMerchantPhotoLocLeft = reader.result;
            this.imageMerchantPhotoLocLeftPathChange = true;
            this.merchantWip.photoLocationLeft = this.generateUrlImage(PHOTO_LOCATION_LEFT);
        };
    }

    processFileImagePathLocRight(imageInput: any) {
        console.log(imageInput);
        const file: File = imageInput.files[0];
        const reader = new FileReader();

        /* CHECK IMAGE SIZE */
        if (!this.checkSizeImage(file)) {
            return;
        }

        reader.readAsDataURL(file);
        reader.onload = (_event) => {
            console.log(reader.result);
            this.imgUrlMerchantPhotoLocRight = reader.result;
            this.imageMerchantPhotoLocRightPathChange = true;
            this.merchantWip.photoLocationRight = this.generateUrlImage(PHOTO_LOCATION_RIGHT);
        };
    }

    processFileImagePathLoc2(imageInput: any) {
        console.log(imageInput);
        const file: File = imageInput.files[0];
        const reader = new FileReader();

        /* CHECK IMAGE SIZE */
        if (!this.checkSizeImage(file)) {
            return;
        }

        reader.readAsDataURL(file);
        reader.onload = (_event) => {
            console.log(reader.result);
            this.imgUrlMerchantPhotoLoc2Path = reader.result;
            this.imageMerchantPhotoLoc2PathChange = true;
            this.merchantWip.merchantPhoto2Path = this.generateUrlImage(PHOTO_LOCATION_2);
        };
    }

    processFileImageSignaturePath(imageInput: any) {
        console.log(imageInput);
        const file: File = imageInput.files[0];
        const reader = new FileReader();

        /* CHECK IMAGE SIZE */
        if (!this.checkSizeImage(file)) {
            return;
        }

        reader.readAsDataURL(file);
        reader.onload = (_event) => {
            console.log(reader.result);
            this.imgUrlMerchantSignaturePath = reader.result;
            this.imageMerchantSignaturePathChange = true;
            this.merchantWip.signPath = this.generateUrlImage(PHOTO_SIGN);
        };
    }

    processFileImageLogoPath(imageInput: any) {
        console.log(imageInput);
        const file: File = imageInput.files[0];
        const reader = new FileReader();

        /* CHECK IMAGE SIZE */
        if (!this.checkSizeImage(file)) {
            return;
        }

        reader.readAsDataURL(file);
        reader.onload = (_event) => {
            console.log(reader.result);
            this.imgUrlMerchantLogoPath = reader.result;
            this.imageMerchantLogoPathChange = true;
            this.merchantWip.logoPath = this.generateUrlImage(PHOTO_LOGO);
        };
    }

    processFileImagePreprintedQrPath(imageInput: any) {
        console.log(imageInput);
        const file: File = imageInput.files[0];
        const reader = new FileReader();

        /* CHECK IMAGE SIZE */
        if (!this.checkSizeImage(file)) {
            return;
        }

        reader.readAsDataURL(file);
        reader.onload = (_event) => {
            console.log(reader.result);
            this.imgUrlPreprintedQRPath = reader.result;
            this.imagePreprintedQRPathChange = true;
            this.merchantWip.fotoPreprinted = this.generateUrlImage(PHOTO_PREPRINTED_QR);
        };
    }

    processFileImageProfilePicturePath(imageInput: any) {
        console.log(imageInput);
        const file: File = imageInput.files[0];
        const reader = new FileReader();

        /* CHECK IMAGE SIZE */
        if (!this.checkSizeImage(file)) {
            return;
        }

        reader.readAsDataURL(file);
        reader.onload = (_event) => {
            console.log(reader.result);
            this.imgUrlProfilePicturePath = reader.result;
            this.imageProfilePicturePathChange = true;
            this.merchantWip.profilePictureUrl = this.generateUrlImage(PHOTO_PROFILE_PICTURE);
        };
    }

    // success message after confirm data merchant
    onSuccessConfirm (res) {

        // success will direct to merchant list
        console.log('confirm ', res);
        
        if (res.errCode === '00') {

            if (this.imageMerchantKtpPathChange === true) {
                this.uploadImageService.uploadImage(this.imgUrlMerchantKtpPath, PHOTO_KTP, this.merchantWip.storePhoneNumber);

            }
            if (this.imageMerchantSelfiePathChange === true) {
                this.uploadImageService.uploadImage(this.imgUrlMerchantSelfiePath, PHOTO_SELFIE, this.merchantWip.storePhoneNumber);
            }

            if (this.imageMerchantPhotoLocPathChange === true) {
                this.uploadImageService.uploadImage(this.imgUrlMerchantPhotoLocPath, PHOTO_LOCATION, this.merchantWip.storePhoneNumber);
            }

            if (this.imageMerchantPhotoLoc2PathChange === true) {
                this.uploadImageService.uploadImage(this.imgUrlMerchantPhotoLoc2Path, PHOTO_LOCATION_2, this.merchantWip.storePhoneNumber);
            }

            if (this.imageMerchantPhotoLocLeftPathChange === true) {
                this.uploadImageService.uploadImage(this.imgUrlMerchantPhotoLocLeft, PHOTO_LOCATION_LEFT, this.merchantWip.storePhoneNumber);
            }

            if (this.imageMerchantPhotoLocRightPathChange === true) {
                this.uploadImageService.uploadImage(this.imgUrlMerchantPhotoLocRight, PHOTO_LOCATION_RIGHT, this.merchantWip.storePhoneNumber);
            }

            if (this.imageMerchantSignaturePathChange === true) {
                this.uploadImageService.uploadImage(this.imgUrlMerchantSignaturePath, PHOTO_SIGN, this.merchantWip.storePhoneNumber);
            }

            if (this.imageMerchantLogoPathChange === true) {
                this.uploadImageService.uploadImage(this.imgUrlMerchantLogoPath, PHOTO_LOGO, this.merchantWip.storePhoneNumber);
            }

            if (this.imagePreprintedQRPathChange === true) {
                this.uploadImageService.uploadImage(this.imgUrlPreprintedQRPath, PHOTO_PREPRINTED_QR, this.merchantWip.fotoPreprinted);
            }

            if (this.imageProfilePicturePathChange === true) {
                this.uploadImageService.uploadImage(this.imgUrlProfilePicturePath, PHOTO_PROFILE_PICTURE, this.merchantWip.profilePictureUrl);
            }

            // save merchant outlet
            this.merchantWipService.saveMchtOutlet(this.merchantOutletList, res.id).subscribe(
                (xres: HttpResponse<any>) => this.onSuccessOutlet(xres),
                (xres: HttpErrorResponse) => this.onError(xres)
            );
    
            
            this.ngxService.stop();
            Swal.fire('Success', 'Success add/edit Merchant', 'success').then(
                result => this.onBack()
            );
        } else { // something wrong
            console.log('Error ', res);
            this.ngxService.stop();
            Swal.fire('Failed', 'Error ....' , 'error');
        }
    }

    onSuccessOutlet(res) {
        console.log(res);
    }

    loadPageOutlets() {
        console.log('load next page ');
        this.loadMerchantOutletByMerchant(this.merchantWip.id);
    }

    deleteOutlet(outlet) {
        // const result = _.find(this.lookupDeviceType, (lookup) => lookup.name === outlet.deviceType);
        // this.merchantOutletList.splice(this.merchantOutletList.indexOf(result[0]) );
        // const result = _.find(this.merchantOutletList, (merchantOutlet) => merchantOutlet.id === outlet.id);
        // this.merchantOutletList.splice(this.merchantOutletList.indexOf(result[0]));
        console.log('outlet di delete : ', outlet);
        _.pull(this.merchantOutletList, outlet);
        Swal.fire('Success', outlet.name, 'info');
    }

    addnewOutlet() {

        let terminalId = this.pad(this.merchantOutletList.length+1, 2);
        console.log("merchantOutletList -->", this.merchantOutletList);
        console.log("merchantOutletList length -->", this.merchantOutletList.length);

        const merchantOutlet = new MerchantOutlet();
        merchantOutlet.id = 0;
        // merchantOutlet.deviceBrand = this.lookupDeviceBrand[0].name;
        // merchantOutlet.deviceGroup = this.lookupDeviceGroup[0].name;
        // merchantOutlet.deviceType = this.lookupDeviceType[0].name;
        merchantOutlet.deviceType = 'OttoPay 2.0';
        merchantOutlet.deviceGroup = 'Non Youtap';
        merchantOutlet.deviceBrand = 'Other';
        merchantOutlet.hostType = this.lookupHostType[0].code;
        merchantOutlet.metodePembayaran = '000';
        merchantOutlet.terminalId = terminalId;
        this.merchantId = this.merchantWip.merchantOutletID;

        const modalRef = this.modalService.open(MerchantDetailOutletModalComponent, { size: 'lg' });
        modalRef.componentInstance.merchantId = this.merchantId;
        modalRef.componentInstance.outlet = merchantOutlet;
        modalRef.componentInstance.lookupDeviceType = this.lookupDeviceType;
        modalRef.componentInstance.lookupDeviceGroup = this.lookupDeviceGroup;
        modalRef.componentInstance.lookupDeviceBrand = this.lookupDeviceBrand;
        modalRef.componentInstance.lookupHostType = this.lookupHostType;

        modalRef.result.then((result) => {
            console.log('result : ', result);
            this.merchantOutletList.push(result);
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    pad(num, size) {
        var s = num + "";
        while (s.length < size) s = "0" + s;
        return 'A'+s;
    }



    // settlementConfigChanged
    merchantGroupChanged() {
        console.log(this.settlementConfigSelected);
        this.settlementConfigChanged();
        this.processingConfigChanged();
        console.log('change yaa');
        console.log(this.merchantGroupSelected);
    }

    // settlementConfigChanged
    settlementConfigChanged() {
        console.log(this.settlementConfigSelected);
        if (this.settlementConfigSelected === '8075') {
            console.log('follow group');
            // tslint:disable-next-line:triple-equals
            const result = _.find(this.lookupMerchantGroup, (merchantGroup) => merchantGroup.id == this.merchantGroupSelected);
            let newMerhcantGroup = new MerchantGroup();
            newMerhcantGroup = _.clone(result);
            this.setSettlementFollowGroup(newMerhcantGroup);
        }else{
            this.merchantWip.settlementConfigWIP.noRekeningToko = null;
            this.merchantWip.settlementConfigWIP.namaBankTujuanSettlement = null;
            this.merchantWip.settlementConfigWIP.namaPemilikRekening = null;
            this.merchantWip.settlementConfigWIP.tipeRekening = null;
            this.merchantWip.settlementConfigWIP.sendReportUrl = null;
        }
        console.log('change yaa');
        console.log(this.merchantGroupSelected);
        // if
    }

    // processingConfigChanged
    processingConfigChanged() {
        if (this.processingConfigSelected === '7993') {
            console.log('follow group');
            // this.editVaConfig = true;
            // tslint:disable-next-line:triple-equals
            console.log("ini list merchant group :", this.lookupMerchantGroup)
            const result = _.find(this.lookupMerchantGroup, (merchantGroup) => merchantGroup.id == this.merchantGroupSelected);
            console.log("result : ", result)
            let newMerhcantGroup = new MerchantGroup();
            newMerhcantGroup = _.clone(result);
            console.log("new merchant group : ", newMerhcantGroup)
            this.setFeeFollowGroup(newMerhcantGroup);
            // this.configVaMerchantGroupService.findConfigVa(newMerhcantGroup.id)
            //     .subscribe(
            //         result => {
            //             console.log('Result findConfigVa==>', result.status ,result.body);
            //             if ( result.body.errCode === "00" ) {
            //                 this.onSuccessConfigVa(result.body, result.headers)
            //             } else {
            //                 this.merchantWip.vaBca = "n";
            //                 this.merchantWip.vaMandiri = "n";
            //                 this.merchantWip.vaBri = "n";
            //                 this.merchantWip.vaLain = "n";
            //                 // this.merchantWip.vaTransactionType = "op";
            //                 // this.merchantWip.vaAuthType = "0";
            //                 // this.merchantWip.hostType = "0";
            //             }
            //             console.log('merchantVaInfo ', this.merchantGroupVaInfo);
            //         }
            //     )
        } 
        // else if (this.processingConfigSelected === '7994') {
        //     this.editVaConfig = false;
        //     this.merchantWip.vaBca = "n";
        //     this.merchantWip.vaBcaCompanyCode = "";
        //     this.merchantWip.vaBcaSubCompanyCode = "";
        //     this.merchantWip.vaBcaUpperLimitAmount = 0;
        //     this.merchantWip.vaBcaLowerLimitAmount = 0;
        //     this.merchantWip.vaBcaFeeTransactionAboveUpperLimitAmount = 0;
        //     this.merchantWip.vaBcaFeeTransactionBelowLowerLimitAmount = 0;
        //     this.merchantWip.vaBcaFeeTransactionInBetween = 0;
        //     this.merchantWip.vaBcaMerchantFeeAboveUpperLimitAmount = 0;
        //     this.merchantWip.vaBcaMerchantFeeBelowLowerLimitAmount = 0;
        //     this.merchantWip.vaBcaMerchantFeeInBetween = 0;
        //     this.merchantWip.vaBri = "n";
        //     this.merchantWip.vaBriCompanyCode = "";
        //     this.merchantWip.vaBriSubCompanyCode = "";
        //     this.merchantWip.vaBriUpperLimitAmount = 0;
        //     this.merchantWip.vaBriLowerLimitAmount = 0;
        //     this.merchantWip.vaBriFeeTransactionAboveUpperLimitAmount = 0;
        //     this.merchantWip.vaBriFeeTransactionBelowLowerLimitAmount = 0;
        //     this.merchantWip.vaBriFeeTransactionInBetween = 0;
        //     this.merchantWip.vaBriMerchantFeeAboveUpperLimitAmount = 0;
        //     this.merchantWip.vaBriMerchantFeeBelowLowerLimitAmount = 0;
        //     this.merchantWip.vaBriMerchantFeeInBetween = 0;
        //     this.merchantWip.vaMandiri = "n";
        //     this.merchantWip.vaMandiriCompanyCode = "";
        //     this.merchantWip.vaMandiriSubCompanyCode = "";
        //     this.merchantWip.vaMandiriUpperLimitAmount = 0;
        //     this.merchantWip.vaMandiriLowerLimitAmount = 0;
        //     this.merchantWip.vaMandiriFeeTransactionAboveUpperLimitAmount = 0;
        //     this.merchantWip.vaMandiriFeeTransactionBelowLowerLimitAmount = 0;
        //     this.merchantWip.vaMandiriFeeTransactionInBetween = 0;
        //     this.merchantWip.vaMandiriMerchantFeeAboveUpperLimitAmount = 0;
        //     this.merchantWip.vaMandiriMerchantFeeBelowLowerLimitAmount = 0;
        //     this.merchantWip.vaMandiriMerchantFeeInBetween = 0;
        //     this.merchantWip.vaLain = "n";
        //     this.merchantWip.vaLainCompanyCode = "";
        //     this.merchantWip.vaLainSubCompanyCode = "";
        //     this.merchantWip.vaLainUpperLimitAmount = 0;
        //     this.merchantWip.vaLainLowerLimitAmount = 0;
        //     this.merchantWip.vaLainFeeTransactionAboveUpperLimitAmount = 0;
        //     this.merchantWip.vaLainFeeTransactionBelowLowerLimitAmount = 0;
        //     this.merchantWip.vaLainFeeTransactionInBetween = 0;
        //     this.merchantWip.vaLainMerchantFeeAboveUpperLimitAmount = 0;
        //     this.merchantWip.vaLainMerchantFeeBelowLowerLimitAmount = 0;
        //     this.merchantWip.vaLainMerchantFeeInBetween = 0;
        // }
    }

    private onSuccessConfigVa(data, headers) {
        this.ngxService.stop();
        console.log("ini responconfigva", data)
        this.merchantGroupVaInfo = data.data;
        // this.merchantWip.vaTransactionType = this.merchantGroupVaInfo.vaTransactionType
        // this.merchantWip.vaTokenUrl = this.merchantGroupVaInfo.vaTokenUrl
        // this.merchantWip.vaTokenUser = this.merchantGroupVaInfo.vaTokenUser
        // this.merchantWip.vaTokenPassword = this.merchantGroupVaInfo.vaTokenPassword
        // this.merchantWip.vaAuthKey = this.merchantGroupVaInfo.vaAuthKey
        // this.merchantWip.vaAuthType = this.merchantGroupVaInfo.vaAuthType
        // this.merchantWip.hostType = this.merchantGroupVaInfo.hostType
        // this.merchantWip.inquiryUrl = this.merchantGroupVaInfo.inquiryUrl
        // this.merchantWip.paymentUrl = this.merchantGroupVaInfo.paymentUrl
        this.merchantWip.vaBca = this.merchantGroupVaInfo.vaBca
        this.merchantWip.vaBcaCompanyCode = this.merchantGroupVaInfo.vaBcaCompanyCode
        this.merchantWip.vaBcaSubCompanyCode = this.merchantGroupVaInfo.vaBcaSubCompanyCode
        this.merchantWip.vaBcaUpperLimitAmount = this.merchantGroupVaInfo.vaBcaUpperLimitAmount
        this.merchantWip.vaBcaLowerLimitAmount = this.merchantGroupVaInfo.vaBcaLowerLimitAmount
        this.merchantWip.vaBcaFeeTransactionAboveUpperLimitAmount = this.merchantGroupVaInfo.vaBcaFeeTransactionAboveUpperLimitAmount
        this.merchantWip.vaBcaFeeTransactionBelowLowerLimitAmount = this.merchantGroupVaInfo.vaBcaFeeTransactionBelowLowerLimitAmount
        this.merchantWip.vaBcaFeeTransactionInBetween = this.merchantGroupVaInfo.vaBcaFeeTransactionInBetween
        this.merchantWip.vaBcaMerchantFeeAboveUpperLimitAmount = this.merchantGroupVaInfo.vaBcaMerchantFeeAboveUpperLimitAmount
        this.merchantWip.vaBcaMerchantFeeBelowLowerLimitAmount = this.merchantGroupVaInfo.vaBcaMerchantFeeBelowLowerLimitAmount
        this.merchantWip.vaBcaMerchantFeeInBetween = this.merchantGroupVaInfo.vaBcaMerchantFeeInBetween
        this.merchantWip.vaBri = this.merchantGroupVaInfo.vaBri
        this.merchantWip.vaBriCompanyCode = this.merchantGroupVaInfo.vaBriCompanyCode
        this.merchantWip.vaBriSubCompanyCode = this.merchantGroupVaInfo.vaBriSubCompanyCode
        this.merchantWip.vaBriUpperLimitAmount = this.merchantGroupVaInfo.vaBriUpperLimitAmount
        this.merchantWip.vaBriLowerLimitAmount = this.merchantGroupVaInfo.vaBriLowerLimitAmount
        this.merchantWip.vaBriFeeTransactionAboveUpperLimitAmount = this.merchantGroupVaInfo.vaBriFeeTransactionAboveUpperLimitAmount
        this.merchantWip.vaBriFeeTransactionBelowLowerLimitAmount = this.merchantGroupVaInfo.vaBriFeeTransactionBelowLowerLimitAmount
        this.merchantWip.vaBriFeeTransactionInBetween = this.merchantGroupVaInfo.vaBriFeeTransactionInBetween
        this.merchantWip.vaBriMerchantFeeAboveUpperLimitAmount = this.merchantGroupVaInfo.vaBriMerchantFeeAboveUpperLimitAmount
        this.merchantWip.vaBriMerchantFeeBelowLowerLimitAmount = this.merchantGroupVaInfo.vaBriMerchantFeeBelowLowerLimitAmount
        this.merchantWip.vaBriMerchantFeeInBetween = this.merchantGroupVaInfo.vaBriMerchantFeeInBetween
        this.merchantWip.vaMandiri = this.merchantGroupVaInfo.vaMandiri
        this.merchantWip.vaMandiriCompanyCode = this.merchantGroupVaInfo.vaMandiriCompanyCode
        this.merchantWip.vaMandiriSubCompanyCode = this.merchantGroupVaInfo.vaMandiriSubCompanyCode
        this.merchantWip.vaMandiriUpperLimitAmount = this.merchantGroupVaInfo.vaMandiriUpperLimitAmount
        this.merchantWip.vaMandiriLowerLimitAmount = this.merchantGroupVaInfo.vaMandiriLowerLimitAmount
        this.merchantWip.vaMandiriFeeTransactionAboveUpperLimitAmount = this.merchantGroupVaInfo.vaMandiriFeeTransactionAboveUpperLimitAmount
        this.merchantWip.vaMandiriFeeTransactionBelowLowerLimitAmount = this.merchantGroupVaInfo.vaMandiriFeeTransactionBelowLowerLimitAmount
        this.merchantWip.vaMandiriFeeTransactionInBetween = this.merchantGroupVaInfo.vaMandiriFeeTransactionInBetween
        this.merchantWip.vaMandiriMerchantFeeAboveUpperLimitAmount = this.merchantGroupVaInfo.vaMandiriMerchantFeeAboveUpperLimitAmount
        this.merchantWip.vaMandiriMerchantFeeBelowLowerLimitAmount = this.merchantGroupVaInfo.vaMandiriMerchantFeeBelowLowerLimitAmount
        this.merchantWip.vaMandiriMerchantFeeInBetween = this.merchantGroupVaInfo.vaMandiriMerchantFeeInBetween
        this.merchantWip.vaLain = this.merchantGroupVaInfo.vaLain
        this.merchantWip.vaLainCompanyCode = this.merchantGroupVaInfo.vaLainCompanyCode
        this.merchantWip.vaLainSubCompanyCode = this.merchantGroupVaInfo.vaLainSubCompanyCode
        this.merchantWip.vaLainUpperLimitAmount = this.merchantGroupVaInfo.vaLainUpperLimitAmount
        this.merchantWip.vaLainLowerLimitAmount = this.merchantGroupVaInfo.vaLainLowerLimitAmount
        this.merchantWip.vaLainFeeTransactionAboveUpperLimitAmount = this.merchantGroupVaInfo.vaLainFeeTransactionAboveUpperLimitAmount
        this.merchantWip.vaLainFeeTransactionBelowLowerLimitAmount = this.merchantGroupVaInfo.vaLainFeeTransactionBelowLowerLimitAmount
        this.merchantWip.vaLainFeeTransactionInBetween = this.merchantGroupVaInfo.vaLainFeeTransactionInBetween
        this.merchantWip.vaLainMerchantFeeAboveUpperLimitAmount = this.merchantGroupVaInfo.vaLainMerchantFeeAboveUpperLimitAmount
        this.merchantWip.vaLainMerchantFeeBelowLowerLimitAmount = this.merchantGroupVaInfo.vaLainMerchantFeeBelowLowerLimitAmount
        this.merchantWip.vaLainMerchantFeeInBetween = this.merchantGroupVaInfo.vaLainMerchantFeeInBetween

    }

    setSettlementFollowGroup(merchantGroup: MerchantGroup) {
        console.log(merchantGroup);
        this.merchantWip.settlementConfigWIP.noRekeningToko = merchantGroup.merchantGroupSettlementInfo.nomorRekening;
        this.merchantWip.settlementConfigWIP.namaBankTujuanSettlement = merchantGroup.merchantGroupSettlementInfo.namaBankTujuanSettlement;
        this.merchantWip.settlementConfigWIP.namaPemilikRekening = merchantGroup.merchantGroupSettlementInfo.namaPemilikRekening;
        this.merchantWip.settlementConfigWIP.tipeRekening = merchantGroup.merchantGroupSettlementInfo.tipeRekening;
        this.reportSettlementConfigSelected = merchantGroup.merchantGroupSettlementInfo.reportSettlementConfigLookup;
        this.settlementExecutionConfigSelected = merchantGroup.merchantGroupSettlementInfo.settlementExecutionConfigLookup;
        this.sendRptViaSelected = merchantGroup.merchantGroupSettlementInfo.sendReportViaLookup;
        this.merchantWip.settlementConfigWIP.sendReportUrl = merchantGroup.merchantGroupSettlementInfo.sendReportUrl;
    }

    setFeeFollowGroup(merchantGroup: MerchantGroup) {
        console.log("ini merchant group", MerchantGroup)
        this.processingFeeSelected = merchantGroup.merchantGroupFeeInfo.processingFeeLookup;
        this.merchantWip.settlementConfigWIP.processingFeeValue = merchantGroup.merchantGroupFeeInfo.processingFeeValue;
        this.merchantWip.settlementConfigWIP.rentalEdcFee = merchantGroup.merchantGroupFeeInfo.rentalEdcFee;
        this.mdrSelected = merchantGroup.merchantGroupFeeInfo.mdrLookup;
        this.merchantWip.settlementConfigWIP.mdrEmoneyOnUs = merchantGroup.merchantGroupFeeInfo.mdrEmoneyOnUs;
        this.merchantWip.settlementConfigWIP.mdrEmoneyOffUs = merchantGroup.merchantGroupFeeInfo.mdrEmoneyOffUs;
        this.merchantWip.settlementConfigWIP.mdrDebitOnUs = merchantGroup.merchantGroupFeeInfo.mdrDebitOnUs;
        this.merchantWip.settlementConfigWIP.mdrDebitOffUs = merchantGroup.merchantGroupFeeInfo.mdrDebitOffUs;
        this.merchantWip.settlementConfigWIP.mdrCreditOnUs = merchantGroup.merchantGroupFeeInfo.mdrCreditOnUs;
        this.merchantWip.settlementConfigWIP.mdrCreditOffUs = merchantGroup.merchantGroupFeeInfo.mdrCreditOffUs;
        this.merchantWip.settlementConfigWIP.otherFee = merchantGroup.merchantGroupFeeInfo.otherFee;
        this.merchantWip.settlementConfigWIP.fmsFee = merchantGroup.merchantGroupFeeInfo.fmsFee;


    }

    onFilterCity(id) {
        this.citySelected2 = '0';
        this.listKecamatan = null;
        this.kecamatanSelected2 = '0';
        this.listKelurahan = null;
        this.kelurahanSelected2 = '0';
        this.merchantWip.postalCode = '';

        this.loadListCity(id);
    }

    onFilterKecamatan(id) {
        this.listKelurahan = null;
        this.kelurahanSelected2 = '0';
        this.merchantWip.postalCode='';

        this.loadListKecamatan(id);
    }

    onFilterKelurahan(id) {
        this.loadListKelurahan(id);
        this.merchantWip.postalCode = '';

    }

    onFilterKodePosKelurahan(id) {
        console.log(id);
        this.merchantWip.postalCode= this.listKelurahan.find(kel => kel.id == id).kodePos;
    }

    onFilterKodePosOwnerKelurahan(id) {
        console.log(id);
        this.merchantWip.ownerWIP.ownerKodePos = this.listOwnerKelurahan.find(kel => kel.id == id).kodePos;
    }

    onFilterOwnerCity(id) {
        this.listOwnerKecamatan = null;
        this.kecamatanOwnerSelected2 = '0';
        this.listOwnerKelurahan = null;
        this.kelurahanOwnerSelected2 = '0';
        this.merchantWip.ownerWIP.ownerKodePos = '';


        this.loadListOwnerCity(id);
    }

    

    onFilterOwnerKecamatan(id) {
        this.listOwnerKelurahan = null;
        this.kelurahanOwnerSelected2 = '0';
        this.merchantWip.ownerWIP.ownerKodePos = '';

        this.loadListOwnerKecamatan(id);
    }

    onFilterOwnerKelurahan(id) {
        this.loadListOwnerKelurahan(id);
        this.merchantWip.ownerWIP.ownerKodePos = '';

    }

    onFilterJenisUsaha(id) {
        this.kategoriBisnisSelected = '0';
        this.listKategoriBisnis = null;
        // this.loadKategoriBisnis(id);
        
    }

    lookupPartnerLink(test) {
        console.log(test)
        this.lookupService.filter({
            filter: {
                code: "",
                limit: 9999,
                lookupGroup: "PARTNER_LINK_CODE",
                name: "",
                page: 1,
            }
        })
            .subscribe(
                (res: HttpResponse<Lookup[]>) => this.onSuccessPartnerLink(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message),
                () => { }
            );
    }
    
    private onSuccessPartnerLink(data, headers) {
        if (data.contents.length < 0) {
            return;
        }
        this.partnerLinkList = data.contents;
        console.log("----- Ini list partner link -----", this.partnerLinkList)
        
    }

    loadPartnerLink(pagePartnerLink) {
        this.ngxService.start(); // start loader
        this.searchTermPartnerLink.page = pagePartnerLink
        this.searchTermPartnerLink.limit = this.totalRecord

        this.merchantWipService.getDataPartnerLink({
            filter: this.searchTermPartnerLink,
        })
            .subscribe(
                (res: HttpResponse<MerchantPartner[]>) => this.onSuccessLoadPartnerLink(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    private onSuccessLoadPartnerLink(data, headers) {
        if (data.contents.length < 0) {
            return;
        }
        this.partnerList = data.contents;
        this.totalData = data.totalData;
        console.log("----- Ini list partner list -----", this.partnerList)

    }

    loadPage() {
        this.loadPartnerLink(this.currPage);
    }

    addPartner() {
        if (this.linkCode === '' || this.linkPartnerId == '' ) {
            Swal.fire('Information ', 'code & Partner Id harus diisi !', 'error')
        }
        this.searchTermPartnerLink.code = this.linkCode
        this.searchTermPartnerLink.partner_id = this.linkPartnerId
        
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to Add this Partner?',
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Approve'
        }).then((result) => {
            console.log("result ->", result);
            if (result.value) {  
                let req = this.searchTermPartnerLink
                console.log("ini req partner link ------->",req)
                this.ngxService.start();
                this.merchantWipService.addPartner({filter:req}).subscribe((result) => {
                    const code = result.body.errCode.toString()
                    this.ngxService.stop();
                    if (code == '00') {
                        Swal.fire('Success', "Add Partner success", 'success').then(
                            () => {
                                this.reload(req.merchant_id)                            }
                        );
                    } else {
                        Swal.fire('Failed', result.body.errDesc, 'error').then(                         
                        );

                    }
                });
            } 
        });
    }

    deletePartner(id) {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to Delete this Partner?',
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Approve'
        }).then((result) => {
            console.log("result ->", result);
            if (result.value) {
                let req = this.searchTermPartnerLink
                console.log("ini req partner link ------->", req)
                this.ngxService.start();
                this.merchantWipService.deletePartner(id).subscribe((result) => {
                    const code = result.body.errCode.toString()
                    this.ngxService.stop();
                    if (code == '00') {
                        Swal.fire('Success', "Delete Partner success", 'success').then(
                            () => {   
                                this.reload(req.merchant_id)
                            }
                        );
                    } else {
                        Swal.fire('Failed', result.body.errDesc, 'error').then(
                        );

                    }
                });
            }
        });
    }
    showPassword() {
        if(this.merchantWip.vaTokenPassword !== null){
				if(this.inputType !="password"){
					this.inputType = "password";
					this.showHideIcon = "eye-slash";
				}else{
					this.inputType = "text";
					this.showHideIcon = "eye";
				}
			}
    }

    showPassword1() {
        if(this.merchantWip.settlementConfigWIP.sftpPassword !== null){
				if(this.inputType1 !="password"){
					this.inputType1 = "password";
					this.showHideIcon1 = "eye-slash";
				}else{
					this.inputType1 = "text";
					this.showHideIcon1 = "eye";
				}
			}
    }

    tipeMerchantChanged() {
        let typeMerchant = '';
        // console.log("list Jenis Usaha -------> ", this.lookupTipeMerchant)
        // console.log(this.tipeMerchantSelected)
        this.lookupTipeMerchant.forEach( tm => {
            // console.log(ju)
            if ( tm.id.toString() === this.tipeMerchantSelected ) {
                typeMerchant = tm.name
                // console.log(" nama tipe merchant ----------> ", typeMerchant)
            }
        })
        
        if (typeMerchant === 'UMKM') {
            this.disable = true
            
            // console.log(this.disable)
        } else {
            this.disable = false
        }
    }

    private onSuccessAcquisition(data, headers) {
        // let warning = []
        console.log(data.contents)
        console.log("on success acquisition",this.merchantGroupSelected, this.userCategorySelected, this.merchantWip.srId, this.merchantWip.merchantGroup.id, this.merchantWip.category)
        if (this.merchantWip.srId == null) {
            this.srBefore = null
        } else {  
            this.lookupSrId.forEach( el => {
                if (this.merchantWip.srId == el.code ) {
                    this.srBefore = el.name
                }
            })
        }
        
        if (this.userCategorySelected == '') {
            this.categoryBefore = null
        } else { 
            this.userCategoryList.forEach( el => {
                if (el.code == this.userCategorySelected) {
                    this.categoryBefore = el.name
                }
            })
        }
        // let acquisition : Acquisition
        let date
        if (data.contents.length === 0) {
            Swal.fire('Warning', 'Tipe Business Not Register on Acquisition List', 'warning')
            return
        } else if (data.contents.length === 1 ) {
            this.acquisition = data.contents[0]
        } else {
            let acquisitionList = this.validateAcquisition(data.contents)
            date = Date.parse(acquisitionList[0].createdAt)
            for ( let i = 0 ; i < acquisitionList.length ; i ++ ) {
                if (i == 0) {
                    this.acquisition = acquisitionList[i]
                }
                console.log(date, Date.parse(acquisitionList[i].createdAt), Date.parse(acquisitionList[i].createdAt) > date )
                if ( Date.parse(acquisitionList[i].createdAt) > date) {
                    console.log("masuk sini benar")
                    date = Date.parse(acquisitionList[i].createdAt)
                    this.acquisition = acquisitionList[i]
                }
            };
        }
        console.log("ini acquitition seteleh get by tipe bisnis",this.acquisition)
        if (this.merchantWip.srId == '10' || this.merchantWip.srId == '9') {
            console.log("sr tidak berubah")
        } else {
            let sr = this.acquisition.salesRetails.split(',')
            if ( sr.length == 1 ) {
                if (this.merchantWip.srId !== this.acquisition.salesRetails) {
                    this.warning.push(`SR ID` )
                    // this.merchantWip.srId = this.acquisition.salesRetails
                }
            } else {
                sr.forEach( el => {
                    if (el == '9' || el == '10') {
                        console.log("sr tidak dipilih")
                    } else {
                        if (this.merchantWip.srId !== el) {
                            this.warning.push(`SR ID` )
                                // this.merchantWip.srId = el
                            }
                    }
                })
            }
        }
        if ( this.merchantGroupSelected !== this.acquisition.merchantGroupId ) {
            this.warning.push(`Merchant Group`)
            // this.merchantGroupSelected = this.acquisition.merchantGroupId
        }
        this.userCategoryList.forEach( el => {
            if (el.code == this.acquisition.merchantCategory) {
                if ( el.code !== this.userCategorySelected) {
                    this.warning.push(`Category`)
                    // this.userCategorySelected = el.code
                }
            }
        })

        // if ( this.warning.length > 0) {
        //     Swal.fire('Warning', 
        //         `There is a data adjustment :<br>
        //         ${this.warning.join('<br>')} , <br>
        //         Please confirm and approve !`
        //         , "warning")
        // }
        
    }

    private onSuccessAcquisition2(data, headers) {
        this.warning = []
        console.log(data.contents)
        // let acquisition : Acquisition
        let date
        if (data.contents.length === 0) {
            Swal.fire('Warning', 'Tipe Business Not Register on Acquisition List', 'warning')
            return
        } else if (data.contents.length === 1 ) {
            this.acquisition = data.contents[0]
        } else {
            let acquisitionList = this.validateAcquisition(data.contents)
            console.log("ini setelah difilter", acquisitionList)
            date = Date.parse(acquisitionList[0].createdAt)
            for ( let i = 0 ; i < acquisitionList.length ; i ++ ) {
                if (i == 0) {
                    this.acquisition = acquisitionList[i]
                }
                console.log(date, Date.parse(acquisitionList[i].createdAt), Date.parse(acquisitionList[i].createdAt) > date )
                if ( Date.parse(acquisitionList[i].createdAt) > date) {
                    console.log("masuk sini benar")
                    date = Date.parse(acquisitionList[i].createdAt)
                    this.acquisition = acquisitionList[i]
                }
            };
        }
        console.log("ini acquitition seteleh get by tipe bisnis",this.acquisition)
        if (this.merchantWip.srId == '10' || this.merchantWip.srId == '9') {
            console.log("sr tidak berubah")
        } else {
            let sr = this.acquisition.salesRetails.split(',')
            console.log("ini sr list dari aquisisi list",sr)
            if ( sr.length == 1 ) {
                if (this.merchantWip.srId !== this.acquisition.salesRetails) {
                    
                    this.lookupSrId.forEach( el => {
                        // if (this.merchantWip.srId == el.code ) {
                        //     this.srBefore = el.name
                        // }
                        if (this.acquisition.salesRetails == el.code ) {
                            this.srAfter = el.name
                        }
                    })
                    this.warning.push(`SR ID from ${this.srBefore} to  ${this.srAfter}` )
                    this.merchantWip.srId = this.acquisition.salesRetails
                }
            } else {
                sr.forEach( el => {
                    if (el == '9' || el == '10') {
                        console.log("sr tidak dipilih")
                    } else {
                        if (this.merchantWip.srId !== el) {
                            this.lookupSrId.forEach( element => {
                                // if (this.merchantWip.srId == element.code ) {
                                //     this.srBefore = element.name
                                // }
                                if (el == element.code ) {
                                    this.srAfter = element.name
                                }
                            })
                            this.warning.push(`SR ID from ${this.srBefore} to  ${this.srAfter}` )
                                this.merchantWip.srId = el
                            }
                    }
                })
            }
        }
        if ( this.merchantGroupSelected !== this.acquisition.merchantGroupId ) {
            this.lookupMerchantGroup.forEach( mg => {
                // if (this.merchantGroupSelected == mg.id) {
                //     this.mgBefore = mg.merchantGroupName
                // }
                if (this.acquisition.merchantGroupId == mg.id) {
                    this.mgAfter = mg.merchantGroupName
                }
            })
            this.warning.push(`Merchant Group from ${this.mgBefore} to ${this.mgAfter}`)
            this.merchantGroupSelected = this.acquisition.merchantGroupId
        }
        this.userCategoryList.forEach( el => {
            // if (el.code == this.userCategorySelected) {
            //     this.categoryBefore = el.name
            // }
            if (el.code == this.acquisition.merchantCategory) {
                if ( el.code !== this.userCategorySelected) {
                    
                    this.warning.push(`Category from ${this.categoryBefore} to ${el.name}`)
                    this.userCategorySelected = el.code
                }
            }
        })

        if ( this.warning.length > 0) {
            Swal.fire('Warning', 
                `There is a data adjustment :<br>
                ${this.warning.join('<br>')} , <br>
                Please confirm and approve !`
                , "warning")
                .then(
                    () => this.warning = []
                )
        }
        
    }

    private validateAcquisition(data : Acquisition[]) {
        console.log(this.businessType)
        let acquisitionList = []
        for ( let i = 0 ; i < data.length ; i++) {
            let split = data[i].businessType.split(",")
            
            for ( let j = 0 ; j < split.length ; j++) {
                console.log("Pengecekan :",this.businessType, split[j])
                if (split[j] == this.businessType) {
                    acquisitionList.push(data[i])
                }
            
            }
        }
        return acquisitionList
    }

    tipeBisnisChanged() {

        if ( this.disable ) {
            // let businessType 
            this.lookupJenisUsaha.forEach( el => {
                if ( el.id.toString() == this.jenisUsahaSelected ) {
                    this.businessType = el.name
                }
            })   
        
            let filter = {
                page: 1,
                limit: 999,
                businessType: this.businessType
            }
            this.ngxService.start();
            this.acquisitionService.filter({filter: filter})
                .subscribe(
                    (res: HttpResponse<Acquisition[]>) => this.onSuccessAcquisition2(res.body, res.headers),
                    (res: HttpErrorResponse) => this.onError(res.message),
                    () => { 
                        this.ngxService.stop();
                        console.log('finally'); 
                    }
                );
        }
    }
}
