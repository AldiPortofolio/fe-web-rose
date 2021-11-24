import { Component, OnInit, Input } from '@angular/core';
import { ValidationCodeMasterTag } from './validation-code-master-tag.model';
import { MasterTag } from '../master-tag/master-tag.model';
import { ValidationCodeMasterTagService } from './validation-code-master-tag.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal from 'sweetalert2';

@Component({
  selector: 'op-validation-code-master-tag-modal',
  templateUrl: './validation-code-master-tag.modal.component.html',
  styleUrls: ['./validation-code-master-tag.modal.component.css']
})
export class ValidationCodeMasterTagModalComponent implements OnInit {

    @Input() statusRec;
    @Input() objEdit: ValidationCodeMasterTag;
    @Input() viewMsg;
    @Input() listMasterTag: MasterTag[];
    @Input() validationCodeId: number;

    validationCodeMasterTag: ValidationCodeMasterTag;
    isFormDirty: Boolean = false;
    closeResult: string;
    submitted = false;

    constructor(private validationCodeMasterTagService: ValidationCodeMasterTagService,
        private modalService: NgbModal,
        private ngxService: NgxUiLoaderService) { }

    ngOnInit() {
        console.log(this.listMasterTag);
        console.log(this.validationCodeId);
        if (this.statusRec === 'addnew') {
            this.validationCodeMasterTag = {};
            this.validationCodeMasterTag.id = 0;
            this.validationCodeMasterTag.validationCodeId = this.validationCodeId;
            this.validationCodeMasterTag.masterTagId = 0;
        } else {
            this.validationCodeMasterTag = this.objEdit;
        }
    }

    validate() {
        this.ngxService.start();
        this.submitted = true;
        console.log('validate');

        if (!this.validationCodeMasterTag.masterTagId || this.validationCodeMasterTag.masterTagId == 0) {
            this.ngxService.stop();
            Swal.fire('Error', 'Tag cannot be null', 'error');
            return;
        }
        this.validationCodeMasterTag.masterTagId = parseInt(this.validationCodeMasterTag.masterTagId.toString());
        console.log(this.validationCodeMasterTag);
        this.save();
    }

    save(): void {

        this.validationCodeMasterTagService.save(this.validationCodeMasterTag).subscribe(result => {
            this.isFormDirty = true;
            if (result.body.errCode === '00') {
                this.closeForm();
            } else {
                console.log('error');
                Swal.fire('Failed', result.body.errDesc, 'error').then(
                );
            }
            this.ngxService.stop();
        });
    }

    closeForm(): void {
        if (this.isFormDirty === true) {
            this.modalService.dismissAll('refresh');
        } else {
            this.modalService.dismissAll('close');
        }
    }

}
