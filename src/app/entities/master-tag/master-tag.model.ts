export class MasterTag {
    constructor(
        public id?: number,
        public code?: string,
        public name?: string,
        public description?: string,
        public status?: string,
        public createdAt?: string,
        public createdBy?: string,
        public updatedAt?: string,
        public updatedBy?: string,
        public errCode?: string,
        public errDesc?: string,
    ) { }
}