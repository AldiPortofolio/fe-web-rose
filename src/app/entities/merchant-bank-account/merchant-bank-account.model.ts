export class MerchantBankAccount {
    constructor(
        public id?: number,
        public mid?: string,
        public bankCode?: string,
        public shortName?: string,
        public accountNumber?: string,
        public accountName?: string,
        public notes?: string,
        public status?: string,
        public pushNotifStatus?: string,
        public createdAt?: string,
        public updatedAt?: string,
        public updatedBy?: string,
        public errCode?: string,
        public errDesc?: string,
    ) { }
}