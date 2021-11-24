export class MdrTenor {
    constructor(
        public id?: any,
        public tenorCode?: any,
        public tenorName?: any,
        public dokuTenorCode?: any,

        public status?: any,
        public seq?: any,
        public updatedAt?: any,
        public updatedBy?: any,
        public limit?: any,
        public page?: any,
    ) { }
}

export class MdrTenorResponse {
    constructor(
        public errCode?: any,
        public errDesc?: any,
        public data?: any,
        public totalData?: any,
        public contents?: any,
    ) { }
}
