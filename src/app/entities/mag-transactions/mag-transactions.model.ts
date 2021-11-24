export class MagTransactions {
    constructor(
        public id?: number,
        public user?: string,
        public partner?: string,
        public billing_id?: string,
        public channel?: string,
        public merchant_id?: string,
        public terminal_id?: string,
        public amount?: number,
        public tip?: number,
        public total_amount?: number,
        public req_reference_no?: string,
        public qr_created_at?: string,
        public merchant_pay_status?: string,
        public merchant_pay_ref?: string,
        public merchant_pay_time?: string,
        public issuer?: string,
        public issuer_cust_account?: string,
        public issuer_ref?: string,
        public mag_billing_id?: string,
        public errCode?: string,
        public errDesc?: string,
        public Total?: number,
    ) { }
}
