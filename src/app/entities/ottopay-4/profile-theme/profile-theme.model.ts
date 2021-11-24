export class ProfileTheme {
    constructor(
        public id?: number,
        public userCategoryId?: number,
        public userCategoryName?: string,
        public levelMerchantId?: number,
        public levelMerchantName?: string,
        public dashboardTopBackground?: string,
        public themeColor?: string,
        public fontColor?: string,
        public dashboardLogo?: string,
        public dashboardText?: string,
        public profileBackgroundImage?: string,
        public status?: string,
        public url?: string,
        public errCode?: string,
        public errDesc?: string,
    ) { }
}