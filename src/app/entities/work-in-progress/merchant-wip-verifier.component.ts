import { Component, OnInit, OnDestroy } from '@angular/core';
import { MerchantWip } from './merchant-wip.model';
import { WorkInProgressService } from './work-in-progress.service';
import { TO_VERIFIED, TO_VERIFIED_MSG, GET_REGISTERED, SERVER_LOAD_IMAGE, BUCKET_NAME, PHOTO_KTP, PHOTO_SELFIE, PHOTO_LOCATION, PHOTO_LOCATION_2, PHOTO_SIGN, PHOTO_LOGO, TOTAL_RECORD_PER_PAGE, PHOTO_LOCATION_RIGHT, PHOTO_LOCATION_LEFT, PHOTO_PREPRINTED_QR, PHOTO_PROFILE_PICTURE, } from 'src/app/shared/constants/base-constant';
import { HOST_TYPE, LOOKUP_MERCHANT_CATEGORY_CODE } from 'src/app/shared/constants/base-constant';
import { LOOKUP_JENIS_USAHA, LOOKUP_PROVINCE, ID_TYPE, GENDER, PEKERJAAN } from 'src/app/shared/constants/base-constant';
import { SETTLEMENT_CONFIG, LOOKUP_SEND_RPT_VIA, LOOKUP_RPT_SETT_CFG2,LOOKUP_SR_ID, LOOKUP_SETT_EXEC_CFG } from 'src/app/shared/constants/base-constant';
import { LOOKUP_PROCESSING_FEE, LOOKUP_MDR, LOOKUP_DEVICE_TYPE, LOOKUP_DEVICE_GROUP } from 'src/app/shared/constants/base-constant';
import { LOOKUP_DEVICE_BRAND, LOOKUP_PROCESSING_CONFIG } from 'src/app/shared/constants/base-constant';
import { SERVER_PATH, TO_REGISTERED, TO_REGISTERED_MSG } from 'src/app/shared/constants/base-constant';
import { LOOKUP_TIPE_MERCHANT, OWNER_TITLE } from 'src/app/shared/constants/base-constant';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LookupDto } from '../lookup/lookup-dto.model';
import * as _ from 'lodash';
import { MerchantOutlet } from '../merchant/merchant-outlet.model';
import { LookupService } from '../lookup/lookup.service';
import { MerchantGroup } from '../merchant-group/merchant-group.model';
import { MerchantGroupService } from '../merchant-group/merchant-group.service';
import { Merchant } from '../merchant/merchant.model';
import { Apupt } from '../apupt/apupt.model';
import { Teroris } from '../teroris/teroris.model';
import { InternalNameRisk } from '../internal-name-risk/internal-name-risk.model';
import { Lookup } from '../lookup/lookup.model';
import { AppParameter } from '../app-parameter/app-parameter.model';
import { AppParameterService } from '../app-parameter/app-parameter.service';
import { TerorisService } from '../teroris/teroris.service';
import { InternalNameRiskService } from '../internal-name-risk/internal-name-risk.service';
import { ApuptService } from '../apupt/apupt.service';
import { MerchantOutletWipService } from './merchant-outlet-wip.service';
import { MerchantOutletWip } from './merchant-outlet-wip.model';
import { MerchantDetailOutletModalComponent } from '../merchant/merchant-detail-outlet-modal.component';
import { MerchantWipCommentService } from './merchant-wip-comment.service';
import { MerchantWipComment } from './merchant-wip-comment.model';
import { SettlementConfigWipCommentService } from './settlement-config-wip-comment.service';
import { SettlementConfigWipComment } from './settlement-config-wip-comment.model';
import { OwnerWipCommentService } from './owner-wip-comment.service';
import { OwnerWipComment } from './owner-wip-comment.model';
import { MerchantStatusListService } from './merchant-status-list.service';
import { Dati2Service } from '../dati2/dati2.service';
import { Provinsi } from '../provinsi/provinsi.model';
import { ProvinsiService } from '../provinsi/provinsi.service';
import { Dati2 } from '../dati2/dati2.model';
import { KecamatanService } from '../kecamatan/kecamatan.service';
import { Kecamatan } from '../kecamatan/kecamatan.model';
import { Kelurahan } from '../kelurahan/kelurahan.model';
import { KelurahanService } from '../kelurahan/kelurahan.service';
import { UploadImageService } from 'src/app/shared/upload-image.service';
import { moduleDef } from '@angular/core/src/view';
import { MccService } from '../mcc/mcc.service';
import { Mcc } from '../mcc/mcc.model';

import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { Subject, merge, Observable } from 'rxjs';
import { KategoriBisnis } from '../kategori-bisnis/ketegori-bisnis.model';
import { KategoriBisnisService } from '../kategori-bisnis/kategori-bisnis.service';
import { ReasonWip } from '../report/report-rejected/report-rejected.model';
import { ReportRejectedService } from '../report/report-rejected/report-rejected.service';
import { UserCategory } from '../ottopay-4/user-category/user-category.model';
import { UserCategoryService } from '../ottopay-4/user-category/user-category.service';
import { SettlementConfig } from '../merchant/merchant-settlement-config.model';

@Component({
    selector: 'op-merchant-wip',
    templateUrl: './merchant-wip.component.html',
    styleUrls: ['./merchant-wip.component.css']
})
export class MerchantWipVerifierComponent implements OnInit, OnDestroy {

    statusView = 'Verifier';
    statusRec: string  ;
    moduleName = '';

    listStatus = [
        { code: "y", name: "active" },
        { code: "n", name: "inactive" },
    ]

    listStatusCallback = [
        { code: "y", name: "Enable" },
        { code: "n", name: "Disable" },
    ]

    listAuthType = [
        { code: "" , name: "-- Pilih Auth Type --"},
        { code: "Signature", name: "Signature" },
        { code: "Token", name: "Token" },
    ]

    provinsiSelected = '0';
    citySelected2 = '0';
    kecamatanSelected2 = '0';
    kelurahanSelected2 = '0';
    provinceOwnerSelected2 = '0';
    kabupatenOwnerSelected2 = '0';
    kecamatanOwnerSelected2 = '0';
    kelurahanOwnerSelected2 = '0';
    totalDataReason = 0;

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
    reasonWip: ReasonWip = {
        status: '',
        reason: '',
    };

    listKategoriBisnis: KategoriBisnis[] = [];

    // ======================================

    // jika form close karena approve -> bypass
    //      form close karena close form atau data yg ditarik kosong
    closeFormMustPushStatusList  = true;

    addMerchantOutlet = true;
    merchant: Merchant;
    merchantOutlet: MerchantOutlet;
    totalDataOutlets = 0;
    totalRecordOutlets = TOTAL_RECORD_PER_PAGE;
    curPageOutlets = 1;
    merchantOutletList: MerchantOutletWip[];

