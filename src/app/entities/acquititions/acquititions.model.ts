export class Acquisition {
    constructor(
        public id?: number,
        public merchantType ?: string ,
        public merchantGroupId ?: number ,
        public merchantCategory ?: string ,
        public name ?: string ,
        public logoUrl ?: string ,
        public registerUsingId ?: boolean ,
        public sequence ?: number ,
        public showInApp ?: string ,
        public salesRetails ?: string ,
        public salesRetailsArr ?: string[] ,
        public businessType ?: string ,
        public businessTypeArr ?: string[] ,
        public createdAt ?: Date ,
        public updatedAt ?: Date ,
        public updatedBy ?: string ,
        public errCode?: string,
        public errDesc?: string,
    ) { }
}