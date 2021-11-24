import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { OnlyNumberModule } from '../app-directive/only-number.module';
import { MdrBankComponent } from './mdr-bank.component';
import { MdrBankModalComponent } from './mdr-bank.modal.component';
import { MdrBankService } from './mdr-bank.service';

@NgModule({
    declarations: [
        MdrBankComponent,
        MdrBankModalComponent,
    ],
    imports: [
        CommonModule,
        NgbModule,
        FormsModule,
        OnlyNumberModule
    ],
    entryComponents: [
        MdrBankComponent,
        MdrBankModalComponent,
    ],
    providers: [
        MdrBankService,
    ],
    exports: [
        MdrBankModalComponent
    ]
})
export class MdrBankModule { }
