export class ReportExportAkuisisiSfa {
    constructor(
        public id?: number,
        public filter?: string,
        public filePath?: string,
        public filePathErr?: string,
        public user?: string,
        public status?: string,
        public transactionDate?: string,
        public errCode?: string,
        public errDesc?: string,
    ) { }
}


