import { Component, OnInit, AfterViewChecked, OnDestroy } from '@angular/core';
import { MerchantWip } from './merchant-wip.model';
import { WorkInProgressService } from './work-in-progress.service';
import { GET_EDD, APPROVED_BY_EDD, BACK_TO_REGISTERED_MSG, SERVER_PATH, TOTAL_RECORD_PER_PAGE } from 'src/app/shared/constants/base-constant';
import { BACK_TO_REGISTERED, HOST_TYPE } from 'src/app/shared/constants/base-constant';
import { APPROVED_BY_EDD_MSG, REJECTED_BY_EDD_MSG, REJECTED_BY_EDD } from 'src/app/shared/constants/base-constant';
import { LOOKUP_JENIS_USAHA, LOOKUP_PROVINCE, ID_TYPE, GENDER, PEKERJAAN } from 'src/app/shared/constants/base-constant';
import { SETTLEMENT_CONFIG, LOOKUP_SEND_RPT_VIA, LOOKUP_RPT_SETT_CFG2,LOOKUP_SR_ID, LOOKUP_SETT_EXEC_CFG } from 'src/app/shared/constants/base-constant';
import { LOOKUP_PROCESSING_FEE, LOOKUP_MDR, LOOKUP_DEVICE_TYPE, LOOKUP_DEVICE_GROUP } from 'src/app/shared/constants/base-constant';
import { LOOKUP_DEVICE_BRAND, LOOKUP_PROCESSING_CONFIG } from 'src/app/shared/constants/base-constant';
import { LOOKUP_TIPE_MERCHANT, OWNER_TITLE } from 'src/app/shared/constants/base-constant';
import { LOOKUP_APPROVE_REASON, LOOKUP_REJECT_REASON, LOOKUP_RETURN_REASON, LOOKUP_MERCHANT_CATEGORY_CODE } from 'src/app/shared/constants/base-constant';

import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

import { MerchantOutletWip } from './merchant-outlet-wip.model';
import { MerchantOutletWipService} from './merchant-outlet-wip.service';
    // './  ./merchant/merchant-outlet-wip.model';
    // import { from } from 'rxjs';
import { MerchantDetailOutletModalComponent } from '../merchant/merchant-detail-outlet-modal.component';
import { LookupDto } from '../lookup/lookup-dto.model';
import { LookupService } from '../lookup/lookup.service';
import { MerchantGroup } from '../merchant-group/merchant-group.model';
import { Apupt } from '../apupt/apupt.model';
import { Teroris } from '../teroris/teroris.model';
import { InternalNameRisk } from '../internal-name-risk/internal-name-risk.model';
import { Lookup } from '../lookup/lookup.model';
import { AppParameterService } from '../app-parameter/app-parameter.service';
import { AppParameter } from '../app-parameter/app-parameter.model';
import { InternalNameRiskService } from '../internal-name-risk/internal-name-risk.service';
import { TerorisService } from '../teroris/teroris.service';
import { ApuptService } from '../apupt/apupt.service';
import * as _ from 'lodash';
import { MerchantGroupService } from '../merchant-group/merchant-group.service';
import { MerchantWipConfirmModalComponent } from './merchant-wip-confirm-modal.component';
import { MerchantWipConfirmModel } from './merchant-wip-confirm.model';
import { MerchantWipComment } from './merchant-wip-comment.model';
import { SettlementConfigWipComment } from './settlement-config-wip-comment.model';
import { OwnerWipComment } from './owner-wip-comment.model';
import { MerchantWipCommentService } from './merchant-wip-comment.service';
import { SettlementConfigWipCommentService } from './settlement-config-wip-comment.service';
import { OwnerWipCommentService } from './owner-wip-comment.service';
import { MerchantStatusListService } from './merchant-status-list.service';
import { Dati2Service } from '../dati2/dati2.service';
import { Provinsi } from '../provinsi/provinsi.model';
import { ProvinsiService } from '../provinsi/provinsi.service';
import { Dati2 } from '../dati2/dati2.model';
import { KecamatanService } from '../kecamatan/kecamatan.service';
import { Kecamatan } from '../kecamatan/kecamatan.model';
import { Kelurahan } from '../kelurahan/kelurahan.model';
import { KelurahanService } from '../kelurahan/kelurahan.service'; 
import { Mcc } from '../mcc/mcc.model';
import { MccModule } from '../mcc/mcc.module';
import { MccService } from '../mcc/mcc.service';
import { KategoriBisnis } from '../kategori-bisnis/ketegori-bisnis.model';
import { KategoriBisnisService } from '../kategori-bisnis/kategori-bisnis.service';
import { UserCategory } from '../ottopay-4/user-category/user-category.model';
import { UserCategoryService } from '../ottopay-4/user-category/user-category.service';
import { MerchantService } from '../merchant/merchant.service';
import { SettlementConfig } from '../merchant/merchant-settlement-config.model';
import { AcquititionsService } from '../acquititions/acquititions.service';
import { Acquisition } from '../acquititions/acquititions.model';
import { MerchantGroupVaInfo } from '../merchant-group/merchant-group-va-info.model';

