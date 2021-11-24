export class ReportRejected {
    constructor(
        public id?: number,
        public startDate?: string,
        public endDate?: string,
        public filePath?: string,
        public filePathErr?: string,
        public user?: string,
        public status?: string,
        public transactionDate?: string,
        public errCode?: string,
        public errDesc?: string,
    ) { }
}

export class ReasonWip {
    constructor(
        public status?: string,
        public reason?: string,
    ) {}
}
