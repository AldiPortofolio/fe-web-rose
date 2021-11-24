export class LimitTransactionDeposit {
    constructor(
        public maxLimit?: number,
        public minLimit?: number,
        public category?: string,
        public memberType?: string,
        public errCode?: string,
        public errDesc?: string,
    ) { }
}