    finishBreakLookup = false;

    merchantWip: MerchantWip;
    settlementConfig : SettlementConfig = {};

    ownerTanggalExpiredID: NgbDateStruct; // temp var for this.merchant.owner.ownerTangalExpiredID
    ownerTanggalLahir: NgbDateStruct; // temp var for this.merchant.owner.ownerTanggalLahir
    seumurHidupChecked = false;

    // initial for check button
    storeDataChecked = true;
    ownerDataChecked = false;
    settlementChecked = false;
    otherInfoChecked = false;
    outletChecked = false;
    otherChecked = false;

    lookupTipeMerchant: LookupDto[] = [];
    lookupProvince: LookupDto[] = [];
    lookupJenisUsaha: LookupDto[] = [];
    lookupCity: LookupDto[] = [];
    lookupOwnerTitle: LookupDto[] = [];
    lookupIdType: LookupDto[] = [];
    lookupGender: LookupDto[] = [];
    lookupPekerjaan: LookupDto[] = [];
    lookupSettlementConfig: LookupDto[] = [];
    lookupReportSettlementConfig: LookupDto[] = [];
    lookupSettlementExecutionConfig: LookupDto[] = [];
    lookupSendRptVia: LookupDto[] = [];
    lookupHostType: LookupDto[] = [];

    tipeMerchantUmkm: string;
    tipeMerchantModern: string;
    tipeMerchantECommerce: string;

    tipeMerchantSelected = '0'; 
    jenisUsahaSelected = '0';
    kategoriBisnisSelected = '0'
    provinceSelected: string;
    citySelected: string;
    mccSelected: string;
    ownerTitleSelected = '0';
    provinceOwnerSelected: string;
    kabupatenOwnerSelected: string;
    idTypeSelected: string;
    genderSelected = '0';
    pekerjaanselected: string;
    settlementConfigSelected: string;
    reportSettlementConfigSelected: string;
    settlementExecutionConfigSelected: string;
    sendRptViaSelected: string;
    processingConfigSelected: string;
    processingFeeSelected: string;

    mdrSelected: string;
    deviceTypeSelected: string;
    deviceGroupSelected: string;
    deviceBrandSelected: string;

    merchantGroupSelected: number;

    lookupProcessingConfig: LookupDto[] = [];
    lookupProcessingFee: LookupDto[] = [];
    lookupMDR: LookupDto[] = [];
    lookupDeviceType: LookupDto[] = [];
    lookupDeviceGroup: LookupDto[] = [];
    lookupDeviceBrand: LookupDto[] = [];


    lookupTempl: LookupDto[];

    lookupMerchantGroup: MerchantGroup[] = [];
    lookupApproveReason: LookupDto[] = [];
    lookupRejectReason: LookupDto[] = [];
    lookupReturnReason: LookupDto[] = [];
    lookupMerchantCategoryCode: LookupDto[] = [];
    lookupSrId: LookupDto[] = [];

    merchantPriority: string;
    merchantCriteria: string;


    // list risk
    apuptList: Apupt[];
    terorisList: Teroris[];
    internalNameRiskList: InternalNameRisk[];
    jobRiskList: Lookup[];
    businessTypeRiskList: Lookup[];

    // initial max parameter for check
    maxTeroris = 0;
    maxApupt = 0;
    maxInternalName = 0;

    // initial list app paramter
    appParameterList: AppParameter[];
    // initial validation high risk
    riskJob = 'Tidak High Risk';
    riskTypeOfBusiness = 'Tidak High Risk';
    riskTeroris = 'Tidak High Risk';
    riskApupt = 'Tidak High Risk';
    riskInternalName = 'Tidak High Risk';

    // initial is highrisk
    isHighRisk: boolean;
    statusValidation = false;
    closeResult: string;
    merchantOutletId: string;

    submitted = false;
    mdtArrOwnWip = ['ownerFirstName', 'ownerLastName', 'ownerAddress', 'ownerProvinsi', 'ownerKabupaten',
        'ownerKecamatan', 'ownerKelurahan', 'ownerKodePos', 'ownerTipeID', 'ownerNoID', 'ownerTanggalExpiredID', 'ownerJenisKelamin',
        'ownerNoTelp', 'ownerTempatLahir', 'ownerTanggalLahir'];

    // mdtArrMWipLokasiBisnis = ['lokasiBisnis',
    //     'jenisLokasiBisnis'];

    // mdtArrOwnWip = ['ownerFirstName', 'ownerLastName', 'ownerAddress',
    //     'ownerKelurahan', 'ownerKecamatan', 'ownerKodePos', 'ownerNoID', 'ownerNoTelp',
    //     'ownerTelpLain', 'ownerTempatLahir', 'ownerNamaIbuKandung'];

    // mdtArrSetConfWIP = ['noRekeningToko', 'namaBankTujuanSettlement', 'namaPemilikRekening', 'tipeRekening',
    //     'processingFeeValue', 'rentalEdcFee', 'mdrEmoneyOnUs', 'mdrEmoneyOffUs',
    //     'mdrDebitOnUs', 'mdrDebitOffUs', 'mdrCreditOnUs', 'mdrCreditOffUs', 'otherFee', 'fmsFee'];

    // mdtArrWipComboBox = ['lokasiBisnis',
    //     'jenisLokasiBisnis'];

    mdtArrMWip = ['storeName', 'merchantType', 'jenisUsaha', 'alamat', 'provinsi', 'kabupatenKota', 'kecamatan', 'kelurahan',
        'postalCode', 'longitude', 'latitude', 'storePhoneNumber', 'jamOperasional', 'merchantPan',
        'merchantCategoryCode', 'merchantGroupId', 'mcc'];

    mdtArrMWipLokasiBisnis = ['lokasiBisnis', 'jenisLokasiBisnis'];

    // mdtArrOwnWip = ['ownerTitle', 'ownerFirstName', 'ownerLastName', 'ownerAddress', 'ownerProvinsi', 'ownerKabupaten',
    //     'ownerKecamatan', 'ownerKelurahan', 'ownerKodePos', 'ownerTipeID', 'ownerNoID', 'ownerTanggalExpiredID', 'ownerJenisKelamin',
    //     'ownerNoTelp', 'ownerPekerjaan', 'ownerTempatLahir', 'ownerTanggalLahir'];

    mdtArrSetConfWIP = ['processingFeeValue', 'rentalEdcFee', 'mdrEmoneyOnUs', 'mdrEmoneyOffUs',
        'mdrDebitOnUs', 'mdrDebitOffUs', 'mdrCreditOnUs', 'mdrCreditOffUs', 'otherFee', 'fmsFee',
        'settlementConfig'];


