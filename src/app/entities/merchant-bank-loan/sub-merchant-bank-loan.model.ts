export class SubMerchantBankLoan {
    constructor(
        public id?: number,
        public mid?: string,
        public bankCode?: string,
        public loanProductCode?: string,
        public loanProductName?: string,
        public masterBankLoanId?: string,
        public loanId?: string,
        public loanAmount?: number,
        public loanPaidAmount?: number,
        public loanTxnDate?: string,
        public loanEffectiveDate?: string,
        public loanMaturityDate?: string,
        public lastPayDate?: string,
        public loanStatus?: string,
        public invoiceNo?: string,
        public errCode?: string,
        public errDesc?: string,
    ) { }
}