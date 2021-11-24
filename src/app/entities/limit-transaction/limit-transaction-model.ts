export class LimitTransaction {
    constructor(
        public id?: number,
        public actionType?: number,
        public ActionTypeDesc?: string,
        public approvalStatus?: number,
        public latestApproval?: string,
        public latestApprover?: string,
        public latestSuggestion?: string,
        public latestSuggestor?: string,
        public status?: number,
        public productType?: string,
        public productName?: string,
        public limitFreq?: number,
        public limitAmt?: number,
        public limitFreqMin?: number,
        public limitAmtMin?: number,
        public byTime?: string,
        public byGroup?: string,
        public errCode?: string,
        public errDesc?: string,
        public merchantGroup?: MerchantGroupLimit[],
    ) { }
}

export class MerchantGroupLimit {
    constructor(
        public id?: number,
        public storeName?: string,
        public merchantPan?: string,
        public merchantOutletId?: string,
        public nmid?: string
    ) {}
}
