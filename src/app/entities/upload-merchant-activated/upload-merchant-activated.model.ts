export class UploadMerchantActivated {
    constructor(
        public id?: number,
        public date?: string,
        public filePath?: string,
        public filePathErr?: string,
        public status?: string,
        public notes?: string,
        public user?: string,
        public errCode?: string,
        public errDesc?: string,
    ) { }
}