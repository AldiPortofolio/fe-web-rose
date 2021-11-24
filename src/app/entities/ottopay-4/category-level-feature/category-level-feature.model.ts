export class CategoryLevelFeature {
    constructor(
        public id?: number,
        public userCategoryId?: number,
        public userCategoryName?: string,
        public levelMerchantId?: number,
        public levelMerchantName?: string,
        public fiturProductId?: number,
        public fiturProductName?: string,
        public status?: string,
        public errCode?: string,
        public errDesc?: string,
    ) { }
}