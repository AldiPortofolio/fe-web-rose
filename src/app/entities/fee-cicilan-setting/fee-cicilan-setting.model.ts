export class FeeCicilanSetting {
    constructor(
        public id?: number,
        public adminFeeDoku?: number,
        public adminFeeInfinitium?: number,
        public vaBcaFee?: number,
        public vaMandiriFee?: number,
        public vaLainnyaFee?: number,
        public createdAt?: string,
        public user?: string,
        public errCode?: any,
        public errDesc?: any,
    ) { }
}