import { MerchantGroup } from '../merchant-group/merchant-group.model';
import { MerchantSettlementConfig } from '../merchant/merchant-settlement-config.model';
import { MerchantOutlet } from '../merchant/merchant-outlet.model';
import { MerchantOwner } from '../merchant/merchant-owner.model';
import { MerchantOutletWip } from './merchant-outlet-wip.model';

export class MerchantWip {
    constructor(
        public id?: number,
        public storeName?: string,
        public storeNamePreprinted?: string,
        public statusRegistration?: string,
        public merchantGroupId?: number,
        public settlementConfigWIP?: MerchantSettlementConfig,
        public merchantGroup?: MerchantGroup,
        public listMerchantOutletWIP?: MerchantOutletWip[],
        public ownerWIP?: MerchantOwner,
        public ktpPath?: string,
        public selfiePath?: string,
        public merchantPhotoPath?: string,
        public merchantPhoto2Path?: string,
        public signPath?: string,
        public logoPath?: string,
        public merchantType?: string,
        public jenisUsaha?: string,
        public kategoriBisnis?: string,
        public jenisUsahaName?: string,
        public alamat?: string,
        public kelurahan?: string,
        public kecamatan?: string,
        public provinsi?: string,
        public provinsiName?: string,
        public kabupatenKota?: string,
        public kabupatenKotaName?: string,
        public postalCode?: string,
        public longitude?: string,
        public latitude?: string,
        public storePhoneNumber?: string,
        public lokasiBisnis?: string,
        public jenisLokasiBisnis?: string,
        public jamOperasional?: string,
        public hostStatus?: string,
        public referralCode?: string,
        public agentName?: string,
        public agentID?: string,
        public agentCompanyID?: string,
        public agentPhoneNumber?: string,
        public institutionID?: string,
        public merchantCategoryCode?: string,
        public merchantOutletID?: string,
        public merchantPan?: string,
        public apiKey?: string,
        public secretID?: string,
        public secretQuestion?: string,
        public secretQuestionAnswer?: string,
        public notes?: string,
        public reason?: string,
        public approvalNote?: string,
        public approvalStatus?: number,
        public errCode?: string,
        public errDesc?: string,
        public idMerchant?: number,
        public level?: string,
        public mcc?: string,
        public nmid?: string,
        public midInfinitium?: string,
        public existingQrValue?: string,
        public category?: string,
        public mallIdDoku?: string,
        public sharedKeyDoku?: string,
        public merchantUrl?: string,
        public successUrl?: string,
        public failedUrl?: string,
        public callbackUrl?: string,
        public vaUrl?: string,
        public vaBca?: string,
        public vaMandiri?: string,
        public vaBri?: string,
        public vaLain?: string,
        public vaOttoCash?: string,
        public vaShopeePay?: string,
        public vaLinkAja?: string,
        public vaTransactionType?: string,
        public vaBcaCompanyCode?: string,
        public vaMandiriCompanyCode?: string,
        public vaBriCompanyCode?: string,
        public vaOttocashCompanyCode?: string,
        public vaShopeePayCompanyCode?: string,
        public vaLinkAjaCompanyCode?: string,
        public vaLainCompanyCode?: string,
        public vaBcaSubCompanyCode?: string,
        public vaMandiriSubCompanyCode?: string,
        public vaBriSubCompanyCode?: string,
        public vaLainSubCompanyCode?: string,
        public vaBcaFee?: number,
        public vaMandiriFee?: number,
        public vaBriFee?: number,
        public vaLainFee?: number,
        public vaBcaMerchantFee?: number,
        public vaMandiriMerchantFee?: number,
        public vaBriMerchantFee?: number,
        public vaLainMerchantFee?: number,
        public inquiryUrl?: string,
        public paymentUrl?: string,
        public vaTokenUrl?: string,
        public vaTokenUser?: string,
        public vaTokenPassword?: string,
        public vaAuthKey?: string,
        public vaAuthType?: string,
        public qris?: string,
        public debitPayment?: string,
        public creditPayment?: string,
        public photoLocationLeft?: string,
        public photoLocationRight?: string,
        public partnerCustomerId?: string,
        public fotoPreprinted?: string,
        public patokan?: string,
        public agentSalesRetail?: string,
        public profilePictureUrl?: string,
        public otpOption?: string,
        public tanggalSalesAkuisisi?: string,
        public selfRegister?: string,
        public srId?: string,
        public registrationCode?: string,
        public hostType?: string,
        public pairVerifySimilarity?: string,
        public channelPembayaran?: string,
        public notificationChannel?: string,
        public callbackMerchant?: string,
        public callbackMerchantUrl?: string,
        public vaBcaUpperLimitAmount?: number,
        public vaBcaLowerLimitAmount?: number,
        public vaBcaMerchantFeeAboveUpperLimitAmount?: number,
        public vaBcaFeeTransactionAboveUpperLimitAmount?: number,
        public vaBcaMerchantFeeBelowLowerLimitAmount?: number,
        public vaBcaFeeTransactionBelowLowerLimitAmount?: number,
        public vaBcaMerchantFeeInBetween?: number,
        public vaBcaFeeTransactionInBetween?: number,
        public vaBriUpperLimitAmount?: number,
        public vaBriLowerLimitAmount?: number,
        public vaBriMerchantFeeAboveUpperLimitAmount?: number,
        public vaBriFeeTransactionAboveUpperLimitAmount?: number,
        public vaBriMerchantFeeBelowLowerLimitAmount?: number,
        public vaBriFeeTransactionBelowLowerLimitAmount?: number,
        public vaBriMerchantFeeInBetween?: number,
        public vaBriFeeTransactionInBetween?: number,
        public vaMandiriUpperLimitAmount?: number,
        public vaMandiriLowerLimitAmount?: number,
        public vaMandiriMerchantFeeAboveUpperLimitAmount?: number,
        public vaMandiriFeeTransactionAboveUpperLimitAmount?: number,
        public vaMandiriMerchantFeeBelowLowerLimitAmount?: number,
        public vaMandiriFeeTransactionBelowLowerLimitAmount?: number,
        public vaMandiriMerchantFeeInBetween?: number,
        public vaMandiriFeeTransactionInBetween?: number,
        public vaLainUpperLimitAmount?: number,
        public vaLainLowerLimitAmount?: number,
        public vaLainMerchantFeeAboveUpperLimitAmount?: number,
        public vaLainFeeTransactionAboveUpperLimitAmount?: number,
        public vaLainMerchantFeeBelowLowerLimitAmount?: number,
        public vaLainFeeTransactionBelowLowerLimitAmount?: number,
        public vaLainMerchantFeeInBetween?: number,
        public vaLainFeeTransactionInBetween?: number,


    ) {
        this.level = '0' ;
     }
}

export class MerchantWipQueue {
    constructor(
        public id?: number,
        public transactionTime?: string,
        public merchantType?: string,
        public storeName?: string,
        public statusRegistration?: string,
        public priority?: string,
        public userName?: string,
        public wipId?: number,
        public key?: string
    ) { }
}


export class MerchantTag {
    constructor(
        public mid?: string,
        public tagCode?: string,
        public name?: string,
    ) { }
}

export class MerchantPartner {
    constructor(
        public id?: number,
        public merchant_id?: number,
        public partner_id?: string,
        public partner_code?: string,
        public created_by?: string,
        public created_at?: string,
        public updated_at?: string,
        public errCode?: string,
        public errDesc?: string,
    ) { }
}