    // PATH
    pathImgServer: String = SERVER_PATH + 'images/previewImage?data=';
    pathImgMerchantServer: String = SERVER_PATH + 'images/previewImageMerchantWip?data=';

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


    // comment
    commentMerchantWip: MerchantWipComment = {};
    commentSettlementConfigWip: SettlementConfigWipComment = {};
    commentOwnerWip: OwnerWipComment = {};

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
    merchantCategoryCodeSelected: string;

    listNotificationChannel = [
        { code: '', name: "- Select Notification Channel -" },
        { code: "None", name: "None" },
        { code: "Email", name: "Email" },
        { code: "WhatsApp", name: "WhatsApp" },
    ]

    notificationChannelSelected : string = '';

    listHostType = [
        { code: "" , name: "-- Pilih Host Type --"},
        { code: "billing_system", name: "Billing System" },
        { code: "technical_integrator", name: "Technical Integrator" },
        { code: "ottopay_topup_deposit", name: "OttoPay Topup Deposit" },
    ];

    buttonSuspense = null;
    statusSuspense = null;

    formatter: any;
    search: any;

    constructor(private merchantWipService:  WorkInProgressService,
                private router: Router,
                private lookupService: LookupService,
                private modalService: NgbModal,
                private merchantGroupService: MerchantGroupService,
                private appParameterService: AppParameterService,
                private terorisService: TerorisService,
                private internalNameRiskService: InternalNameRiskService,
                private apuptService: ApuptService,
                private ngxService: NgxUiLoaderService,
                private merchantOutletWipService: MerchantOutletWipService,
                private merchantWipCommentService: MerchantWipCommentService,
                private settlementConfigWipCommentService: SettlementConfigWipCommentService,
                private ownerWipCommentService: OwnerWipCommentService,
                private merchantStatusListService: MerchantStatusListService,
                private dati2Service: Dati2Service,
                private provinceService: ProvinsiService,
                private kecamatanService: KecamatanService,
                private kelurahanService: KelurahanService,
                private uploadImageService: UploadImageService,
                private kategoriBisnisService: KategoriBisnisService,
                private mccService: MccService,
                private reportRejectedService: ReportRejectedService,
                private userCategoryService: UserCategoryService ) { }

    ngOnInit() {
        this.moduleName = 'Verifier';
        this.mccSelected = '0';
        this.ngxService.start();
        this.merchantOutlet = new MerchantOutlet();
        this.merchantOutletList = [];

        this.merchantLevelSelected = this.levels[0].code;

        this.merchantWip = {};
        this.merchantWip.ownerWIP = {};
        this.merchantWip.merchantGroupId = 0;
        this.merchantWip.settlementConfigWIP = {};

        this.settlementConfig.reportSettlementConfigName = "Disable";

        this.loadApupt();
        this.loadTeroris();
        this.loadInternalNameRisk();
        this.loadAppParameter();
        this.loadRiskJob();
        this.loadRiskBusinessType();
        this.loadUserCategory();


        // this.loadListProvince();
        this.find();

    }

