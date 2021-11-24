import { Component, OnInit, Input } from '@angular/core';
import { ValidationCode } from './validation-code.model';
import { UserCategory } from '../ottopay-4/user-category/user-category.model';
import { NgbModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ValidationCodeService } from './validation-code.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'op-validation-code-modal',
  templateUrl: './validation-code.modal.component.html',
  styleUrls: ['./validation-code.modal.component.css']
})
export class ValidationCodeModalComponent implements OnInit {

    @Input() statusRec;
    @Input() objEdit: ValidationCode;
    @Input() viewMsg;
    @Input() userCategoryList: UserCategory[];
    @Input() listAppID;

    validationCode: ValidationCode;
    validateFrom: NgbDateStruct; 
    validateTo: NgbDateStruct; 


    isFormDirty: Boolean = false;
    closeResult: string;
    submitted = false;


    constructor(private modalService: NgbModal,
        private ngxService: NgxUiLoaderService,
        private validationCodeService: ValidationCodeService
    ) {
    }

    ngOnInit() {
        console.log(this.userCategoryList);
        console.log(this.listAppID);
        console.log(this.objEdit);
        if (this.statusRec === 'addnew') {
            this.validationCode = {};
            this.validationCode.id = 0;
            this.validationCode.appId='';
            this.validationCode.userCategoryCode='';
            this.validationCode.validationCode='';
            this.validationCode.validFrom='';
            this.validationCode.validTo='';
        } else {
            this.validationCode = this.objEdit;
            this.validateFrom = {
                year: Number(this.validationCode.validFrom.substr(0, 4)),
                month: Number(this.validationCode.validFrom.substr(5, 2)),
                day: Number(this.validationCode.validFrom.substr(8, 2))
            };
            this.validateTo = {
                year: Number(this.validationCode.validTo.substr(0, 4)),
                month: Number(this.validationCode.validTo.substr(5, 2)),
                day: Number(this.validationCode.validTo.substr(8, 2))
            };
        }
    }

    save(): void {

        this.validationCodeService.save(this.validationCode).subscribe(result => {
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

    validate() {
        this.ngxService.start();
        this.submitted = true;
        console.log('validate');

        if (!this.validationCode.validationCode || this.validationCode.validationCode == '') {
            this.ngxService.stop();
            Swal.fire('Error', 'Code cannot be null', 'error');
            return;
        }
        if (!this.validationCode.appId || this.validationCode.appId == '') {
            this.ngxService.stop();
            Swal.fire('Error', 'AppID cannot be null', 'error');
            return;
        }
        if (!this.validationCode.userCategoryCode || this.validationCode.userCategoryCode == '') {
            this.ngxService.stop();
            Swal.fire('Error', 'User Category cannot be null', 'error');
            return;
        }
        if (this.validateFrom == null || this.validateFrom == undefined) {
            this.ngxService.stop();
            Swal.fire('Error', 'Validate From cannot be null', 'error');

        }
        if (this.validateTo == null || this.validateTo == undefined) {
            this.ngxService.stop();
            Swal.fire('Error', 'Validate To cannot be null', 'error');

        }
        this.validationCode.validFrom = this.validateFrom.year + '-' +
            ('0' + this.validateFrom.month).slice(-2) + '-' +
            ('0' + this.validateFrom.day).slice(-2);
        this.validationCode.validTo = this.validateTo.year + '-' +
            ('0' + this.validateFrom.month).slice(-2) + '-' +
            ('0' + this.validateFrom.day).slice(-2);

        console.log(this.validationCode);
        this.save();
    }

    closeForm(): void {
        if (this.isFormDirty === true) {
            this.modalService.dismissAll('refresh');
        } else {
            this.modalService.dismissAll('close');
        }
    }
}
