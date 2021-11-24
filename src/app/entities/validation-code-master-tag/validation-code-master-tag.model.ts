export class ValidationCodeMasterTag {
    constructor(
        public id?: number,
        public validationCodeId?: number,
        public validationCode?: string,
        public masterTagId?: number,
        public masterTagCode?: string,
        public createdAt?: string,
        public createdBy?: string,
        public updatedAt?: string,
        public updatedBy?: string,
        public errCode?: string,
        public errDesc?: string,
    ) { }
}