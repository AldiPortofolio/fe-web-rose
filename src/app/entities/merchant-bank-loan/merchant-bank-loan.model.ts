export class MerchantBankLoan {
    constructor(
        public id?: number,
        public mid?: string,
        public bankCode?: string,
        public loanProductCode?: string,
        public loanProductName?: string,
        public masterBankLoanId?: string,
        public accountNumber?: string,
        public storeName?: string,
        public phoneNumber?: string,
        public tenor?: number,
        public limit?: number,
        public expireDate?: string,
        public uploadedBy?: string,
        public uploadedAt?: string,
        public errCode?: string,
        public errDesc?: string,
    ) { }
}