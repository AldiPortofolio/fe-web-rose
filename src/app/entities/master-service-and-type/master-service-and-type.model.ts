export class MasterService {
    constructor(
        public id?: number,
        public name?: string,
        public limit?: number,
        public page?: number,
        public updatedAt?: string,
        public updatedBy?: string,
        public errCode?: any,
        public errDesc?: any,
    ) { }
}

export class MasterType {
    constructor(
        public id?: number,
        public name?: string,
        public limit?: number,
        public page?: number,
        public updatedAt?: string,
        public updatedBy?: string,
        public errCode?: any,
        public errDesc?: any,
    ) { }
}