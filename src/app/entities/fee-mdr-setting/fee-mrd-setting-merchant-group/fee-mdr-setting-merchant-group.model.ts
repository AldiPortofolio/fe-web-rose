export class FeeMdrSettingMerchantGroup {
    constructor(
        public id?: number,
        public idMerchantGroup?: number,
        public midBank?: string,
        public secretId?: string,
        public bank?: string,
        public tenor?: string,
        public bankMdr?: number,
        public merchantMdr?: number,
        public merchantFeeType?: string,
        public merchantFee?: number,
        public customerFeeType?: string,
        public customerFee?: number,
        public updatedAt?: string,
        public updatedBy?: string,
        public limit?: number,
        public page?: number,
        public errCode?: any,
        public errDesc?: any,
    ) { }
}