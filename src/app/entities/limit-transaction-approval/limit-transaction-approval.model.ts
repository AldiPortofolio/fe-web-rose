export class LimitTransactionApproval {
    constructor(
        public id?: number,
        public actionType?: number,
        public actionTypeDesc?: string,
        public approvalStatus?: number,
        public latestApproval?: string,
        public latestApprover?: string,
        public latestSuggestion?: string,
        public latestSuggestor?: string,
        public status?: number,
        public masterLimitationId?: number,
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
    ) { }
}
