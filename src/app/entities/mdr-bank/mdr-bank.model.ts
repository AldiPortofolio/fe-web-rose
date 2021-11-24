export class MdrBank {
    constructor(
        public id?: any,
        public bankCode?: any,
        public bankName?: any,
        public dokuBankCode?: any,
        public status?: any,
        public acquiringStatus?: string,
        public seq?: any,
        public updatedAt?: any,
        public updatedBy?: any,
        public limit?: any,
        public page?: any,
    ){}
}

export class MdrBankResponse {
    constructor(
        public errCode?: any,
        public errDesc?: any,
        public data?: any,
        public totalData?: any,
        public contents?: any,
    ){}
}
