export class UploadNmid {
    constructor(
        public id?: string,
        public date?: string,
        public filePath?: string,
        public filePathErr?: string,
        public status?: string,
        public totalUpload?: number,
        public totalSuccess?: number,
        public totalError?: number,
        public user?: string,
        public errCode?: string,
        public errDesc?: string,
    ) { }
}
