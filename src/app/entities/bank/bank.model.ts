export class ListAccountBank {
    constructor(
        public id?: string,
        public mid?: string,
        public phone_number?: string,
        public bank_name?: string,
        public account_number?: string,
        public account_name?: string,
        public notes?: string,
        public created_at?: string,
        public updated_at?: string,
        public errCode?: string,
        public errDesc?: string,
        // public content?: {},
    ) { }
}