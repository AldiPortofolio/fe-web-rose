import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UploadNmidService } from './upload-nmid.service';
import { UploadNmidComponent } from './upload-nmid.component';

@NgModule({
    declarations: [
        UploadNmidComponent,
    ],
    imports: [
        CommonModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    entryComponents: [
        UploadNmidComponent,
    ],
    providers: [
        UploadNmidService
    ],
})
export class UploadNmidModule { }
