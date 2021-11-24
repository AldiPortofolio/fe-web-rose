export class SettlementType {
    constructor(
        public id?: number,
        public bank_code?: string,
        public bank_name?: string,
        public settlement_type?: string,
        public status?: string,
        public created_at?: string,
        public updated_at?: string,
        public updated_by?: string,
        public errCode?: string,
        public errDesc?: string,
    ) { }
}