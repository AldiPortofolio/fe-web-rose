import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { LevelMerchantService } from './level-merchant.service';

@NgModule({
    declarations: [
    ],
    imports: [
        CommonModule,
        NgbModule,
        FormsModule
    ],
    entryComponents: [
    ],
    providers: [
        LevelMerchantService,
    ],
})
export class LevelMerchantModule { }
