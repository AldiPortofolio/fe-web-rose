import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TerorisModule } from './teroris/teroris.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { MerchantGroupModule } from './merchant-group/merchant-group.module';
import { ApuptModule } from './apupt/apupt.module';
import { LookupModule } from './lookup/lookup.module';
import { MasterDataApprovalModule } from './master-data-approval/master-data-approval.module';
import { LookupGroupModule } from './lookup-group/lookup-group.module';
import { RegionModule } from './region/region.module';
import { AreaModule } from './area/area.module';
import { BranchModule } from './branch/branch.module';
import { MerchantModule } from './merchant/merchant.module';
import { LoginModule } from './login/login.module';
import { WorkInProgressModule } from './work-in-progress/work-in-progress.module';
import { InternalNameRiskModule } from './internal-name-risk/internal-name-risk.module';
import { AppParameterModule } from './app-parameter/app-parameter.module';
import { SystemParameterModule } from './system-parameter/system-parameter.module';
// import { MasterDataApprovalDetailComponent } from './master-data-approval-detail/master-data-approval-detail.component';
import { AccessMatrixModule } from './access-matrix/access-matrix.module';
import { HolidayModule } from './holiday/holiday.module';
import { ReportModule } from './report/report.module';
import { UseractivityModule } from './useractivity/useractivity.module';
import { PendingDocumentModule } from './pending-document/pending-document.module';
import { WilayahConfigurationModule } from './wilayah-configuration/wilayah-configuration.module';
import { ProvinsiModule } from './provinsi/provinsi.module';
import { Dati2Module } from './dati2/dati2.module';
import { KecamatanModule } from './kecamatan/kecamatan.module';
import { KelurahanModule } from './kelurahan/kelurahan.module';
import { MccModule } from './mcc/mcc.module';
import { UploadNmidModule } from './upload-nmid/upload-nmid.module';
import { PortalAccessModule } from './merchant-portal/portal-access/portal-access.module';
import { MerchantAggregatorModule } from './merchant-aggregator/merchant-aggregator.module';
import { MerchantAggregatorDetailApprovalModule } from './merchant-aggregator-detail-approval/merchant-aggregator-detail-approval.module';
import { LimitTransactionApprovalModule } from './limit-transaction-approval/limit-transaction-approval.module';
import { LimitTransactionModule } from './limit-transaction/limit-transaction.module';
import { MdrAggregatorModule } from './mdr-aggregator/mdr-aggregator.module';
import { MdrAggregatorApprovalModule } from './mdr-aggregator-approval/mdr-aggregator-approval.module';
import { BankModule } from './bank/bank.module';
import { MerchantQrisStatusModule } from './merchant-qris-status/merchant-qris-status.module';
import { OutletActivationModule } from './merchant-portal/outlet-activation/outlet-activation.module';
import { VersionAppModule } from './version-app/version-app.module';
import { ClearSessionModule } from './clear-session/clear-session.module';
import { MagTransactionsModule } from './mag-transactions/mag-transactions.module';
import { QrisConfigModule } from './qris-config/qris-config.module';
import { UploadMerchantModule } from './upload-merchant/upload-merchant.module';
import { UploadMerchantWipModule } from './upload-merchant-wip/upload-merchant-wip.module';
import { ProductModule } from './ottopay-4/product/product.module';
import { FeatureModule } from './ottopay-4/feature/feature.module';
import { UserCategoryModule } from './ottopay-4/user-category/user-category.module';
import { OpLimitTransactionModule } from './ottopay-4/op-limit-transaction/op-limit-transaction.module';
import { ImageManagementModule } from './ottopay-4/image-management/image-management.module';
import { BannerModule } from './ottopay-4/banner/banner.module';
import { ProfileThemeModule } from './ottopay-4/profile-theme/profile-theme.module';
import { CategoryLevelFeatureModule } from './ottopay-4/category-level-feature/category-level-feature.module';
import { LevelMerchantModule } from './level-merchant/level-merchant.module';
import { ArticleModule } from './ottopay-4/article/article.module';
import { MdrBankModule } from './mdr-bank/mdr-bank.module';
import { MdrTenorModule } from './mdr-tenor/mdr-tenor.module';
import { FeeMrdSettingMerchantModule} from './fee-mdr-setting/fee-mrd-setting-merchant/fee-mrd-setting-merchant.module';
import { FeeMrdSettingMerchantGroupModule } from './fee-mdr-setting/fee-mrd-setting-merchant-group/fee-mrd-setting-merchant-group.module';
import { LimitTransactionDepositModule } from './limit-transaction-deposit/limit-transaction-deposit.module';
import { MasterServiceAndTypeModule } from './master-service-and-type/master-service-and-type.module';
import { MerchantCustomerModule } from './merchant-customer/merchant-customer.module';
import { QrPreprintedModule } from './qr-preprinted/qr-preprinted.module';
import { FeeCicilanSettingModule } from './fee-cicilan-setting/fee-cicilan-setting.module';
import { UploadMerchantNonActivatedModule } from './upload-merchant-non-activated/upload-merchant-non-activated.module';
import { AkuisisiSfaModule } from './akuisisi-sfa/akuisisi-sfa.module';
import { UploadFeeMdrSettingModule } from './upload-fee-mdr-setting/upload-fee-mdr-setting.module';
import { BankListModule } from './bank-list/bank-list.module';
import { MerchantBankAccountModule } from './merchant-bank-account/merchant-bank-account.module';
import { UploadMerchantNonWipModule } from './upload-merchant-non-wip/upload-merchant-non-wip.module';
import { ValidationCodeModule } from './validation-code/validation-code.module';
import { LogUpgradeFdsModule } from './log-upgrade-fds/log-upgrade-fds.module';
import { MasterTagModule } from './master-tag/master-tag.module';
import { MerchantMasterTagModule } from './merchant-master-tag/merchant-master-tag.module';
import { UploadMerchantMasterTagModule } from './upload-merchant-master-tag/upload-merchant-master-tag.module';
import { ValidationCodeMasterTagModule } from './validation-code-master-tag/validation-code-master-tag.module';
import { UploadMerchantBankLoanModule } from './upload-merchant-bank-loan/upload-merchant-bank-loan.module';
import { MerchantBankLoanModule } from './merchant-bank-loan/merchant-bank-loan.module';
import { UpdatedDataMerchantModule } from './updated-data-merchant/updated-data-merchant.module';
import { LoanProductMaintenanceModule } from './loan-product-maintenance/loan-product-maintenance.module';
import { BlastNotifModule } from './blast-notif/blast-notif.module';
import { UploadMissingDataModule } from './upload-missing-data/upload-missing-data.module';
import { SettlementBankConfigModule } from './settlement-bank-config/settlement-bank-config.module';
import { UploadMerchantActivatedModule } from './upload-merchant-activated/upload-merchant-activated.module';
import { MonitoringAktivasiFdsModule } from './monitoring-aktivasi-fds/monitoring-aktivasi-fds.module';
import { InstructionListModule } from './instruction-list/instruction-list.module';
import { AcquititionsModule } from './acquititions/acquititions.module';
// import { WorkInProgressDetailApproveComponent } from './work-in-progress-detail-approve/work-in-progress-detail-approve.component';
// import { ToastrModule } from 'ngx-toastr';
// import { OnlyNumberModule } from './app-directive/only-number.module';

