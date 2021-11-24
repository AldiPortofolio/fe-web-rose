export class ValidationCode {
    constructor(
        public id?: number,
        public appId?: string,
        public userCategoryCode?: string,
        public validationCode?: string,
        public validFrom?: string,
        public validTo?: string,
        public createdAt?: string,
        public createdBy?: string,
        public updatedAt?: string,
        public updatedBy?: string,
        public errCode?: string,
        public errDesc?: string,
    ) { }
}