    find() {
        this.merchantWipService.getWip(GET_REGISTERED).subscribe(
            (res: HttpResponse<MerchantWip>) => this.onSuccess(res.body),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    private loadUserCategory() {
        this.ngxService.start();
        this.userCategoryService.filter({
            filter: {
                page: 1,
                limit: 99
            }
        }).subscribe(
            (res: HttpResponse<UserCategory[]>) => this.onSuccessUserCategory(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
        )
    }

    loadLookupMerchantGroup() {
        this.merchantGroupService.query({
            page: 1,
            count: 1000,
        }).subscribe(
            (res: HttpResponse<MerchantGroup[]>) => this.onSuccessMG(res.body, res.headers),
            (res: HttpErrorResponse) => console.log(res.message),
            () => { console.log('Finally MG'); }
        );
    }

    private onSuccessMG(data, headers) {
        this.lookupMerchantGroup = data.content;
        this.merchantGroupSelected = this.merchantWip.merchantGroupId;

    }

    private onSuccessUserCategory(data, headers) {
        this.ngxService.stop();
        if (data.contents.length < 0) {
            return;
        }
        console.log(data);
        this.userCategoryList = data.contents;
    }

    loadLookup() {
        this.ngxService.start();
        console.log('Start call lookup');
        this.lookupService.findForMerchantGroup()
            .subscribe(
                (res: HttpResponse<LookupDto[]>) => this.onSuccessLookup(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message),
                () => { this.ngxService.stop(); console.log('finally'); }
            );
    }

    private onSuccessLookup(data, headers) {
        this.lookupTempl = data;
        this.breakLookup();
    }

    breakLookup() {
        this.lookupTempl.forEach(lookupdt => {
            // console.log('lookupdt-->', lookupdt);
            if (lookupdt.lookupGroupString === LOOKUP_JENIS_USAHA) {
                this.lookupJenisUsaha.push(lookupdt);
            }
            if (lookupdt.lookupGroupString === LOOKUP_PROVINCE) {
                this.lookupProvince.push(lookupdt);
            }
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
                console.log("WWWWW", this.lookupTipeMerchant);
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
        });
        console.log('finish breakLookup ');
        this.finishBreakLookup = true;
        this.defaultConfig();
    }

    loadAppParameter() {

        this.appParameterService.getRiskParameter().subscribe(
            (res: HttpResponse<AppParameter[]>) => {
                this.appParameterList = res.body;
                res.body.forEach(data => {
                    if (data.name === 'MAX_NUM_HIGH_RISK_TERORIS') {
                        this.maxTeroris = Number(data.value);
                    }
                    if (data.name === 'MAX_NUM_HIGH_RISK_APUPPT') {
                        this.maxApupt = Number(data.value);
                    }
                    if (data.name === 'MAX_NUM_HIGH_RISK_INTERNAL_NAME_RISK') {
                        this.maxInternalName = Number(data.value);
                    }
                });
            }
        );
    }

    loadReason(wipid) {
        this.ngxService.start(); // start loader
        this.reportRejectedService.getReason(wipid)
            .subscribe(
                (res: HttpResponse<ReasonWip[]>) => this.onSuccessReason(res.body, res.headers),
                (res: HttpErrorResponse) => this.onErrorReason(res.message)
            );
    }

    private onSuccessReason(data, headers) {
        this.ngxService.stop();
        // if (data.contents.length < 0) {
        //     this.reasonWip = {
        //         status: '',
        //         reason: '',
        //     }
        //     return;
        // }
        // this.reasonWip = {
        //     status: '',
        //     reason: '',
        // };
        if (data.errCode!=='00'){
            this.reasonWip = {
                status: '',
                reason: '',
            }
            return;
        }
        this.reasonWip = data.contents;
        this.totalDataReason = data.totalData;
    }

    private onErrorReason(error) {
        this.ngxService.stop();
        console.log('error..', error);
    }

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
            day: Number('31')
        };
        this.seumurHidupChecked = !this.seumurHidupChecked;
        // console.log(data);
    }

    // fill data merchantWip after load
    onSuccess(merchantWip) {
        console.log('merchantWip-->', merchantWip);

        if (merchantWip.errCode === '00') {

            this.merchantWip = merchantWip;
            this.loadLookup();
            this.loadLookupMerchantGroup();
            this.loadMerchantOutletByMerchant(this.merchantWip.id);
            console.log(this.merchantWip);
            this.loadImageMerchant(this.merchantWip);
            this.convertToDate();
            // begin load comment
            this.loadCommentMerchantWip(merchantWip.id);
            this.loadCommentSettlementConfigWip(merchantWip.settlementConfigWIP.id);
            this.loadCommentOwnerWip(merchantWip.ownerWIP.id);
            this.merchantGroupSelected = this.merchantWip.merchantGroupId;
            // end load comment

            // get priority
            this.loadStatusPriority(this.merchantWip.id);

            this.merchantLevelSelected = this.merchantWip.level;
            if(this.merchantWip.level=='0'){
                this.merchantLevelSelected = this.levels[1].code;
            }
            this.jenisUsahaSelected = this.merchantWip.jenisUsaha;
            this.kategoriBisnisSelected = this.merchantWip.kategoriBisnis;


            console.log("this.merchantWip.category ==> ", this.merchantWip.category);
            
            if (this.merchantWip.category && this.merchantWip.category != '') {
                console.log("fill data category");
                this.userCategorySelected = this.merchantWip.category;
            }


            this.provinsiSelected = this.merchantWip.provinsi;
            this.citySelected2 = this.merchantWip.kabupatenKota;
            this.kecamatanSelected2 = this.merchantWip.kecamatan;
            this.kelurahanSelected2 = this.merchantWip.kelurahan;
            this.provinceOwnerSelected2 = this.merchantWip.ownerWIP.ownerProvinsi;
            this.kabupatenOwnerSelected2 = this.merchantWip.ownerWIP.ownerKabupaten;
            this.kecamatanOwnerSelected2 = this.merchantWip.ownerWIP.ownerKecamatan;
            this.kelurahanOwnerSelected2 = this.merchantWip.ownerWIP.ownerKelurahan;
            this.mccSelected = this.merchantWip.mcc;
            this.notificationChannelSelected = this.merchantWip.notificationChannel;

            this.loadListMcc();
            this.loadListProvince();
            this.loadListCity(this.provinsiSelected);
            this.loadListKecamatan(this.citySelected2);
            this.loadListKelurahan(this.kecamatanSelected2);
            this.loadListOwnerCity(this.provinceOwnerSelected2);
            this.loadListOwnerKecamatan(this.kabupatenOwnerSelected2);
            this.loadListOwnerKelurahan(this.kecamatanOwnerSelected2);
            this.loadReason(this.merchantWip.id)

            this.formatter = (result: Mcc) => result.code + ' - ' + result.name.toUpperCase();

            this.search = (text: Observable<string>) =>
                text.pipe(
                    debounceTime(200),
                    distinctUntilChanged(),
                    map(term => term === '' ? this.listMcc
                        : this.listMcc.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1 || v.code.indexOf(term.toLowerCase()) > -1).slice(0, 10))
                )


        } else { // redirect to homepage if data null
            this.ngxService.stop();
            this.closeFormMustPushStatusList = false;
            Swal.fire('Verifier data is empty', 'Will redirect to homepage', 'error').then(
                res => this.router.navigate(['/main'])
            );
        }
    }

    // =======================================

    private loadListMcc() {
        this.mccService.getAll().subscribe(
            (res: HttpResponse<Mcc[]>) => this.onSuccessMcc(res.body),
            (res: HttpErrorResponse) => this.onError(res.message),
            () => { console.log('finally'); }
        )
    }

    private loadListProvince() {
        // this.ngxService.start();

        this.provinceService.getAll()
            .subscribe(
                (res: HttpResponse<Provinsi[]>) => this.onSuccessProvince(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message),
                () => { console.log('finally'); }
            );
    }

    private loadListCity(id) {

        this.dati2Service.getByProvinsiId(id)
            .subscribe(
                (res: HttpResponse<MerchantGroup[]>) => this.onSuccessFilterCity(res.body),
                (res: HttpErrorResponse) => this.onErrorMG(res.message),
                () => { this.ngxService.stop(); console.log('Finally Dati2'); }
            );
    }

    private loadListKecamatan(id) {

        this.kecamatanService.getByDati2Id(id).subscribe(
            (res: HttpResponse<MerchantGroup[]>) => this.onSuccessFilterKecamatan(res.body),
            (res: HttpErrorResponse) => this.onErrorMG(res.message),
            () => { this.ngxService.stop(); console.log('Finally Kecamatan'); }
        );
    }

    private loadListKelurahan(id) {

        this.kelurahanService.getByKecamatanId(id).subscribe(
            (res: HttpResponse<MerchantGroup[]>) => this.onSuccessFilterKelurahan(res.body),
            (res: HttpErrorResponse) => this.onErrorMG(res.message),
            () => { this.ngxService.stop(); console.log('Finally Kelurahan'); }
        );
    }

    private loadListOwnerCity(id) {

        this.dati2Service.getByProvinsiId(id)
            .subscribe(
                (res: HttpResponse<MerchantGroup[]>) => this.onSuccessFilterCity2(res.body),
                (res: HttpErrorResponse) => this.onErrorMG(res.message),
                () => { this.ngxService.stop(); console.log('Finally Dati2'); }
            );
    }

    private loadListOwnerKecamatan(id) {

        this.kecamatanService.getByDati2Id(id).subscribe(
            (res: HttpResponse<MerchantGroup[]>) => this.onSuccessFilterKecamatan2(res.body),
            (res: HttpErrorResponse) => this.onErrorMG(res.message),
            () => { this.ngxService.stop(); console.log('Finally Kecamatan'); }
        );
    }

    private loadListOwnerKelurahan(id) {

        this.kelurahanService.getByKecamatanId(id).subscribe(
            (res: HttpResponse<MerchantGroup[]>) => this.onSuccessFilterKelurahan2(res.body),
            (res: HttpErrorResponse) => this.onErrorMG(res.message),
            () => { this.ngxService.stop(); console.log('Finally Kelurahan'); }
        );
    }

