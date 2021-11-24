export class QrisConfig {
    constructor(
        public id?: number,
        public institutionId?: string,
        public issuerName?: string,
        public transactionType?: string,
        public status?: number,
        public createdAt?: string,
        public createdBy?: string,
        public updatedAt?: string,
        public updatedBy?: string,
        public errCode?: string,
        public errDesc?: string,
    ) { }
}
