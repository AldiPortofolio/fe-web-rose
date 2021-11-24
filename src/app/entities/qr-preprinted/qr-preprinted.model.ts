export class QrPreprinted {
    constructor(
        public id?: number,
        public totalReq?: number,
        public city?: string,
        public postalCode?: string,
        public mcc?: string,
        public user?: string,
        public status?: string,
        public notes?: string,
        
        public path?: string,
        public createdAt?: string,
        public updatedAt?: string,
        public errCode?: string,
        public errDesc?: string,
    ) { }
}

export class QrPreprintedReq {
    constructor(
        public totalReq?: number,
        public city?: string,
        public postalCode?: string,
        public mcc?: string,
    ) { }
}