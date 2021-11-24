// export const SERVER = 'http://13.228.25.85:8080/rosebe/';// --> kalau gamau jalanin rose-be-java, langsung pake ini aja CMIW
// export const SERVER = 'http://34.101.126.12:8080/rosebe/';// --> kalau gamau jalanin rose-be-java, langsung pake ini aja CMIW
// export const SERVER = 'http://10.10.43.10:8080/rosebe/';
// export const SERVER = 'http://13.228.25.85:8080/rosewipdb/';

// local
// export const SERVER = 'http://localhost:8080/';
// export const SERVER_GO = 'http://localhost:8098/rosego/v.0.1/'
// export const SERVER_BISNIS_PORTAL = 'http://localhost:8000/bpauth/v0.1.0/';

// dev
// export const SERVER = '/rosebe/';
// export const SERVER_GO = 'http://13.228.25.85:8098/rosego/v.0.1/';
// export const SERVER_BISNIS_PORTAL = 'http://13.228.25.85:8000/bpauth/v0.1.0/';

// dev GCP
export const SERVER = '/rosebe/';  
export const SERVER_GO = 'http://34.101.126.12:8098/rosego/v.0.1/';
export const SERVER_BISNIS_PORTAL = 'http://13.228.25.85:8000/bpauth/v0.1.0/';



// PROD
// export const SERVER = '/rosebe/';
// export const SERVER_GO = '/rosego/v.0.1/'
// export const SERVER_BISNIS_PORTAL = 'https://business.ottopay.id/bpauth/v0.1.0/';

// export const SERVER_GO = 'https://10.10.41.10/rosego/v.0.1/'

export const PATH_IMAGES = 'api/images/uploadFile';
export const PATH_UPLOAD_IMAGES_MERCHANT = 'api/images/uploadFileMerchant';

/* Images */
// dev
// export const SERVER_UPLOAD_IMAGE = 'http://13.228.25.85:8312/upload';
export const SERVER_LOAD_IMAGE = 'http://13.228.25.85:9000';
export const BUCKET_NAME = 'rose';


/* Images */
// prod
// export const SERVER_UPLOAD_IMAGE = 'https://storage.ottopay.id/upload';
// export const SERVER_LOAD_IMAGE = 'https://storage.ottopay.id';
// export const BUCKET_NAME = 'rose';

export const PHOTO_KTP = 'photo_ktp';
export const PHOTO_SELFIE = 'photo_selfie';
export const PHOTO_LOCATION = 'photo_location';
export const PHOTO_LOCATION_2 = 'photo_location_2';
export const PHOTO_LOCATION_LEFT = 'photo_location_left';
export const PHOTO_LOCATION_RIGHT = 'photo_location_right';

export const PHOTO_SIGN = 'photo_sign';
export const PHOTO_LOGO = 'photo_logo';
export const PHOTO_PREPRINTED_QR = 'photo_preprinted_qr';
export const PHOTO_PROFILE_PICTURE= 'photo_profile_picture';
export const PHOTO_GROUP = 'photo_group';
export const PHOTO_SIUP = 'photo_siup';
export const PHOTO_NPWP = 'photo_npwp';
export const PHOTO_PKS = 'photo_pks';
export const PHOTO_KTP_DIREKSI = 'photo_ktp_direksi';
export const PHOTO_AKTA = 'photo_akta';
export const PHOTO_KTP_PENTANGGUNGJAWAB = 'photo_ktp_penanggungjawab';
export const PHOTO_PERSETUJUAN_MENKUMHAM = 'photo_persetujuan_menkumham';
export const PHOTO_TANDA_DAFTAR_PERUSAHAAN = 'photo_tanda_daftar_perusahaan';

export const SERVER_PATH = SERVER + 'api/';
export const AUTH_PATH = SERVER + 'token/';
export const REPORT_PATH = SERVER + 'report/';
export const TOTAL_RECORD_PER_PAGE = 10;

