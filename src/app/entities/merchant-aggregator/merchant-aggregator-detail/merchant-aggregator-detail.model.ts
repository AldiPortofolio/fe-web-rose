export class MerchantAggregatorDetail {
    constructor(
        public id?: number,
        public actionType?: number,
        public approvalStatus?: number,
        public latestApproval?: string,
        public latestApprover?: string,
        public latestSuggestion?: string,
        public latestSuggestor?: string,
        public status?: number,
        public version?: number,
        public midAggregator?: string,
        public midMerchant?: string,
        public partnerName?: string,
        public merchantName?: string,
        public merchantPan?: string,
        public merchantNmid?: string
    ) { }
}

export class MerchantAggregatorDetailTemp {
    constructor(
        public id?: number,
        public actionType?: number,
        public approvalStatus?: number,
        public latestApproval?: string,
        public latestApprover?: string,
        public latestSuggestion?: string,
        public latestSuggestor?: string,
        public status?: number,
        public merchantAggregatorDetailId?: number,
        public midAggregator?: string,
        public midMerchant?: Array<string>,
        public partnerName?: string,
        public merchantName?: string,
        public merchantPan?: string,
        public merchantNmid?: string
    ) { }
}

export class MerchantAggregatorUpload {
    constructor(
        public id?: number,
        public date?: string,
        public filePath?: string,
        public filePathSuccess?: string,
        public filePathErr?: string,
        public status?: string,
        public user?: string,
        public midAggregator?: string,
    ) { }
}
