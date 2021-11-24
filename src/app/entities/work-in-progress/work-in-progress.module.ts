import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkInProgressComponent } from './work-in-progress.component';
import { ChartsModule } from 'ng2-charts';
import { WorkInProgressDetailComponent } from './work-in-progress-detail.component';
import { WorkInProgressDetailApproveComponent } from './work-in-progress-detail-approve.component';
import { WorkInProgressDetailEddComponent } from './work-in-progress-detail-edd.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { WorkInProgressService } from './work-in-progress.service';
import { MerchantWipComponent } from './merchant-wip.component';
import { MerchantWipVerifierComponent } from './merchant-wip-verifier.component';
import { MerchantWipEformComponent } from './merchant-wip-eform.component';
import { MerchantWipEddComponent } from './merchant-wip-edd.component';
import { MerchantWipConfirmModalComponent } from './merchant-wip-confirm-modal.component';
// import { OnlyNumberDirective } from '../../validators/only-number.directive';
import { WipDetailConfirmModalComponent } from './wip-detail-confirm-modal';
import { OnlyNumberDirective } from '../app-directive/only-number.directive';
import { OnlyNumberFloatDirective } from '../app-directive/only-number-float.directive';
import { NumberLetterDirective } from '../app-directive/onlyNumberLetter.directive';
import { LetterDirective } from '../app-directive/only-letter.directive';
import { TimeDirective } from '../app-directive/timeFormat.directive';
import { OnlyNumberModule } from '../app-directive/only-number.module';
// import { WorkInProgressEddComponent } from '../work-in-progress-edd.component';
// import { WorkInProgressDetailEddComponent } from './work-in-progress-detail-edd/work-in-progress-detail-edd.component';

@NgModule({
    declarations: [
        WorkInProgressComponent,
        WorkInProgressDetailComponent,
        WorkInProgressDetailApproveComponent,
        WorkInProgressDetailEddComponent,
        MerchantWipComponent,
        MerchantWipVerifierComponent,
        MerchantWipEformComponent,
        MerchantWipEddComponent,
        MerchantWipConfirmModalComponent,
        WipDetailConfirmModalComponent,
        OnlyNumberFloatDirective,
        NumberLetterDirective,
        LetterDirective,
        TimeDirective,
        // WorkInProgressEddComponent,
        // WorkInProgressDetailEdndComponent
    ],
    entryComponents: [
        WorkInProgressComponent,
        WorkInProgressDetailComponent,
        WorkInProgressDetailApproveComponent,
        WorkInProgressDetailEddComponent,
        MerchantWipComponent,
        MerchantWipVerifierComponent,
        MerchantWipEformComponent,
        MerchantWipEddComponent,
        WipDetailConfirmModalComponent,
        MerchantWipConfirmModalComponent
    ],
    imports: [
        CommonModule,
        ChartsModule,
        OnlyNumberModule,
        NgbModule,
        FormsModule
    ],
    providers: [
        WorkInProgressService,
    ],
})
export class WorkInProgressModule { }
