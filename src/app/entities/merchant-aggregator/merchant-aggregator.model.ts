
export class MerchantAggregator {
    constructor(
        public id?: number,
        public name?: string,
        public mpan?: string,
        public description?: string,
        public mid?: string,
        public nmid?: string,
        public mcc?: string,
        public alamat?: string,
        public kodePos?: string,
        public kota?: string,
        public merchantCriteria?: string,
        public merchantType?: string,
        public npwp?: string,
        public ktp?: string,
        public approvalStatus?: number,
        public latestSuggestion?: string,
        public latestSuggestor?: string,
        public latestApproval?: string,
        public latestApprover?: string,
        public errCode?: string,
        public errDesc?: string,
    ) { }
}
