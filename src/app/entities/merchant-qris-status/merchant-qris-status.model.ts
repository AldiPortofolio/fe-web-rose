export class MerchantQrisStatus {
    constructor(
        public id?: number,
        public mid?: string,
        public storeName?: string,
        public agentId?: number,
        public qrisStatus?: number,
        public qrisStatusDesc?: string,
        public qrisRequestDate?: string,
        public qrisInstallDate?: string,
        public errCode?: string,
        public errDesc?: string,
    ) { }
}
