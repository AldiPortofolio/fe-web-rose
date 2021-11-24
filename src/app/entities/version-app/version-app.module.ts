import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VersionAppComponent } from './version-app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { OnlyNumberModule } from '../app-directive/only-number.module';
import { VersionAppService } from './version-app.service';

@NgModule({
    declarations: [
        VersionAppComponent
    ],
    imports: [
        CommonModule,
        NgbModule,
        FormsModule,
        OnlyNumberModule,
    ],
    entryComponents: [
        VersionAppComponent,
    ],
    providers: [
        VersionAppService
    ],
    exports: [
        VersionAppComponent
    ]
})
export class VersionAppModule { }
