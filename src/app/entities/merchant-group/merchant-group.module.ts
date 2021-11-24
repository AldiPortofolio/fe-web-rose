import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MerchantGroupComponent } from './merchant-group.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { MerchantGroupService } from './merchant-group.service';
import { MerchantGroupDetailComponent } from './merchant-group-detail.component';
import { MerchantGroupDetailInternalCpComponent } from './merchant-group-detail-internal-cp.component';
import { OnlyNumberMgDirective } from '../app-directive/OnlyNumberMgDirective';
import { LetterDirectiveMg } from '../app-directive/only-letterMg.directive';
import { NumberLetterDirectiveMg } from '../app-directive/onlyNumberLetterMg.directive';
import { EmailDirective } from '../app-directive/emailFormat.directive';
import { OnlyNumberModule } from '../app-directive/only-number.module';
import { MerchantGroupModalComponent } from './merchant-group-modal-component';


@NgModule({
    declarations: [
        MerchantGroupComponent,
        MerchantGroupDetailComponent,
        MerchantGroupDetailInternalCpComponent,
        OnlyNumberMgDirective,
        MerchantGroupModalComponent,
        // OnlyNumberModule,
        LetterDirectiveMg,
        NumberLetterDirectiveMg,
        EmailDirective,
    ],
    imports: [
        CommonModule,
        NgbModule,
        FormsModule,
    ],
    entryComponents: [
        MerchantGroupComponent,
        MerchantGroupModalComponent,
    ],
    providers: [
        MerchantGroupService,
    ],
    exports: [
        MerchantGroupDetailComponent,
    ]
})
export class MerchantGroupModule { }
