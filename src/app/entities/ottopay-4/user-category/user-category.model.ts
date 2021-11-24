export class UserCategory {
    constructor(
        public id?: number,
        public code?: string,
        public name?: string,
        public notes?: string,
        public appId?: string,
        public appName?: string,
        public logo?: string,
        public seq?: number,
        public errCode?: string,
        public errDesc?: string,
    ) { }
}