export class BankList {
    constructor(
        public id?: number,
        public code?: string,
        public shortName?: string,
        public settlementFeeConfig?: string,
        public fullName?: string,
        public status?: string,
        public seq?: number,
        public urlImage?: string,
        public createdAt?: string,
        public createdBy?: string,
        public updatedAt?: string,
        public updatedBy?: string,
        public errCode?: string,
        public errDesc?: string,
    ) { }
}