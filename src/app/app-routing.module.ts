import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TerorisComponent } from './entities/teroris/teroris.component';
import { LoginComponent } from './entities/login/login.component';
import { Page404Component } from './err/page404/page404.component';
import { MainComponent } from './main/main.component';
import { AuthGuard } from './auth/auth.guard';
import { UserComponent } from './entities/user/user.component';
import { RoleComponent } from './entities/role/role.component';
import { MerchantGroupComponent } from './entities/merchant-group/merchant-group.component';
import { ApuptComponent } from './entities/apupt/apupt.component';
import { MerchantGroupDetailComponent } from './entities/merchant-group/merchant-group-detail.component';
import { MasterDataApprovalComponent } from './entities/master-data-approval/master-data-approval.component';
import { LookupComponent } from './entities/lookup/lookup.component';
import { LookupGroupComponent } from './entities/lookup-group/lookup-group.component';
import { RegionComponent } from './entities/region/region.component';
import { MasterDataApprovalDetailComponent } from './entities/master-data-approval/master-data-approval-detail.component';
import { AreaComponent } from './entities/area/area.component';
import { BranchComponent } from './entities/branch/branch.component';
import { MerchantComponent } from './entities/merchant/merchant.component';
import { LookupRiskProfilerComponent } from './entities/lookup/lookup-risk-profiler.component';
import { UserChangePasswordComponent } from './entities/user/user-change-password.component';
import { InternalNameRiskComponent } from './entities/internal-name-risk/internal-name-risk.component';
import { MerchantDetailComponent } from './entities/merchant/merchant-detail.component';
import { WorkInProgressComponent } from './entities/work-in-progress/work-in-progress.component';
import { WorkInProgressDetailComponent } from './entities/work-in-progress/work-in-progress-detail.component';
import { WorkInProgressDetailApproveComponent } from './entities/work-in-progress/work-in-progress-detail-approve.component';
import { WorkInProgressDetailEddComponent } from './entities/work-in-progress/work-in-progress-detail-edd.component';
import { MerchantWipComponent } from './entities/work-in-progress/merchant-wip.component';
import { MerchantWipVerifierComponent } from './entities/work-in-progress/merchant-wip-verifier.component';
import { MerchantWipEformComponent } from './entities/work-in-progress/merchant-wip-eform.component';
import { MerchantWipEddComponent } from './entities/work-in-progress/merchant-wip-edd.component';
import { SystemParameterComponent } from './entities/system-parameter/system-parameter.component';
import { AccessMatrixComponent } from './entities/access-matrix/access-matrix.component';
import { HolidayComponent } from './entities/holiday/holiday.component';
import { ReportSLAComponent } from './entities/report/sla/report-sla.component';
import { ReportProductivityComponent } from './entities/report/productivity/report-productivity.component';
import { ReportFinishedComponent } from './entities/report/finished/report-finished.component';
import { FinishedReportComponent } from './entities/report/finished-report/finished-report.component';
import { ReportRejectComponent } from './entities/report/reject/report-reject.component';
import { UseractivityComponent } from './entities/useractivity/useractivity.component';
import { PendingDocumentComponent } from './entities/pending-document/pending-document.component';
import { WilayahConfigurationComponent } from './entities/wilayah-configuration/wilayah-configuration.component';
import { UploadNmidComponent } from './entities/upload-nmid/upload-nmid.component';
import { ReportQrComponent } from './entities/report/qr/report-qr.component';
import { PortalAccessComponent } from './entities/merchant-portal/portal-access/portal-access.component';
import { MerchantAggregatorComponent } from './entities/merchant-aggregator/merchant-aggregator.component';
import { MerchantAggregatorDetailComponent } from './entities/merchant-aggregator/merchant-aggregator-detail/merchant-aggregator-detail.component';
import { MerchantAggregatorDetailApprovalComponent } from './entities/merchant-aggregator-detail-approval/merchant-aggregator-detail-approval.component';
import { MagapprovaldetailComponent } from './entities/merchant-aggregator-detail-approval/magapprovaldetail.component';
import { ReportRejectedComponent } from './entities/report/report-rejected/report-rejected.component';
import { LimitTransactionApprovalComponent } from './entities/limit-transaction-approval/limit-transaction-approval.component';
import { LimitTransactionComponent } from './entities/limit-transaction/limit-transaction.component';
import { MdrAggregatorComponent } from './entities/mdr-aggregator/mdr-aggregator.component';
import { MdrAggregatorApprovalComponent } from './entities/mdr-aggregator-approval/mdr-aggregator-approval.component';
import { BankComponent } from './entities/bank/bank.component';
import { MerchantQrisStatusComponent } from './entities/merchant-qris-status/merchant-qris-status.component';
import { OutletActivationComponent } from './entities/merchant-portal/outlet-activation/outlet-activation.component';
import { VersionAppComponent } from './entities/version-app/version-app.component';
import { ClearSessionComponent } from './entities/clear-session/clear-session.component';
import { MagTransactionsComponent } from './entities/mag-transactions/mag-transactions.component';
import { QrisConfigComponent } from './entities/qris-config/qris-config.component';
import { UploadMerchantComponent } from './entities/upload-merchant/upload-merchant.component';
import { ProductComponent } from './entities/ottopay-4/product/product.component';
import { FeatureComponent } from './entities/ottopay-4/feature/feature.component';
import { UserCategoryComponent } from './entities/ottopay-4/user-category/user-category.component';
import { OpLimitTransactionComponent } from './entities/ottopay-4/op-limit-transaction/op-limit-transaction.component';
import { ImageManagementComponent } from './entities/ottopay-4/image-management/image-management.component';
import { BannerComponent } from './entities/ottopay-4/banner/banner.component';
import { UploadMerchantWipComponent } from './entities/upload-merchant-wip/upload-merchant-wip.component';
import { ProfileThemeComponent } from './entities/ottopay-4/profile-theme/profile-theme.component';
import { CategoryLevelFeatureComponent } from './entities/ottopay-4/category-level-feature/category-level-feature.component';
import { ArticleComponent } from './entities/ottopay-4/article/article.component';
import { MdrBankComponent } from './entities/mdr-bank/mdr-bank.component';
import { MdrTenorComponent } from './entities/mdr-tenor/mdr-tenor.component';
import { FeeMrdSettingMerchantComponent } from './entities/fee-mdr-setting/fee-mrd-setting-merchant/fee-mrd-setting-merchant.component';
import { FeeMrdSettingMerchantGroupComponent } from './entities/fee-mdr-setting/fee-mrd-setting-merchant-group/fee-mrd-setting-merchant-group.component';
import { LimitTransactionDepositComponent } from './entities/limit-transaction-deposit/limit-transaction-deposit.component';
import { MasterServiceAndTypeComponent } from './entities/master-service-and-type/master-service-and-type.component';
import { MerchantCustomerComponent } from './entities/merchant-customer/merchant-customer.component';
import { QrPreprintedComponent } from './entities/qr-preprinted/qr-preprinted.component';
import { FeeCicilanSettingComponent } from './entities/fee-cicilan-setting/fee-cicilan-setting.component';
import { UploadMerchantNonActivatedComponent } from './entities/upload-merchant-non-activated/upload-merchant-non-activated.component'
import { AkuisisiSfaComponent } from './entities/akuisisi-sfa/akuisisi-sfa.component';
import { UploadFeeMdrSettingComponent } from './entities/upload-fee-mdr-setting/upload-fee-mdr-setting.component';
import { ReportQrPreprintedComponent } from './entities/report/report-qr-preprinted/report-qr-preprinted.component';
import { ReportCrmPenugasan } from './entities/report/report-crm-penugasan/report-crm-penugassan.model';
import { ReportCrmPenugasanComponent } from './entities/report/report-crm-penugasan/report-crm-penugasan.component';
import { BankListComponent } from './entities/bank-list/bank-list.component';
import { MerchantBankAccountComponent } from './entities/merchant-bank-account/merchant-bank-account.component';
import { UploadMerchantNonWipComponent } from './entities/upload-merchant-non-wip/upload-merchant-non-wip.component';
import { ValidationCodeComponent } from './entities/validation-code/validation-code.component';
import { LogUpgradeFdsComponent } from './entities/log-upgrade-fds/log-upgrade-fds.component';
import { MasterTagComponent } from './entities/master-tag/master-tag.component';
import { MerchantMasterTagComponent } from './entities/merchant-master-tag/merchant-master-tag.component';
import { UploadMerchantMasterTagComponent } from './entities/upload-merchant-master-tag/upload-merchant-master-tag.component';
import { ValidationCodeMasterTagComponent } from './entities/validation-code-master-tag/validation-code-master-tag.component';
import { UploadMerchantBankLoan } from './entities/upload-merchant-bank-loan/upload-merchant-bank-loan.model';
import { UploadMerchantBankLoanComponent } from './entities/upload-merchant-bank-loan/upload-merchant-bank-loan.component';
import { MerchantBankLoanComponent } from './entities/merchant-bank-loan/merchant-bank-loan.component';
import { UpdatedDataMerchantComponent } from './entities/updated-data-merchant/updated-data-merchant.component';
import { ReportUpdatedDataMerchant } from './entities/report/report-updated-data-mechant/report-updated-data-merchant.model';
import { ReportUpdatedDataMechantComponent } from './entities/report/report-updated-data-mechant/report-updated-data-mechant.component';
import { LoanProductMaintenance } from './entities/loan-product-maintenance/loan-product-maintenance.model';
import { LoanProductMaintenanceComponent } from './entities/loan-product-maintenance/loan-product-maintenance.component';
import { BlastNotifComponent } from './entities/blast-notif/blast-notif.component';
import { UploadMissingDataComponent } from './entities/upload-missing-data/upload-missing-data.component';
import { SettlementBankConfigComponent } from './entities/settlement-bank-config/settlement-bank-config.component';
import { ReportExportMerchantComponent } from './entities/report/report-export-merchant/report-export-merchant.component';
import { ReportExportAkuisisiSfaComponent } from './entities/report/report-export-akuisisi-sfa/report-export-akuisisi-sfa.component';
import { UploadMerchantActivatedComponent } from './entities/upload-merchant-activated/upload-merchant-activated.component';
import { MonitoringAktivasiFdsComponent } from './entities/monitoring-aktivasi-fds/monitoring-aktivasi-fds.component';
import { InstructionListComponent } from './entities/instruction-list/instruction-list.component';
import { AcquititionsComponent } from './entities/acquititions/acquititions.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'main', component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          { path: '', component: WorkInProgressComponent },
          { path: '404', component: Page404Component },
          { path: 'apupt', component: ApuptComponent },
          { path: 'teroris', component: TerorisComponent },
          { path: 'user', component: UserComponent },
          // { path: 'user/change-password', component: UserChangePasswordComponent },
          { path: 'lookup-group', component: LookupGroupComponent },
          // { path: 'lookup/:name', component: LookupComponent },
          { path: 'lookup', component: LookupComponent },
          { path: 'lookup/risk-profiler/:type', component: LookupRiskProfilerComponent },
          { path: 'role', component: RoleComponent },
          { path: 'merchantGroup', component: MerchantGroupComponent },
          { path: 'merchantGroup/:id', component: MerchantGroupDetailComponent },
          { path: 'masterDataApproval', component: MasterDataApprovalComponent },
          { path: 'masterDataApproval/detail', component: MasterDataApprovalDetailComponent },
          { path: 'apuppt', component: ApuptComponent },
          { path: 'region', component: RegionComponent },
          { path: 'area', component: AreaComponent },
          { path: 'branch', component: BranchComponent },
          { path: 'merchant', component: MerchantComponent },
          { path: 'internal-name-risk', component: InternalNameRiskComponent },
          { path: 'merchant/detail', component: MerchantWipComponent },
          { path: 'verifier', component: MerchantWipVerifierComponent },
          { path: 'eform', component: MerchantWipEformComponent },
          { path: 'edd', component: MerchantWipEddComponent },
          { path: 'work-in-progress', component: WorkInProgressComponent },
          { path: 'work-in-progress/detail', component: WorkInProgressDetailComponent },
          { path: 'work-in-progress/detail-approve', component: WorkInProgressDetailApproveComponent },
          { path: 'work-in-progress/detail-edd', component: WorkInProgressDetailEddComponent },
          { path: 'system-parameter', component: SystemParameterComponent },
          { path: 'access-matrix', component: AccessMatrixComponent },
          { path: 'holiday', component: HolidayComponent },
          { path: 'report-sla', component: ReportSLAComponent },
          { path: 'report-productivity', component: ReportProductivityComponent },
          // { path: 'report-finished', component: ReportFinishedComponent },
          { path: 'report-finished', component: FinishedReportComponent },
          { path: 'report-reject', component: ReportRejectedComponent },
          { path: 'report-qr', component: ReportQrComponent },
          // { path: 'report-reject', component: ReportRejectComponent },
          { path: 'useractivity', component: UseractivityComponent },
          { path: 'pending-document', component: PendingDocumentComponent },
          { path: 'wilayah-configuration', component: WilayahConfigurationComponent },
          { path: 'upload-nmid', component: UploadNmidComponent },
          // { path: 'portal-access', component: PortalAccessComponent },
          // { path: 'outlet-activation', component: OutletActivationComponent },
          { path: 'merchant-aggregator', component: MerchantAggregatorComponent },
          { path: 'merchant-aggregator-detail/:mid', component: MerchantAggregatorDetailComponent},
          { path: 'merchant-aggregator', component: MerchantAggregatorComponent },
          { path: 'merchant-aggregator-detail-approval', component: MerchantAggregatorDetailApprovalComponent },
          { path: 'merchant-aggregator-detail-approval/detail', component: MagapprovaldetailComponent },
          { path: 'limit-transaction/approval', component: LimitTransactionApprovalComponent },
          { path: 'limit-transaction', component: LimitTransactionComponent },
          { path: 'mdr-aggregator', component: MdrAggregatorComponent },
          { path: 'mdr-aggregator-approval', component: MdrAggregatorApprovalComponent },
          { path: 'bank-accounts', component: BankComponent },
          { path: 'merchant-qris-status', component: MerchantQrisStatusComponent },
          { path: 'version-app', component: VersionAppComponent },
          { path: 'clear-session', component: ClearSessionComponent},
          { path: 'report-mag-transactions', component: MagTransactionsComponent },
          { path: 'qris-config', component: QrisConfigComponent },
          { path: 'upload-merchant', component: UploadMerchantComponent },
          { path: 'upload-merchant-wip', component: UploadMerchantWipComponent },
          { path: 'upload-merchant-non-wip', component: UploadMerchantNonWipComponent},
          { path: 'product', component: ProductComponent },
          { path: 'feature-product', component: FeatureComponent },
          { path: 'user-category', component: UserCategoryComponent },
          { path: 'op-limit-transaction', component: OpLimitTransactionComponent },
          { path: 'image-management', component: ImageManagementComponent },
          { path: 'banner', component: BannerComponent },
          { path: 'profile-theme', component: ProfileThemeComponent },
          { path: 'category-level-feature', component: CategoryLevelFeatureComponent },
          // { path: 'article', component: ArticleComponent },
          { path: 'mdr-bank', component: MdrBankComponent },
          { path: 'mdr-tenor', component: MdrTenorComponent },
          { path: 'fee-mdr-setting-merchant', component: FeeMrdSettingMerchantComponent },
          { path: 'fee-mdr-setting-merchant-group', component: FeeMrdSettingMerchantGroupComponent },
          { path: 'limit-transaction-deposit', component: LimitTransactionDepositComponent },
          { path: 'master-service-and-type', component: MasterServiceAndTypeComponent },
          { path: 'merchant-customer', component: MerchantCustomerComponent },
          { path: 'qr-preprinted', component: QrPreprintedComponent },
          { path: 'fee-cicilan-setting', component: FeeCicilanSettingComponent},
          { path: 'upload-merchant-non-activated', component: UploadMerchantNonActivatedComponent },
          { path: 'akuisisi-sfa', component: AkuisisiSfaComponent },
          { path: 'upload-fee-mdr-setting', component: UploadFeeMdrSettingComponent },
          { path: 'report-qr-preprinted', component: ReportQrPreprintedComponent },
          { path: 'report-crm-penugasan', component: ReportCrmPenugasanComponent },
          { path: 'bank-list', component: BankListComponent },
          { path: 'merchant-bank-account', component: MerchantBankAccountComponent},
          { path: 'validation-code', component: ValidationCodeComponent },
          { path: 'log-upgrade-fds', component: LogUpgradeFdsComponent },
          { path: 'master-tag', component: MasterTagComponent },
          { path: 'merchant-master-tag', component: MerchantMasterTagComponent },
          { path: 'upload-merchant-master-tag', component: UploadMerchantMasterTagComponent },
          { path: 'validation-code-master-tag', component: ValidationCodeMasterTagComponent },
          { path: 'upload-merchant-bank-loan', component: UploadMerchantBankLoanComponent },
          { path: 'merchant-bank-loan', component: MerchantBankLoanComponent },
          { path: 'updated-data-merchant', component: UpdatedDataMerchantComponent },
          { path: 'report-updated-data-merchant', component: ReportUpdatedDataMechantComponent },
          { path: 'loan-product-maintenance', component: LoanProductMaintenanceComponent },
          { path: 'blast-notif', component: BlastNotifComponent },
          { path: 'upload-missing-data', component: UploadMissingDataComponent },
          { path: 'report-export-merchant', component: ReportExportMerchantComponent },
          { path: 'settlement-bank-config', component: SettlementBankConfigComponent },
          { path: 'report-export-akuisisi-sfa', component: ReportExportAkuisisiSfaComponent },
          { path: 'monitoring-aktivasi-fds', component: MonitoringAktivasiFdsComponent },
          { path: 'upload-merchant-activated', component: UploadMerchantActivatedComponent },
          { path: 'instruction-list', component: InstructionListComponent },
          { path: 'acquisitions', component: AcquititionsComponent },
        ]
      }
      // {path: '404', component: Page404Component,  canActivateChild: [AuthGuard], },
      // {path: 'teroris', component: TerorisComponent,  canActivateChild: [AuthGuard], },
    ]
  },
  // { path: '**', redirectTo: '/main/404', pathMatch: 'full' }
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
