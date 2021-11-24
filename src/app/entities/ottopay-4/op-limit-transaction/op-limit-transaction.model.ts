export class OpLimitTransaction {
    constructor(
        public id?: number,
        public userCategoryId?: string,
        public levelMerchant?: string,
        public limitFreq?: number,
        public minLimitAmount?: number,
        public limitAmount?: number,
        public featureProduct?: string,
        public timeFrame?: string,
        public errCode?: string,
        public errDesc?: string,
    ) { }
}