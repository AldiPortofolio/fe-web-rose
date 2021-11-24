export class LogUpgradeFds {
    constructor(
        public id?: number,
        public phoneNumber?: string,
        public req?: string,
        public res?: string,
        public status?: string,
        public createdAt?: string,
        public createdBy?: string,
        public updatedAt?: string,
        public updatedBy?: string,
        public retryAt?: string,
        public retryBy?: string,
        public errCode?: string,
        public errDesc?: string,
    ) { }
}