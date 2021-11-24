import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { OnlyNumberModule } from '../app-directive/only-number.module';
import { ClearSessionComponent } from './clear-session.component';
import { ClearSessionService } from './clear-session.service';

@NgModule({
    declarations: [
        ClearSessionComponent
    ],
    imports: [
        CommonModule,
        NgbModule,
        FormsModule,
        OnlyNumberModule,
    ],
    entryComponents: [
        ClearSessionComponent,
    ],
    providers: [
        ClearSessionService
    ],
    exports: [
        ClearSessionComponent
    ]
})
export class ClearSessionModule { }
