export class Feature {
    constructor(
        public id?: number,
        public productId?: number,
        public productName?: string,
        public code?: string,
        public icon?: any,
        public name?: string,
        public notes?: string,
        public seq?: number,
        public url?: string,
        public errCode?: string,
        public errDesc?: string,
    ) { }
}