
export class MerchantAggregatorDetail {
    constructor(
        public id?: number,
        public midAggregator?: string,
        public midMerchant?: string,
        public approvalStatus?: number,
        public latestSuggestion?: string,
        public latestSuggestor?: string,
        public latestApproval?: string,
        public latestApprover?: string,
        public errCode?: string,
        public errDesc?: string,
    ) { }
}
