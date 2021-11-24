export class MdrAggregator {
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
        public groupPartner?: string,
        public merchantCategory?: string,
        public transactionType?: string,
        public mdrType?: string,
        public mdr?: number,
        public notes?: string,
        public midPartner?: string,
        public midMerchant?: string,
        public errCode?: string,
        public errDesc?: string,
    ) { }
}
