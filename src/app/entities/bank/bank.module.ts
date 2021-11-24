import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { BankComponent } from './bank.component';

@NgModule({
    declarations: [
        BankComponent,
    ],
    imports: [
        CommonModule,
        NgbModule,
        FormsModule
    ],
    entryComponents: [
        BankComponent,
    ],
    providers: [
    ]
})
export class BankModule { }