@Component({
    selector: 'op-merchant-wip',
    templateUrl: './merchant-wip.component.html',
    styleUrls: ['./merchant-wip.component.css']
})
export class MerchantWipEddComponent implements OnInit, AfterViewChecked, OnDestroy {

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

    listStatusCallback = [
        { code: "y", name: "Enable" },
        { code: "n", name: "Disable" },
    ]

    listAuthType = [
        // { code: "" , name: "-- Pilih Auth Type --"},
        { code: "Signature", name: "Signature" },
        { code: "Token", name: "Token" },
    ]

    channelPembayaran = {
        Bank: false,
        OttoAG: false,
        OttoPay: false,
    };

    listHostType = [
        // { code: "" , name: "-- Pilih Host Type --"},
        { code: "billing_system", name: "Billing System" },
        { code: "technical_integrator", name: "Technical Integrator" },
        { code: "ottopay_topup_deposit", name: "OttoPay Topup Deposit" },
    ];

    disable = false;
    acquisition : Acquisition ;
    warning = [];
    srBefore = null;
    srAfter = '';
    mgBefore = '';
    mgAfter = '';
    categoryBefore = '';


    //for provinsi, kabupaten/kota, kecamatan dan kelurahan
    provinsiSelected = '0';
    citySelected2 = '0';
    kecamatanSelected2 = '0';
    kelurahanSelected2 = '0';
    provinceOwnerSelected2 = '0';
    kabupatenOwnerSelected2 = '0';
    kecamatanOwnerSelected2 = '0';
    kelurahanOwnerSelected2 = '0';
    mccSelected = '0';
    merchantCriteria: string;

    showHideIcon = "eye-slash" ; 
    inputType = "password" ; 
    showHideIcon1 = "eye-slash" ; 
    inputType1 = "password" ; 

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


    // jika form close karena approve -> bypass
    //      form close karena close form atau data yg ditarik kosong
    closeFormMustPushStatusList = true;

    addMerchantOutlet = false;
    finishBreakLookup = false;
    statusRec = 'Edd';
    statusView = 'Verifier';
    moduleName = '';
    reasonWip = {
        status: '',
        reason: '',
    }

    merchantWip: MerchantWip = {};
    settlementConfig: SettlementConfig = {};

    ownerTanggalExpiredID: NgbDateStruct; // temp var for this.merchant.owner.ownerTangalExpiredID
    ownerTanggalLahir: NgbDateStruct; // temp var for this.merchant.owner.ownerTanggalLahir
    seumurHidupChecked = false;

    // disable input
    readOnly = true;

    searchTermMerchant = {
        storePhoneNumber: ''
    };

    // initial for check button
    storeDataChecked = true;
    ownerDataChecked = false;
    settlementChecked = false;
    otherInfoChecked = false;
    outletChecked = false;
    otherChecked = false;
    editVaConfig = false;

    totalDataOutlets = 0;
    totalRecordOutlets = TOTAL_RECORD_PER_PAGE;
    curPageOutlets = 1;
    // merchantOutletWip: MerchantOutletWip;
    merchantOutletList: MerchantOutletWip[];
    merchantGroupVaInfo: MerchantGroupVaInfo;
    lookupDeviceType: LookupDto[] = [];
    lookupDeviceGroup: LookupDto[] = [];
    lookupDeviceBrand: LookupDto[] = [];
    lookupTempl: LookupDto[];

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

    lookupProcessingConfig: LookupDto[] = [];
    lookupProcessingFee: LookupDto[] = [];
    lookupMDR: LookupDto[] = [];

    lookupMerchantGroup: MerchantGroup[] = [];
    lookupApproveReason: LookupDto[] = [];
    lookupRejectReason: LookupDto[] = [];
    lookupReturnReason: LookupDto[] = [];
    lookupHostType: LookupDto[] = [];
    lookupMerchantCategoryCode: LookupDto[] = [];
    lookupSrId: LookupDto[] = [];

    tipeMerchantUmkm: string;
    tipeMerchantModern: string;
    tipeMerchantECommerce: string;

    tipeMerchantSelected: string;
    jenisUsahaSelected: string;
    kategoriBisnisSelected = '0'
    provinceSelected: string;
    citySelected: string;
    ownerTitleSelected: string;
    provinceOwnerSelected: string;
    kabupatenOwnerSelected: string;
    idTypeSelected: string;
    genderSelected: string;
    pekerjaanselected: string;
    settlementConfigSelected= "8076";
    reportSettlementConfigSelected= "17036";
    settlementExecutionConfigSelected= "8070";
    sendRptViaSelected: string;
    processingConfigSelected = '7993';
    processingFeeSelected= '8084';

    mdrSelected= '8082';
    deviceTypeSelected: string;
    deviceGroupSelected: string;
    deviceBrandSelected: string;
    businessType: string;


