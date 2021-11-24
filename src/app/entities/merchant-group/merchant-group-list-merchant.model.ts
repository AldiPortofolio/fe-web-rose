export class MerchantGroupListMerchant {
    constructor(
        public id?: number,
        public storeName?: string,
        public merchantPan?: string,
        public merchantOutletId?: string,
        public nMid?: string,
        public actionType?: number,
        public approvalStatus?: number,
        public storePhoneNumber?: string,
        public portal_status?: number,
    ) { }
}