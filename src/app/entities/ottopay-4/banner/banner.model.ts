export class Banner {
    constructor(
        public id?: number,
        public userCategoryId?: number,
        public userCategoryName?: string,
        public levelMerchantId?: number,
        public levelMerchantName?: string,
        public name?: string,
        public adsImage?: string,
        public adsLink?: string,
        public seq?: string,
        public status?: string,
        public errCode?: string,
        public errDesc?: string,
        public bannerName?: string,
        public detailBanner?: string,
    ) { }
}