    merchantGroupSelected: number;

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

    listNotificationChannel = [
        { code: null , name: "- Select Notification Channel -" },
        { code: "None", name: "None" },
        { code: "Email", name: "Email" },
        { code: "WhatsApp", name: "WhatsApp" },
    ]

    notificationChannelSelected : string = '';

    buttonSuspense = null;
    statusSuspense = null;

    constructor(private merchantWipService: WorkInProgressService,
                private router: Router,
        private lookupService: LookupService,
        private modalService: NgbModal,
        private appParameterService: AppParameterService,
        private terorisService: TerorisService,
        private internalNameRiskService: InternalNameRiskService,
        private apuptService: ApuptService,
        private ngxService: NgxUiLoaderService,
        private merchantGroupService: MerchantGroupService,
        private merchantOutletWipService: MerchantOutletWipService,
        private merchantWipCommentService: MerchantWipCommentService,
        private settlementConfigWipCommentService: SettlementConfigWipCommentService,
        private merchantStatusListService: MerchantStatusListService,
        private ownerWipCommentService: OwnerWipCommentService,
        private dati2Service: Dati2Service,
        private provinceService: ProvinsiService,
        private kecamatanService: KecamatanService,
        private kelurahanService: KelurahanService,
        private kategoriBisnisService: KategoriBisnisService,
        private mccService: MccService,
        private userCategoryService: UserCategoryService,
        private acquisitionService: AcquititionsService,
        private merchantService: MerchantService,
        private configVaMerchantGroupService: MerchantGroupService,
    ) { }

    ngOnInit() {
        this.moduleName = 'EDD';
        this.ngxService.start();
        this.merchantWip.ownerWIP = {};
        this.merchantWip.merchantGroupId = 0;
        // this.loadLookup();
        this.loadAllKategoriBisnis();
        this.loadLookupMerchantGroup();
        this.loadAppParameter();
        this.loadApupt();
        this.loadUserCategory();
        this.loadTeroris();
        this.loadInternalNameRisk();
        this.loadRiskJob();
        this.loadRiskBusinessType();
        this.merchantLevelSelected = this.levels[0].code;

        this.find();
    }

