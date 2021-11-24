export class PortalAccess {
    constructor(
        public mid?: string,
        public store_name?: string,
        public mpan?: string,
        public address?: string,
        public kelurahan?: string,
        public kecamatan?: string,
        public kabupaten_kota?: string,
        public provinsi?: string,
        public email?: string,
        public owner_id?: number,
        public merchant_name?: string,
        public merchant_type?: string,
        public store_phone_number?: string,
        public merchant_outlet_id?: string,
        public merchant_group_id?: string,
        public merchant_group_name?: string,
        public terminal_id?: string,
        public action?: string,
        public errCode?: string,
        public errDesc?: string,
        public code?: number,
        public msg?: string,
        public content?: {},
        public value?: string,
        public category?: string,
        public profile_pict?: string,
        public portal_category?:string
    ) {}
}

export class BusinessPortal {
    constructor(
        public id?: number,
        public category?: number,
        public email?: string,
        public action?: string,
        public errCode?: string,
        public errDesc?: string,
    ) { }
}

export class ReqBusinessPortal {
    constructor(
        public id?: number,
        public category?: number,
        public email?: string,
        public action?: string,
    ) { }
}