    private onSuccessMcc(data) {
        this.listMcc = data;
    }

    private onSuccessProvince(data, headers) {
        this.listProvince = data;
        this.listOwnerProvince = data;
    }

    private onSuccessFilterCity(data) {
        this.listCity = data;
    }

    private onSuccessFilterKecamatan(data) {
        this.listKecamatan = data;
    }

    private onSuccessFilterKelurahan(data) {
        this.listKelurahan = data;
    }

    private onSuccessFilterCity2(data) {
        this.listOwnerCity = data;
    }

    private onSuccessFilterKecamatan2(data) {
        this.listOwnerKecamatan = data;
    }

    private onSuccessFilterKelurahan2(data) {
        this.listOwnerKelurahan = data;
    }

    private onSuccessFilterKategoriBisnis(data) {
        console.log('listKategoriBisnis --> ', data)
        this.listKategoriBisnis = data;
        this.ngxService.stop();
    }

    private onErrorMG(error) {
        console.log('Error load MG ', error);
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
        this.kecamatanSelected2 = '0';
        this.kelurahanSelected2 = '0';
        this.merchantWip.postalCode = '';

        this.loadListKecamatan(id);
    }

    onFilterKelurahan(id) {
        this.kelurahanSelected2 = '0';
        this.merchantWip.postalCode = '';

        this.loadListKelurahan(id);
    }

    onFilterKodePosKelurahan(id) {
        console.log(id);
        this.merchantWip.postalCode = this.listKelurahan.find(kel => kel.id == id).kodePos;
    }

    onFilterKodePosOwnerKelurahan(id) {
        console.log(id);
        this.merchantWip.ownerWIP.ownerKodePos = this.listOwnerKelurahan.find(kel => kel.id == id).kodePos;
    }