    ngAfterViewChecked() {
        // this.ngxService.stopAll();
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


    find() {
        this.merchantWipService.getWip(GET_EDD).subscribe(
            (res: HttpResponse<MerchantWip>) => this.onSuccess(res.body),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
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

    loadTanggalAkuisisi(phone) {
        this.searchTermMerchant.storePhoneNumber = phone;

        this.merchantService.findTanggalAkuisisi({
            filter: this.searchTermMerchant,
        })
            .subscribe(
                (res: HttpResponse<String>) => this.onSuccessLoadMerchant(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message),
                () => { console.log('finally'); }
            );
    }

    private onSuccessLoadMerchant(data, headers) {
        this.merchantWip.tanggalSalesAkuisisi = data.contents;
    }

    // fill data merchantWip after load
    onSuccess(merchantWip) {
        // stop loader
        // this.ngxService.stop();

        if (merchantWip.errCode === '00') {
            this.merchantWip = merchantWip;
            // this.defaultConfig();
            this.loadLookup();
            this.loadMerchantOutletByMerchant(this.merchantWip.id);
            this.loadImageMerchant(this.merchantWip);
            this.convertToDate();

            this.loadTanggalAkuisisi(this.merchantWip.storePhoneNumber);


            // begin load comment
            this.loadCommentMerchantWip(merchantWip.id);
            this.loadCommentSettlementConfigWip(merchantWip.settlementConfigWIP.id);
            this.loadCommentOwnerWip(merchantWip.ownerWIP.id);
            // end load comment
            this.merchantLevelSelected = this.merchantWip.level;

            if (merchantWip.category != '' && merchantWip.category != '') {
                console.log("fill data category");
                this.userCategorySelected = merchantWip.category;
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
            console.log("ini sr merchant wip", this.merchantWip.srId)
            if (this.merchantWip.srId == null) {
                this.srBefore = null
            } else {  
                this.lookupSrId.forEach( el => {
                    if (this.merchantWip.srId == el.code ) {
                        this.srBefore = el.name
                    }
                })
            }

            if (merchantWip.settlementConfigWIP.processingConfiguration === "" || merchantWip.settlementConfigWIP.processingConfiguration === null ) {
                this.processingConfigSelected = '7993'
                // this.setFeeFollowGroup(this.merchantGroup)
                // // this.processingConfigChanged()
            } else {
                this.processingConfigSelected = merchantWip.settlementConfigWIP.processingConfiguration
                // console.log("masuk siniiiiiiiiiiiiii", this.processingConfigSelected)
            }

            if (merchantWip.settlementConfigWIP.settlementConfig === "" || merchantWip.settlementConfigWIP.settlementConfig === null ) {
                this.settlementConfigSelected = '8076'
                // this.setFeeFollowGroup(this.merchantGroup)
                // // this.processingConfigChanged()
            } else {
                this.settlementConfigSelected = merchantWip.settlementConfigWIP.settlementConfig
            }
            
            if (merchantWip.vaOttoCash == null) {
                this.merchantWip.vaOttoCash = "n"
            }

            if (merchantWip.vaShopeePay == null) {
                this.merchantWip.vaShopeePay = "n"
            }

            if (merchantWip.vaLinkAja == null) {
                this.merchantWip.vaLinkAja = "n"
            }

            if (merchantWip.vaTransactionType == null) {
                this.merchantWip.vaTransactionType = "op"
            }

            if (merchantWip.callbackMerchant == null) {
                this.merchantWip.callbackMerchant = 'n'
            }

            if (merchantWip.vaBca == null) {
                this.merchantWip.vaBca = 'n'
            }

            if (merchantWip.vaBri == null) {
                this.merchantWip.vaBri = 'n'
            }

            if (merchantWip.vaMandiri == null) {
                this.merchantWip.vaMandiri = 'n'
            }

            if (merchantWip.vaLain == null) {
                this.merchantWip.vaLain = 'n'
            }

            if (merchantWip.hostType == null) {
                this.merchantWip.hostType = '0'
            }

            if (merchantWip.vaAuthType == null) {
                this.merchantWip.vaAuthType = '0'
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
            this.merchantCriteria = this.merchantWip.merchantCategoryCode;
            this.notificationChannelSelected = this.merchantWip.notificationChannel;
            this.kategoriBisnisSelected = merchantWip.kategoriBisnis;
            this.jenisUsahaSelected = merchantWip.jenisUsaha;

            this.loadListMcc();
            this.loadListProvince();
            this.loadListCity(this.provinsiSelected);
            this.loadListKecamatan(this.citySelected2);
            this.loadListKelurahan(this.kecamatanSelected2);
            this.loadListOwnerCity(this.provinceOwnerSelected2);
            this.loadListOwnerKecamatan(this.kabupatenOwnerSelected2);
            this.loadListOwnerKelurahan(this.kecamatanOwnerSelected2);
            this.channelPembayaranMap(merchantWip.channelPembayaran)

            this.ngxService.stop();

        } else { // redirect to homepage if data null
            this.ngxService.stop();
            this.closeFormMustPushStatusList = false;
            Swal.fire('EDD data is empty', 'Will redirect to homepage', 'error').then(
                res => this.router.navigate(['/main'])
            );
        }
    }

    //=======================================

    private channelPembayaranMap(channelPembayaran: string) {

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
        }
    }

    private loadListMcc() {
        // this.ngxService.start();
        this.mccService.getAll()
            .subscribe(
                (res: HttpResponse<Mcc[]>) => this.onSuccessMcc(res.body),
                (res: HttpErrorResponse) => this.onError(res.message),
                () => { console.log('finally'); }
            );
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
            )
    }

    private loadListKecamatan(id) {

        this.kecamatanService.getByDati2Id(id).subscribe(
            (res: HttpResponse<MerchantGroup[]>) => this.onSuccessFilterKecamatan(res.body),
            (res: HttpErrorResponse) => this.onErrorMG(res.message),
            () => { this.ngxService.stop(); console.log('Finally Kecamatan'); }
        )
    }

    private loadListKelurahan(id) {

        this.kelurahanService.getByKecamatanId(id).subscribe(
            (res: HttpResponse<MerchantGroup[]>) => this.onSuccessFilterKelurahan(res.body),
            (res: HttpErrorResponse) => this.onErrorMG(res.message),
            () => { this.ngxService.stop(); console.log('Finally Kelurahan'); }
        )
    }

    private loadListOwnerCity(id) {

        this.dati2Service.getByProvinsiId(id)
            .subscribe(
                (res: HttpResponse<MerchantGroup[]>) => this.onSuccessFilterCity2(res.body),
                (res: HttpErrorResponse) => this.onErrorMG(res.message),
                () => { this.ngxService.stop(); console.log('Finally Dati2'); }
            )
    }

    private loadListOwnerKecamatan(id) {

        this.kecamatanService.getByDati2Id(id).subscribe(
            (res: HttpResponse<MerchantGroup[]>) => this.onSuccessFilterKecamatan2(res.body),
            (res: HttpErrorResponse) => this.onErrorMG(res.message),
            () => { this.ngxService.stop(); console.log('Finally Kecamatan'); }
        )
    }

    private loadListOwnerKelurahan(id) {

        this.kelurahanService.getByKecamatanId(id).subscribe(
            (res: HttpResponse<MerchantGroup[]>) => this.onSuccessFilterKelurahan2(res.body),
            (res: HttpErrorResponse) => this.onErrorMG(res.message),
            () => { this.ngxService.stop(); console.log('Finally Kelurahan'); }
        )
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
        this.kelurahanSelected2 = '0';
        this.merchantWip.postalCode = '';

        this.loadListKecamatan(id);
    }

    onFilterKelurahan(id) {
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
        this.listOwnerKecamatan = null;
        this.kecamatanOwnerSelected2 = '0';
        this.listOwnerKelurahan = null;
        this.kelurahanOwnerSelected2 = '0';
        this.merchantWip.postalCode = '';


        this.loadListOwnerCity(id);
    }

    onFilterOwnerKecamatan(id) {
        this.listOwnerKelurahan = null;
        this.kelurahanOwnerSelected2 = '0';
        this.merchantWip.postalCode = '';


        this.loadListOwnerKecamatan(id);
    }

    onFilterOwnerKelurahan(id) {
        this.merchantWip.postalCode = '';
        this.loadListOwnerKelurahan(id);
    }

    //================================

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

    // load image
    loadImageMerchant(merchantWip: MerchantWip) {
        console.log('Loading image merch WIP ', merchantWip);
        this.imgUrlMerchantKtpPath = this.merchantWip.ktpPath;
        this.imgUrlMerchantSelfiePath = this.merchantWip.selfiePath;
        this.imgUrlMerchantPhotoLocPath = this.merchantWip.merchantPhotoPath;
        this.imgUrlMerchantPhotoLoc2Path = this.merchantWip.merchantPhoto2Path;
        this.imgUrlMerchantPhotoLocRight = this.merchantWip.photoLocationRight;
        this.imgUrlMerchantPhotoLocLeft = this.merchantWip.photoLocationLeft;
        this.imgUrlMerchantSignaturePath = this.merchantWip.signPath;
        this.imgUrlMerchantLogoPath = this.merchantWip.logoPath;
        this.imgUrlPreprintedQRPath = this.merchantWip.fotoPreprinted;
        this.imgUrlProfilePicturePath = this.merchantWip.profilePictureUrl;
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

    loadPageOutlets() {
        console.log('load next page ');
        this.loadMerchantOutletByMerchant(this.merchantWip.id);
    }

    onSuccessMerchantOutlet(data) {
        this.ngxService.stop();
        this.merchantOutletList = data.content;
        this.totalDataOutlets = data.totalElements;
        console.log('loading merchant outlet list finish ', this.merchantOutletList);

    }

    // convert string to date
    private convertToDate() {
        if (this.merchantWip.ownerWIP.ownerTanggalExpiredID !== null) {
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

        // Swal.fire('Failed', error + '. Will redirect to homepage', 'error').then(
        //     res => this.router.navigate(['/main'])
        // );
        console.log('error..');
    }

    // back to registered from EDD
    backToRegistered() {
        this.ngxService.start();
        this.merchantWip.listMerchantOutletWIP = [];
        this.merchantWip.statusRegistration = BACK_TO_REGISTERED_MSG;

        this.merchantWipService.saveWip(this.merchantWip, BACK_TO_REGISTERED).subscribe(
            (res: HttpResponse<MerchantWip>) => this.onSuccessEdd('Success back to registered eform data', res.body),
            (res: HttpErrorResponse) => this.onError(res.message),
            () => {
                    this.ngxService.stop();
                    // Swal.fire('Success', 'Rejected! ', 'info');
                Swal.fire('Success ', 'Success back to registered eform data', 'success').then(
                        res => this.router.navigate(['/main'])
                    );
                }
        );

    }

    validate() {
        this.settlementConfig.reportSettlementConfigName = ""
        for (let i = 0 ; i < this.lookupReportSettlementConfig.length ; i ++ ) {
            console.log(this.lookupReportSettlementConfig[i].id, " === ",this.merchantWip.settlementConfigWIP.reportSettlementConfig2)
            if (this.lookupReportSettlementConfig[i].id == this.merchantWip.settlementConfigWIP.reportSettlementConfig2) {
                this.settlementConfig.reportSettlementConfigName = this.lookupReportSettlementConfig[i].name;
                this.settlementConfig.rptSetConfName = this.lookupReportSettlementConfig[i].name;
                console.log("ini i" , i)
                console.log("masuk assign report settlement config", this.settlementConfig.reportSettlementConfigName)
            
            }
        };
        this.settlementConfig.settlementExecutionConfigName = ""
        for (let i = 0 ; i < this.lookupSettlementExecutionConfig.length ; i ++ ) {
            console.log(this.lookupSettlementExecutionConfig[i].id, " === ",this.merchantWip.settlementConfigWIP.settlementExecutionConfig)
            if (this.lookupSettlementExecutionConfig[i].id == this.merchantWip.settlementConfigWIP.settlementExecutionConfig) {   
                this.settlementConfig.settlementExecutionConfigName = this.lookupSettlementExecutionConfig[i].name;
                this.settlementConfig.setExecConfName = this.lookupSettlementExecutionConfig[i].name;
                console.log("ini i" , i)
                console.log("masuk assign settlement execution ", this.settlementConfig.settlementExecutionConfigName)
            }
        };

        this.merchantWip.level = this.merchantLevelSelected;
        // this.merchantWip.notificationChannel = this.notificationChannelSelected

        this.settlementConfig.namaBankTujuanSettlement = this.merchantWip.settlementConfigWIP.namaBankTujuanSettlement;
        this.settlementConfig.mid = `${this.merchantWip.idMerchant}`;
        console.log("ini mid, idmerchant,id",this.settlementConfig.mid , `${this.merchantWip.idMerchant}`, this.merchantWip.id);
        this.settlementConfig.namaPemilikRekening = this.merchantWip.settlementConfigWIP.namaPemilikRekening;
        this.settlementConfig.noRekeningToko = this.merchantWip.settlementConfigWIP.noRekeningToko;
        this.settlementConfig.tipeRekening = this.merchantWip.settlementConfigWIP.tipeRekening;
        this.settlementConfig.status = this.merchantWip.settlementConfigWIP.status;
        // this.settlementConfig.reportSettlementConfigName = this.merchantWip.settlementConfigWIP.reportSettlementConfigName
        // this.settlementConfig.settlementExecutionConfigName = this.merchantWip.settlementConfigWIP.settlementExecutionConfigName
        this.settlementConfig.sftpHost = this.merchantWip.settlementConfigWIP.sftpHost;
        this.settlementConfig.sftpUser = this.merchantWip.settlementConfigWIP.sftpUser;
        this.settlementConfig.sftpPassword = this.merchantWip.settlementConfigWIP.sftpPassword;
        this.settlementConfig.email = this.merchantWip.settlementConfigWIP.email;
        console.log(this.settlementConfig);
        
        if ( this.warning.length > 0) {
            Swal.fire('Warning', 
                `${this.warning.join(',')}  Tidak sesuai dengan Tipe Bisnis yang dipilih`
                , "warning")
        } else {
            this.onConfirm();
        }

    }

    onConfirm() {

        const modalRef = this.modalService.open(MerchantWipConfirmModalComponent, { size: 'lg' });

        let merchantWipConfirmModel: MerchantWipConfirmModel;

        modalRef.componentInstance.merchantWip = this.merchantWip;
        modalRef.componentInstance.settlementConfig = this.settlementConfig;
        modalRef.componentInstance.sendFromModule = 'edd';
        modalRef.componentInstance.lookupApproveReason = this.lookupApproveReason;
        modalRef.componentInstance.lookupRejectReason = this.lookupRejectReason;
        modalRef.componentInstance.lookupReturnReason = this.lookupReturnReason;
        // modalRef.componentInstance.lookupDeviceType = this.lookupDeviceType;
        // modalRef.componentInstance.lookupDeviceGroup = this.lookupDeviceGroup;
        // modalRef.componentInstance.lookupDeviceBrand = this.lookupDeviceBrand;
        modalRef.result.then((result) => {
            // this.closeResult = `Closed with: ${result}`;
            console.log('then', result);
        }, (reason) => {
            console.log ('reason', reason);
            if ( reason === 0) {
                console.log('esc');
            } else {
                console.log('reason ', reason);
                merchantWipConfirmModel = reason;
                this.merchantWip.listMerchantOutletWIP = [];

                switch ( merchantWipConfirmModel.action ) {
                    case 0:
                        // 0 = approve
                        // save dulu
                        // ***************************
                        this.merchantWip.statusRegistration = APPROVED_BY_EDD_MSG;
                        this.merchantWip.reason = merchantWipConfirmModel.merchantWIP.reason;
                        this.merchantWip.approvalNote = merchantWipConfirmModel.merchantWIP.approvalNote;
                        this.ngxService.start();
                        if ( this.settlementConfig.reportSettlementConfigName != "Disable") {
                            this.merchantWipService.saveSettlementConfig(this.settlementConfig).subscribe(
                                (res: HttpResponse<SettlementConfig>) => console.log(res.body),
                                (res: HttpErrorResponse) => {
                                    this.ngxService.stopAll();
                                    this.onError(res.message);
                                },
                            )
                        }
                        this.merchantWipService.saveWip(this.merchantWip, APPROVED_BY_EDD).subscribe(
                            (res: HttpResponse<MerchantWip>) => {
                                // if UMKM upgrade to FDS
                                if (this.merchantWip.merchantType === '8079') {
                                    this.merchantWipService.upgradeMerchant(this.merchantWip);
                                }
                                this.onSuccessEdd('confirm', res.body);
                            },
                            (res: HttpErrorResponse) => this.onError(res.message),
                            () => this.ngxService.stop()
                        );
                        // ***************************
                        // end save dulu
                        break;
                    case 1:
                        this.reject();
                        break;
                    case 2:
                        this.backToRegistered();
                        break;
                }

            }
        });


    }

    // success message after confirm data merchant
    onSuccessEdd(status, res) {
        // success will direct to merchant list
        console.log('RES-->', res);
        if (res.errCode === '00') {
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
                    this.ngxService.start();
                    this.merchantOutletList = [];
                    this.merchantWip = {};
                    this.merchantWip.ownerWIP = {};
                    this.merchantWip.merchantGroupId = 0;
                    this.merchantWip.settlementConfigWIP = {};
                    this.find();
                    return;
                } else {
                    this.closeFormMustPushStatusList = false;
                    this.router.navigate(['/main']);
                }
                console.log(result.value);
            });
        } else {
            Swal.fire('Failed', res.errDesc, 'error');
        }

        // if (res.errCode === '00') {
        //     this.closeFormMustPushStatusList = false;
        //     Swal.fire('Success', 'Success ' + status + ' edd data', 'success').then(
        //         result => {
        //             // this.router.navigate(['/main']);
        //             this.ngxService.start();
        //             this.merchantOutletList = [];

        //             this.merchantWip = {};
        //             this.merchantWip.ownerWIP = {};
        //             this.merchantWip.merchantGroupId = 0;
        //             this.merchantWip.settlementConfigWIP = {};
        //             this.find();
        //         }
        //     );
        // } else { // something wrong
        //     Swal.fire('Failed', res.errDesc, 'error');
        // }
    }

    reject() {
        this.ngxService.start();
        this.merchantWip.listMerchantOutletWIP = [];
        this.merchantWip.statusRegistration = REJECTED_BY_EDD_MSG;

        this.merchantWipService.saveWip(this.merchantWip, REJECTED_BY_EDD).subscribe(
            (res: HttpResponse<MerchantWip>) => this.onSuccessEdd('reject', res.body),
            (res: HttpErrorResponse) => this.onError(res.message),
            () => {
                this.ngxService.stop();
                console.log('finally rejected');
                // Swal.fire('Success', 'Rejected! ', 'info');
                Swal.fire('Success', 'Success ' + status + '  Edd data Rejected', 'success').then(
                    result => this.router.navigate(['/main']));
            }
        );
    }

    loadLookup() {
        this.ngxService.start();
        console.log('Start call lookup');
        this.lookupService.findForMerchantGroup()
            .subscribe(
                (res: HttpResponse<LookupDto[]>) => this.onSuccessLookup(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message),
                () => {
                    // this.ngxService.stop();
                    this.cekTipeMerchant();
                    console.log('finally');
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
        modalRef.componentInstance.enableSave = false;
        modalRef.componentInstance.mid = mid;
        modalRef.result.then((result) => {
            // this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    private onSuccessLookup(data, headers) {
        console.log('onSuccessLookup-->', data);
        this.lookupTempl = data;
        this.breakLookup();
        // this.defaultConfig();
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

    highRiskValidation() {
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
        let status = 0;
        for (apupt of this.apuptList) {
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
        status = 0;
        for (teroris of this.terorisList) {
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
        status = 0;
        for (internalName of this.terorisList) {
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

    // start break lookup
    breakLookup() {
        this.lookupTempl.forEach(lookupdt => {
            if (lookupdt.lookupGroupString === LOOKUP_JENIS_USAHA) {
                // console.log('jenis usaha ', lookupdt);
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
            if (lookupdt.lookupGroupString === LOOKUP_APPROVE_REASON) {
                this.lookupApproveReason.push(lookupdt);
            }
            if (lookupdt.lookupGroupString === LOOKUP_REJECT_REASON) {
                this.lookupRejectReason.push(lookupdt);
            }
            if (lookupdt.lookupGroupString === LOOKUP_RETURN_REASON) {
                this.lookupReturnReason.push(lookupdt);
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

    defaultConfig(): void {
        console.log('next proc after break lookup ===> ', this.merchantWip , 'Finish break ', this.finishBreakLookup);

        if ((this.merchantWip !== undefined) && (this.finishBreakLookup === true )) {
            this.setComboSelected(this.merchantWip);
        }
        this.highRiskValidation();
        this.ngxService.stop();
    }

    setComboSelected(merchantWip: MerchantWip): void {
        console.log(merchantWip);

        this.tipeMerchantSelected = this.setComboSelectedLookup(this.lookupTipeMerchant, merchantWip.merchantType);
        this.jenisUsahaSelected = this.setComboSelectedLookup(this.lookupJenisUsaha, merchantWip.jenisUsaha);
        // this.loadKategoriBisnis(this.jenisUsahaSelected);
        this.provinceSelected = this.setComboSelectedLookup(this.lookupProvince, merchantWip.provinsi);
        this.citySelected = this.setComboSelectedLookup(this.lookupCity, merchantWip.kabupatenKota);
        this.ownerTitleSelected = this.setComboSelectedLookup(this.lookupOwnerTitle, merchantWip.ownerWIP.ownerTitle);
        this.provinceOwnerSelected = this.setComboSelectedLookup(this.lookupProvince, merchantWip.ownerWIP.ownerProvinsi);
        this.kabupatenOwnerSelected = this.setComboSelectedLookup(this.lookupCity, merchantWip.ownerWIP.ownerKabupaten);
        this.idTypeSelected = this.setComboSelectedLookup(this.lookupIdType, merchantWip.ownerWIP.ownerTipeID);
        this.genderSelected = this.setComboSelectedLookup(this.lookupGender, merchantWip.ownerWIP.ownerJenisKelamin);
        this.pekerjaanselected = this.setComboSelectedLookup(this.lookupPekerjaan, merchantWip.ownerWIP.ownerPekerjaan);
        // this.settlementConfigSelected =
        //     this.setComboSelectedLookup(this.lookupSettlementConfig, merchantWip.settlementConfigWIP.settlementConfig);
        // this.reportSettlementConfigSelected =
        //     this.setComboSelectedLookup(this.lookupReportSettlementConfig, merchantWip.settlementConfigWIP.reportSettlementConfig2);
        // this.settlementExecutionConfigSelected =
        //     this.setComboSelectedLookup(this.lookupSettlementExecutionConfig,
        //         merchantWip.settlementConfigWIP.settlementExecutionConfig);
        this.sendRptViaSelected = this.setComboSelectedLookup(this.lookupSendRptVia, merchantWip.settlementConfigWIP.sendReportVia);
        // this.processingConfigSelected =
        // //     this.setComboSelectedLookup(this.lookupProcessingConfig, merchantWip.settlementConfigWIP.processingConfiguration);
        // this.processingFeeSelected =
        //     this.setComboSelectedLookup(this.lookupProcessingFee, merchantWip.settlementConfigWIP.processingFee);
        // this.mdrSelected = this.setComboSelectedLookup(this.lookupMDR, merchantWip.settlementConfigWIP.mdr);
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
        //     console.log(this.settlementConfigSelected)
        // } else {
        //     this.settlementConfigSelected = this.setComboSelectedLookup(this.lookupMDR, merchantWip.settlementConfigWIP.settlementConfig);
        // }
        
        this.kategoriBisnisSelected = this.merchantWip.kategoriBisnis;
        this.notificationChannelSelected = this.merchantWip.notificationChannel;

    }

    // processingConfigChanged
    processingConfigChanged() {
        if (this.processingConfigSelected === '7993') {
            console.log('follow group');
            // this.editVaConfig = true;
            // tslint:disable-next-line:triple-equals
            const result = _.find(this.lookupMerchantGroup, (merchantGroup) => merchantGroup.id == this.merchantGroupSelected);
            let newMerhcantGroup = new MerchantGroup();
            newMerhcantGroup = _.clone(result);
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

    setComboSelectedLookup(lookupData: LookupDto[], id: string) {
        const result = _.find(lookupData, (lookup) => String(lookup.id) === id);
        console.log('result-->', lookupData, id, result);
        if (result === undefined) {
            return null;
        }
        return result.id;
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

    private onSuccessFilterKategoriBisnis(data) {
        console.log('listKategoriBisnis --> ', data)
        this.listKategoriBisnis = data.contents;
        this.ngxService.stop();
    }

    // setSendRptViaSelected(name) {
    //     // tslint:disable-next-line:triple-equals
    //     const result = _.find(this.lookupSendRptVia, (lookup) => lookup.name == name);
    //     this.sendRptViaSelected = _.clone(result);
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

    //     console.log('iterate mdr lookup');
    //      // tslint:disable-next-line:triple-equals
    //     const result = _.find(this.lookupMDR, (lookup) => lookup.name == name);
    //     console.log('finish iterate mdr lookup');
    //     this.mdrSelected = _.clone(result);
    //     console.log('finish iterate mdr lookup selected');
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

    loadLookupMerchantGroup() {
        this.merchantGroupService.query({
            page: 1,
            count: 1000,
        }).subscribe(
            (res: HttpResponse<MerchantGroup[]>) => this.onSuccessMG(res.body, res.headers),
            (res: HttpErrorResponse) => console.log(res.message),
            () => { 
                    this.ngxService.stop();
                    if (this.processingConfigSelected == '7993') {
                        // this.editVaConfig = true
                        this.processingConfigChanged()
                    }
                    console.log('Finally MG');
                }
        );
    }

    private onSuccessMG(data, headers) {
        this.lookupMerchantGroup = data.content;
        this.merchantGroupSelected = this.merchantWip.merchantGroupId;
        this.lookupMerchantGroup.forEach( mg => {
                if (this.merchantGroupSelected == mg.id) {
                    this.mgBefore = mg.merchantGroupName
                }
            })   
    }

    ngOnDestroy() {
        if (this.closeFormMustPushStatusList === true) {
            if (this.merchantWip === null) {
                console.log('Merchant WIP failed load !!');
                return;
            }
            console.log('close edd form id ', this.merchantWip.id);
            this.merchantStatusListService.pauseEdd(this.merchantWip.id);
        }
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
        console.log("on success acquisition",this.merchantGroupSelected, this.userCategorySelected, this.merchantWip.srId, this.merchantWip.category)
       
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
