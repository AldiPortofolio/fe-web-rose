export class LookupGroup {
    constructor(
        public name?: string,
        public description?: string,
        public updateable?: boolean,
        public viewable?: boolean,
        public hasElement?: boolean,
        public childLookupGroup?: string,
        public childLookupView?: string,
        public createdAt?: string,
        public updatedAt?: string,
        public createdBy?: string,
        public updatedBy?: string,
        public errCode?: string,
        public errDesc?: string,
    ) {}
}
