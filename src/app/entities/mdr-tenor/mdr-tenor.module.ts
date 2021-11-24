import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { OnlyNumberModule } from '../app-directive/only-number.module';
import { MdrTenorComponent } from './mdr-tenor.component';
import { MdrTenorModalComponent } from './mdr-tenor.modal.component';
import { MdrTenorService } from './mdr-tenor.service';

@NgModule({
    declarations: [
        MdrTenorComponent,
        MdrTenorModalComponent,
    ],
    imports: [
        CommonModule,
        NgbModule,
        FormsModule,
        OnlyNumberModule
    ],
    entryComponents: [
        MdrTenorComponent,
        MdrTenorModalComponent,
    ],
    providers: [
        MdrTenorService,
    ],
    exports: [
        MdrTenorModalComponent
    ]
})
export class MdrTenorModule { }
