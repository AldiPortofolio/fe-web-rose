export class MerchantGroupVaInfo {
    constructor(
        public id?: number,
        public merchantGroupId?: number,
        public inquiryUrl?: string,
        public paymentUrl?: string,
        public vaTokenUrl?: string,
        public vaTokenUser?: string,
        public vaTokenPassword?: string,
        public vaAuthKey?: string,
        public vaAuthType?: string,
        public hostType?: string,
        public vaTransactionType?: string,
        public vaBca?: string,
        public vaMandiri?: string,
        public vaBri?: string,
        public vaLain?: string,
        public vaBcaCompanyCode?: string,
        public vaMandiriCompanyCode?: string,
        public vaBriCompanyCode?: string,
        public vaLainCompanyCode?: string,
        public vaBcaSubCompanyCode?: string,
        public vaMandiriSubCompanyCode?: string,
        public vaBriSubCompanyCode?: string,
        public vaLainSubCompanyCode?: string,
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
        public errCode?: string, 
        public errDesc?: string,
        public totalData?: number,
    ) {}
}