@NgModule({
    imports: [
        ApuptModule,
        TerorisModule,
        UserModule,
        RoleModule,
        MerchantGroupModule,
        LookupModule,
        MasterDataApprovalModule,
        LookupGroupModule,
        RegionModule,
        AreaModule,
        BranchModule,
        MerchantModule,
        LoginModule,
        WorkInProgressModule,
        InternalNameRiskModule,
        AppParameterModule,
        SystemParameterModule,
        AccessMatrixModule,
        HolidayModule,
        ReportModule,
        UseractivityModule,
        PendingDocumentModule,
        WilayahConfigurationModule,
        ProvinsiModule,
        Dati2Module,
        KecamatanModule,
        KelurahanModule,
        MccModule,
        UploadNmidModule,
        PortalAccessModule,
        MerchantAggregatorModule,
        MerchantAggregatorDetailApprovalModule,
        LimitTransactionApprovalModule,
        LimitTransactionModule,
        MdrAggregatorModule,
        MdrAggregatorApprovalModule,
        BankModule,
        MerchantQrisStatusModule,
        OutletActivationModule,
        VersionAppModule,
        ClearSessionModule,
        MagTransactionsModule,
        QrisConfigModule,
        UploadMerchantModule,
        UploadMerchantWipModule,
        UploadMerchantNonWipModule,
        ProductModule,
        FeatureModule,
        UserCategoryModule,
        OpLimitTransactionModule,
        ImageManagementModule,
        BannerModule,
        ProfileThemeModule,
        CategoryLevelFeatureModule,
        LevelMerchantModule,
        ArticleModule,
        MdrBankModule,
        MdrTenorModule,
        FeeMrdSettingMerchantModule,
        FeeMrdSettingMerchantGroupModule,
        LimitTransactionDepositModule,
        MasterServiceAndTypeModule,
        MerchantCustomerModule,
        QrPreprintedModule,
        FeeCicilanSettingModule,
        UploadMerchantNonActivatedModule,
        AkuisisiSfaModule,
        UploadFeeMdrSettingModule,
        BankListModule,
        MerchantBankAccountModule,
        ValidationCodeModule,
        LogUpgradeFdsModule,
        MasterTagModule,
        MerchantMasterTagModule,
        UploadMerchantMasterTagModule,
        ValidationCodeMasterTagModule,
        UploadMerchantBankLoanModule,
        MerchantBankLoanModule,
        UpdatedDataMerchantModule,
        LoanProductMaintenanceModule,
        BlastNotifModule,
        UpdatedDataMerchantModule,
        UploadMissingDataModule,
        SettlementBankConfigModule,
        UploadMerchantActivatedModule,
        MonitoringAktivasiFdsModule,
        InstructionListModule,
        AcquititionsModule,
        // ToastrModule,
        // OnlyNumberModule,
    ],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [],
    exports: []

})
export class EntityModule { }
