import { Component, OnInit, Input } from '@angular/core';
import { MasterTag } from './master-tag.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MasterTagService } from './master-tag.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'op-master-tag-modal',
  templateUrl: './master-tag.modal.component.html',
  styleUrls: ['./master-tag.modal.component.css']
})
export class MasterTagModalComponent implements OnInit {


    @Input() statusRec;
    @Input() objEdit: MasterTag;
    @Input() viewMsg;

    masterTag: MasterTag;

    isFormDirty: Boolean = false;
    closeResult: string;

    listStatus = [
        { code: "true", name: "Active" },
        { code: "false", name: "In Active" },
    ]

    constructor(private modalService: NgbModal,
        private ngxService: NgxUiLoaderService,
        private masterTagService: MasterTagService
    ) {
    }

    ngOnInit() {
        if (this.statusRec === 'addnew') {
            this.masterTag = {};
            this.masterTag.id = 0;
            this.masterTag.name = '';
            this.masterTag.description = '';
            this.masterTag.code = '';
            this.masterTag.status = "true";
        } else {
            // if (this.objEdit.status == true) {
            //     this.objEdit.status = "active"
            // } else {
            //     this.objEdit.status = "inactive"                
            // }
            this.masterTag = this.objEdit;
        }

        console.log(this.masterTag);
    }

    save(): void {
        this.ngxService.start();
        
        if(String(this.masterTag.status)=='true'){
            this.masterTag.status='active'
        } else {
            this.masterTag.status = 'inactive'
        }
        this.masterTagService.save(this.masterTag).subscribe(result => {
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
