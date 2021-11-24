export class LoanProductMaintenance {
    constructor(
        public id?: number,
        public bankCode?: string,
        public bankName?: string,
        public loanProductCode?: string,
        public loanProductName?: string,
        public adminFeeType?: string,
        public adminFeeValue?: number,
        public status?: string,
        public description?: string,
        public createdAt?: string,
        public createdBy?: string,
        public updatedAt?: string,
        public updatedBy?: string,
        public limit?: number,
        public page?: number,
        public errCode?: any,
        public errDesc?: any,
    ) { }
}