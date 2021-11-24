export class UploadMerchant {
    constructor(
        public id?: string,
        public date?: string,
        public filePath?: string,
        public filePathErr?: string,
        public status?: string,
        public notes?: string,
        public user?: string,
        public totalUpload?: number,
        public totalSuccess?: number,
        public totalError?: number,
        public errCode?: string,
        public errDesc?: string,
    ) { }
}
