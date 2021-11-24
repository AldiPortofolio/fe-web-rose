export class MerchantBankAccountValidation {
    constructor(
        public accountNo?: string,
        public accountName?: string,
        public accountBankName?: string,
        public ownerFirstName?: string,
        public ownerLastName?: string,
        public errCode?: string,
        public errDesc?: string,
    ) { }
}