    onFilterOwnerCity(id) {
        this.kabupatenOwnerSelected2 = '0';
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

    // ================================

    loadStatusPriority(id) {
        this.merchantWipService.getStatusPriority(id)
            .subscribe(
                (res: HttpResponse<string>) => this.onSuccessGetMerchantPriority(res),
                (res: HttpErrorResponse) => this.onError(res.message),
            );
    }

    loadCommentSettlementConfigWip(id) {
        console.log('settlement config id-->', id);
        this.settlementConfigWipCommentService.find(id)
            .subscribe(
                (res: HttpResponse<SettlementConfigWipComment>) => this.onSuccessCommentSettlementConfigWip(res.body),
                (res: HttpErrorResponse) => this.onError(res.message),
            );
    }

    loadCommentMerchantWip(id) {
        this.merchantWipCommentService.find(id)
            .subscribe(
                (res: HttpResponse<MerchantWipComment>) => this.onSuccessCommentMerchantWip(res.body),
                (res: HttpErrorResponse) => this.onError(res.message),
            );
    }

    loadCommentOwnerWip(id) {
        this.ownerWipCommentService.find(id)
            .subscribe(
                (res: HttpResponse<OwnerWipComment>) => this.onSuccessCommentOwnerWip(res.body),
                (res: HttpErrorResponse) => this.onError(res.message),
            );
    }

    onSuccessGetMerchantPriority(priority) {
        console.log('MerchantPriority', priority);
        this.merchantPriority = priority;
    }

    onSuccessCommentSettlementConfigWip(comment) {
        console.log('CommentSettlementConfigWip', comment);
        this.commentSettlementConfigWip = comment;
    }

    onSuccessCommentMerchantWip(comment) {
        console.log('commentMerchantWip', comment);
        this.commentMerchantWip = comment;
    }

    onSuccessCommentOwnerWip(comment) {
        console.log('commentOwnerWip', comment);
        this.commentOwnerWip = comment;
    }

    loadMerchantOutletByMerchant(id) {
        console.log('loading merchant outlet');
        this.merchantOutletWipService.findByMerchantPage({
            page: this.curPageOutlets,
            count: 999,
            merchantWipId: id,
        }).subscribe(
            (res: HttpResponse<MerchantOutletWip[]>) => this.onSuccessMerchantOutlet(res.body),
            (res: HttpErrorResponse) => { this.onError(res.message); } ,
        );
    }

    onSuccessMerchantOutlet(data) {

        this.merchantOutletList = data.content;
        
        this.totalDataOutlets = data.totalElements;
        console.log('loading merchant outlet list finish ', this.merchantOutletList);
    }

    // load image
    loadImageMerchant(merchantWip: MerchantWip) {
        console.log('Loading image merch WIP ', merchantWip);
        this.imgUrlMerchantKtpPath = this.merchantWip.ktpPath ;
        this.imgUrlMerchantSelfiePath = this.merchantWip.selfiePath;
        this.imgUrlMerchantPhotoLocPath = this.merchantWip.merchantPhotoPath ;
        this.imgUrlMerchantPhotoLoc2Path = this.merchantWip.merchantPhoto2Path ;
        this.imgUrlMerchantPhotoLocRight = this.merchantWip.photoLocationRight;
        this.imgUrlMerchantPhotoLocLeft = this.merchantWip.photoLocationLeft;
        this.imgUrlMerchantSignaturePath = this.merchantWip.signPath ;
        this.imgUrlMerchantLogoPath = this.merchantWip.logoPath;
        this.imgUrlPreprintedQRPath = this.merchantWip.fotoPreprinted;
        this.imgUrlProfilePicturePath = this.merchantWip.profilePictureUrl ;
    }

    // func for chekc image size
    checkSizeImage(file: File) {
        if (file.size > (1.5 * 1025 * 1024)) {
            Swal.fire('Error', 'Ukuran gambar maksimum 1.5 MB');
            return false;
        }
        return true;
    }

    generateUrlImage(tipe: string) {
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

    // convert string to date
    private convertToDate() {
        if (this.merchantWip.ownerWIP.ownerTanggalExpiredID !== null) {
            if (this.merchantWip.ownerWIP.ownerTanggalExpiredID.substr(0, 2) == '00') {
                this.merchantWip.ownerWIP.ownerTanggalExpiredID = null;
                return;
            } 

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

        if (this.merchantWip.ownerWIP.ownerTanggalLahir !== null) {
            // console.log('tanggal lahir -->', this.merchantWip.ownerWIP.ownerTanggalLahir);
            if (this.merchantWip.ownerWIP.ownerTanggalLahir.substr(0, 2) == '00') {
                this.merchantWip.ownerWIP.ownerTanggalLahir = null;
                return;
            }
            this.ownerTanggalLahir = {
                year: Number(this.merchantWip.ownerWIP.ownerTanggalLahir.substr(0, 4)),
                month: Number(this.merchantWip.ownerWIP.ownerTanggalLahir.substr(5, 2)),
                day: Number(this.merchantWip.ownerWIP.ownerTanggalLahir.substr(8, 2))
            };
        
        }

    }

    // on error
    private onError(error) {
        // stop loader
        this.ngxService.stop();

        Swal.fire('Failed', error + '. Will redirect to homepage', 'error').then(
            res => this.router.navigate(['/main'])
        );
        console.log('error..');
    }

    validate() {
        this.ngxService.start();
        console.log('validate');
        console.log(this.merchantWip);
        console.log(this.processingFeeSelected);
        this.merchantWip.level = this.merchantLevelSelected;

        this.submitted = true;
        if (this.ownerTanggalExpiredID === null || this.ownerTanggalExpiredID === undefined) {
            // this.ngxService.stop();
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
            if (this.lookupReportSettlementConfig[i].id == this.merchantWip.settlementConfigWIP.reportSettlementConfig2) {
                this.settlementConfig.reportSettlementConfigName = this.lookupReportSettlementConfig[i].name;
                console.log("masuk assign report settlement config", this.settlementConfig.reportSettlementConfigName)
            }
        }
        for (let i = 0 ; i < this.lookupSettlementExecutionConfig.length ; i ++ ) {
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

        this.merchantWip.category = this.userCategorySelected;
        // this.merchantWip.notificationChannel = this.notificationChannelSelected;

        this.merchantWip.jenisUsaha = this.jenisUsahaSelected;
        this.merchantWip.kategoriBisnis = this.kategoriBisnisSelected;
        this.merchantWip.merchantType = this.tipeMerchantSelected;
        this.merchantWip.provinsi = this.provinsiSelected;
        this.merchantWip.kabupatenKota = this.citySelected2;
        this.merchantWip.kecamatan = this.kecamatanSelected2;
        this.merchantWip.kelurahan = this.kelurahanSelected2;
        this.merchantWip.ownerWIP.ownerProvinsi = this.provinceOwnerSelected2;
        this.merchantWip.ownerWIP.ownerKabupaten = this.kabupatenOwnerSelected2;
        this.merchantWip.ownerWIP.ownerKecamatan = this.kecamatanOwnerSelected2;
        this.merchantWip.ownerWIP.ownerKelurahan = this.kelurahanOwnerSelected2;

        this.merchantWip.ownerWIP.ownerTitle = this.ownerTitleSelected;
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
        this.merchantWip.mcc = this.mccSelected;

        // this.merchantWip.mechantId = 0;

        this.merchantWip.merchantGroupId = this.merchantGroupSelected;
        this.merchantWip.statusRegistration = TO_VERIFIED_MSG;

        let iter = 0;
        this.mdtArrMWip.forEach(el => {
            if (this.merchantWip[el] === '0' || this.merchantWip[el] === '' || this.merchantWip[el] === null || this.merchantWip[el] === undefined) {
                console.log('mdtArrMWip iter++', el);
                iter++;
            }
        });

        // tslint:disable-next-line:triple-equals
        if (this.tipeMerchantSelected == this.tipeMerchantUmkm) {
            this.mdtArrMWipLokasiBisnis.forEach(el => {
                if (this.merchantWip[el] === '' || this.merchantWip[el] === null || this.merchantWip[el] === undefined) {
                    console.log('mdtArrMWipLokasiBisnis iter++',el);
                    iter++;
                }
            });
        }

        this.mdtArrOwnWip.forEach(el => {
            if (this.merchantWip.ownerWIP[el] === '0' || this.merchantWip.ownerWIP[el] === null ||
                this.merchantWip.ownerWIP[el] === undefined) {
                console.log('mdtArrOwnWip iter++', el);
                iter++;
            }
        });

        // this.mdtArrSetConfWIP.forEach(el => {
        //     if (this.merchantWip.settlementConfigWIP[el] === '' || this.merchantWip.settlementConfigWIP[el] === null ||
        //         this.merchantWip.settlementConfigWIP[el] === undefined) {
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
            //     this.imgUrlPreprintedQRPath === undefined) {
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
            Swal.fire('Error', 'Silahkan periksa semua field sudah terisi [' + iter + ' fields]  !', 'error');
            return;
        }
        this.onConfirm();
    }

    // approve merchant to next step
    onConfirm() {
        console.log('Confirm Verfier  ====> ', this.merchantWip);

        // if ( this.settlementConfig.reportSettlementConfigName != "Disable") {
        //     this.merchantWipService.saveSettlementConfig(this.settlementConfig).subscribe(
        //         (res: HttpResponse<SettlementConfig>) => console.log(res.body),
        //         (res: HttpErrorResponse) => console.log(res.message)
        //     )
        // }

        this.merchantWipService.saveWip(this.merchantWip, TO_VERIFIED).subscribe(
            (res: HttpResponse<MerchantWip>) => this.onSuccessConfirm(res.body),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    // success message after confirm data merchant
    onSuccessConfirm(res) {
        // success will direct to merchant list
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
            //

            // save all Comment
            this.saveAllComment();
            this.closeFormMustPushStatusList = false;
            this.ngxService.stop();

            Swal.fire({
                title: 'Success',
                text: 'Data confirm success!! Do you want to get new data ?',
                type: 'question',
                showCancelButton: true,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: 'get data !'
            }).then((result) => {
                if (result.value) {
                    console.log(result.value);
                    this.ngxService.start();
                    this.merchantOutlet = new MerchantOutlet();
                    this.merchantOutletList = [];

                    this.merchantWip = {};
                    this.merchantWip.ownerWIP = {};
                    // this.merchantWip.merchantGroupId = 0;
                    this.merchantWip.settlementConfigWIP = {};
                    this.find();
                    return ;
                } else {
                    this.router.navigate(['/main']);
                }
                console.log(result.value);
            });

            // Swal.fire('Success', 'Success confirm verifier data', 'success').then(
            //     result => {
            //        // this.router.navigate(['/main'])
            //         this.ngxService.start();
            //         this.merchantOutlet = new MerchantOutlet();
            //         this.merchantOutletList = [];

            //         this.merchantWip = {};
            //         this.merchantWip.ownerWIP = {};
            //         this.merchantWip.merchantGroupId = 0;
            //         this.merchantWip.settlementConfigWIP = {};
            //         this.find();
            //     }
            // );

        } else { // something wrong
            this.ngxService.stop();
            Swal.fire('Failed', res.errDesc, 'error');
        }
    }

    saveAllComment() {
        this.saveCommentMerchantWip();
        this.saveCommentSettlemenConfigWip();
        this.saveCommentOwnerWip();
    }

    saveCommentMerchantWip() {
        this.merchantWipCommentService.save(this.commentMerchantWip).subscribe(
            (res: HttpResponse<MerchantWipComment>) => this.onSuccessSaveComment(res.body),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    saveCommentSettlemenConfigWip() {
        this.settlementConfigWipCommentService.save(this.commentSettlementConfigWip).subscribe(
            (res: HttpResponse<MerchantWipComment>) => this.onSuccessSaveComment(res.body),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    saveCommentOwnerWip() {
        this.ownerWipCommentService.save(this.commentOwnerWip).subscribe(
            (res: HttpResponse<MerchantWipComment>) => this.onSuccessSaveComment(res.body),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    onSuccessSaveComment(res) {
        if (res.errCode === '00') {
            console.log('success');
        } else {
            Swal.fire('Failed', 'Error ....', 'error');
        }
    }


    onSuccessOutlet(res) {
        console.log(res);
    }

    loadPageOutlets() {
        console.log('load next page ');
        this.loadMerchantOutletByMerchant(this.merchantWip.id);
    }

    // setSendRptViaSelected(name) {
    //     // tslint:disable-next-line:triple-equals
    //     const result = _.find(this.lookupSendRptVia, (lookup) => lookup.name == name);
    //     this.sendRptViaSelected = _.clone(result);
    // }

    // setSettlementConfigSelected(name) {
    //     console.log('setSettlementConfigSelected', name, this.lookupSettlementConfig);
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

    defaultConfig(): void {
        console.log('next proc after break lookup ===> ', this.merchantWip, 'Finish break ', this.finishBreakLookup);
        console.log('settlementConfigWIP.mdr', this.merchantWip.settlementConfigWIP.mdr);
        this.merchantCriteria = this.lookupMerchantCategoryCode[0].id;

        if ((this.merchantWip.settlementConfigWIP.mdr !== undefined) && (this.finishBreakLookup === true)) {
            this.setComboSelected(this.merchantWip);

        }
        this.highRiskValidation();
        this.ngxService.stop();
    }

    setComboSelected(merchantWip: MerchantWip): void {
        console.log("MERCHANTWIP COMBOSELECT", merchantWip);

        this.tipeMerchantSelected = this.setComboSelectedLookup(this.lookupTipeMerchant, merchantWip.merchantType);
        
        this.jenisUsahaSelected = this.setComboSelectedLookup(this.lookupJenisUsaha, merchantWip.jenisUsaha);
        this.loadKategoriBisnis(this.jenisUsahaSelected);
        // this.provinceSelected = this.setComboSelectedLookup(this.lookupProvince, merchantWip.provinsi);
        // this.citySelected = this.setComboSelectedLookup(this.lookupCity, merchantWip.kabupatenKota);
        this.ownerTitleSelected = this.setComboSelectedLookup(this.lookupOwnerTitle, merchantWip.ownerWIP.ownerTitle);
        // this.provinceOwnerSelected = this.setComboSelectedLookup(this.lookupProvince, merchantWip.ownerWIP.ownerProvinsi);
        // this.kabupatenOwnerSelected = this.setComboSelectedLookup(this.lookupCity, merchantWip.ownerWIP.ownerKabupaten);
        this.idTypeSelected = this.setComboSelectedLookup(this.lookupIdType, merchantWip.ownerWIP.ownerTipeID);
        this.genderSelected = this.setComboSelectedLookup(this.lookupGender, merchantWip.ownerWIP.ownerJenisKelamin);
        this.pekerjaanselected = this.setComboSelectedLookup(this.lookupPekerjaan, merchantWip.ownerWIP.ownerPekerjaan);
        this.settlementConfigSelected =
            this.setComboSelectedLookup(this.lookupSettlementConfig, merchantWip.settlementConfigWIP.settlementConfig);
        this.reportSettlementConfigSelected =
            this.setComboSelectedLookup(this.lookupReportSettlementConfig, merchantWip.settlementConfigWIP.reportSettlementConfig2);
        this.settlementExecutionConfigSelected =
            this.setComboSelectedLookup(this.lookupSettlementExecutionConfig,
                merchantWip.settlementConfigWIP.settlementExecutionConfig);
        this.sendRptViaSelected = this.setComboSelectedLookup(this.lookupSendRptVia, merchantWip.settlementConfigWIP.sendReportVia);
        this.processingConfigSelected =
            this.setComboSelectedLookup(this.lookupProcessingConfig, merchantWip.settlementConfigWIP.processingConfiguration);
        this.processingFeeSelected =
        this.setComboSelectedLookup(this.lookupProcessingFee, merchantWip.settlementConfigWIP.processingFee);
        this.mdrSelected = this.setComboSelectedLookup(this.lookupMDR, merchantWip.settlementConfigWIP.mdr);
        this.merchantCriteria = this.setComboSelectedLookup(this.lookupMerchantCategoryCode, merchantWip.merchantCategoryCode);

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

    setComboSelectedLookup(lookupData: LookupDto[], id: string) {
        const result = _.find(lookupData, (lookup) => String(lookup.id) === id);
        console.log('result-->', lookupData, id, result);
        if (result === undefined) {
            return '0';
        }
        return result.id;
    }

    highRiskValidation() {
        this.isHighRisk = false;
        this.riskJob = 'Tidak High Risk';
        this.riskTypeOfBusiness = 'Tidak High Risk';
        this.riskTeroris = 'Tidak High Risk';
        this.riskApupt = 'Tidak High Risk';
        this.riskInternalName = 'Tidak High Risk';
        // console.log(this.appParameterList);
        console.log(this.internalNameRiskList);
        console.log(this.terorisList);
        console.log(this.jobRiskList);
        console.log(this.businessTypeRiskList);
        console.log(this.maxTeroris);
        console.log(this.maxInternalName);
        console.log(this.maxApupt);
        console.log(this.apuptList);
        console.log(this.merchantWip);
        // console.log(this.merchantWip.storeName.replace(/\s/g, ''));

        // ceck for risk job
        let job: Lookup = {};
        for (job of this.jobRiskList) {
            console.log(String(job.id), this.pekerjaanselected);

            // tslint:disable-next-line:triple-equals
            if (String(job.id) == String(this.pekerjaanselected)) {
                this.riskJob = 'High Risk';
                this.isHighRisk = true;
                break;
            }
        }

        // ceck for business_type
        let business_type: Lookup = {};
        for (business_type of this.businessTypeRiskList) {
            console.log(String(business_type.id), String(this.jenisUsahaSelected));
            // tslint:disable-next-line:triple-equals
            if (String(business_type.id) == this.jenisUsahaSelected) {
                this.riskTypeOfBusiness = 'High Risk';
                this.isHighRisk = true;
                break;
            }
        }


        const fullName = (this.merchantWip.ownerWIP.ownerFirstName + this.merchantWip.ownerWIP.ownerLastName).replace(/\s/g, '');
        // ceck for risk apupt
        console.log(fullName);
        let apupt: Apupt = {};
        console.log("LIST APUPT", this.apuptList);
        for (apupt of this.apuptList) {
            let status = 0;
            console.log(apupt.name, apupt.aliasName);
            // tslint:disable-next-line:triple-equals
            if (apupt.name == fullName) {
                console.log('masuk');
                status++;
            }
            // tslint:disable-next-line:triple-equals
            if (apupt.aliasName == fullName) {
                status++;
            }
            // tslint:disable-next-line:triple-equals
            if (apupt.birthDate == this.merchantWip.ownerWIP.ownerTanggalLahir) {
                status++;
            }
            console.log(status, this.maxApupt);
            if (status >= this.maxApupt) {
                console.log('hirisk');
                this.riskApupt = 'High Risk';
                this.isHighRisk = true;
                break;
            }
        }

        // ceck for risk teroris
        let teroris: Teroris = {};
        for (teroris of this.terorisList) {
            let status = 0;
            // tslint:disable-next-line:triple-equals
            if (teroris.name == fullName) {
                status++;
            }
            // tslint:disable-next-line:triple-equals
            if (teroris.nameAlias == fullName) {
                status++;
            }
            // tslint:disable-next-line:triple-equals
            if (teroris.birthDate == this.merchantWip.ownerWIP.ownerTanggalLahir) {
                status++;
            }
            // tslint:disable-next-line:triple-equals
            if (teroris.birthPlace == this.merchantWip.ownerWIP.ownerTempatLahir) {
                status++;
            }

            if (status >= this.maxTeroris) {
                this.isHighRisk = true;
                this.riskApupt = 'High Risk';
                break;
            }
        }

        // ceck for risk internal name
        let internalName: InternalNameRisk = {};
        for (internalName of this.terorisList) {
            let status = 0;
            // tslint:disable-next-line:triple-equals
            if (internalName.name == fullName) {
                status++;
            }
            // tslint:disable-next-line:triple-equals
            if (internalName.idType == this.merchantWip.ownerWIP.ownerTipeID) {
                status++;
            }
            // tslint:disable-next-line:triple-equals
            if (internalName.idNumber == this.merchantWip.ownerWIP.ownerNoID) {
                status++;
            }
            // tslint:disable-next-line:triple-equals
            if (internalName.birthDate == this.merchantWip.ownerWIP.ownerTanggalLahir) {
                status++;
            }
            // tslint:disable-next-line:triple-equals
            if (internalName.storeName == this.merchantWip.storeName) {
                status++;
            }
            // tslint:disable-next-line:triple-equals
            if (internalName.mobileNo == this.merchantWip.ownerWIP.ownerNoTelp) {
                status++;
            }
            if (status >= this.maxInternalName) {
                this.riskInternalName = 'High Risk';
                this.isHighRisk = true;
                break;
            }
        }

        this.statusValidation = true;
    }

    // get all data internal name risk
    loadInternalNameRisk() {
        this.internalNameRiskService.getAll().subscribe(
            (res: HttpResponse<InternalNameRisk[]>) => {
                this.internalNameRiskList = res.body;
            }
        );
    }

    // get all data teroris
    loadTeroris() {
        this.terorisService.getAll().subscribe(
            (res: HttpResponse<Teroris[]>) => {
                this.terorisList = res.body;
            }
        );
    }

    // get all data apupt
    loadApupt() {
        this.apuptService.getAll().subscribe(
            (res: HttpResponse<Apupt[]>) => {
                this.apuptList = res.body;
                // console.log(res.body);
            }
        );
    }

    // get Risk Job
    loadRiskJob() {
        this.lookupService.findNameWithRisk('PEKERJAAN').subscribe(
            (res: HttpResponse<Lookup[]>) => {
                this.jobRiskList = res.body;
            }
        );
    }

    loadRiskBusinessType() {
        this.lookupService.findNameWithRisk('JENIS_USAHA').subscribe(
            (res: HttpResponse<Lookup[]>) => {
                this.businessTypeRiskList = res.body;
            }
        );
    }

    // open modal merchant oulet
    loadMerchantOutlet(i, mid) {

        const modalRef = this.modalService.open(MerchantDetailOutletModalComponent, { size: 'lg' });
        modalRef.componentInstance.outlet = this.merchantOutletList[i];
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

    deleteOutlet(outlet) {
        const result = _.find(this.lookupDeviceType, (lookup) => lookup.name === outlet.deviceType);
        this.merchantOutletList.splice(this.merchantOutletList.indexOf(result[0]));
        Swal.fire('Success', outlet.name, 'info');
    }

    addnewOutlet() {

        const merchantOutlet = new MerchantOutlet();
        merchantOutlet.id = 0;
        merchantOutlet.deviceBrand = this.lookupDeviceBrand[0].name;
        merchantOutlet.deviceGroup = this.lookupDeviceGroup[0].name;
        merchantOutlet.deviceType = this.lookupDeviceType[0].name;
        merchantOutlet.metodePembayaran = '0000';

        const modalRef = this.modalService.open(MerchantDetailOutletModalComponent, { size: 'lg' });
        modalRef.componentInstance.merchantId = this.merchantWip.merchantOutletID;
        modalRef.componentInstance.outlet = merchantOutlet;
        modalRef.componentInstance.lookupDeviceType = this.lookupDeviceType;
        modalRef.componentInstance.lookupDeviceGroup = this.lookupDeviceGroup;
        modalRef.componentInstance.lookupDeviceBrand = this.lookupDeviceBrand;

        modalRef.result.then((result) => {
            console.log('result : ', result);
            this.merchantOutletList.push(result);
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    private getDismissReason(reason: any): string {
        console.log(reason);
        return reason;
    }

    ngOnDestroy() {
        if (this.closeFormMustPushStatusList === true) {
            if (this.merchantWip === null) {
                console.log('Merchant WIP failed load !!');
                return;
            }
            console.log('close verifier form for id ', this.merchantWip.id);
            this.merchantStatusListService.pauseVerify(this.merchantWip.id);
        }
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
        } else {
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
            // tslint:disable-next-line:triple-equals
            const result = _.find(this.lookupMerchantGroup, (merchantGroup) => merchantGroup.id == this.merchantGroupSelected);
            let newMerhcantGroup = new MerchantGroup();
            newMerhcantGroup = _.clone(result);
            this.setFeeFollowGroup(newMerhcantGroup);
        }
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

    onFilterJenisUsaha(id) {
        this.kategoriBisnisSelected = '0';
        this.listKategoriBisnis = null;

        this.loadKategoriBisnis(id);
    }
}