// lookup group
export const LOOKUP_JENIS_USAHA = 'JENIS_USAHA';
export const LOOKUP_PROVINCE = 'PROVINCE';
export const LOOKUP_TIPE_MERCHANT = 'TIPE_MERCHANT';
export const LOOKUP_CITY = 'CITY_LIST';
export const LOOKUP_DISTRICT = 'DISTRICT_LIST';
export const OWNER_TITLE = 'OWNER_TITLE';
export const ID_TYPE = 'ID_TYPE';
export const GENDER = 'GENDER';
export const PEKERJAAN = 'PEKERJAAN';
export const SETTLEMENT_CONFIG = 'SETTLEMENT_CONFIG';
export const LOOKUP_MDR = 'MDR';
export const LOOKUP_DEVICE_TYPE = 'DEVICE_TYPE';
export const LOOKUP_DEVICE_GROUP = 'DEVICE_GROUP';
export const LOOKUP_DEVICE_BRAND = 'DEVICE_BRAND';
export const LOOKUP_PROCESSING_CONFIG = 'PROCESSING_CONFIG';
export const LOOKUP_PROCESSING_FEE = 'PROCESSING_FEE';
export const LOOKUP_RPT_SETT_CFG = 'REPORT_SETTLEMENT_CONFIG';
export const LOOKUP_RPT_SETT_CFG2 = 'REPORT_SETTLEMENT_CONFIG2';
export const LOOKUP_RPT_SETT_CONFIG = 'REPORT_SETTLEMENT_CONFIG2';
export const LOOKUP_SETT_EXEC_CFG = 'SETTLEMENT_EXECUTION_CONFIG';
export const LOOKUP_SEND_RPT_VIA = 'SEND_REPORT_VIA';
export const LOOKUP_APPROVE_REASON = 'APPROVE_REASON';
export const LOOKUP_REJECT_REASON = 'REJECT_REASON';
export const LOOKUP_RETURN_REASON = 'RETURN_REASON';
export const HOST_TYPE = 'HOST_TYPE';
export const LOOKUP_MERCHANT_CATEGORY_CODE = 'MERCHANT_CATEGORY';
export const LOOKUP_SR_ID = 'SR_ID';


// merchant wip
export const TO_REGISTERED = 0;
export const TO_REGISTERED_MSG = 'REGISTERED';

export const GET_REGISTERED = 5;
export const GET_REGISTERED_MSG = 'VERIFIER_START_VIEW';

export const TO_VERIFIED = 6;
export const TO_VERIFIED_MSG = 'VERIFIED';

export const GET_VERIFIED = 10;
export const GET_VERIFIED_MSG = 'APPROVER_START_VIEW';

export const APPROVED_BY_APPROVER = 11;
export const APPROVED_BY_APPROVER_MSG = 'APPROVED_BY_APPROVER';


export const REJECTED_BY_APPROVER = 12;
export const REJECTED_BY_APPROVER_MSG = 'REJECTED_BY_APPROVER';

export const BACK_TO_REGISTERED = 13;
export const BACK_TO_REGISTERED_MSG = 'RETURNED_TO_VERIFIER';

export const TO_EDD = 14;
export const TO_EDD_MSG = 'EDD';

export const GET_EDD = 20;
export const GET_EDD_MSG = 'EDD_START_VIEW';

export const APPROVED_BY_EDD = 21;
export const APPROVED_BY_EDD_MSG = 'APPROVED_BY_EDD';

export const REJECTED_BY_EDD = 22;
export const REJECTED_BY_EDD_MSG = 'REJECTED_BY_EDD';

export const BACK_TO_VERIFIED = 23;
export const BACK_TO_VERIFIED_MSG = 'RETURNED_TO_APPROVER';


// export const REJECTED_BY_APPROVER_MSG = 'REJECTED_BY_APPROVER';

// export const TO_VERIFIED = 6;
// export const TO_VERIFIED_MSG = 'VERIFIED';

// MDA ACTION
export const MDA_ACTION_INSERT = 0;
export const MDA_ACTION_INSERT_MSG = 'Insert';

export const MDA_ACTION_UPDATE = 1;
export const MDA_ACTION_UPDATE_MSG = 'Update';

export const MDA_ACTION_REPAIR = 2;
export const MDA_ACTION_REPAIR_MSG = 'Repair';

// level wilayah configuration
export const WILAYAH_PROVINSI   = 'provinsi';
export const WILAYAH_DATI2      = 'dati2';
export const WILAYAH_KECAMATAN  = 'kecamatan';
export const WILAYAH_KELURAHAN  = 'kelurahan';




